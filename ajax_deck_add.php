<?php

namespace ProcessWire;

/**
 * 
 * Add a new deck
 */

$response='';

$board_id=$event->arguments('board_id');

if($board_id){

	// add a new deck to this board.
	$new_deck_id=$this->deck_add($board_id);

	// get the board
	$board=$this->tasks($board_id);
	
	// pass new board variable to the board template

	$response= wire('files')->render(wire('config')->paths->siteModules . 'MillcoTasks/templates/board.php', ['board'=>$board, 'mt'=>$this]);

}else{
	$response='missing board id';
}

echo $response;
exit(0);
