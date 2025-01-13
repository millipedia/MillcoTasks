<?php
namespace ProcessWire;

/**
 * ProcessMillcoTasks
 * 
 * TODO: make this todo app.
 */



class ProcessMillcoTasks extends Process implements Module
{


	public static function getModuleInfo()
	{
		return [
			'title' => 'MillcoTasks',
			'summary' => 'Card board process.',
			'version' => 1,
			'icon' => 'check-square-o',
			'page' => [
				'name' => 'mt-tasks',
				'parent' => 'setup',
				'title' => 'Tasks',
				'permission' => 'millco-tasks-manage',
			],
			'autoload' => false,
			'singular' => false,
			'permanent' => false,
			'requires' => [
				'PHP>=8.0.0',
				'ProcessWire>=3.0.0',
				'MillcoTasks',
			]
		];
	}


	public function init()
	{
		parent::init();
	}
	
	public function ___execute()
	{

		$mt = $this->modules->get('MillcoTasks');
		
		/** @var MillcoTasks $mt*/
		$markup=$mt->board(1);
		
		return $markup;
	}


}
