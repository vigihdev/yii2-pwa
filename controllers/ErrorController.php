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
        $handler = Yii::$app->getErrorHandler();
        if(is_object($handler)){
            $message = $handler->exception->getMessage();
        }
        return $this->render('index');
    }

}
