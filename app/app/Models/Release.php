<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Release extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'env_id',
        'platform',
        'version',
        'title',
        'note',
        'bundle',
        'creator',
        'version'
    ];

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function environment(){
        return $this->belongsTo(Environment::class,'env_id','id');
    }
}
