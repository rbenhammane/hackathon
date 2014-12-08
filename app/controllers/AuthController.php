<?php

use Illuminate\Auth\GenericUser;

class AuthController extends \BaseController {
    
    public function facebook()
    {
        
        $code = Input::get( 'code' );

        // get auth service
        $facebookService = OAuth::consumer( 'Facebook' );

        if ( ! empty( $code ) )
        {
            $token = $facebookService->requestAccessToken( $code );
            $result = json_decode( $facebookService->request( '/me' ), true );
            
            $user = new GenericUser( [
                'id'       => $result[ 'id' ],
                'username' => $result[ 'email' ]
            ] );
            
            Auth::login( $user );
            return Redirect::to('/');
        }
        else
        {
            $url = $facebookService->getAuthorizationUri();
            header( 'Location: ' . $url );
        } 
    }

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function _index()
	{
		   // get data from input
        $code = Input::get( 'code' );
    
        // get google service
        $googleService = OAuth::consumer( 'Google' );
    
        // check if code is valid
    
        // if code is provided get user data and sign in
        if ( !empty( $code ) ) {
    
            // This was a callback request from google, get the token
            $token = $googleService->requestAccessToken( $code );
    
            // Send a request with it
            $result = json_decode( $googleService->request( 'https://www.googleapis.com/oauth2/v1/userinfo' ), true );
    
            $message = 'Your unique Google user id is: ' . $result['id'] . ' and your name is ' . $result['name'];
            echo $message. "<br/>";
    
            //Var_dump
            //display whole array().
            dd($result);
    
        }
        // if not ask for permission first
        else {
            // get googleService authorization
            $url = $googleService->getAuthorizationUri();
    
            // return to google login url
            return Redirect::to( (string)$url );
        }
	}

}