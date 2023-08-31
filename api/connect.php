<?php
define('DB_DSN', 'mysql:host=localhost;dbname=536270;charset=utf8');
define('DB_USER', '536270');
define('DB_PASS', 'FZ3LEUxu8sz2_tV');

//  PDO is PHP Data Objects
//  mysqli <-- BAD. 
//  PDO <-- GOOD.
try {
    // Try creating new PDO connection to MySQL.
    $db = new PDO(DB_DSN, DB_USER, DB_PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //,array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
} catch (PDOException $e) {
    print "Error: " . $e->getMessage();
    die(); // Force execution to stop on errors.
    // When deploying to production you should handle this
    // situation more gracefully. ¯\_(ツ)_/¯
}
?>