<?php

/** @var yii\web\View $this */
/** @var string $content */

use yii\bootstrap5\Html;
use yii\helpers\Inflector;

$themeComponents = function(string $icon,string $action = 'home'):string{
    return implode("\n",[
        Html::beginTag('li',['class' => 'nav-item']),
            Html::tag('i',$icon,['class' => 'material-icons']),
            Html::a(Inflector::titleize($action),'/test-bootstrap/' . ($action === 'home' ? null : $action),['class' => 'nav-link ripple-effect']),
        Html::endTag('li')
    ]) . "\n";
};
?>

<?= Html::beginTag('ul', ['class' => 'nav flex-column sidebar-nav','id' => 'sidebar-nav']) ?>
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
            'class' => 'collapse show',
            'id' => 'theme-components',
            'data-parent' => '.nav-item',
            'aria-labelledby' => 'sidebar-nav'
        ]) ?>
        <?= $themeComponents('home') ?>
        <?= $themeComponents('domain','card') ?>
        <?= $themeComponents('timelapse','typography') ?>
        <?= $themeComponents('timer_off','checkbox') ?>
        <?= $themeComponents('upload','button') ?>
        <?= $themeComponents('work','alert') ?>
        <?= $themeComponents('usb','badge') ?>
        <?= $themeComponents('usb','lists') ?>
        <?= $themeComponents('timer','text-fields') ?>
        <?= $themeComponents('work','material-icons') ?>
    <?= Html::endTag('ul') ?>
<?= Html::endTag('ul') ?>