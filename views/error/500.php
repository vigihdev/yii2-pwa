<?php

/** 
 * Reflection Reletion
 * 
 * @return $error = yii\base\ErrorException
 */

/** @var yii\web\View $this */
/** @var string $name */
/** @var string $message */
/** @var Exception$exception */

use yii\helpers\Html;
use yii\helpers\Url;
use yii\base\ErrorException;

$this->title = 'Error';

?>
<section class="section-<?= $this->bodyClass() ?>">
	<div class="error500">
		<div class="error500-media"><?= Html::img(Yii::$app->imgAssets . '404.png',['alt' => 'Error','class' => 'img-fluid']) ?></div>
		<div class="error500-title"><h2 class="text-label text-center"> Error  <?= $error->getMessage() ?></h2></div>
		<div class="error500-content">File : <?= $error->getFile() ?></div>
		<div class="error500-content">Line : <?= $error->getLine() ?></div>
	</div>
</section>
