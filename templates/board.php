<?php

namespace ProcessWire;

/**
 * Markup for board.
 */

$board_id = 1; // we just have single boards at the mo, but one day....

?>

<style>
	<?php
	include('../MillcoTasks.css');
	?>
</style>

<div id="mt_board" class="mt_board" data-board_id="<?=$board_id?>">

	<?php

	$tick = 1;

	foreach ($board as $deck) {

		echo '<div id="deck_' . $tick . '" data-deck_id="' . $deck['deck_id'] . '" class="mt_deck">';
		echo '<header class="deck_header">';
		echo '<input class="deck_title" name="deck_title" 
		data-hx-post="/millcotasks/deck/title/' . $deck['deck_id'] . '"
		hx-trigger="blur changed"
		 value="' . $deck['deck_name'] . '">';

		 echo '<div class="deck_handle">H</div>';
		 echo '</header>';

		foreach ($deck['tasks'] as $task) {

			/** @var MillcoTasks $mt */
			echo $mt->task_markup($task);
		}

		// add a new form at the end.
		echo $mt->task_form(-1, $board_id, $deck['deck_id']);

		echo '</div>';
		echo '<script>

			var sortable_' . $tick . ' = new Sortable(deck_' . $tick . ', {
				animation: 150,
				group: "mt_decks",
				draggable: ".mt_task",
				onEnd: function (evt) {

					sort_order_update(evt.to);

					if(evt.from!==evt.to){
						sort_order_update(evt.from);
					}

				}
			});
			</script>';

		$tick++;
	}


	?>

	<div id="mt_new_deck" class="mt_new_deck" data-hx-post="/millcotasks/deck/add/<?= $board_id ?>" data-hx-target="#mt_board">+</div>


</div>

<script>
	// make the board decks sortable
	var sortable_board = new Sortable(mt_board, {
		animation: 150,
		group: "mt_boards",
		draggable: ".mt_deck",
		handle: '.deck_handle',
		onEnd: function(evt) {

			deck_order();

			if (evt.from !== evt.to) {
				deck_order();
			}


		}
	});
</script>