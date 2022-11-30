<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\ModalContent
 */

use yii\helpers\Inflector;
use app\models\test\bootstrap\ModalContent;
use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\ActiveFieldBootstrap;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="section m-n3">
    <div class="row">
        <div class="card elevation-1 bg-dark-tint-0">
            <div class="card-media border-bottom-dark-tint-2">
                <?= Html::img(Yii::$app->imgAssets . 'test-pic-1.png', ['class' => 'img-fluid img-media p-2', 'alt' => 'img media']) ?>
            </div>
            <div class="card-body d-flex justify-content-between align-items-center">
                <div class="card-body-item">
                    <div class="card-text h3 bold"><?= $model->lorem20() ?></div>
                    <div class="card-text">
                        <?php for ($i = 0; $i < 5; $i++) : ?>
                            <?= Html::tag('i', 'star', ['class' => 'material-icons xs text-warning']) ?>
                        <?php endfor; ?>
                    </div>

                </div>

                <div class="card-body-item size-2 d-flex justify-content-center align-items-center ripple-effect hover rounded-circle">
                    <?= Html::tag('i', 'more_vert', ['class' => 'material-icons text-light']) ?>
                </div>
            </div>

            <div class="card-footer d-flex justify-content-between border-top-dark-tint-2">
                <button class="btn ripple-effect btn-outline-primary" type="button">Primary</button>
                <button type="button" class="btn ripple-effect btn-outline-danger" data-dismiss="modal" aria-label="Close">Action</button>
            </div>
        </div>
    </div>
</section>