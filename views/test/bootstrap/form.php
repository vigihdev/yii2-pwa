<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Form
 */

use yii\helpers\Inflector;
use yii\helpers\Url;
use app\models\test\bootstrap\Form;
use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\ActiveFieldBootstrap;

$this->title = Inflector::titleize($this->actionId());

?>
<section class="section">
    <div class="row mb-3">
        <div class="col-md-6"> 
            <div class="card elevation-1"> 
                <div class="card-body">
                    <?php $form = ActiveForm::begin() ?>
                        <?= $form->field($model,'username')->user() ?>
                        <?= $form->field($model,'email')->email() ?>
                        <?= $form->field($model,'password')->password() ?>
                        <?= Html::submitButton('Submit',['class' => 'justify-content-end btn btn-outline-danger']) ?>
                    <?php ActiveForm::end(); ?>
                </div>
            </div> 
        </div>
    </div>
</section>
