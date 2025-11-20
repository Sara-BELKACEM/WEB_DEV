<?php

namespace Database\Factories;

use App\Models\Episode;
use App\Models\Podcast;
use Illuminate\Database\Eloquent\Factories\Factory;

class EpisodeFactory extends Factory
{
    protected $model = Episode::class;

    public function definition()
    {
        return [
            'podcast_id' => Podcast::factory(),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'audio' => 'episodes/audio/' . $this->faker->uuid() . '.mp3',
        ];
    }
}
