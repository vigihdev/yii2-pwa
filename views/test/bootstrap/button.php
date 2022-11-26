<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Button
 */

use yii\bootstrap5\Html;
use app\models\test\bootstrap\Button;
use yii\helpers\Inflector;

$this->title = 'Test Bootstrap Button';

?>

<section class="test-bootstrap-button p-3 bg-dark vh-100">

    <div class="row">
        <div class="col-lg-6 mb-3">
            <div class="card card-dp3 card-dark">
                <div class="card-body">
                    <?php foreach ($model->listActiveTheme() as $theme) : ?>
                        <?= Html::tag('div',Inflector::titleize($theme),['class' => 'mb-3 ml-2 btn btn-' . $theme ]) ?>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <div class="col-lg-6 mb-3">
            <div class="card card-dp3 card-dark">
                <div class="card-body">
                    <?php foreach ($model->listActiveTheme() as $theme) : ?>
                        <?= Html::tag('div',Inflector::titleize($theme),['class' => 'mb-3 ml-2 btn btn-outline-' . $theme ]) ?>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->
</section>