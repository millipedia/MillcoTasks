<?php

namespace ProcessWire;

/**
 * Delete a reply (comment).
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

$this->reply_delete($reply_id);

echo $this->replies_markup((int)$reply['task_id']);
exit(0);

