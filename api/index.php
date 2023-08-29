<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require('connect.php');
function sanitizeInput($input)
{
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $query = "SELECT * FROM pokemon";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $query .= " WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $stmt = $db->prepare($query);
            $stmt->execute();
            $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($listings);
        break;
    case "POST":
        switch ($_POST['action']) {
            case "create":
                $name = sanitizeInput($_POST['name']);
                $type = sanitizeInput($_POST['type']);
                $rarity = sanitizeInput($_POST['rarity']);
                $price = sanitizeInput($_POST['price']);
                $stock = sanitizeInput($_POST['stock']);
                $allowedMimeTypes = array('image/jpeg', 'image/png', 'image/gif');
                $image = $_FILES['image']['name'];
                $image_temp = $_FILES['image']['tmp_name'];
                $imageType = $_FILES['image']['type'];
                $destination = $_SERVER['DOCUMENT_ROOT'] . '/images' . "/" . $image;
                $query = "INSERT INTO pokemon(id, name, type, rarity, price, stock, image, created_at, updated_at) VALUES(null, :name, :type, :rarity, :price, :stock, :image, :created_at, :updated_at)";
                $stmt = $db->prepare($query);
                $created_at = date('Y-m-d');
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':type', $type);
                $stmt->bindParam(':rarity', $rarity);
                $stmt->bindParam(':price', $price);
                $stmt->bindParam(':stock', $stock);
                $stmt->bindParam(':image', $image);
                $stmt->bindParam(':created_at', $created_at);
                $stmt->bindParam(':updated_at', $created_at);
                if (in_array($imageType, $allowedMimeTypes)) {
                    if ($stmt->execute()) {
                        move_uploaded_file($image_temp, $destination);
                        $response = ['status' => 1, 'message' => 'listing created'];
                    } else {
                        $response = ['status' => 0, 'message' => 'failed to create listing'];
                    }
                    echo json_encode($response);
                } else {
                    echo "Image type is not supported. Supported types: JPEG, PNG, GIF";
                }
                break;
            case "login":
                $username = $_POST['username'];
                $password = $_POST['password'];
                if ($username != "" and $password != "") {
                    $query = "SELECT * FROM admin WHERE username =:username AND password =:password";
                    $stmt = $db->prepare($query);
                    $stmt->bindParam(":username", $username);
                    $stmt->bindParam(":password", $password);
                    $stmt->execute();
                    if ($stmt->rowCount() != 0) {
                        $response = "Logged in successfully! Redirecting now...";
                    } else {
                        $response = "Invalid Credentials!";
                    }
                    echo json_encode($response);
                }
                break;
        }
        break;
    case "PUT":
        $listing = json_decode(file_get_contents('php://input'));
        $query = "UPDATE pokemon SET name =:name, type =:type, rarity =:rarity, price =:price, stock =:stock, updated_at =:updated_at WHERE id =:id";
        $stmt = $db->prepare($query);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $listing->id);
        $stmt->bindParam(':name', $listing->name);
        $stmt->bindParam(':type', $listing->type);
        $stmt->bindParam(':rarity', $listing->rarity);
        $stmt->bindParam(':price', $listing->price);
        $stmt->bindParam(':stock', $listing->stock);
        $stmt->bindParam(':updated_at', $updated_at);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'listing created'];
        } else {
            $response = ['status' => 0, 'message' => 'failed to create listing'];
        }
        echo json_encode($response);
        break;
    case "DELETE":
        $query = "DELETE FROM pokemon WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $path[3]);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'listing deleted'];
        } else {
            $response = ['status' => 0, 'message' => 'failed to delete listing'];
        }
        echo json_encode($response);
        break;
}

?>