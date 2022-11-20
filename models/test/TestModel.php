<?php

namespace app\models\test;

use Yii;

class TestModel extends \yii\base\Model
{

    public $username;
    public $email;

    public function rules()
    {
        return [
            [['email'],'safe'],
            [['username'],'required'],
        ];
    }
}
