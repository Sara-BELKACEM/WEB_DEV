<?php

namespace App\Providers;

use App\Models\Podcast;
use App\Models\Episode;
use App\Policies\PodcastPolicy;
use App\Policies\EpisodePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Podcast::class => PodcastPolicy::class,
        Episode::class => EpisodePolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
