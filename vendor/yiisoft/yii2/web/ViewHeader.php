<?php
/**
 * @link https://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license https://www.yiiframework.com/license/
 */

namespace yii\web;

use Yii;

class ViewHeader extends \yii\base\BaseObject
{
    public static function addTagMeta()
    {
        $result = [
            Yii::$app->view->registerMetaTag(['charset' => Yii::$app->charset], 'charset'),
            Yii::$app->view->registerMetaTag(['name' => 'viewport', 'content' => 'width=device-width, initial-scale=1, shrink-to-fit=no']),
            Yii::$app->view->registerMetaTag(['name' => 'description', 'content' => Yii::$app->params['meta_description'] ?? '']),
            Yii::$app->view->registerMetaTag(['name' => 'keywords', 'content' => Yii::$app->params['meta_keywords'] ?? '']),
            Yii::$app->view->registerLinkTag(['rel' => 'icon', 'type' => 'image/x-icon', 'href' => '/favicon.ico'])
        ];
        return implode("\n",$result) . "\n";
    }

    public static function addTagMetaPwa()
    {
        $result = [];
        return implode("\n",$result) . "\n";
    }

    public static function addStyleMaterialIcons()
    {
        $result = [
            "<style type=\"text/css\">@font-face{font-family:'Material Icons';font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/materialicons/v127/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2')}@font-face{font-family:'Material Icons Outlined';font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/materialiconsoutlined/v102/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcel5euIg.woff2) format('woff2')}.material-icons{font-family:'Material Icons';font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-moz-font-feature-settings:'liga';-moz-osx-font-smoothing:grayscale}.material-icons-outlined{font-family:'Material Icons Outlined';font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-moz-font-feature-settings:'liga';-moz-osx-font-smoothing:grayscale}</style>",
        ];
        return implode("\n",$result) . "\n";
    }
}
