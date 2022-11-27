<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Chip
 */

use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;
use app\models\test\bootstrap\Chip;
use yii\helpers\Inflector;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="section">
    <div class="row mb-3">
        <div class="col-lg-6">
            <div class="card elevation1 bg-dark-tint0">
                <div class="card-body">
                    <?php foreach($model->listActiveTheme() as $i => $value ) : ?>
                        <div class="mb-3 chip chip-<?= $value ?>">
                            Example Chip
                            <?= Html::a( Html::tag('i','close',['class' => 'material-icons']) ,'content',['class' => 'chip-action']) ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="card elevation1 bg-dark-tint0">
                <div class="card-body">
                    <?php foreach($model->listActiveTheme() as $i => $value ) : ?>
                        <div class="mb-3 chip chip-<?= $value ?>">
                            <?= Html::tag('i','mood',['class' => 'material-icons']) ?>
                            Example Chip
                            <?= Html::a( Html::tag('i','close',['class' => 'material-icons']) ,'content',['class' => 'chip-action']) ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-lg-6">
            <div class="card elevation1 bg-dark-tint0">
                <div class="card-body">
                    <?php foreach($model->listActiveTheme() as $i => $value ) : ?>
                        <div class="mb-3 chip chip-outline-<?= $value ?>">
                            Example Chip
                            <?= Html::a( Html::tag('i','close',['class' => 'material-icons']) ,'content',['class' => 'chip-action']) ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="card elevation1 bg-dark-tint0">
                <div class="card-body">
                    <?php foreach($model->listActiveTheme() as $i => $value ) : ?>
                        <div class="mb-3 chip chip-outline-<?= $value ?>">
                            <?= Html::tag('i','mood',['class' => 'material-icons']) ?>
                            Example Chip
                            <?= Html::a( Html::tag('i','close',['class' => 'material-icons']) ,'content',['class' => 'chip-action']) ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->

</section>