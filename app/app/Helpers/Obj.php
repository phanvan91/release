<?php

namespace App\Helpers;

class Obj
{
    public function __construct($filter)
    {
        foreach ($filter as $k=>$v) {
            $this->$k = is_string($v) ? html_entity_decode($v) : $v;
        }
    }

    public function has($attr)
    {
        return isset($this->$attr);
    }

    public function __set($name, $value)
    {
        $this->$name = is_string($value) ? html_entity_decode($value) : $value;
    }

    public function __get($attr)
    {
        if (isset($this->$attr) === true) {
            return $this->$attr;
        } else {
            return null;
        }
    }
}
