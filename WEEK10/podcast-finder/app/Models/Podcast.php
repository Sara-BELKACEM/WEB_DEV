<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Podcast extends Model
{
    protected $fillable=['title','description','image','host_id','category'];

    public function episodes(){
        return $this->hasMany(Episode::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
    
}

