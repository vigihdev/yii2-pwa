<?php

/** @var yii\web\View $this */
/** @var string $content */
//['index', 'typography', 'card', 'checkbox', 'button', 'badge', 'alert', 'chip',
// 'material-icons', 'form', 'radio-button', 'text-fields', 'input-group', 'lists', 'shadow', 'color',
// 'accordion', 'dropdown', 'pagination', 'stepper', 'file-input', 'popover', 'tab', 'floating-action-button',
// 'progressbar', 'table', 'breadcrumb', 'select', 'themes-bootstrap', 'sidebar', 'toggle-switch', 'modal',
// 'slider', 'tooltip', 'navbar', 'spinner']



use yii\bootstrap5\Html;
use yii\helpers\Inflector;
use yii\helpers\Url;

$themeComponents = function(string $icon,string $action = 'home'):string{
    return implode("\n",[
        Html::beginTag('li',['class' => 'nav-item']),
            Html::tag('span',null,['class' => 'spacer-nav']),
            Html::tag('i',$icon,['class' => 'material-icons']),
            Html::a(Inflector::titleize($action),'/test-bootstrap/' . ($action === 'home' ? null : $action),['class' => 'nav-link ripple-effect']),
        Html::endTag('li')
    ]) . "\n";
};
?>

<?= Html::beginTag('div',['class' => 'sidebar-brand']) ?>
    <?= Html::beginTag('a',['class' => 'link-brand','href' => Url::to(['/test-bootstrap'])]) ?>
        <div class="brand">
            <?= Html::img(Yii::$app->imgAssets . 'logo.png',['class' => 'img-brand img-fluid','alt' => 'Logo']) ?>
        </div>
        <div class="brand-text">Dev </div>
    <?= Html::endTag('a') ?>
<?= Html::endTag('div') ?>

<!-- /Menu -->
<?= Html::beginTag('ul', ['class' => 'nav flex-column sidebar-nav','id' => 'sidebar-nav']) ?>

    <li class="nav-item">
        <?= Html::a('Style', null, [
            'class' => 'nav-link',
            'data-target' => '#style',
            'role' => 'button',
            'aria-expanded' => 'false',
            'aria-controls' => 'style',
            'data-toggle' => 'collapse'
        ]) ?>
    </li>
    <?= Html::beginTag('ul', [
            'class' => 'collapse',
            'id' => 'style',
            'data-parent' => '.nav-item',
            'aria-labelledby' => 'sidebar-nav'
        ]) ?>
        <?= $themeComponents('work','shadow') ?>
        <?= $themeComponents('timelapse','typography') ?>
        <?= $themeComponents('timelapse','color') ?>
    <?= Html::endTag('ul') ?>
    
    <li class="nav-item">
        <?= Html::a('Theme Components', null, [
            'class' => 'nav-link',
            'data-target' => '#theme-components',
            'role' => 'button',
            'aria-expanded' => 'false',
            'aria-controls' => 'theme-components',
            'data-toggle' => 'collapse'
        ]) ?>
    </li>
    <?= Html::beginTag('ul', [
            'class' => 'collapse',
            'id' => 'theme-components',
            'data-parent' => '.nav-item',
            'aria-labelledby' => 'sidebar-nav'
        ]) ?>
        <?= $themeComponents('home') ?>
        <?= $themeComponents('domain','card') ?>
        
        <?= $themeComponents('timer_off','checkbox') ?>
        <?= $themeComponents('upload','button') ?>
        <?= $themeComponents('work','alert') ?>
        <?= $themeComponents('usb','badge') ?>
        <?= $themeComponents('usb','lists') ?>
        <?= $themeComponents('usb','chip') ?>
        <?= $themeComponents('timer','text-fields') ?>
        <?= $themeComponents('work','material-icons') ?>
    <?= Html::endTag('ul') ?>

    <li class="nav-item">
        <?php // [ 'carousel', 'datetimepicker', 'rating', 'data-table', 'range-slider', 'select2' ] ?>
        <?= Html::a('Third Party Components', null, [
            'class' => 'nav-link',
            'data-target' => '#third-party-components',
            'role' => 'button',
            'aria-expanded' => 'false',
            'aria-controls' => 'third-party-components',
            'data-toggle' => 'collapse'
        ]) ?>
    </li>
    <?= Html::beginTag('ul', [
            'class' => 'collapse',
            'id' => 'third-party-components',
            'data-parent' => '.nav-item',
            'aria-labelledby' => 'sidebar-nav'
        ]) ?>
        <?= $themeComponents('star','rating') ?>
    <?= Html::endTag('ul') ?>
<?= Html::endTag('ul') ?>
<!-- /End Menu -->