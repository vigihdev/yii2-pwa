<?php

use yii\bootstrap5\Html;
use app\assets\AppAsset;

$this->title = 'Test';
?>

<section class="section">
	Lorem ipsum dolor sit amet consectetur adipisicing, elit. Libero quaerat reprehenderit impedit fugit provident sapiente ullam voluptates quo. Distinctio similique consequuntur nulla accusantium, perferendis provident id non iste maiores veritatis.
</section>
<?php \app\widgets\JsBlock::begin() ?>
	<script type="text/javascript">
		console.log(moment())
		console.log($)
		console.log(window)
	</script>
<?php \app\widgets\JsBlock::end() ?>