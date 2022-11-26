<?php

namespace app\models\test\bootstrap;

use Yii;
use yii\base\Theme;

class Checkbox extends ThemesBootstrap
{
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

    public function rules()
    {
        return [
            [['email','nama_depan','address','no_hp','alamat','ulangi_password'],'safe'],
            [['username','email'],'required'],
        ];
    }
}
