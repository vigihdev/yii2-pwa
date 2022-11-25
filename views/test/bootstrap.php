<?php

/** 
 * Reflection Reletion
 * 
 * @return $model = app\models\test\TestBootstrap
 */

use yii\bootstrap5\Html;

$this->title = 'Test Bootstrap';

?>

<section class="section section-<?= $this->bodyClass() ?> bootstrap p-3">
    <div class="row">
        <div class="col-md-6">
            <?= Html::tag(
                'div',
                Html::tag('i', 'notifications', ['class' => 'material-icons']) . 'alert ',
                ['class' => 'alert alert-danger']
            ) ?>

            <?= Html::tag(
                'div',
                Html::tag('i', 'notifications', ['class' => 'material-icons']) . 'alert ',
                ['class' => 'alert alert-success']
            ) ?>
            <div class="bootstrap-btn mb-3">
                <?php foreach ($model->toArray() as $i => $theme) : ?>
                    <?= Html::tag('div', $theme, ['class' => 'btn btn-' . $theme]) ?>
                <?php endforeach; ?>
            </div>
            <div class="bootstrap-btn-raised mb-3">
                <?php foreach ($model->toArray() as $i => $theme) : ?>
                    <?= Html::tag('div', $theme, ['class' => 'btn btn-raised ripple-effect btn-' . $theme]) ?>
                <?php endforeach; ?>
            </div>
            <div class="bootstrap-btn-flat mb-3">
                <?php foreach ($model->toArray() as $i => $theme) : ?>
                    <?= Html::tag('div', $theme, ['class' => 'btn btn-default btn-flat ripple-effect btn-' . $theme]) ?>
                <?php endforeach; ?>
            </div>

            <div class="bootstrap-btn-outline mb-3">
                <?php foreach ($model->toArray() as $i => $theme) : ?>
                    <?= Html::tag('div', $theme, ['class' => 'btn ripple-effect btn-outline-' . $theme]) ?>
                <?php endforeach; ?>
            </div>
            <div class="bootstrap-btn-fab mb-3">
                <?php foreach ($model->toArray() as $i => $theme) : ?>
                    <?= Html::tag('div', Html::tag('i', 'add', ['class' => 'material-icons']), ['class' => 'btn btn-fab btn-' . $theme]) ?>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="col-md-6">
            <div class="bootstrap-badge mb-3">
                <?php foreach ($model->toArray() as $i => $theme) : ?>
                    <?= Html::tag('span', '1', ['class' => 'badge badge-' . $theme])  ?>
                <?php endforeach; ?>
            </div>
            <div class="btns d-block mb-3">
                <?= Html::tag('div', 'danger', ['class' => 'btn btn-danger']) ?>
                <?= Html::tag('div', 'success', ['class' => 'btn btn-success']) ?>
                <?= Html::tag('div', 'info', ['class' => 'btn btn-info']) ?>
            </div>

            <div class="bt-outline d-block mb-3">
                <?= Html::tag('div', 'danger', ['class' => 'btn btn-outline-danger']) ?>
                <?= Html::tag('div', 'success', ['class' => 'btn btn-outline-success']) ?>
                <?= Html::tag('div', 'info', ['class' => 'btn btn-outline-info']) ?>
                <?= Html::tag('div', 'warning', ['class' => 'btn btn-outline-warning']) ?>
                <?= Html::tag('div', 'light', ['class' => 'btn btn-outline-light']) ?>
                <?= Html::tag('div', 'dark', ['class' => 'btn btn-outline-dark']) ?>
                <?= Html::tag('div', 'secondary', ['class' => 'btn btn-outline-secondary']) ?>
            </div>

            <div class="bs-chip d-block mb-3">

                <?= Html::beginTag('div', ['class' => 'chip']) ?>
                <?= Html::tag('i', 'mood', ['class' => 'material-icons']) ?>
                <?= Html::tag('span', 'Example Chip', ['class' => 'text-chip']) ?>
                <?= Html::beginTag('div', ['class' => 'chip-action']) ?>
                <?= Html::tag('i', 'close', ['class' => 'material-icons']) ?>
                <?= Html::endTag('div') ?>
                <?= Html::endTag('div') ?>

                <?= Html::beginTag('div', ['class' => 'chip chip-primary']) ?>
                <?= Html::tag('i', 'mood', ['class' => 'material-icons']) ?>
                <?= Html::tag('span', 'Example Chip', ['class' => 'text-chip']) ?>
                <?= Html::beginTag('div', ['class' => 'chip-action']) ?>
                <?= Html::tag('i', 'close', ['class' => 'material-icons']) ?>
                <?= Html::endTag('div') ?>
                <?= Html::endTag('div') ?>

                <?= Html::beginTag('div', ['class' => 'chip chip-secondary']) ?>
                <?= Html::tag('i', 'mood', ['class' => 'material-icons']) ?>
                <?= Html::tag('span', 'Example Chip', ['class' => 'text-chip']) ?>
                <?= Html::beginTag('div', ['class' => 'chip-action']) ?>
                <?= Html::tag('i', 'close', ['class' => 'material-icons']) ?>
                <?= Html::endTag('div') ?>
                <?= Html::endTag('div') ?>

                <?= Html::beginTag('div', ['class' => 'chip chip-dark']) ?>
                <?= Html::tag('i', 'mood', ['class' => 'material-icons']) ?>
                <?= Html::tag('span', 'Example Chip', ['class' => 'text-chip']) ?>
                <?= Html::beginTag('div', ['class' => 'chip-action']) ?>
                <?= Html::tag('i', 'close', ['class' => 'material-icons']) ?>
                <?= Html::endTag('div') ?>
                <?= Html::endTag('div') ?>
            </div>

            <div class="bs-chip d-block mb-3">
                <?php foreach (['danger', 'success', 'info', 'warning', 'light', 'dark', 'secondary'] as $i => $value) : ?>
                    <?= Html::beginTag('div', ['class' => 'mb-3 chip chip-outline-' . $value]) ?>
                    <?= Html::tag('i', 'mood', ['class' => 'material-icons']) ?>
                    <?= Html::tag('span', 'Example Chip', ['class' => 'text-chip']) ?>
                    <?= Html::beginTag('div', ['class' => 'chip-action']) ?>
                    <?= Html::tag('i', 'close', ['class' => 'material-icons']) ?>
                    <?= Html::endTag('div') ?>
                    <?= Html::endTag('div') ?>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6 dp3 p-3">
            <?php foreach ($model->toArray() as $i => $theme) : ?>
                <div class="switch-root switch-<?= $theme ?>">
                    <div class="switch-container">
                        <input name="<?= $theme ?>" class="switch-checkbox-form-control" type="checkbox" aria-label="Color switch demo">
                        <div class="switch-thumb"></div>
                        <div class="switch-thumb-ripple"></div>
                    </div>
                    <div class="switch-track"></div>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="col-md-6 bg-white dp3 p-3 RadioButton">
            <div class="radio-button-group">
                <?php foreach ($model->toArray() as $i => $theme) : ?>
                    <div class="radio-button radio-button-indigo">
                        <label class="form-label ripple-effect" for="RadioButton-<?= $theme ?>"><?= $theme ?></label>
                        <div class="radio-button-container">
                            <input id="RadioButton-<?= $theme ?>" name="RadioButton" value="<?= $theme ?>" class="radio-button-form-control" type="radio">
                            <div class="radio-button-thumb" for="RadioButton">
                                <svg class="radio-button-unchecked-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RadioButtonUncheckedIcon">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                                </svg>
                                <svg class="radio-button-checked-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RadioButtonCheckedIcon">
                                    <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <div class="col-md-6 p-3 RadioCheckbox">
            <div class="radio-checkbox-group d-flex">
                <?php foreach ($model->toArray() as $i => $theme) : ?>
                    <div class="radio-checkbox radio-checkbox-<?= $theme ?>">
                        <div class="radio-checkbox-container">
                            <input class="radio-checkbox-form-control" id="RadioCheckbox-<?= $theme ?>" name="RadioCheckbox" value="<?= $theme ?>" class="j" type="checkbox">
                            <div class="radio-checkbox-thumb" for="RadioCheckbox">
                                <svg class="radio-checkbox-unchecked-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RadioButtonUncheckedIcon">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                                </svg>
                                <svg class="radio-checkbox-checked-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RadioButtonCheckedIcon">
                                    <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                                </svg>
                            </div>
                        </div>
                        <label class="form-label" for="RadioCheckbox-<?= $theme ?>"><?= $theme ?></label>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <div class="col-md-6 p-3 CheckboxOutline">
            <div class="checkbox-outline checkbox-outline-indigo">
                <div class="checkbox-outline-container">
                    <input id="checkboxOutline" name="checkboxOutline" aria-label="Checkbox demo" class="checkbox-outline-form-control" data-indeterminate="false" type="checkbox"></input>
                    <svg aria-hidden="true" class="checkbox-outline-checked-icon" focusable="false" viewbox="0 0 24 24">
                        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                        </path>
                    </svg>
                    <svg aria-hidden="true" class="checkbox-outline-unchecked-icon" focusable="false" viewbox="0 0 24 24">
                        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z">
                        </path>
                    </svg>
                </div>
                <label class="checkbox-outline-label" for="checkboxOutline">My Lable </label>
            </div>
        </div>
    </div>

</section>