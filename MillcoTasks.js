console.log("boodsd");


// 
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