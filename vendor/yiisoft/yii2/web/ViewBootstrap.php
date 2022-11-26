<?php

namespace yii\web;

use Yii;

trait ViewBootstrap
{

    public function bodyClass()
    {
       $actionId = Yii::$app->controller->action->id;
       return Yii::$app->controller->id . ( $actionId === 'index' || empty($actionId) ? null : '-' . $actionId ); 
    }

    public function actionId()
    {
        return Yii::$app->controller->action->id;
    }
}
 