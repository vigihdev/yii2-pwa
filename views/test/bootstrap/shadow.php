<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Shadow
 */

use app\models\test\bootstrap\Shadow;
use yii\helpers\Inflector;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="section bg-dark">
    <div class="row mb-3">
        <?php for($i = 1;$i < 24;$i++) : ?>
            <div class="col-sm-4 col-lg-2 mb-3">
                <div class="w-100 h-7 bg-success text-dark-tint-5 text-center rounded elevation-<?= $i ?>">
                    elevation-<?= $i ?>
                </div>
            </div>
        <?php endfor; ?>
    </div>
    <!-- /row -->
    <div class="row mb-3">
        <?php for($i = 1;$i < 10;$i++) : ?>
            <div class="col-sm-4 col-lg-2 mb-3">
                <div class="w-100 h-7 bg-secondary text-dark-tint-5 text-center rounded zdepth-<?= $i ?>">
                    zdepth-<?= $i ?>
                </div>
            </div>
        <?php endfor; ?>
    </div>
    <!-- /row -->
</section>