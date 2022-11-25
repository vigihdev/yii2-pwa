<?php

namespace app\models\test;

use Yii;
use yii\helpers\ArrayHelper;

class TestBootstrap extends \yii\base\BaseObject
{
    public $primary = 'primary';
    public $danger = 'danger';
    public $success = 'success';
    public $info = 'info';
    public $indigo = 'indigo';
    public $warning = 'warning';
    public $light = 'light';
    public $dark = 'dark';
    public $seconday = 'secondary';

    public function toArray()
    {
        return ArrayHelper::toArray($this);
    }
}
