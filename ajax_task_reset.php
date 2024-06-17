<?php

namespace ProcessWire;

/**
 * 
 * Canceled edit form so just results markup for task.
 * 
 */


if(wire('input')->post('task_id')){

	$task_id=(int)wire('input')->post('task_id');

	// just load it again in the right format
	$task=$this->task_from_id($task_id);

	// and send back the markup.
	$response=$this->task_markup($task);


}else{
	$response='missing task id';
}

echo $response;
exit(0);
