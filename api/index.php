<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require('connect.php');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $query = "SELECT * FROM pokemon";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($listings);
        break;
    case "POST":
        $listing = json_decode(file_get_contents('php://input'));
        $query = "INSERT INTO pokemon(id, name, type, rarity, price, stock, image, created_at, updated_at) VALUES(null, :name, :type, :rarity, :price, :stock, :image, :created_at, :updated_at)";
        $stmt = $db->prepare($query);

        $created_at = date('Y-m-d');
        $stmt->bindParam(':name', $listing->name);
        $stmt->bindParam(':type', $listing->type);
        $stmt->bindParam(':rarity', $listing->rarity);
        $stmt->bindParam(':price', $listing->price);
        $stmt->bindParam(':stock', $listing->stock);
        $stmt->bindParam(':image', $listing->image);
        $stmt->bindParam(':created_at', $created_at);
        $stmt->bindParam(':updated_at', $created_at);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'listing created'];
        } else {
            $response = ['status' => 0, 'message' => 'failed to create listing'];
        }
        echo json_encode($response);
        break;
}

?>