<?php

namespace App\Policies;

use App\Models\Episode;
use App\Models\User;

class EpisodePolicy
{
    /**
     * Create a new policy instance.
     */
    public function update(User $user, Episode $episode)
    {
        return $user->role === 'admin' || $episode->podcast->user_id === $user->id;
    }

    public function delete(User $user, Episode $episode)
    {
        return $user->role === 'admin' || $episode->podcast->user_id === $user->id;
    }

    public function create(User $user)
    {
        return in_array($user->role, ['host', 'admin']);
    }
}
