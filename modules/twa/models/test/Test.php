<?php

namespace app\modules\twa\models\test;

use Yii;

class Test extends \yii\base\Model
{
    public $name;
    public $create_at;
    public $user_id;

    public function rules()
    {
        return [
            [['create_at'], 'safe'],
            [['name','user_id'], 'required'],
            [['user_id'], 'integer'],
        ];
    }
}
