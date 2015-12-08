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

$app->post('/show-file-contents', function () use ($app) {
        
    $body = $app->request->getBody();
    $body = json_decode($body);

    $filename = $body->file;
   
    $result = array ();
    $result['file-contents'] = file_get_contents($filename);

    echo json_encode($result);
});

$app->run();

?>