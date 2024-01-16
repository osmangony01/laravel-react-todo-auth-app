<?php

namespace App\Models;

use App\Models\User;
use App\Models\TaskImage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['task_title', 'task_due_date', 'task_priority', 'user_id', 'task_description'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function taskImage(): HasMany
    {
        return $this->hasMany(TaskImage::class);
    }
}
