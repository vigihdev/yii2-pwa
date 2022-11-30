<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Pagination
 */

use yii\helpers\Inflector;
use app\models\test\bootstrap\Pagination;
use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\ActiveFieldBootstrap;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="section">
    <div class="row mb-3">
        <div class="col-md-12 mb-3">
            <div class="card elevation-1 bg-dark-tint-0">
                <div class="card-body">
                    <nav aria-label="Page navigation example" class="mb-3">
                        <ul class="pagination">
                            <li class="page-item"><?= Html::a('Previous','#',['class' => 'page-link']) ?></li>
                            <?php for($i = 1;$i < 6;$i++) : ?>
                                <li class="page-item"><?= Html::a($i,'#',['class' => 'page-link']) ?></li>
                            <?php endfor; ?>
                            <li class="page-item"><?= Html::a('Next','#',['class' => 'page-link']) ?></li>
                        </ul>
                    </nav>

                    <nav aria-label="Page navigation example" class="mb-3">
                        <ul class="pagination">
                            <li class="page-item">
                                <?= Html::a('<span aria-hidden="true">&laquo;</span>','#',['class' => 'page-link']) ?>
                            </li>
                            <?php for($i = 1;$i < 6;$i++) : ?>
                                <li class="page-item"><?= Html::a($i,'#',['class' => 'page-link']) ?></li>
                            <?php endfor; ?>
                            <li class="page-item">
                                <?= Html::a('<span aria-hidden="true">&raquo;</span>','#',['class' => 'page-link']) ?>
                            </li>
                        </ul>
                    </nav>

                    <nav aria-label="Page navigation example" class="mb-3">
                        <ul class="pagination">
                            <li class="page-item"><?= Html::a('Previous','#',['class' => 'page-link']) ?></li>
                            <?php for($i = 1;$i < 6;$i++) : ?>
                                <li class="page-item <?= ($i === 3 ? ' active' : null) ?> "><?= Html::a($i,'#',['class' => 'page-link']) ?></li>
                            <?php endfor; ?>
                            <li class="page-item"><?= Html::a('Next','#',['class' => 'page-link']) ?></li>
                        </ul>
                    </nav>

                    <nav aria-label="Page navigation example" class="mb-3">
                        <ul class="pagination">
                            <?php for($i = 1;$i < 8;$i++) : ?>
                                <li class="page-item <?= ($i === 3 ? ' active' : null) ?> "><?= Html::a($i,'#',['class' => 'page-link']) ?></li>
                            <?php endfor; ?>
                        </ul>
                    </nav>

                    <nav aria-label="Page navigation example" class="mb-3">
                        <ul class="pagination pagination-sm">
                            <?php for($i = 1;$i < 8;$i++) : ?>
                                <li class="page-item <?= ($i === 3 ? ' active' : null) ?> "><?= Html::a($i,'#',['class' => 'page-link']) ?></li>
                            <?php endfor; ?>
                        </ul>
                    </nav>

                    <nav aria-label="Page navigation example" class="mb-3">
                        <ul class="pagination pagination-lg">
                            <?php for($i = 1;$i < 5;$i++) : ?>
                                <li class="page-item <?= ($i === 3 ? ' active' : null) ?> "><?= Html::a($i,'#',['class' => 'page-link']) ?></li>
                            <?php endfor; ?>
                        </ul>
                    </nav>

                    <nav aria-label="Page navigation example" class="mb-3">
                        <ul class="pagination">
                            <?php for($i = 1;$i < 8;$i++) : ?>
                                <li class="page-item <?= ($i === 3 ? ' active' : null) ?> ">
                                    <?= Html::a($i,'#',['class' => 'page-link elevation-2 bg-dark-tint-2 border-dark-tint-4 text-dark-tint-5']) ?>
                                </li>
                            <?php endfor; ?>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-3">
        </div>
    </div>
    <!-- /row -->
</section>

