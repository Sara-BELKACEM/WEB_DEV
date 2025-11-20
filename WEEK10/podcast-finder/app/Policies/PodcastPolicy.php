<?php

namespace App\Policies;

use App\Models\Podcast;
use App\Models\User;

class PodcastPolicy
{
    public function create(User $user)
    {
        return in_array($user->role, ['host', 'admin']);
    }

    public function update(User $user, Podcast $podcast)
    {
        return $user->role === 'admin' || $podcast->user_id === $user->id;
    }

    public function delete(User $user, Podcast $podcast)
    {
        return $user->role === 'admin' || $user->role === 'superAdmin' || $podcast->user_id === $user->id;
    }
}
