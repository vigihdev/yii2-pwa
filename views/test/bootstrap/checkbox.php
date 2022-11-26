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

<section class="test-bootstrap-checkbox p-3 bg-dark vh-100">

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
                        <?php foreach($model->listActiveTheme() as $theme ) : ?>
                            <?= $form->field($model, $theme)->checkboxSwitch(['theme' => $theme]) ?>
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
                        <?php foreach($model->listActiveTheme() as $theme ) : ?>
                            <?= $form->field($model, $theme . '_1')->radioCheckbox(['theme' => $theme])->label(Inflector::titleize($theme)) ?>
                        <?php endforeach; ?>
                    <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->
</section>