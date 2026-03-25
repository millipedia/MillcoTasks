<?php

namespace ProcessWire;

/**
 * Add a new reply (comment) to a task.
 */

$task_id = (int) $event->arguments('task_id');

if(!$task_id){
	echo 'missing task id';
	exit(0);
}

$user = wire('user');
if(!$user || !$user->isLoggedin() || !$user->hasPermission('millco-tasks')){
	echo 'not allowed';
	exit(0);
}

$reply_content = (string) wire('input')->post('reply_content');
$reply_content = trim($reply_content);

if($reply_content === ''){
	echo $this->replies_markup($task_id);
	exit(0);
}

$this->reply_add($task_id, $reply_content);

echo $this->replies_markup($task_id);
exit(0);

