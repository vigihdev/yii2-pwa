<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Alert
 */

use yii\helpers\Inflector;
use app\models\test\bootstrap\Alert;
use yii\bootstrap5\Html;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="<?= $this->bodyClass() ?> bg-dark">
    <div class="row mb-3">
        <div class="col-md-6">
            <!-- Simple Bootstrap Alerts -->

            <!-- Primary Alert -->
            <div class="alert alert-primary" role="alert">
                This is a primary alert—check it out!
            </div>

            <!-- Secondary Alert -->
            <div class="alert alert-secondary" role="alert">
                This is a secondary alert—check it out!
            </div>

            <!-- Success Alert -->
            <div class="alert alert-success" role="alert">
                Success! You should <a class="alert-link" href="javascript:void(0);">read this message.</a>
            </div>

            <!-- Error Alert -->
            <div class="alert alert-danger" role="alert">
                Danger! You should <a class="alert-link" href="javascript:void(0);">read this message.</a>
            </div>

            <!-- Warning Alert -->
            <div class="alert alert-warning" role="alert">
                Warning! You should <a class="alert-link" href="javascript:void(0);">read this message.</a>
            </div>

            <!-- Information Alert -->
            <div class="alert alert-info" role="alert">
                Info! You should <a class="alert-link" href="javascript:void(0);">read this message.</a>
            </div>

            <!-- Light Alert -->
            <div class="alert alert-light" role="alert">
                This is a light alert—check it out!
            </div>

            <!-- Dark Alert -->
            <div class="alert alert-dark" role="alert">
                This is a dark alert—check it out!
            </div>

        </div>

        <div class="col-md-6">
            <!-- Dismissable Alerts -->
            <div role="alert" class="alert alert-success alert-dismissible">
                <button aria-label="Close" data-dismiss="alert" class="close" type="button"><span aria-hidden="true">×</span></button>
                <h2 class="alert-heading">Success!</h2>
                <hr>
                <p>Thank you for contacting us. We have successfully received your email and someone from the customer service team will get back to as soon as possible.</p>
            </div>
        </div>
    </div>
    <!-- /row -->
</section>