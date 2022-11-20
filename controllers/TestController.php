<?php


namespace app\controllers;

use Yii;
use yii\helpers\ArrayHelper;
use yii\helpers\Json;
use app\models\test\TestModel;
use yii\base\Model;

class TestController extends \yii\web\Controller
{
    public $layout = 'main-blank';

    public function actionIndex()
    {      
        // $model = new Dancok();
        return $this->render('index');
    }

    public function actionModel()
    {      
        $model = new TestModel();
        $model->username = 'hhs';
        $model->validate();
        $model->addError('email','Test Error');
        return $this->render('model',['model' => $model]);
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

