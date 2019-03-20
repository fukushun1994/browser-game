<?php

use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;

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
})->setName('registerUser');

// login
$app->post('/login', function (Request $request, Response $response, array $args) {

    $db = $this->db;
    $parsedBody = $request->getParsedBody();
    
    $sth = $db->prepare('SELECT * FROM users WHERE user_name=:user_name AND password_hash=:password_hash');
    $sth->bindParam(':user_name', $parsedBody['user_name']);
    $sth->bindParam(':password_hash', password_hash($parsedBody['passowrd'], PASSWORD_DEFAULT));
    $row = $sth->execute();
    if ($row) {
        $EXP = 86400;
        $currentTime = time();
        $claims = [
            'nbf' => $currentTime,
            'exp' => $currentTime + $EXP,
            'user_id' => (int)$row['user_id'],
        ];
        $private_key = file_get_contents('../credentials/jwt.key');
        $token = JWT::encode($claims, $private_key, 'RS256');
        return $response->withJson(
            [
                'token_type' => 'bearer',
                'access_token' => $token,
                'expires_in' => $EXP,
            ],
            200
        );
    }
})->setName('login');

$auth_middleware = function ($req, $res, $next) {
    if (!$req->hasHeader('Authorization')) {
        return $response->withStatus(401);
    }
    $header = $req->getHeader('Authorization');
    if (!preg_match('/^Bearer (.*)$/', $header, $matches)) {
        return $response->withStatus(401);
    }
    $token = $matches[0];
    $public_key = file_get_contents('../credentials/jwt.key.pub');

    // デコード
    try {
        $claims = JWT::decode($token, $public_key, array('RS256'));
    } catch (Exception $e) {
        return $response->withStatus(401);
    }
    $user_id = $claims['user_id'];
    $req = $req->withAttribute('user_id', $user_id);
    return $next($req, $res);
};

// 認証が必要なAPIグループ
$app->group('', function ($app) {

})->add($auth_middleware);