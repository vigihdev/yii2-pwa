<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\TextFields
 */

use yii\helpers\Inflector;
use app\models\test\bootstrap\TextFields;
use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="p-0 pt-3 section section-<?= $this->bodyClass() ?>">
    <div class="row mb-3 px-sm-3">
        <div class="col-lg-6 mb-3">
            <div class="card evalation2">
                <div class="card-body">
                    <?php $form = ActiveForm::begin() ?>
                        <?= $form->field($model, 'username')->user() ?>
                    <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>
        <div class="col-lg-6 mb-3">
            <div class="card evalation2">
                <div class="card-body">
                    <?php $form = ActiveForm::begin() ?>
                        <?= $form->field($model, 'email')->email() ?>
                    <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->
</section>