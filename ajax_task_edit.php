<?php

namespace ProcessWire;

/**
 * 
 * Return a form for htmx to update this task.
 * 
 */


$board_id=$event->arguments('board_id');
$task_id=$event->arguments('task_id');

$response='';
$response.=$this->task_form($task_id,$board_id);

echo $response;

exit(0);
