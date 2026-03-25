<?php

namespace ProcessWire;

/**
 * Update an existing reply (comment).
 */

$reply_id = (int) $event->arguments('reply_id');

if(!$reply_id){
	echo 'missing reply id';
	exit(0);
}

$reply = $this->reply_from_id($reply_id);
if(!$reply){
	echo 'reply not found';
	exit(0);
}

$reply_content = (string) wire('input')->post('reply_content');
$reply_content = trim($reply_content);

if($reply_content === ''){
	// Treat empty as "no change" rather than deleting implicitly.
	echo $this->replies_markup((int)$reply['task_id']);
	exit(0);
}

$this->reply_update($reply_id, $reply_content);

echo $this->replies_markup((int)$reply['task_id']);
exit(0);

