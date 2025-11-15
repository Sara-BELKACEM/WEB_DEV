<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Podcast;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PodcastTest extends TestCase
{
    use RefreshDatabase;

    public function test_host_can_create_podcast()
    {
        $user = User::factory()->create(['role' => 'host']);
        $token = $user->createToken('api')->plainTextToken;

        $response = $this->post('/api/podcasts', [
            'title' => 'Test Podcast',
            'description' => 'desc',
            'category' => 'tech'
        ], [
            'Authorization' => "Bearer $token"
        ]);

        $response->assertStatus(200);
    }

    public function test_anyone_can_list_podcasts()
    {
        Podcast::factory()->count(3)->create();

        $response = $this->get('/api/podcasts');

        $response->assertStatus(200);
    }
}
