<?php
/** 
 * Completion Referensi
 * @path /Users/thrubus/Sites/dev/pwa/views/test/bootstrap/snippet.md
 */

/** @var yii\web\View $this */
/** @var string $content */

use yii\bootstrap5\Html;
use yii\helpers\Inflector;
use yii\helpers\Url;

$themeComponents = function(string $icon,string $action = 'home'):string{
    return implode("\n",[
        Html::beginTag('li',['class' => 'nav-item nav-item-collapse']),
            Html::beginTag('a',['class' => 'nav-link ripple-effect','href' => '/test-bootstrap' . ($action === 'home' ? null : '/' . $action) ]),
                Html::tag('span',null,['class' => 'spacer-nav']),
                ( empty($icon) ? null : Html::tag('i',$icon,['class' => 'material-icons'])),
                Html::tag('span',Inflector::camel2words($action),['class' => 'nav-text']),
            Html::endTag('a'),
        Html::endTag('li')
    ]) . "\n";
};
?>

<!-- sidebar-brand -->
<?= Html::beginTag('div',['class' => 'sidebar-brand']) ?>
    <?= Html::beginTag('a',['class' => 'link-brand','href' => Url::to(['/test-bootstrap'])]) ?>
    <div class="brand">
        <?= Html::img(Yii::$app->imgAssets . 'logo.png',['class' => 'img-brand img-fluid','alt' => 'Logo']) ?>
    </div>
    <div class="brand-text">Dev </div>
    <?= Html::endTag('a') ?>
<?= Html::endTag('div') ?>
<!-- /sidebar-brand -->

<!-- sidebar-search -->
<div class="sidebar-search">
    <div class="form-group textfield textfield-floating-label">
        <input id="search" class="form-control" type="text" placeholder="Search"><span
            class="textfield-focused"></span>
        <div class="search-results"></div>
    </div>
    <button class="btn btn-sidebar-search">
        <i class="material-icons">search</i>
    </button>
</div>
<!-- /sidebar-search -->

<!-- /Menu -->
<?= Html::beginTag('ul', ['class' => 'nav flex-column sidebar-nav','id' => 'sidebar-nav']) ?>

    <li class="nav-item">
        <?= Html::beginTag('a',[
                'class' => 'nav-link',
                'data-target' => '#style',
                'role' => 'button',
                'aria-expanded' => 'false',
                'aria-controls' => 'style',
                'data-toggle' => 'collapse'
            ]) ?>
            <?= Html::tag('i','power_settings_new',['class' => 'material-icons']) ?>
            <?= Html::tag('span','Style') ?>
        <?= Html::endTag('a') ?>

        <?= Html::beginTag('ul', [
                'class' => 'collapse',
                'id' => 'style',
                'aria-labelledby' => 'sidebar-nav'
            ]) ?>
            <?= $themeComponents('work','shadow') ?>
            <?= $themeComponents('timelapse','typography') ?>
            <?= $themeComponents('timelapse','color') ?>
        <?= Html::endTag('ul') ?>
    </li>
    
    <li class="nav-item">
        <?= Html::beginTag('a',[
                'class' => 'nav-link',
                'data-target' => '#theme-components',
                'role' => 'button',
                'aria-expanded' => 'false',
                'aria-controls' => 'theme-components',
                'data-toggle' => 'collapse'
            ]) ?>
            <?= Html::tag('i','settings',['class' => 'material-icons']) ?>
            <?= Html::tag('span','Theme Components') ?>
        <?= Html::endTag('a') ?>

        <?= Html::beginTag('ul', [
                'class' => 'collapse',
                'id' => 'theme-components',
                'aria-labelledby' => 'sidebar-nav'
            ]) ?>
            <?= $themeComponents('home') ?>
            <?= $themeComponents('domain','card') ?>
            
            <?= $themeComponents('timer_off','checkbox') ?>
            <?= $themeComponents('upload','button') ?>
            <?= $themeComponents('timer','button-group') ?>
            <?= $themeComponents('timer','floating-action-button') ?>
            <?= $themeComponents('usb','pagination') ?>
            <?= $themeComponents('usb','badge') ?>
            <?= $themeComponents('usb','chip') ?>
            <?= $themeComponents('usb','lists') ?>
            <?= $themeComponents('usb','modal') ?>
            <?= $themeComponents('usb','carousel') ?>

            <?= $themeComponents('work','alert') ?>
            <?= $themeComponents('timer','collapse') ?>

            <?= $themeComponents('work','navs') ?>
            <?= $themeComponents('timer','navbar') ?>

            <?= $themeComponents('usb','form') ?>
            <?= $themeComponents('usb','form-group') ?>
            <?= $themeComponents('timer','text-fields') ?>

            <?= $themeComponents('star','spinner') ?>
            <?= $themeComponents('work','material-icons') ?>
        <?= Html::endTag('ul') ?>
    </li>

    <li class="nav-item">
        <?= Html::beginTag('a',[
                'class' => 'nav-link',
                'data-target' => '#third-party-components',
                'role' => 'button',
                'aria-expanded' => 'false',
                'aria-controls' => 'third-party-components',
                'data-toggle' => 'collapse'
            ]) ?>
            <?= Html::tag('i','settings_power',['class' => 'material-icons']) ?>
            <?= Html::tag('span','Third Party Components') ?>
        <?= Html::endTag('a') ?>        
        <?php // [ 'carousel', 'datetimepicker', 'rating', 'data-table', 'range-slider', 'select2' ] ?>

        <?= Html::beginTag('ul', [
                'class' => 'collapse',
                'id' => 'third-party-components',
                'data-parent' => '.nav-item',
                'aria-labelledby' => 'sidebar-nav'
            ]) ?>
            <?= $themeComponents('star','rating') ?>
        <?= Html::endTag('ul') ?>
    </li>

    <li class="nav-item">
        <?= Html::beginTag('a',[
                'class' => 'nav-link',
                'data-target' => '#ui-section',
                'role' => 'button',
                'aria-expanded' => 'false',
                'aria-controls' => 'ui-section',
                'data-toggle' => 'collapse'
            ]) ?>
            <?= Html::tag('i','settings_power',['class' => 'material-icons']) ?>
            <?= Html::tag('span','Ui Section') ?>
        <?= Html::endTag('a') ?>        
        <?php // [ 'carousel', 'datetimepicker', 'rating', 'data-table', 'range-slider', 'select2' ] ?>

        <?= Html::beginTag('ul', [
                'class' => 'collapse',
                'id' => 'ui-section',
                'data-parent' => '.nav-item',
                'aria-labelledby' => 'sidebar-nav'
            ]) ?>
            <?= $themeComponents('star','footer-section') ?>
            <?= $themeComponents('star','login-section') ?>
            <?= $themeComponents('','request-password-section') ?>
        <?= Html::endTag('ul') ?>
    </li>
<?= Html::endTag('ul') ?>
<!-- /End Menu -->