<?php

/** 
 * Reflection Reletion
 * 
 * @return $session = yii\web\Session 
 */

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use yii\web\Session;

class SiteController extends Controller
{


    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        Yii::$app->request->getBaseUrl();
       echo "<pre>";
        var_dump($this->session);
        var_dump($this->request);
        var_dump($this->response);
       echo "</pre>";
       die();
        return $this->render('index');
    }

}
