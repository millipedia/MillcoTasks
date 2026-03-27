<?php

namespace ProcessWire;

/**
 * Render replies (comments) for a task.
 */

/** @var MillcoTasks $this */

$task_id = (int) $event->arguments('task_id');

if (!$task_id) {
	echo 'missing task id';
	exit(0);
}

if (isset($_GET['toggle']) && $_GET['toggle'] === 'closed') {
	// return all the reples. Ths func includes an out of bounds swap for the comments button.
	echo $this->replies_markup($task_id);
} else {
	// return just the commentbutton and an empty replies slot out of bounds.
	$reply_count = 0;
	if (isset($_GET['count'])) {
		$reply_count = (int) $_GET['count'];
	}

	echo $this->task_comments_button($task_id, $reply_count, $state = 'closed');
	echo '<div id="mt_replies_for_' . $task_id . '" class="mt_replies_slot" hx-swap="outerHTML" hx-swap-oob="true"></div>';
}

exit(0);
