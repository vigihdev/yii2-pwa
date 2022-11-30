<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Checkbox
 */

use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;
use app\models\test\bootstrap\Checkbox;
use yii\helpers\Inflector;

$this->title = 'Test Bootstrap Checkbox';

?>

<section class="section">

    <div class="row mb-3">
        <div class="col-12 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body">
                    <div class="d-block">
                        <?php $form = ActiveForm::begin() ?>
                            <?php foreach ($model->listActiveTheme() as $theme) : ?>
                                <?= $form->field($model, $theme)->checkboxSwitch(['theme' => $theme,'labelSwitch' => 'false']) ?>
                            <?php endforeach; ?>
                        <?php ActiveForm::end(); ?>
                    </div>
                    <div class="d-block">
                        <?php $form = ActiveForm::begin() ?>
                            <?php foreach ($model->listActiveTheme() as $theme) : ?>
                                <?= $form->field($model, $theme . '_1')->radioCheckbox(['theme' => $theme,'labelCheckbox' => 'false']) ?>
                            <?php endforeach; ?>
                        <?php ActiveForm::end(); ?>
                    </div>
                    <div class="d-block">
                        <?php $form = ActiveForm::begin() ?>
                            <?php foreach ($model->listActiveTheme() as $theme) : ?>
                                <?= $form->field($model, $theme . '_2')->checkboxOutline(['theme' => $theme,'labelCheckbox' => 'false']) ?>
                            <?php endforeach; ?>
                        <?php ActiveForm::end(); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->
  
    <div class="row mb-3">
        <div class="col-sm-12 col-lg-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body">
                    <?php $form = ActiveForm::begin() ?>
                        <?= $form->field($model, 'jenis_kelamin')->radioButtonList([
                            '1' => 'Laki Laki',
                            '2' => 'Perempuan',
                            '3' => 'Bencong',
                        ], 
                        [
                            'theme' => 'warning',
                            'radioButtonOptions' => [
                                'class' => 'radio-button-list',
                                'labelOptions' => ['class' => 'text-dark-tint-5']
                            ] 
                        ])->addClassLabel('text-white') ?>

                    <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>       
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-lg-6 mb-3">
            <div class="card card-dp3 card-dark">
                <div class="card-body">
                    <?php $form = ActiveForm::begin() ?>
                    <div class="radioFm">
                        <?= $form->field($model, 'nama')->radioButtonList([
                            'rama' => 'Rama',
                            'dinda' => 'Dinda',
                            'alib' => 'Alib',
                            'ririn' => 'Ririn',
                        ], ['theme' => 'info']) ?>
                    </div>
                    <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>
        <div class="col-lg-6 mb-3">
            <div class="card card-dp3 card-dark">
                <div class="card-body">
                    <?php $form = ActiveForm::begin() ?>
                    <?php foreach ($model->listActiveTheme() as $theme) : ?>
                        <?= $form->field($model, $theme . '_4')->checkboxSwitch(['theme' => $theme]) ?>
                    <?php endforeach; ?>
                    <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-lg-6 mb-3">
            <div class="card card-dp3 card-dark">
                <div class="card-body">
                    <?php $form = ActiveForm::begin() ?>
                    <?php foreach ($model->listActiveTheme() as $theme) : ?>
                        <?= $form->field($model, $theme . '_3')->radioCheckbox(['theme' => $theme])->label(Inflector::titleize($theme)) ?>
                    <?php endforeach; ?>
                    <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->
</section>