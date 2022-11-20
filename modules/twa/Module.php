<?php

namespace app\modules\twa;

/**
 * applink module definition class
 */

use Yii;
use yii\web\Response;
use yii\web\ResponseException;
use yii\base\Event;

class Module extends \yii\base\Module
{
    const EVENT_AFTER_SEND = 'afterSend';
    const EVENT_BEFORE_SEND = 'beforeSend';
    const EVENT_BEFORE_ACTION = 'beforeAction';
    const EVENT_AFTER_ACTION = 'afterAction';

    /**
     * {@inheritdoc}
     */
    public $controllerNamespace = 'app\modules\twa\controllers';

    public function init()
    {
        parent::init();
        $registerComponent = [
            'components' => [                
                'response' => [
                    'class' => Response::class,
                    'format' => Response::FORMAT_JSON,
                    'on beforeSend' => [$this,'beforeSend'],
                ],
            ],
        ];
        Yii::configure(Yii::$app, $registerComponent);
    }

    public function beforeSend(Event $event)
    {
        if(is_object($event->sender) && $event->sender instanceof Response){
            $response = $event->sender;
            $data = $event->sender->data;

            if($response->hasStatusCodeByException()){
                $newData = new ResponseException($response->data);
                $response->data = $this->setError($newData->getMessage(),$response->getStatusCode());
            }

            if ( is_array($data) && !empty($data) ) {
            }
        }
    }

    private function setError(string $message = 'Erorr',int $code = 403):array
    {
        return [
            'error' => [
                'status' => false,
                'code' => $code,
                'message' => $message,
            ],
        ];
    }
}
