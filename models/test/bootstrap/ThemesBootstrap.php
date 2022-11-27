<?php

namespace app\models\test\bootstrap;

use Yii;

class ThemesBootstrap extends \yii\base\Model
{

    public $primary = 'primary';
    public $danger = 'danger';
    public $success = 'success';
    public $info = 'info';
    public $indigo = 'indigo';
    public $warning = 'warning';
    public $light = 'light';
    public $dark = 'dark';
    public $secondary = 'secondary';

    public function listActiveTheme():array
    {
        return [ 
            'primary', 'danger', 'success', 'info', 
            'indigo', 'warning', 'light', 'dark', 'secondary', 
        ] ;
    }

    public function lorem200():string
    {
        return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,';
    }

    public function lorem100():string
    {
        return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    }

    public function lorem30():string
    {
        return 'Lorem ipsum dolor sit amet, consectetur';
    }
}
