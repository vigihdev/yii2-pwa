<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\ButtonGroup
 */

use yii\helpers\Inflector;
use app\models\test\bootstrap\ButtonGroup;
use yii\bootstrap5\Html;

$this->title = Inflector::camel2words($this->actionId());

?>

<section class="section">
    <div class="row mb-3">
        <div class="col-lg-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary">Left</button>
                        <button type="button" class="btn btn-secondary">Middle</button>
                        <button type="button" class="btn btn-secondary">Right</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body">
                    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div class="btn-group mr-2" role="group" aria-label="First group">
                            <button type="button" class="btn btn-secondary">1</button>
                            <button type="button" class="btn btn-secondary">2</button>
                            <button type="button" class="btn btn-secondary">3</button>
                            <button type="button" class="btn btn-secondary">4</button>
                        </div>
                        <div class="btn-group mr-2" role="group" aria-label="Second group">
                            <button type="button" class="btn btn-secondary">5</button>
                            <button type="button" class="btn btn-secondary">6</button>
                            <button type="button" class="btn btn-secondary">7</button>
                        </div>
                        <div class="btn-group" role="group" aria-label="Third group">
                            <button type="button" class="btn btn-secondary">8</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /card -->
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-lg-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body">
                        <div class="btn-group btn-group-lg mb-3" role="group" aria-label="Large button group">
                            <button type="button" class="btn btn-secondary">Left</button>
                            <button type="button" class="btn btn-secondary">Middle</button>
                            <button type="button" class="btn btn-secondary">Right</button>
                        </div>
                        <div class="mb-2"> </div>
                        <div class="btn-group mb-3" role="group" aria-label="Default button group">
                            <button type="button" class="btn btn-secondary">Left</button>
                            <button type="button" class="btn btn-secondary">Middle</button>
                            <button type="button" class="btn btn-secondary">Right</button>
                        </div>
                        <div class="mb-2"> </div>
                        <div class="btn-group btn-group-sm mb-3" role="group" aria-label="Small button group">
                            <button type="button" class="btn btn-secondary">Left</button>
                            <button type="button" class="btn btn-secondary">Middle</button>
                            <button type="button" class="btn btn-secondary">Right</button>
                        </div>
                </div>
            </div>
            <!-- /card -->
        </div>
        <div class="col-lg-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body">
                    <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
                        <button type="button" class="btn btn-secondary">Button</button>
                        <button type="button" class="btn btn-secondary">Button</button>
                        <button type="button" class="btn btn-secondary">Button</button>
                        <button type="button" class="btn btn-secondary">Button</button>
                        <button type="button" class="btn btn-secondary">Button</button>
                        <button type="button" class="btn btn-secondary">Button</button>
                    </div>
                </div>
            </div>
            <!-- /card -->
        </div>
    </div>
    <!-- /row -->
    <div class="row mb-3">
        <div class="col-lg-6 mb-3">

        </div>
        <div class="col-lg-6 mb-3">
        </div>
    </div>
    <!-- /row -->
</section>