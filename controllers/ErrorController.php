<?php

/** 
 * Reflection Reletion
 * 
 * @return $session = yii\web\Session 
 */

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;

class ErrorController extends Controller
{

    public function actionIndex()
    {
        return $this->render('index');
    }

}
