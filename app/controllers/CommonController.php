<?php

class CommonController extends \BaseController {

	public function suppliers()
	{
        // $suppliers = Supplier::all();
        $suppliers = DB::table('suppliers')->limit( Input::get('limit') )->get();
        
	    return json_encode($suppliers);
	}

	public function donators()
	{
        $donators = DB::table('donators')->orderBy('stars', 'desc')->get();
        
	    return json_encode($donators);
	}

	public function store()
	{
		//33.997607, -118.167966
	}

	public function show($id)
	{
		//
	}

	public function edit($id)
	{
		//
	}

	public function update($id)
	{
		//
	}

	public function destroy($id)
	{
		//
	}

}