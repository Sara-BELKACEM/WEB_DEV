<?php

namespace Database\Factories;

use App\Models\Podcast;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Episode>
 */
class EpisodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
{
    return [
        'podcast_id'  => Podcast::factory(),
        'title'       => $this->faker->sentence(4),
        'description' => $this->faker->paragraph(),
        'audio'       => null,
    ];
}

}
