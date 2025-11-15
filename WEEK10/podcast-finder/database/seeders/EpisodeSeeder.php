<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Podcast;
use App\Models\Episode;

class EpisodeSeeder extends Seeder
{
    public function run(): void
    {
        $podcasts = Podcast::all();

        foreach ($podcasts as $podcast) {
            Episode::factory()->count(5)->create([
                'podcast_id' => $podcast->id
            ]);
        }
    }
}
