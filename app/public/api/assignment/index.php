<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql='SELECT * FROM game';
$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

 if (isset($_GET['Game'])) {
     $sql = 'SELECT rName, rGrade, rSkill, rPosition FROM refereeAssignPosition rap, referee r where rap.refereeId = r.refereeId and rap.gameId = ? ';
     $stmt->execute([       
         $_POST['gameId']
       ]);
     $vars = [ $_GET['Game'] ];
 }

$stmt = $db->prepare($sql);
$stmt->execute($vars);
$assignments = $stmt->fetchAll();


// Step 3: Convert to JSON
$json = json_encode($assignments, JSON_PRETTY_PRINT);


// Step 4: Output
header('Content-Type: application/json');
echo $json;
