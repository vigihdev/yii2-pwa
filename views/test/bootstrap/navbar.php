<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Navbar
 */

use yii\helpers\Inflector;
use yii\helpers\Url;
use app\models\test\bootstrap\Navbar;
use yii\bootstrap5\Html;

$this->title = Inflector::titleize($this->actionId());

?>
<section class="section">
    <div class="row mb-3">
        <div class="col-12">
            <nav class="navbar navbar-expand-lg navbar-light bg-light bg-dark-tint-0">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    </div>
    <!-- /row -->

    <div class="row mb-3">
        <div class="col-12">
            <!-- As a link -->
            <nav class="navbar navbar-light bg-light mb-3">
                <a class="navbar-brand" href="#">Navbar</a>
            </nav>

            <!-- As a heading -->
            <nav class="navbar navbar-light bg-light mb-3">
                <span class="navbar-brand mb-0 h1">Navbar</span>
            </nav>

            <!-- Just an image -->
            <nav class="navbar elevation-1 navbar-light bg-dark-tint-0 mb-3">
                <a class="navbar-brand" href="#">
                    <img src="<?= Yii::$app->imgAssets . 'logo.png' ?>" width="30" height="30" alt="">
                </a>
            </nav>
        </div>
    </div>
    <!-- /row -->
    <div class="row mb-3">
        <div class="col-12">
        </div>
    </div>
    <!-- /row -->
    <div class="row mb-3">
        <div class="col-12">
        </div>
    </div>
    <!-- /row -->
</section>