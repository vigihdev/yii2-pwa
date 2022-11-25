<?php

namespace app\models\test;

use Yii;

class TestModel extends \yii\base\Model
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

    public function rules()
    {
        return [
            [['email','nama_depan','address','no_hp','alamat','ulangi_password'],'safe'],
            [['username','email'],'required'],
        ];
    }
}
