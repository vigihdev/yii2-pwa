<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\bootstrap\Typography
 */

use yii\bootstrap5\Html;
use app\models\test\bootstrap\Typography;

$this->title = 'Test Bootstrap Typography';

?>

<section class="test-bootstrap-typography p-3 bg-dark vh-100">
    <div class="card card-dp2 card-dark mb-3">
        <div class="card-body">
            <h1>h1. Bootstrap heading</h1>
            <h2>h2. Bootstrap heading</h2>
            <h3>h3. Bootstrap heading</h3>
            <h4>h4. Bootstrap heading</h4>
            <h5>h5. Bootstrap heading</h5>
            <h6>h6. Bootstrap heading</h6>
        </div>
    </div>

    <div class="card card-dp2 card-dark">
        <div class="card-body">
            <p class="h1">h1. Bootstrap heading</p>
            <p class="h2">h2. Bootstrap heading</p>
            <p class="h3">h3. Bootstrap heading</p>
            <p class="h4">h4. Bootstrap heading</p>
            <p class="h5">h5. Bootstrap heading</p>
            <p class="h6">h6. Bootstrap heading</p>
        </div>
    </div>
</section>