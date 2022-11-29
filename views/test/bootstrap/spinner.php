<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Spinner
 */

use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;
use app\models\test\bootstrap\Spinner;
use yii\helpers\Inflector;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="section">
    <div class="row mb-3">
        <div class="col-lg-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body">
                    <?php foreach ($model->listActiveTheme() as $i => $value) : ?>
                        <div class="mr-2 mb-3 spinner-border text-<?= $value ?>" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <div class="col-lg-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body">
                    <?php foreach ($model->listActiveTheme() as $i => $value) : ?>
                        <div class="mr-2 mb-3 spinner-grow text-<?= $value ?>" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-lg-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body">
                    <button class="btn btn-primary" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span class="sr-only">Loading...</span>
                    </button>
                    <button class="btn btn-primary" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->
</section>