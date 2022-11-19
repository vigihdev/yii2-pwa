<?php

namespace app\modules\twa;

/**
 * applink module definition class
 */

use Yii;
use yii\web\ErrorHandler;

class Module extends \yii\base\Module
{
    const EVENT_AFTER_SEND = 'afterSend';
    const EVENT_BEFORE_SEND = 'beforeSend';
    const EVENT_BEFORE_ACTION = 'beforeAction';
    const EVENT_AFTER_ACTION = 'afterAction';

    private $statusNotOK;
    /**
     * {@inheritdoc}
     */
    public $controllerNamespace = 'app\modules\twa\controllers';

    public function init()
    {
        parent::init();
    }
}
