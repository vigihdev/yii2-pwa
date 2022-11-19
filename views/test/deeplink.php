<?php

use yii\bootstrap5\Html;
use yii\helpers\Url;
use app\models\base\Deeplink;
use yii\helpers\Json;

$this->title = 'Test';

$email = 'ettysundary@gmail.com';
$idfileOrder = '1668174331-fMOZKGBb4PMxoWRzuReqm9-_quk-zltJ';
?>

<section class="section-<?= $this->actionClass() ?>">

    <?= Html::a('Device',Deeplink::device(
            Url::to(['/fo']),'Dhsh'
        ),['class' => 'btn btn-block btn-danger mr-3']) ?>

    <?= Html::a('Auth Login',Deeplink::auth(
            Url::to(['/orders/booking',
                'id' => 'id',
                'kategori' => 'kategori',
                'token' => 'token'
            ]),
            'LoginBooking')
        ,['class' => 'btn btn-block btn-success mr-3']) ?>

    <?= Html::a('Auth Login',Deeplink::auth(
            Url::to(['/auth/login']),'Login')
            ,['class' => 'btn btn-block btn-primary mr-3']) ?>

    <?= Html::a('Sevice Sound Stop', Url::to(['/test/service','name' => 'serviceSoundStop'])
            ,['class' => 'btn btn-block btn-primary mr-3']) ?>
            
    <?= Html::a('Sevice Sound Start', Url::to(['/test/service','name' => 'serviceSoundStart','post' => Json::encode(['name' => 'iphone6'])])
        ,['class' => 'btn btn-block btn-primary mr-3']) ?>

   <?= Html::a('Sevice Vibrator Stop', Url::to(['/test/service','name' => 'serviceVibratorStop'])
            ,['class' => 'btn btn-block btn-primary mr-3']) ?>

    <?= Html::a('Sevice Vibrator Start', Url::to(['/test/service','name' => 'serviceVibratorStart'])
        ,['class' => 'btn btn-block btn-primary mr-3']) ?>
    <!-- Sevice -->

    <!-- Notif -->
    <?= Html::a('Notif',Deeplink::auth(
            Url::to(['/auth/login']),'Login')
            ,['class' => 'btn btn-block btn-primary mr-3']) ?>

    <!-- Permission -->
    <?= Html::a('Permission',Deeplink::auth(
            Url::to(['/auth/login']),'Login')
            ,['class' => 'btn btn-block btn-info mr-3']) ?>

    <!-- Share -->
    <!-- Upload Image -->

    <!-- Order -->
    <?= Html::a('Order Booking', Url::to(['/test/orders'])
            ,['class' => 'btn btn-block btn-danger mr-3']) ?>    

    <!-- Twar -->
    <?= Html::a('Twar Login Booking',
            Url::to(['/twar/login-booking',
                'id' => $idfileOrder,
                'kategori' => 'sewa_mobil',
                'token' => '1668074785-44-rAdwpQx1z1T_mgHsnhEmJkoSVH04IPJg',
                ])
            ,['class' => 'btn btn-block btn-success mr-3']) ?>

    <?= Html::a('Twar Call Mitra','#'
            ,['class' => 'btn btn-block btn-success mr-3']) ?>

    <!-- Listing Mobil -->
    <?= Html::a('Listing Mobil',
        Url::to(['/orders/listing-mobil',
            'id' => $idfileOrder,
            'kategori' => 'sewa_mobil'
        ])
        ,['class' => 'btn btn-block btn-primary mr-3']) ?>

    <!-- Listing Mobil 1667993117-8rRSvi7MKfA1bO45TUVc3mNnL_7aLHi0 // local // 1668551534-O7sd-mvuKDE4LPfRHOt-Wksb8Xqdjwda => host -->
    <?= Html::a('Listing Mobil',
            Url::to(['/orders/listing-mobil',
                'id' => '1668551534-O7sd-mvuKDE4LPfRHOt-Wksb8Xqdjwda',
                'kategori' => 'sewa_mobil'
            ])
            ,['class' => 'btn btn-block btn-primary mr-3']) ?>
    <?= Html::a('Test Deeplink',
            Url::to(['/test/deeplink'])
            ,['class' => 'btn btn-block btn-primary mr-3']) ?>
</section>