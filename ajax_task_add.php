<?php

namespace ProcessWire;

/**
 * 
 * Add a new task.
 */

$response='';

if(wire('input')->post('task_content')){

	$task_content=wire('input')->post('task_content');
	$deck_id=(int)wire('input')->post('deck_id');
	$board_id=(int)wire('input')->post('board_id');

	$task_id=$this->task_add($board_id,$deck_id,$task_content);
	
	// get the task back and grab the markup
	$task=$this->task_from_id($task_id);
	
	$response.=$this->task_markup($task);

	// and also add a new form;
	$response.= $this->task_form(-1,$board_id,$deck_id);



}else{
	$response='missing task content';
	// and also add a new form;
	$response.= $this->task_form(-1,$board_id,$deck_id);

}

echo $response;
exit(0);
