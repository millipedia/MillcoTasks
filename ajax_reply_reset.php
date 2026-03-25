<?php

namespace ProcessWire;

/**
 * Cancel editing a reply (comment) and return display markup.
 * For a new reply form, returns a fresh empty form.
 */

$reply_id = (int) $event->arguments('reply_id');

// Existing reply -> return its markup.
if($reply_id > 0){
	$reply = $this->reply_from_id($reply_id);
	if(!$reply){
		echo 'reply not found';
		exit(0);
	}

	echo $this->reply_markup($reply);
	exit(0);
}

// New reply form -> return empty form again.
$task_id = (int) wire('input')->post('task_id');
if(!$task_id){
	echo 'missing task id';
	exit(0);
}

echo $this->reply_form(-1, $task_id);
exit(0);

