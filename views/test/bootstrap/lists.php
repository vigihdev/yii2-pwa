<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Lists
 * @return $model->field() = yii\bootstrap5\ActiveFieldBootstrap
 */

use yii\helpers\Inflector;
use app\models\test\bootstrap\Lists;
use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\ActiveFieldBootstrap;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="<?= $this->bodyClass() ?>">
    <div class="row mb-3">
        <div class="col-lg-6 mb-3">
            <ul class="list-group bg-dark-tint-0 border-dark-tint-4">
                <?php for ($i = 0; $i < 5; $i++) : ?>
                    <?= Html::tag('li', $model->getListLorem20($i), ['class' => 'list-group-item bg-dark-tint-0 text-dark-tint-4 border-bottom-dark-tint-2']) ?>
                <?php endfor; ?>
            </ul>
        </div>
        <div class="col-lg-6 mb-3">
            <ul class="list-group bg-dark-tint-0 border-dark-tint-4">
                <?= Html::tag('li', 'Cras justo odio', [
                    'class' => 'disabled list-group-item bg-dark-tint-0 text-dark-tint-4 border-bottom-dark-tint-2',
                    'aria-disabled' => 'true'
                ]) ?>
                <?php for ($i = 0; $i < 4; $i++) : ?>
                    <?= Html::tag('li', $model->getListLorem20($i), ['class' => 'list-group-item bg-dark-tint-0 text-dark-tint-4 border-bottom-dark-tint-2']) ?>
                <?php endfor; ?>
            </ul>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-lg-6 mb-3">
            <ul class="list-group list-group-item-action active bg-dark-tint-0 border-dark-tint-4">
                <?= Html::a('Play List Song Cok', '#', [
                    'class' => 'list-group-item list-group-item-action active bg-dark-tint-2 text-light strong border-dark-tint-2',
                ]) ?>
                <?php for ($i = 0; $i < 4; $i++) : ?>
                    <?= Html::a($model->getListLorem20($i), '#', ['class' => 'list-group-item list-group-item-action bg-dark-tint-0 text-dark-tint-4 border-bottom-dark-tint-2']) ?>
                <?php endfor; ?>
            </ul>
        </div>
        <div class="col-lg-6 mb-3">
            <ul class="list-group list-group-item-action active bg-dark-tint-0 border-top-dark-tint-0 border-dark-tint-4">
                <?= Html::a('Play List Song Cok', '#', [
                    'class' => 'list-group-item list-group-item-action active bg-info text-light strong border-dark-tint-2',
                ]) ?>
                <?php for ($i = 0; $i < 4; $i++) : ?>
                    <?= Html::a($model->getListLorem20($i), '#', ['class' => 'list-group-item list-group-item-action bg-dark-tint-0 text-dark-tint-4 border-bottom-dark-tint-2']) ?>
                <?php endfor; ?>
            </ul>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-lg-6 mb-3">
            <ul class="list-group list-group-flush active bg-dark-tint-0">
                <?php for ($i = 0; $i < 9; $i++) : ?>
                    <?= Html::a($model->getListLorem20($i), '#', ['class' => 'list-group-item list-group-item-action bg-dark-tint-0 text-dark-tint-4 border-bottom-dark-tint-2']) ?>
                <?php endfor; ?>
            </ul>
        </div>

        <div class="col-lg-6 mb-3">
            <ul class="list-group">
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item list-group-item-primary">This is a primary list group item</li>
                <li class="list-group-item list-group-item-secondary">This is a secondary list group item</li>
                <li class="list-group-item list-group-item-success">This is a success list group item</li>
                <li class="list-group-item list-group-item-danger">This is a danger list group item</li>
                <li class="list-group-item list-group-item-warning">This is a warning list group item</li>
                <li class="list-group-item list-group-item-info">This is a info list group item</li>
                <li class="list-group-item list-group-item-light">This is a light list group item</li>
                <li class="list-group-item list-group-item-dark">This is a dark list group item</li>
            </ul>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-lg-6 mb-3">
            <ul class="list-group bg-dark-tint-0">
                <?php for ($i = 0; $i < 5; $i++) : ?>
                    <li class="list-group-item d-flex justify-content-between align-items-center bg-dark-tint-0 text-dark-tint-4 border-bottom-dark-tint-2">
                        <?= $model->getListLorem20($i) ?>
                        <span class="badge badge-primary badge-pill"><?= $i + 8 ?></span>
                    </li>
                <?php endfor; ?>
            </ul>
        </div>
        <div class="col-lg-6 mb-3">
            <ul class="list-group bg-dark-tint-0">
                <?php $form = ActiveForm::begin() ?>
                    <?php for ($i = 0; $i < 5; $i++) : ?>
                        <li class="list-group-item d-flex justify-content-between align-items-center bg-dark-tint-0 text-dark-tint-4 border-bottom-dark-tint-2">
                            <?= Html::tag('i',$model->getListMaterialIcons20($i),['class' => 'material-icons list-icon text-white']) ?>
                            <span class="flex-grow-1">
                                <?= $model->getListLorem20($i) ?>
                            </span>
                            <?= $form->field($model,'primary')->checkboxSwitch(['labelSwitch' => 'false','theme' => 'info']) ?>
                        </li>

                    <?php endfor; ?>
                <?php ActiveForm::end(); ?>
            </ul>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">

        <div class="col-lg-6 mb-3">
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">List group item heading</h5>
                        <small>3 days ago</small>
                    </div>
                    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small>Donec id elit non mi porta.</small>
                </a>
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">List group item heading</h5>
                        <small class="text-muted">3 days ago</small>
                    </div>
                    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small class="text-muted">Donec id elit non mi porta.</small>
                </a>
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">List group item heading</h5>
                        <small class="text-muted">3 days ago</small>
                    </div>
                    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small class="text-muted">Donec id elit non mi porta.</small>
                </a>
            </div>
        </div>
        <div class="col-lg-6 mb-3">
        </div>
    </div>
    <!-- /row -->
</section>