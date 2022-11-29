<?php
namespace app\controllers;

use Yii;
use yii\helpers\ArrayHelper;
use app\models\auth\Login;
use app\models\auth\RequestPassword;

class AuthController extends \yii\web\Controller
{

    public $layout = 'main-blank';

    public function actionLogin()
    {
        $model = new Login();
        return $this->render('login',['model' => $model]);
    }

    public function actionRequestPassword()
    {
        $model = new RequestPassword();
        return $this->render('request-password',['model' => $model]);
    }

    public function actionKonfirmasiPassword()
    {
        $model = new RequestPassword();
        return $this->render('konfirmasi-password',['model' => $model]);
    }

    public function actionSignup()
    {
        $model = new RequestPassword();
        return $this->render('signup',['model' => $model]);
    }
}      