<?php

use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;

$this->title = 'Login';


?>

<section class="section section-<?= $this->bodyClass() ?> p-2">
    <div class="card card-dp2">
        <div class="card-headers">

            <div class="media-header text-center"><?= Html::img(Yii::$app->imgAssets . 'logo.png',['class' => 'img-center','alt' => 'logo']) ?> </div>
            <div class="text-center bold"> Login To App </div>
        </div>
        <div class="card-body">
            <?php $form = ActiveForm::begin() ?>
                <?= $form->field($model, 'users')->user() ?>
                <?= $form->field($model, 'password')->password() ?>
                <?= Html::submitButton('Submit',['class' => 'btn btn-outline-primary btn-block']) ?>
            <?php ActiveForm::end(); ?>
        </div>
    </div>
</section>