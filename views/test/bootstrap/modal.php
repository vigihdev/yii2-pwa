<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Modal
 */

use yii\helpers\Inflector;
use yii\helpers\Url;
use app\models\test\bootstrap\Modal AS MModal;
use yii\bootstrap5\Html;
use yii\bootstrap5\Modal;
use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\ActiveFieldBootstrap;

$this->title = Inflector::titleize($this->actionId());
Modal::fixedBottom(['headerOptions' => ['header' => false]]);
?>
<section class="section">
    <div class="row mb-3">
        <div class="col-12">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-modal-id="modal-fixed-bottom" data-url="<?= Url::toRoute(['modal-content']) ?>">
                Launch demo modal Fixed Bottom
            </button>           
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-12">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- /row -->
</section>
