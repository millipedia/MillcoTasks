<?php

namespace ProcessWire;

/**
 * Render replies (comments) for a task.
 */

$task_id = (int) $event->arguments('task_id');

if(!$task_id){
	echo 'missing task id';
	exit(0);
}

echo $this->replies_markup($task_id);
exit(0);

