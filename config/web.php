<?php

use yii\web\Request;
use yii\db\Expression;
use yii\db\Query;

$baseUrl = str_replace('/web', '', (new Request)->getBaseUrl());
$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'language' => 'id-ID',
    'sourceLanguage' => 'id-ID',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'aliases' => [ '@bower' => '@vendor/bower-asset' ],
    'modules' => [
        'twa' => [
            'class' => 'app\modules\twa\Module',
        ],                  
    ],
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
            'errorAction' => 'error',
        ],

        'dateNow' => function(){
            $expression = new Expression('NOW()'); 
            return (new Query())->select($expression)->scalar(); 
        },

        'i18n' => [
            'translations' => [
                'app*' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                ],
            ],
        ],// i18n

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
