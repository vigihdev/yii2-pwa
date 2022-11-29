<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\FloatingActionButton
 */

use app\models\test\bootstrap\FloatingActionButton;
use yii\helpers\Inflector;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="section">
    <div class="row mb-3">
        <div class="col-md-6 col-sm-12 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body">
                    <?php foreach ($model->listActiveTheme() as $i => $value) : ?>
                        <button class="btn btn-fab ripple-effect mr-2 mb-3 btn-<?= $value ?>" type="button">
                            <i class="material-icons sm"><?= $model->getListMaterialIcons20($i) ?></i>
                        </button>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-sm-12 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body">
                    <?php foreach ($model->listActiveTheme() as $i => $value) : ?>
                        <button class="btn btn-fab btn-raised ripple-effect mr-2 mb-3 btn-<?= $value ?>" type="button">
                            <i class="material-icons sm"><?= $model->getListMaterialIcons20($i + 1) ?></i>
                        </button>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-md-6 col-sm-12 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body">
                    <?php foreach ($model->listActiveTheme() as $i => $value) : ?>
                        <button class="btn btn-fab btn-flat ripple-effect mr-2 mb-3 btn-<?= $value ?>" type="button">
                            <i class="material-icons sm"><?= $model->getListMaterialIcons20($i) ?></i>
                        </button>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-sm-12 mb-3">
        </div>
    </div>
    <!-- /row -->
</section>
