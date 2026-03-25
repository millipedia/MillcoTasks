<?php

namespace ProcessWire;

/**
 * 
 * Delete a task
 * 
 */


if(wire('input')->post('task_id')){

	$task_id=(int)wire('input')->post('task_id');

	// just load it again in the right format
	if($this->task_delete($task_id)){
		// Main swap replaces the edit form with nothing; OOB removes the comments slot sibling.
		$response = '<div id="mt_replies_for_' . (int) $task_id . '" hx-swap-oob="delete"></div>';
	}else{
		$response='Could not delete task.';
	}

}else{
	$response='missing task id';
}

echo $response;
exit(0);
