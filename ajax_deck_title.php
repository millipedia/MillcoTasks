<?php

namespace ProcessWire;

/**
 * 
 * Rename a deck.
 */

$response='';

$deck_id=$event->arguments('deck_id');

if($deck_id){


	// pass new board variable to the board template
	$deck_title=wire('input')->post('deck_title');

	if($this->deck_title($deck_id,$deck_title)){
		$response=$deck_title;
	}else{
		$response= "Cannot update deck title";
	}



}else{
	$response='missing deck key';
}

echo $response;
exit(0);
