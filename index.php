<?php

require('./vendor/Slim/Slim/Slim.php');

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/list-files', function () {
        
    $it = new RecursiveDirectoryIterator("Knowledge");
    
    $display = array ( 'md' );

    $result = array ();
    $result['files'] = array ();

    foreach(new RecursiveIteratorIterator($it) as $file)
    {
        //filter files
        if (in_array(strtolower(array_pop(explode('.', $file))), $display)) {
            $result['files'][] = ''.$file;
        }
    }

    echo json_encode($result);
});

$app->run();

?>