<?php

namespace ProcessWire;

/**
 * Return a form for editing a reply (comment).
 */

$reply_id = (int) $event->arguments('reply_id');

if(!$reply_id){
	echo 'missing reply id';
	exit(0);
}

echo $this->reply_form($reply_id);
exit(0);

