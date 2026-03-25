
/**
 * Sort order for decks in board
 * @param {*} deck 
 */
function deck_order(){
	
	// at the mo we only have board per page.
	// might be nice to have more than one at some point but....
	var board=document.getElementById('mt_board');

	var sort_order=Array();

		for (const child of board.children) {

			if(child.classList.contains('mt_deck')){
				sort_order.push(child.dataset.deck_id);
			}

		}


	fetch(`/millcotasks/decks/sort/`, {
		method: "POST",
		body: JSON.stringify({
			sort_order: sort_order,
			board_id: board.dataset.board_id
		  }),
		headers: {
		  "Content-Type": "application/json"
		}
	  }) 
	  .then(response => {
		if (!response.ok) {                                  // ***
		  throw new Error("HTTP error " + response.status);  // ***
		}                                                    // ***
		// ...use `response.json`, `response.text`, etc. here
	  })
	  .catch(error => {
		// ...handle/report error
	  });


}

/**
 * Sort cards in deck
 * @param {*} deck 
 */
function sort_order_update(deck){

	var sort_order=Array();

		for (const child of deck.children) {

			if(child.classList.contains('mt_task')){
				sort_order.push(child.dataset.task_id);
			}

		}


	fetch(`/millcotasks/tasks/sort/`, {
		method: "POST",
		body: JSON.stringify({
			sort_order: sort_order,
			deck_id: deck.dataset.deck_id
		  }),
		headers: {
		  "Content-Type": "application/json"
		}
	  }) 
	  .then(response => {
		if (!response.ok) {                                  // ***
		  throw new Error("HTTP error " + response.status);  // ***
		}                                                    // ***
		// ...use `response.json`, `response.text`, etc. here
	  })
	  .catch(error => {
		// ...handle/report error
	  });


}

function mtSetCommentsButtonLabel(btn, isOpen){

	if(!btn) return;

	var count = parseInt(btn.dataset.comments_count || "0", 10);
	if(isNaN(count)) count = 0;

	if(!isOpen && count === 0){
		btn.textContent = "Add comment";
		return;
	}

	btn.textContent = (isOpen ? "Hide comments" : "Show comments") + " (" + count + ")";
}

/**
 * Toggle replies (comments) under a task card.
 * - First open: loads via htmx into the slot.
 * - Subsequent toggles: just hide/show without reloading.
 */
function mtToggleReplies(taskId, btn){

	var slot = document.getElementById("mt_replies_for_" + taskId);
	if(!slot) return false;

	var isHidden = slot.classList.contains("is-hidden");

	// If already loaded, just toggle visibility.
	if(slot.childElementCount > 0){
		if(isHidden){
			slot.classList.remove("is-hidden");
			slot.setAttribute("aria-hidden", "false");
			mtSetCommentsButtonLabel(btn, true);
		} else {
			slot.classList.add("is-hidden");
			slot.setAttribute("aria-hidden", "true");
			mtSetCommentsButtonLabel(btn, false);
		}
		return false;
	}

	// Not loaded yet: show slot and fetch markup.
	slot.classList.remove("is-hidden");
	slot.setAttribute("aria-hidden", "false");
	mtSetCommentsButtonLabel(btn, true);

	var url = btn && btn.dataset ? btn.dataset.comments_url : null;
	if(url && window.htmx && typeof window.htmx.ajax === "function"){
		window.htmx.ajax("GET", url, { target: slot, swap: "innerHTML" });
	} else if(url) {
		fetch(url).then(function(r){ return r.text(); }).then(function(html){
			slot.innerHTML = html;
		});
	}

	return false;
}

/**
 * Resolve task id from an htmx event. For outerHTML swaps on `.mt_replies`,
 * `detail.target` can be the *old* detached node with a stale `data-count`,
 * so prefer the element that initiated the request (`detail.elt`).
 */
function mtResolveTaskIdFromHtmxEvent(evt){

	var detail = evt && evt.detail;
	if(!detail) return 0;

	var elt = detail.elt;
	if(elt){
		var form = elt.closest ? elt.closest("form") : null;
		if(form){
			var inp = form.querySelector('input[name="task_id"]');
			if(inp && inp.value) return parseInt(inp.value, 10) || 0;
		}
		if(elt.matches && elt.matches('input[name="task_id"]') && elt.value){
			return parseInt(elt.value, 10) || 0;
		}
	}

	var target = detail.target;
	if(target && target.dataset && target.dataset.task_id){
		return parseInt(target.dataset.task_id, 10) || 0;
	}
	if(target && target.id && target.id.indexOf("mt_replies_for_") === 0){
		return parseInt(target.id.replace("mt_replies_for_", ""), 10) || 0;
	}
	if(target && target.closest){
		var mr = target.closest(".mt_replies");
		if(mr && mr.dataset.task_id) return parseInt(mr.dataset.task_id, 10) || 0;
	}

	return 0;
}

function mtHtmxEventTouchesComments(evt){

	var detail = evt && evt.detail;
	if(!detail) return false;

	var elt = detail.elt;
	if(elt){
		if(elt.classList && elt.classList.contains("mt_reply_form")) return true;
		if(elt.closest && elt.closest(".mt_replies")) return true;
	}

	var target = detail.target;
	if(target && target.classList && target.classList.contains("mt_replies")) return true;
	if(target && target.id && target.id.indexOf("mt_replies_for_") === 0) return true;

	return false;
}

function mtSyncCommentsButtonAfterSwap(evt){

	if(!mtHtmxEventTouchesComments(evt)) return;

	var taskId = mtResolveTaskIdFromHtmxEvent(evt);
	if(!taskId) return;

	// Always read count from the live DOM (new `.mt_replies` under the slot).
	var slot = document.getElementById("mt_replies_for_" + taskId);
	if(!slot) return;

	var replies = slot.querySelector(".mt_replies");
	if(!replies) return;

	var btn = document.querySelector('.mt_task_comments_button[data-task_id="' + taskId + '"]');
	if(!btn) return;

	var count = parseInt(replies.dataset.count || "0", 10);
	if(isNaN(count)) count = 0;
	btn.dataset.comments_count = String(count);

	var isOpen = !slot.classList.contains("is-hidden");
	mtSetCommentsButtonLabel(btn, isOpen);
}

/**
 * Task delete replaces only `#mtef_{id}` (the edit form). The comments slot `#mt_replies_for_{id}`
 * is a sibling and must be removed too.
 *
 * Primary fix: `ajax_task_delete.php` returns an out-of-band `hx-swap-oob="delete"` for that slot.
 * This listener is a fallback if OOB did not run (e.g. older htmx) — safe to keep: idempotent.
 */
function mtRemoveRepliesSlotAfterTaskDelete(evt){

	var detail = evt && evt.detail;
	if(!detail || !detail.xhr) return;

	var xhr = detail.xhr;
	var ok = detail.successful;
	if(ok === undefined){
		ok = xhr.status >= 200 && xhr.status < 300;
	}
	if(!ok) return;

	var url = (xhr.responseURL || "").toString();
	var m = url.match(/\/millcotasks\/task\/delete\/(\d+)/);
	var taskId = m ? parseInt(m[1], 10) : 0;

	var isDeleteRequest = url.indexOf("/millcotasks/task/delete/") !== -1;
	if(!isDeleteRequest && detail.elt){
		var hp = (detail.elt.getAttribute && detail.elt.getAttribute("hx-post")) || "";
		if(hp.indexOf("/millcotasks/task/delete/") === -1){
			var delBtn = detail.elt.closest && detail.elt.closest("[hx-post*='/millcotasks/task/delete/']");
			if(delBtn) hp = delBtn.getAttribute("hx-post") || "";
		}
		isDeleteRequest = hp.indexOf("/millcotasks/task/delete/") !== -1;
		if(!taskId && isDeleteRequest){
			var m2 = hp.match(/\/millcotasks\/task\/delete\/(\d+)/);
			if(m2) taskId = parseInt(m2[1], 10) || 0;
		}
	}

	if(!isDeleteRequest) return;

	if(!taskId && detail.elt){
		var form = detail.elt.closest && detail.elt.closest("form");
		if(form){
			var inp = form.querySelector('input[name="task_id"]');
			if(inp && inp.value) taskId = parseInt(inp.value, 10) || 0;
		}
	}

	if(!taskId) return;

	var slot = document.getElementById("mt_replies_for_" + taskId);
	if(slot) slot.remove();
}

/**
 * The comments slot `#mt_replies_for_{id}` is a sibling of `.mt_task` / `#mtef_{id}`, not inside them.
 * Opening edit swaps only the card for the form, so visible comments would stay. Cancel/save swaps
 * only the form for new card markup (which includes a fresh empty slot), leaving the old slot in the DOM.
 * Remove the slot before any swap that replaces the card or its edit form (existing tasks only).
 */
function mtRemoveRepliesSlotBeforeTaskSwap(evt){

	var target = evt && evt.detail && evt.detail.target;
	if(!target) return;

	var taskId = 0;

	if(target.classList && target.classList.contains("mt_task")){
		taskId = parseInt(target.dataset.task_id || "0", 10) || 0;
	} else if(target.id){
		var m = target.id.match(/^mtef_(\d+)$/);
		if(m) taskId = parseInt(m[1], 10) || 0;
	}

	if(!taskId) return;

	var slot = document.getElementById("mt_replies_for_" + taskId);
	if(slot) slot.remove();
}

// When comments change (add/edit/delete), update the toggle button count/label.
// Use `document` not `document.body`: this file can run before <body> exists.
// `afterSwap` is correct; the bug was reading `data-count` from `detail.target`
// after an outerHTML swap (often the old detached node with stale attributes).
document.addEventListener("htmx:beforeSwap", mtRemoveRepliesSlotBeforeTaskSwap);
document.addEventListener("htmx:afterSwap", mtSyncCommentsButtonAfterSwap);
document.addEventListener("htmx:afterRequest", mtRemoveRepliesSlotAfterTaskDelete);