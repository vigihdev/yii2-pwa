<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\uiSection\LoginSection
 */

use yii\helpers\Inflector;
use app\models\test\bootstrap\uiSection\LoginSection;
use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="section">
    <div class="row mb-3">
        <div class="col-md-6">
            <div class="card card-dark-tint">
                <div class="card-body">
                    <?php $form = ActiveForm::begin() ?>
                        <?= $form->field($model, 'username')->user()->addClassOptions('input-group-outline-dark-tint') ?>
                        <?= $form->field($model, 'password')->password()->addClassOptions('input-group-outline-dark-tint') ?>

                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <?= $form->field($model, 'remember_me')->checkboxOutline([
                                'theme' => 'info',
                                'labelCheckbox' => 'prepend'
                            ]) ?>

                            <?= Html::a('Lupa Password','',['class' => 'text-right text-light']) ?>
                        </div>

                        <div class="d-flex justify-content-end">
                            <?= Html::submitButton('Login',['class' => 'btn btn-outline-info btn-block']) ?>
                        </div>
                    <?php ActiveForm::end(); ?>

                    <div class="divider divider-dark-tint">
                        <div class="d-flex justify-content-center center-xy"> - OR - </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card card-dark-tint">
                <div class="card-body">
                    <?php $form = ActiveForm::begin() ?>
                        <?= $form->field($model, 'email')->email()->addClassOptions('input-group-outline-dark-tint') ?>
                        <div class="d-flex justify-content-end">
                            <?= Html::submitButton('Submit',['class' => 'btn btn-outline-info btn-block']) ?>
                        </div>
                    <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->
</section>