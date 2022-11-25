<?php


namespace app\controllers;

use Yii;
use yii\helpers\ArrayHelper;
use yii\helpers\Json;
use app\models\test\TestModel;
use app\models\test\TestBootstrap;
use yii\base\Model;

class TestController extends \yii\web\Controller
{
    public $layout = 'main';

    public function actionIndex()
    {      
        // $model = new Dancok();
        return $this->render('index');
    }

    public function actionModel()
    {      
        $model = new TestModel();
        $model->username = 'hhs';
        if($model->load(Yii::$app->request->post())){
            $model->addError('email','Test Error');
            if($model->validate()){
            }
        }
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
        $model = new TestBootstrap();
        return $this->render('bootstrap',['model' => $model]);
    }
}

