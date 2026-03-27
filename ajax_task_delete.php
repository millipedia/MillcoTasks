<?php

namespace ProcessWire;

/**
 * 
 * Delete a task
 * 
 */


if(wire('input')->post('task_id')){

	$task_id=(int)wire('input')->post('task_id');

	/** @var MillcoTasks $this */
	if($this->task_delete($task_id)){
		// Return empty string to remove the task card from the DOM.
		$response = '';
	}else{
		$response='Could not delete task.';
	}

}else{
	$response='missing task id';
}

echo $response;
exit(0);
