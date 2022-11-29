<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Color
 */

use app\models\test\bootstrap\Color;
use yii\helpers\Inflector;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="section">
    <div class="row mb-3">
        <?php foreach($model->listActiveTheme() as $i => $value ) : ?>
            <div class="col-sm-4 col-lg-3 mb-3">
                <div class="w-100 h-7 rounded elevation-1 bg-<?= $value ?> text-white text-center"><?= $value ?></div>
            </div>
        <?php endforeach; ?>
    </div>
    <!-- /row -->
</section>