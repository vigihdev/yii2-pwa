<?php


namespace yii\base;

class ModelRestError extends \yii\base\BaseObject
{

    private $status = false;
    private $code = 417;
    private $message = '';

    public function __construct(Model $model)
    {
        if($model->hasErrors()){
            $this->message = current($model->getFirstErrors());
        }
    }

    public function getCode():int
    {
        return empty($this->message) ? 0 : $this->code;
    }

    public function getMessage():string
    {
        return $this->message;
    }

    public function getStatus():bool
    {
        return $this->status;
    }

    public function toArray()
    {
        $error = [
            'error' => [
                'status' => false,
                'code' => $this->code,
                'message' => $this->message,
            ]
        ];
        return empty($this->message) ? [] : $error;
    }
}
