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
<html lang="<?= Yii::$app->language ?>">

<head>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <?= ViewHeader::addStyleMaterialIcons() ?>
</head>

<body class="-test-bootstrap <?= $this->bodyClass() ?>">
    <?php $this->beginBody() ?>
    <div class="wrapper">
        <div class="sidebar-overlay"></div>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
            <?= $this->render('header/test-bootstrap-header') ?>
        </nav>
        <!-- /navbar -->
        <div class="sidebar sidebar-test-bootstrap" id="sidebar">
            <?= $this->render('sidebar/test-bootstrap-sidebar') ?>
        </div>
        <!-- /sidebar -->
        <div class="content"> <?= $content ?> </div>
        <!-- /content -->
    </div>
    <?php $this->endBody() ?>
</body>

</html>
<?php $this->endPage() ?>