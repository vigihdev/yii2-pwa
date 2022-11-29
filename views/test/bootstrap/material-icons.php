<?php
/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\MaterialIcons
 */

use yii\helpers\Inflector;
use app\models\test\bootstrap\MaterialIcons;
use yii\bootstrap5\Html;

$this->title = Inflector::titleize($this->actionId());

?>

<section class="section-<?= $this->bodyClass() ?>">
        <div class="row">
            <?php foreach($model->dataIconsOutlined() as $i => $icon ) : 
            $icons = explode(' ',$icon);
            ?>
            <div class="mb-3 col-md-2 col-sm-3 col-6 text-center">
                <div class="text-center elevation-1 p-3 m-2 bg-white rounded">
                    <?= Html::tag('i',current($icons),['class' => 'material-icons text-whites']) ?>
                    <br>
                    <div class="text-body"><?= current($icons) ?> </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
</section>