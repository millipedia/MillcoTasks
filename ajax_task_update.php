<?php

namespace ProcessWire;

/**
 * 
 * Return a form for htmx to update this task.
 * 
 */


if(wire('input')->post('task_id')){

	$task_id=(int)wire('input')->post('task_id');
	$task_content=wire('input')->post('task_content');

	// update task
	$this->task_update($task_id,$task_content);

	// just load it again in the right format
	$task=$this->task_from_id($task_id);

	// and send back the markup.
	$response=$this->task_markup($task);


}else{
	$response='missing task id';
}

echo $response;
exit(0);
