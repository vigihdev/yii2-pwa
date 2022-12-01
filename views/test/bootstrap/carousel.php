<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Carousel
 */

use yii\bootstrap5\Html;
use app\models\test\bootstrap\Carousel;
use yii\helpers\Inflector;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="section">

    <div class="row">
        <div class="col-12 mb-3">
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <?php for ($i = 0; $i < 5; $i++) : ?>
                        <?= Html::beginTag('div', ['class' => 'carousel-item' . ($i === 0 ? ' active' : null)]) ?>
                            <?= Html::img(Yii::$app->imgAssets . 'test/test-carousel-' . ($i + 1) . '.png', ['class' => 'd-block w-100', 'alt' => 'Slide ' . $i]) ?>
                        <?= Html::endTag('div') ?>
                    <?php endfor; ?>
                </div>
                <ol class="carousel-indicators">
                    <?php for ($i = 0; $i < 5; $i++) : ?>
                        <?= Html::tag('li', null,[
                                'data-target' => '#carouselExampleControls',
                                'class' => ($i === 0 ? ' active' : null),
                                'data-slide-to' => $i
                            ]) ?>
                    <?php endfor; ?>
                </ol>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true">
                        <?= Html::tag('i', 'arrow_back_ios', ['class' => 'material-icons']) ?>
                    </span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true">
                        <?= Html::tag('i', 'arrow_forward_ios', ['class' => 'material-icons']) ?>
                    </span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>

    </div>
    <!-- /row -->
    
    <!-- carousel-indicators rounded -->
    <div class="row">
        <div class="col-12 mb-3">
            <div id="carouselIndicatorsRounded" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <?php for ($i = 0; $i < 5; $i++) : ?>
                        <?= Html::beginTag('div', ['class' => 'carousel-item' . ($i === 0 ? ' active' : null)]) ?>
                            <?= Html::img(Yii::$app->imgAssets . 'test/test-carousel-' . ($i + 1) . '.png', ['class' => 'd-block w-100', 'alt' => 'Slide ' . $i]) ?>
                        <?= Html::endTag('div') ?>
                    <?php endfor; ?>
                </div>
                <ol class="carousel-indicators carousel-indicators-rounded">
                    <?php for ($i = 0; $i < 5; $i++) : ?>
                        <?= Html::tag('li', null,[
                                'data-target' => '#carouselIndicatorsRounded',
                                'class' => 'carousel-indicators-rounded-item' . ($i === 0 ? ' active' : null),
                                'data-slide-to' => $i
                            ]) ?>
                    <?php endfor; ?>
                </ol>
            </div>
        </div>

    </div>
    <!-- /row -->

        <!-- Carousel Control Custom carousel-control-custom -->
        <div class="row">
        <div class="col-12 mb-3">
            <div id="carouselControlCustom" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <?php for ($i = 0; $i < 5; $i++) : ?>
                        <?= Html::beginTag('div', ['class' => 'carousel-item' . ($i === 0 ? ' active' : null)]) ?>
                            <?= Html::img(Yii::$app->imgAssets . 'test/test-carousel-' . ($i + 1) . '.png', ['class' => 'd-block w-100', 'alt' => 'Slide ' . $i]) ?>
                        <?= Html::endTag('div') ?>
                    <?php endfor; ?>
                </div>

                <a class="carousel-control-prev carousel-control-custom" href="#carouselControlCustom" role="button" data-slide="prev">
                    <div class="carousel-control-prev-icon ripple-effect" aria-hidden="true">
                        <?= Html::tag('i', 'arrow_back_ios', ['class' => 'material-icons']) ?>
                    </div>
                    <span class="sr-only">Previous</span>
                </a>

                <a class="carousel-control-next carousel-control-custom" href="#carouselControlCustom" role="button" data-slide="next">
                    <div class="carousel-control-next-icon ripple-effect" aria-hidden="true">
                        <?= Html::tag('i', 'arrow_forward_ios', ['class' => 'material-icons']) ?>
                    </div>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>

    </div>
    <!-- /row -->
</section>