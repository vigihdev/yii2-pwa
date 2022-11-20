<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\models\auth;

use Yii;
use app\models\users\User;

class Login extends User
{

    public $users;
    
    public $password;

    public $rememberMe;

    private $_user;

}
