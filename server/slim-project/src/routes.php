<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

// for CORS
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});


// users
$app->post('/users', function (Request $request, Response $response, array $args) {
    $db = $this->db;
    $parsedBody = $request->getParsedBody();

    $sth = $db->prepare('INSERT INTO users (user_name, password_hash) VALUES (:user_name, :password_hash)');
    $sth->bindParam(':user_name', $parsedBody['user_name']);
    $sth->bindParam(':password_hash', password_hash($parsedBody['passowrd'], PASSWORD_DEFAULT));
    $result = $sth->execute();
    if ($result) {
        return $response->withJson(
            [
                'user_id' => $db->lastInsertId()
            ],
            200
        );
    } else {
        return $response->withStatus(500);
    }
});
