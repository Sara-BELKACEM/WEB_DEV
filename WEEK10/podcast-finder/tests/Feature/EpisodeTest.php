<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Podcast;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class EpisodeTest extends TestCase
{
    use RefreshDatabase;

    public function test_host_can_add_episode()
    {
        Storage::fake('public'); 

        $user = User::factory()->create(['role' => 'host']);
        $podcast = Podcast::factory()->create(['user_id' => $user->id]);
        $token = $user->createToken('api')->plainTextToken;

        $response = $this->postJson("/api/podcasts/{$podcast->id}/episodes", [
            'title' => 'Episode 1',
            'description' => 'desc',
            'audio' => UploadedFile::fake()->create('episode1.mp3', 5000, 'audio/mpeg')
        ], [
            'Authorization' => "Bearer $token",
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(201);
    }
}
