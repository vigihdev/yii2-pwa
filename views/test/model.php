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
                    <?= Html::submitButton('Submit', ['class' => 'btn btn-info btn-block']) ?>
                    <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card card-dp2">
                <div class="card-body">
                    <?php $form = ActiveForm::begin() ?>
                        <?= $form->field($model, 'family')->checkboxSwitch(['theme' => 'danger','checked' => 'true']) ?>
                        <?= $form->field($model, 'sava')->checkboxSwitch(['theme' => 'indigo','labelSwitch' => 'append']) ?>
                        <?= $form->field($model, 'ririn')->checkboxSwitch(['theme' => 'primary','labelSwitch' => 'append']) ?>
                        <div>
                            <?= $form->field($model, 'rama')->radioCheckbox(['theme' => 'indigo']) ?>
                            <?= $form->field($model, 'putra')->radioCheckbox(['theme' => 'info']) ?>
                        </div>
                        <div class="radioFm">
                            <?= $form->field($model, 'nama')->radioButtonList([
                                'rama' => 'Rama',
                                'dinda' => 'Dinda',
                                'alib' => 'Alib',
                                'ririn' => 'Ririn',
                            ],['theme' => 'indigo']) ?>
                        </div>
                        
                        <div class="CheckboxOutline">
                            <?= $form->field($model, 'dinda')->checkboxOutline(['theme' => 'primary','labelCheckbox' => 'prepend']) ?>
                            <?= $form->field($model, 'alib')->checkboxOutline(['theme' => 'primary','labelCheckbox' => 'prepend']) ?>
                        </div>
                    <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>
    </div>

</section>