<?php

class LoginController extends \BaseController {

	public function store()
	{
		$username = Input::get('username');
		$password = Input::get('password');
		
		switch ($username)
		{
		    case 'collector':
		        return json_encode(array(
		            'id' => 1,
		            'username' => $username,
		            'name' => 'collector',
		            'role' => 'collector'
		        ));
		    case 'supplier':
		        return json_encode(array(
		            'id' => 2,
		            'username' => $username,
		            'name' => 'supplier',
		            'role' => 'supplier'
		        ));
		    case 'donator':
		        return json_encode(array(
		            'id' => 3,
		            'username' => $username,
		            'name' => 'donator',
		            'role' => 'donator'
		        ));
		    default:
		        App::abort(403, 'Authentication failed');
		}
	}
}