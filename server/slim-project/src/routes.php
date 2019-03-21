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
    $sth->bindParam(':password_hash', password_hash($parsedBody['password'], PASSWORD_DEFAULT));
    $result = $sth->execute();
    if ($result) {
        return $response->withJson(
            [
                'user_id' => $db->lastInsertId(),
                'user_name' => $parsedBody['user_name']
            ],
            200
        );
    } else {
        return $response->withStatus(500);
    }
});

// login
$app->post('/login', function (Request $request, Response $response, array $args) {

    $db = $this->db;
    $parsedBody = $request->getParsedBody();
    
    $sth = $db->prepare('SELECT id, password_hash FROM users WHERE user_name=:user_name');
    $sth->bindParam(':user_name', $parsedBody['user_name']);
    $sth->execute();

    $row = $sth->fetch();
    if ($row) {
        if (!password_verify($parsedBody['password'], $row['password_hash'])){
            return $response->withStatus(401);
        }
        $EXP = 86400;
        $currentTime = time();
        $claims = [
            'nbf' => $currentTime,
            'exp' => $currentTime + $EXP,
            'user_id' => (int)$row['id'],
            'user_name' => $parsedBody['user_name']
        ];
        $private_key = file_get_contents('../credentials/jwt.key');
        $token = JWT::encode($claims, $private_key, 'RS256');
        return $response->withJson(
            [
                'token' => [
                    'token_type' => 'bearer',
                    'access_token' => $token,
                    'expires_in' => $EXP,
                ],
                'user' => [
                    'user_id' => (int)$parsedBody['user_id'],
                    'user_name' => $parsedBody['user_name']
                ]
            ],
            200
        );
    } else {
        return $response->withStatus(401);
    }
});

$auth_middleware = function ($req, $res, $next) {
    if (!$req->hasHeader('Authorization')) {
        return $res->withStatus(401);
    }
    $header = $req->getHeader('Authorization');
    if (!preg_match('/^Bearer (.*)$/', $header[0], $matches)) {
        return $res->withStatus(401);
    }
    $token = $matches[1];
    $public_key = file_get_contents('../credentials/jwt.key.pub');

    // デコード
    try {
        $claims = JWT::decode($token, $public_key, array('RS256'));
    } catch (Exception $e) {
        return $res->withStatus(401);
    }
    $req = $req->withAttribute('user_id', $claims->user_id);
    $req = $req->withAttribute('user_name', $claims->user_name);
    return $next($req, $res);
};

// 認証が必要なAPIグループ
$app->group('', function ($app) {
    // tokenのverifyを行う
    $app->get('/login', function (Request $request, Response $response, array $args) {
        $user_id = (int)$request->getAttribute('user_id');
        $user_name = $request->getAttribute('user_name');
        return $response->withJson(
            [
                'user_id' => $user_id,
                'user_name' => $user_name
            ],
            200
        );
    });
})->add($auth_middleware);