<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\components\Rating
 */

use yii\helpers\Inflector;
use app\models\test\bootstrap\components\Rating;
use yii\bootstrap5\Html;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="section">
    <?= $model->lorem100() ?>
</section>