<?php


namespace app\controllers;

use Yii;
use yii\helpers\ArrayHelper;
use yii\helpers\Json;

class TestController extends \yii\web\Controller
{
    public $layout = 'main-blank';

    public function actionIndex()
    {      
        // $model = new Dancok();
        return $this->render('index');
    }

    public function actionApi()
    {      
        return $this->render('api');
    }

    public function actionDeeplink()
    {      
        return $this->render('deeplink');
    }

    public function actionBootstrap()
    {      
        return $this->render('bootstrap');
    }
}

