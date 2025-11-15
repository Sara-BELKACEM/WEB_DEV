<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Podcast;
use App\Models\User;

class PodcastSeeder extends Seeder
{
    public function run(): void
    {
        $hosts = User::where('role', 'host')->get();

        foreach ($hosts as $host) {
            Podcast::factory()->count(5)->create([
                'user_id' => $host->id
            ]);
        }
    }
}
