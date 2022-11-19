<?php

use yii\bootstrap5\Html;

$this->title = 'Test Bootstrap';

?>

<section class="bootstrap">
    <?= Html::tag('div','alert ',['class' => 'alert alert-danger']) ?>
</section>