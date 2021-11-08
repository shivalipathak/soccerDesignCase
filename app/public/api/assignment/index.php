<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql='SELECT * FROM game';
$vars = [];

if (isset($_GET['Game'])) {
    $sql = 'SELECT * FROM game g, referee r, refereeAssignPosition rap 
    where g.refereeId = r.refereeId and r.refereeId = rap.refereeId and g.gameId = ?';
    console.log("join call");
    $stmt->execute([
        $_POST['gameId']
      ]);
    //$vars = [ $_GET['Game'] ];
}



$stmt = $db->prepare($sql);
$stmt->execute($vars);


$stmt = $db->prepare($sql);
$stmt->execute($vars);
$assignments = $stmt->fetchAll();


// Step 3: Convert to JSON
$json = json_encode($assignments, JSON_PRETTY_PRINT);


// Step 4: Output
header('Content-Type: application/json');
echo $json;
