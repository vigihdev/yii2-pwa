<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Card
 */

use yii\bootstrap5\Html;

$this->title = 'Test Bootstrap Badge';

?>

<section class="test-bootstrap-badge p-3 bg-dark vh-100">

    <div class="row mb-3">
        <div class="col-md-6">
            <div class="card card-dp3 card-dark">
                <div class="card-body">
                    <h1>Example heading <span class="badge badge-secondary">New</span></h1>
                    <h2>Example heading <span class="badge badge-secondary">New</span></h2>
                    <h3>Example heading <span class="badge badge-secondary">New</span></h3>
                    <h4>Example heading <span class="badge badge-secondary">New</span></h4>
                    <h5>Example heading <span class="badge badge-secondary">New</span></h5>
                    <h6>Example heading <span class="badge badge-secondary">New</span></h6>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card card-dp3 card-dark">
                <div class="card-body">
                    <button type="button" class="btn btn-primary">
                        Notifications <span class="badge badge-light">4</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-md-6">
            <div class="card card-dp3 card-dark">
                <div class="card-body">
                    <span class="badge badge-primary">Primary</span>
                    <span class="badge badge-secondary">Secondary</span>
                    <span class="badge badge-success">Success</span>
                    <span class="badge badge-danger">Danger</span>
                    <span class="badge badge-warning">Warning</span>
                    <span class="badge badge-info">Info</span>
                    <span class="badge badge-light">Light</span>
                    <span class="badge badge-dark">Dark</span>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card card-dp3 card-dark">
                <div class="card-body">
                    <span class="badge badge-pill badge-primary">Primary</span>
                    <span class="badge badge-pill badge-secondary">Secondary</span>
                    <span class="badge badge-pill badge-success">Success</span>
                    <span class="badge badge-pill badge-danger">Danger</span>
                    <span class="badge badge-pill badge-warning">Warning</span>
                    <span class="badge badge-pill badge-info">Info</span>
                    <span class="badge badge-pill badge-light">Light</span>
                    <span class="badge badge-pill badge-dark">Dark</span>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-md-6">
            <div class="card card-dp3 card-dark">
                <div class="card-body">
                    <a href="#" class="badge badge-primary">Primary</a>
                    <a href="#" class="badge badge-secondary">Secondary</a>
                    <a href="#" class="badge badge-success">Success</a>
                    <a href="#" class="badge badge-danger">Danger</a>
                    <a href="#" class="badge badge-warning">Warning</a>
                    <a href="#" class="badge badge-info">Info</a>
                    <a href="#" class="badge badge-light">Light</a>
                    <a href="#" class="badge badge-dark">Dark</a>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->
</section>