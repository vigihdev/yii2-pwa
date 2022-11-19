<?php

namespace app\models\base;

use Yii;
use yii\helpers\ArrayHelper;

class Deeplink extends \yii\base\BaseObject
{
    const PERMISSION_FILECHOOSER = 'filechooser';
    const PERMISSION_CAMERA = 'camera';

    private static $intentBegins = 'intent://member.thrubus.co.id';
	private static $intentEnds = '#Intent;scheme=https;package=id.co.thrubus.member.twa;end';

    public static function device(string $url, string $actionid)
	{
        $url = array_key_exists('query',parse_url($url)) ? $url . '&' : $url . '?';
        return self::$intentBegins . $url . http_build_query(['deeplink' => 'device','actionid' => $actionid]) . self::$intentEnds;
    } 

    public static function auth(string $url, string $actionid):string
	{
        $url = array_key_exists('query',parse_url($url)) ? $url . '&' : $url . '?';
        return self::$intentBegins . $url . http_build_query(['deeplink' => 'auth','actionid' => $actionid]) . self::$intentEnds;
	}

    public static function uploadImage(string $url, string $actionid,string $permission):string
	{
        $url = array_key_exists('query',parse_url($url)) ? $url . '&' : $url . '?';
        return self::$intentBegins . $url . http_build_query(['deeplink' => 'uploadImage','actionid' => $actionid,'permission' => $permission]) . self::$intentEnds;
	}

}
