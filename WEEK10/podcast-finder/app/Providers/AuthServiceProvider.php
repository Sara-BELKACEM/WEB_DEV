<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Episode;
use App\Models\Podcast;
use App\Policies\EpisodePolicy;
use App\Policies\PodcastPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends AppServiceProvider
{
    protected $policies = [
        Podcast::class => PodcastPolicy::class,
        Episode::class => EpisodePolicy::class,
    ];

    public function boot(): void
    {
        // $this->registerPolicies();

    }
}
