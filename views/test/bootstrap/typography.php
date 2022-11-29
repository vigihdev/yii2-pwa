<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Typography
 */

use yii\bootstrap5\Html;
use app\models\test\bootstrap\Typography;

$this->title = 'Test Bootstrap Typography';

?>

<section class="section test-custom">
    <div class="row">
        <div class="col-lg-6">
            <div class="card elevation-1 bg-dark-tint-0 mb-3">
                <div class="card-body">
                    <h1>h1. Bootstrap heading</h1>
                    <h2>h2. Bootstrap heading</h2>
                    <h3>h3. Bootstrap heading</h3>
                    <h4>h4. Bootstrap heading</h4>
                    <h5>h5. Bootstrap heading</h5>
                    <h6>h6. Bootstrap heading</h6>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card elevation-1 bg-dark-tint-0 mb-3">
                <div class="card-body">
                    <p class="h1">h1. Bootstrap heading</p>
                    <p class="h2">h2. Bootstrap heading</p>
                    <p class="h3">h3. Bootstrap heading</p>
                    <p class="h4">h4. Bootstrap heading</p>
                    <p class="h5">h5. Bootstrap heading</p>
                    <p class="h6">h6. Bootstrap heading</p>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->

    <div class="row">
        <div class="col-lg-12">
            <div class="card elevation-1 bg-dark-tint-0 mb-3">
                <div class="card-body">
                    <?= Html::tag('div', $model->lorem100(), ['class' => 'text-dark-tint-1']) ?>
                    <?= Html::tag('div', $model->lorem100(), ['class' => 'text-dark-tint-2']) ?>
                    <?= Html::tag('div', $model->lorem100(), ['class' => 'text-dark-tint-3']) ?>
                    <?= Html::tag('div', $model->lorem100(), ['class' => 'text-dark-tint-4']) ?>
                    <?= Html::tag('div', $model->lorem100(), ['class' => 'text-dark-tint-5']) ?>
                    <?= Html::tag('div', $model->lorem100(), ['class' => 'text-dark-tint-6']) ?>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->
</section>