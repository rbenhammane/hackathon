<?php
return array( 

    /*
    |--------------------------------------------------------------------------
    | oAuth Config
    |--------------------------------------------------------------------------
    */

    /**
     * Storage
     */
    'storage' => 'Session', 

    /**
     * Consumers
     */
    'consumers' => array(

        /**
         * Facebook
         */
        'Facebook' => array(
            'client_id'     => '750898058313107',
            'client_secret' => 'acf1c3b7ccc04c492d29d966aee16663',
            'redirect_uri'  => '/oauth2callback/facebook',
            'scope'         => array('email'),
        ),      

        'Google' => array(
            'client_id'     => '1005351324233-cavcvbnpas9o5t33o3lentuuqhta0pp8.apps.googleusercontent.com',
            'client_secret' => 'IS7UlAY9xtUS1uCv57Dyi-uI',
            'scope'         => array('userinfo_email', 'userinfo_profile'),
        ),
    )

);