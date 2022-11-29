<?php

namespace app\models\test\bootstrap;

use Yii;
use yii\bootstrap5\Html;

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

    public $username;
    public $email;
    public $nama_depan;
    public $address;
    public $password;
    public $ulangi_password;
    public $alamat;
    public $no_hp;

    public $nama;
    public $family;
    public $sava;
    public $ririn;
    public $rama;
    public $dinda;
    public $alib;
    public $putra;

    public $primary_1;
    public $danger_1;
    public $success_1;
    public $info_1;
    public $indigo_1;
    public $warning_1;
    public $light_1;
    public $dark_1;
    public $secondary_1;

    public $tos;

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

    public function lorem20():string
    {
        return 'Lorem ipsum dolor';
    }

    public function listLorem20():array
    {
        $list = [
            'Lorem ipsum dolor sit amet'
        ];
        return $list;
    }

    public function starMaterialIcons5():string
    {
        $list = [];
        for ($i=0; $i < 5; $i++) { 
            $list[] = Html::tag('i','star',['class' => 'material-icons']);
        }
        return implode("\n",$list) . "\n";
    }

    public function getListLorem20(int $key):string
    {
        return isset($this->listLorem20()[$key]) ? $this->listLorem20()[$key] : '';
    }

    public function listMaterialIcons20():array
    {
        $list = [
            'mood',
            'notifications',
            'person_add',
            'share',
            'drive_eta',
                'star',
                'add_shopping_cart',
                'check',
                'highlight_off',
                'warning',
                'info',
                'add',
                'local_phone',
            'thumb_down_off_alt',
            'thumb_up',
            'thumb_up_alt',
            'thumb_up_off_alt',
            'thumbs_up_down',
            'thunderstorm',
            'tiktok',
            'time_to_leave',
            'timelapse',
            'timeline',
            'timer',
            'timer_10',
            'timer_10_select',
            'timer_3',
            'timer_3_select',
            'timer_off',
            'tips_and_updates',
            'tire_repair',
            'title',
            'toc',
            'today',
            'toggle_off',
            'toggle_on',
            'token',
            'toll',
            'tonality',
        ];
        return $list;
    }

    public function getListMaterialIcons20(int $key):string
    {
        return isset($this->listMaterialIcons20()[$key]) ? $this->listMaterialIcons20()[$key] : '';
    }
}
