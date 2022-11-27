<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Color
 */

use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;
use app\models\test\bootstrap\Color;
use yii\helpers\Inflector;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="section">
    <div class="row mb-3">
        <div class="col-lg-6">
            <div class="card elevation1 bg-dark-tint0">
                <div class="card-body">
                    <?= $model->lorem100() ?>
                    <?php foreach($model->listActiveTheme() as $i => $value ) : ?>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="card elevation1 bg-dark-tint0">
                <div class="card-body">
                    <?php foreach($model->listActiveTheme() as $i => $value ) : ?>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->
</section>