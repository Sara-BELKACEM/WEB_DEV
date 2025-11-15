<?php

namespace App\Policies;

use App\Models\Podcast;
use App\Models\User;

class PodcastPolicy
{
    /**
     * Create a new policy instance.
     */
    public function update(User $user, Podcast $podcast)
    {
        return $user->role === 'admin' || $podcast->user_id === $user->id;
    }

    public function delete(User $user, Podcast $podcast)
    {
        return $user->role === 'admin' || $podcast->user_id === $user->id;
    }

    public function create(User $user)
    {
        return in_array($user->role, ['host', 'admin']);
    }
}
