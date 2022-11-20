<?php

use yii\bootstrap5\Html;

$this->title = 'Test Bootstrap';

?>

<section class="bootstrap">
    <?= Html::tag('div', 
        Html::tag('i','notifications',['class' => 'material-icons']). 'alert ',
        ['class' => 'alert alert-danger']) ?>

    <?= Html::tag('div', 
        Html::tag('i','notifications',['class' => 'material-icons']). 'alert ',
        ['class' => 'alert alert-success']) ?>
</section>