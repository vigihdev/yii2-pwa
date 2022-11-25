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
use yii\web\HttpException;
use yii\base\ErrorException;

class ErrorController extends Controller
{
    public $layout = 'main-blank';
    
    public function actionIndex()
    {
        $handler = Yii::$app->getErrorHandler();

        if(is_object($handler)){
            $message = $handler->exception->getMessage();
            if($handler->exception instanceof HttpException){
                $statusCode = $handler->exception->statusCode;
                if($statusCode === 404){
                    return $this->render('404',['error' => $handler->exception]);
                }
            }
           
            if(is_object($handler->exception)){
                $exception = $handler->exception;
                return $this->render('500',['error' => $exception]);
            }    
        }
        return $this->render('index');
    }

}
