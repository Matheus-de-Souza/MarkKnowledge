<?php

require(__DIR__ . '/vendor/Slim/Slim/Slim.php');

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/list-files', function () use ($app) {
        
    $it = new RecursiveDirectoryIterator("Knowledge");
    
    $display = array ( 'md' );

    $result = array ();
    $result['files'] = array ();
    $slash = DIRECTORY_SEPARATOR;

    foreach(new RecursiveIteratorIterator($it) as $file)
    {
        //filter files
        if (in_array(strtolower(array_pop(explode('.', $file))), $display)) {
            $dir = explode ($slash, $file);
            $filename = array_pop($dir);
            $dirname = implode($dir, $slash);
            $result['files'][$dirname][] = ''.$filename;
        }
    }

    echo json_encode($result);
});

$app->post('/show-file-contents', function () use ($app) {
        
    $body = $app->request->getBody();
    $body = json_decode($body);

    $filename = $body->file;
    $slash = DIRECTORY_SEPARATOR;
   
    $result = array ();
    $result['file']['contents']         = file_get_contents(__DIR__ . $slash . $filename);
    $result['file']['lastModifiedDate'] = date("Y-m-d H:i:s",filemtime($filename));

    echo json_encode($result);
});

$app->run();

?>