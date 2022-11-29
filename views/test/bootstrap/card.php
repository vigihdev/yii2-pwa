<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Card
 */

use yii\bootstrap5\Html;

$this->title = 'Test Bootstrap Card';

?>

<section class="section test-custom">
    <div class="row mb-3">
        <div class="col-md-4 col-sm-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-header">
                    <h2 class="card-title">Title goes here</h2>
                    <p class="card-subtitle">Secondary text</p>
                </div>
            </div>
            <!-- /card -->
        </div>
        <div class="col-md-4 col-sm-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body"> Card provide context and an entry point to more robust information and views. Don't overload card with extraneous information or actions. </div>
            </div>
            <!-- /card -->
        </div>
        <div class="col-md-4 col-sm-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-media"><?= Html::img(Yii::$app->imgAssets . 'test-pic.png', ['class' => 'img-fluid img-media', 'alt' => 'img media']) ?></div>
            </div>
            <!-- /card -->
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-md-4 col-sm-6 mb-3">
            <!-- Card action -->
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-footer">
                    <button class="btn ripple-effect btn-primary" type="button">Primary</button>
                    <button type="button" class="btn ripple-effect btn-danger">Action</button>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-3">
            <!-- Card media actions -->
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-footer">
                    <button class="btn btn-sm btn-fab ripple-effect btn-primary" type="button"><i class="material-icons sm">share</i></button>
                    <button class="btn btn-sm btn-fab ripple-effect btn-primary" type="button"><i class="material-icons sm">thumb_up</i></button>
                    <button class="btn btn-sm btn-fab ripple-effect btn-primary" type="button"><i class="material-icons sm">drafts</i></button>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-3">
            <!-- Card Footer -->
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-footer text-muted"> 15 days ago </div>
            </div>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-md-4 col-sm-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div class="card-">
                        <div class="card-text h3 bold"><?= $model->lorem20() ?></div>
                        <div class="card-text">
                            <?php for($i = 0;$i < 5;$i++) : ?>
                                <?= Html::tag('i','star',['class' => 'material-icons xs text-warning']) ?>
                            <?php endfor; ?>
                        </div>

                    </div>

                    <div class="size-2 d-flex justify-content-center align-items-center ripple-effect hover rounded-circle">
                        <?= Html::tag('i','keyboard_arrow_up',['class' => 'material-icons md text-light']) ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div class="card-body-item">
                        <div class="card-text h3 bold"><?= $model->lorem20() ?></div>
                        <div class="card-text">
                            <?php for($i = 0;$i < 5;$i++) : ?>
                                <?= Html::tag('i','star',['class' => 'material-icons xs text-warning']) ?>
                            <?php endfor; ?>
                        </div>

                    </div>

                    <div class="card-body-item size-2 d-flex justify-content-center align-items-center ripple-effect hover rounded-circle">
                        <?= Html::tag('i','more_vert',['class' => 'material-icons text-light']) ?>
                    </div>
                </div>
            </div>           
        </div>
        <div class="col-md-4 col-sm-6 mb-3"></div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-md-4 col-sm-6 mb-3">

            <!-- Card Icon -->
            <div class="card elevation-1 bg-dark-tint-0 text-center">
                <div class="card-body">
                    <div class="card-icon">
                        <i class="material-icons lg icon-circle text-light">translate</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-3">

            <!-- Title Separator -->
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-header title-separator">
                    <h2 class="card-title">Title goes here</h2>
                    <p class="card-subtitle">Secondary text</p>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-3">

            <!-- Title Separator Right -->
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-header text-right title-separator-right">
                    <h2 class="card-title">Title goes here</h2>
                    <p class="card-subtitle">Secondary text</p>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-md-4 col-sm-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-header"> Featured </div>
                <ul class="list-group list-group-flush">
                    <?php for ($i = 0; $i < 7; $i++) : ?>
                        <li class="list-group-item bg-dark-tint-0 border-bottom-dark-tint-2">
                            <span>Single-line item</span>
                        </li>
                    <?php endfor; ?>
                </ul>
            </div>
        </div>

        <div class="col-md-4 col-sm-6 mb-3">

            <!-- Title Separator Right -->
            <div class="card elevation-1 bg-dark-tint-0">
                <ul class="list-group list">
                    <?php for ($i = 0; $i < 7; $i++) : ?>
                        <li class="list-group-item d-flex flex-row bg-dark-tint-0 border-bottom-dark-tint-2">
                            <i class="material-icons list-icon sm"><?= $model->getListMaterialIcons20($i) ?></i>
                            <span class="media-body">Single-line item with icon</span>
                        </li>
                    <?php endfor; ?>
                </ul>
            </div>
        </div>

        <div class="col-md-4 col-sm-6 mb-3">

            <!-- Title Separator Right -->
            <div class="card elevation-2 bg-dark-tint-0">
                <div class="card-header">
                    <h2 class="card-title">Listing Card</h2>
                </div>
                <ul class="list-group list">
                    <?php for ($i = 0; $i < 7; $i++) : ?>
                        <li class="list-group-item d-flex flex-row bg-dark-tint-0 border-bottom-dark-tint-2">
                            <i class="material-icons list-icon sm"><?= $model->getListMaterialIcons20($i) ?></i>
                            <span class="media-body">Single-line item with icon</span>
                        </li>
                    <?php endfor; ?>
                </ul>
            </div>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-md-4 col-sm-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-media border-bottom-dark-tint-2"><?= Html::img(Yii::$app->imgAssets . 'test-pic-1.png', ['class' => 'img-fluid img-media', 'alt' => 'img media']) ?></div>
                <div class="card-body"> Card provide context and an entry point to more robust information and views. Don't overload card with extraneous information or actions. </div>
                <div class="card-footer d-flex justify-content-between border-top-dark-tint-2">
                    <button class="btn ripple-effect btn-outline-primary" type="button">Primary</button>
                    <button type="button" class="btn ripple-effect btn-outline-danger">Action</button>
                </div>
            </div>
        </div>

        <div class="col-md-4 col-sm-6 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-media border-bottom-dark-tint-2">
                    <?= Html::img(Yii::$app->imgAssets . 'test-pic-2.png', ['class' => 'img-fluid img-media p-2', 'alt' => 'img media']) ?>
                </div>
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div class="card-body-item">
                        <div class="card-text h3 bold"><?= $model->lorem20() ?></div>
                        <div class="card-text">
                            <?php for($i = 0;$i < 5;$i++) : ?>
                                <?= Html::tag('i','star',['class' => 'material-icons xs text-warning']) ?>
                            <?php endfor; ?>
                        </div>

                    </div>

                    <div class="card-body-item size-2 d-flex justify-content-center align-items-center ripple-effect hover rounded-circle">
                        <?= Html::tag('i','more_vert',['class' => 'material-icons text-light']) ?>
                    </div>
                </div>
            </div>            
        </div>

        <div class="col-md-4 col-sm-6 mb-3">
        </div>
    </div>
    <!-- /row -->
</section>