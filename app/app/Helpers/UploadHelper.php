<?php

namespace App\Helpers;

use Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class UploadHelper
{
    private $storage;

    /**
     * UploadHelper constructor.
     */
    public function __construct()
    {
        $this->storage = Storage::disk('public');
    }

    public function uploadFle($file)
    {

    }
}

