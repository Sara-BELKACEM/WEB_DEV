<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Podcast;

class PodcastFactory extends Factory
{
    protected $model = Podcast::class;

    public function definition()
    {
        return [
            'user_id'     => User::factory(),
            'title'       => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'image'       => null,
            'category'    => $this->faker->randomElement(['Tech', 'Education', 'News', 'Comedy']),
        ];
    }
}
