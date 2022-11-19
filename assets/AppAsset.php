<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */


namespace app\assets;

use Yii;
use yii\web\AssetBundle;
use yii\helpers\FileHelper;
use yii\web\JqueryAsset;

/**
 * Main application asset bundle.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */

class AppAsset extends AssetBundle
{
    public $sourcePath = '@bower/app/dist';

    public function __construct()
    {
        $css = $this->css;
        $js = $this->js;
        $version = isset(Yii::$app->params['assetsVersion']) ? Yii::$app->params['assetsVersion'] : time();
        if (!empty($css)) {
            foreach ($css as $key => $value) {
                $this->css[$key] = $value . '?v=' . $version;
            }
        }
        if (!empty($js)) {
            foreach ($js as $key => $value) {
                $this->js[$key] = $value . '?v=' . $version;
            }
        }        
    }

    public $css = [
        'css/app.css',
    ];

    public $js = [
        'js/app.js',
    ];

    public $depends = [
        JqueryAsset::class,
    ];

}
