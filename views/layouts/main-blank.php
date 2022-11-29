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

<body class="main-blank <?= $this->bodyClass() ?>">
<?php $this->beginBody() ?>
    <div class="wrapper">

        <main id="main" class="main" role="main">
            <?= $content ?>
        </main>
        <!-- /main -->
    </div>
    <!-- /wrapper -->
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
