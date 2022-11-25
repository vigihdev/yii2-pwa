<?php

/** @var yii\web\View $this */
/** @var string $content */

use app\assets\AppAsset;
use yii\bootstrap5\Html;
use yii\web\ViewHeader;

AppAsset::register($this);

$this->registerCsrfMetaTags();
ViewHeader::addTagMeta();

?>

<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>" class="h-100">
<head>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <?= ViewHeader::addStyleMaterialIcons() ?>
</head>
<body class="<?= $this->bodyClass() ?> d-flex flex-column h-100">
<?php $this->beginBody() ?>

    <?= $this->render('header/index') ?>

    <main id="main" class="flex-shrink-0" role="main">
        <?= $content ?>
    </main>

    <?= $this->render('footer/index') ?>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
