<?php

namespace App\Helpers;

use App\Helpers\Obj;

class Filter extends Obj
{
    public $page = 1;

    public $page_size = 20;

    public $per_page = 20;

    public function __construct($filter)
    {
        foreach ($filter as $k=>$v) {
            if ($k == 'page_size' || $k == 'per_page') {
                $this->per_page = $v;
                $this->page_size = $v;
            } else {
                $this->$k = is_string($v) ? html_entity_decode($v) : $v;
            }

            if ($k == 'page') {
                $this->page = (is_numeric($v) && $v > 0) ? $v : 1;
            }
        }
    }

    public function has($attr)
    {
        return isset($this->$attr);
    }

    public function empty($attr)
    {
        return empty($this->$attr);
    }

    public function notEmpty($attr)
    {
        return ! empty($this->$attr);
    }

    public function __set($name, $value)
    {
        if ($name == 'page_size' || $name == 'per_page') {
            $this->per_page = $value;
            $this->page_size = $value;
        } else {
            $this->$name = is_string($value) ? html_entity_decode($value) : $value;
        }
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
