<?php

use yii\helpers\Url;
use yii\web\Request;
use yii\db\Expression;
use yii\db\Query;
use yii\web\Response;

$baseUrl = str_replace('/web', '', (new Request)->getBaseUrl());
$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'aliases' => [ '@bower' => '@vendor/bower-asset' ],

    'components' => [
        'request' => [
            'baseUrl' => $baseUrl,
            'cookieValidationKey' => '8Oa_h5xvrTknONX1jHNfUjwieTeUfLcM',
        ],

        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],

        'user' => [
            'identityClass' => 'app\models\users\User',
            'enableAutoLogin' => true,
        ],

        'errorHandler' => [
            'errorAction' => 'site/error',
        ],

        'dateNow' => function(){
            $expression = new Expression('NOW()'); 
            return (new Query())->select($expression)->scalar(); 
        },

        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],

        'db' => $db,
        'urlManager' => [
            'baseUrl' => $baseUrl,
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [ ],
        ],
    ],
    'params' => $params,
];

return $config;
