
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