<?php

use yii\bootstrap5\Html;
use app\assets\AppAsset;
use yii\bootstrap5\ActiveForm;

$this->title = 'Test Model';

?>

<section class="section p-3">
    <?= $this->title ?>
    <div class="row">
        <div class="col-md-6 mb-3">
            <div class="card card-dp2">
                <div class="card-body">
                    <?php $form = ActiveForm::begin() ?>
                    <?= $form->field($model, 'username')->textfieldFloating() ?>
                    <?= $form->field($model, 'address')->floatingOutline() ?>
                    <?= $form->field($model, 'address')->prepend(['icon' => 'home']) ?>
                    <?= $form->field($model, 'email')->email() ?>
                    <?= $form->field($model, 'nama_depan')->user() ?>
                    <?= $form->field($model, 'password')->password(['icon' => 'visibility']) ?>
                    <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card card-dp2">
                <div class="card-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>
        </div>
    </div>

</section>