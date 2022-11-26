<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Card
 */

use yii\bootstrap5\Html;

$this->title = 'Test Bootstrap Card';

?>

<section class="test-bootstrap-card p-3 bg-dark">

    <div class="row mb-3">
        <div class="col-lg-6">
            <div class="row">
                <div class="col-md-6 mb-3">
                    <div class="card card-dp2">
                        <div class="card-media">
                            <?= Html::img(Yii::$app->imgAssets . 'test-pic.png', ['class' => 'img-fluid img-media', 'alt' => 'img media']) ?>
                        </div>
                        <div class="card-body">
                            <?= $model->lorem100() ?>
                        </div>
                    </div>

                </div>
                <div class="col-md-6">
                    <div class="card card-dp3 card-dark">

                        <div class="card-header">
                            <div class="card-title">Lorem </div>
                        </div>
                        <div class="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </div>
                        <div class="card-footer d-flex justify-content-end">
                            <?= Html::tag('button', 'content', ['class' => 'btn btn-danger']) ?>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div class="col-lg-6">
            <div class="row">
                <div class="col-sm-6 mb-3">
                    <div class="card card-dp2">

                        <div class="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </div>
                    </div>

                </div>
                <div class="col-sm-6">
                    <div class="card card-dp3 card-dark">
                        <div class="card-media">
                            <?= Html::img(Yii::$app->imgAssets . 'test-pic.png', ['class' => 'img-fluid img-media', 'alt' => 'img media']) ?>
                        </div>
                        <div class="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </div>
                        <div class="card-footer d-flex justify-content-end">
                            <?= Html::tag('button', 'content', ['class' => 'btn btn-danger']) ?>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
    <!-- /row -->


    <div class="row">
        <div class="col-md-6">
            <div class="row">
                <div class="col-sm-6 mb-3">
                    <div class="card card-dp2">
                        <div class="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </div>
                    </div>

                </div>
                <div class="col-sm-6">
                    <div class="card card-dp3 card-dark">
                        <div class="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-md-6">
            <div class="row">
                <div class="col-sm-6 mb-3">
                    <div class="card card-dp2">
                        <div class="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-sm btn-default btn-fab btn-flat ripple-effect btn-primary" type="button"><i class="material-icons sm">share</i></button>
                            <button class="btn btn-sm btn-default btn-fab btn-flat ripple-effect btn-primary" type="button"><i class="material-icons sm">thumb_up</i></button>
                            <button class="btn btn-sm btn-default btn-fab btn-flat ripple-effect btn-primary" type="button"><i class="material-icons sm">drafts</i></button>
                        </div>
                    </div>

                </div>
                <div class="col-sm-6">
                    <div class="card card-dp3 card-dark">
                        <div class="card-body">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- /row -->

    <div class="row">
        <div class="col-md-6">
            <div class="row">
                <div class="col-sm-6 mb-3">
                    <div class="card card-dp2">
                        <div class="card-media">

                            <?= Html::img(Yii::$app->imgAssets . 'test-pic.png', ['class' => 'img-fluid img-media', 'alt' => 'img media']) ?>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
    <!-- /row -->
</section>