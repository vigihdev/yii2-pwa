<?php

namespace yii\web;

use Yii;

class ResponseException extends \yii\base\BaseObject
{
    private $name = '';
    private $message = '';
    private $code;
    private $type = '';
    private $file = '';
    private $line;

    public function __construct(array $config)
    {
        if(!empty($config)){
            foreach ($config as $attribute => $value) {
                if($this->hasProperty($attribute)){
                    $this->{$attribute} = $value;
                }
            }
        }
    }

    public function getName():string
    {
        return $this->name;
    }

    public function getMessage():string
    {
        return $this->message;
    }

    public function getCode():int
    {
        return is_int($this->code) ? $this->code : 0;
    }

    public function getType():string
    {
        return $this->type;
    }

    public function getFile():string
    {
        return $this->file;
    }

    public function getLine():int
    {
        return is_int($this->line) ? $this->line : 0;
    }
}
