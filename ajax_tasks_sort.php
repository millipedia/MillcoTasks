<?php

namespace ProcessWire;

/**
 * 
 * 
 */

//Receive the RAW post data.
$content = trim(file_get_contents("php://input"));

$json_data = json_decode($content, true);

//If json_decode failed, the JSON is invalid.
if(! is_array($json_data['sort_order'])) {

	$response='missing sort order';

} else {

	$deck_key=$json_data['deck_id'];

	$so=1;

	foreach($json_data['sort_order'] as $task_id){

		$this->task_update_sort_order($task_id,$so,$deck_key);
		$so++;

	}

	$response='';

}



echo $response;
exit(0);