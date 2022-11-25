<?php

/** 
 * Reflection Reletion
 * 
 * @return $error = yii\web\HttpException
 */

/** @var yii\web\View $this */
/** @var string $name */
/** @var string $message */
/** @var Exception$exception */

use yii\helpers\Html;
use yii\helpers\Url;
use yii\web\HttpException;

$this->title = 'Error';

?>
<section class="section-<?= $this->bodyClass() ?>">
	<div class="error404">
		<div class="error404-media"><?= Html::img(Yii::$app->imgAssets . '404.png',['alt' => 'Error','class' => 'img-fluid']) ?></div>
		<div class="error404-title"><h2 class="text-label text-center">Halaman tidak ditemukan</h2></div>
		<div class="error404-content"><span>Halaman yang Anda cari tidak ditemukan.Bisa jadi karena url tersebut salah atau tidak tersedia.</span></div>
		<div class="button-action">
			<?=Html::a('Kembali Ke Halaman Awal', Url::base(true), ['class' => 'btn btn-danger'])?>
		</div>
	</div>
</section>
