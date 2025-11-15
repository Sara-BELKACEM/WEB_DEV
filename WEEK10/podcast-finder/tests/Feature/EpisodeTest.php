<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Podcast;
use App\Models\Episode;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EpisodeTest extends TestCase
{
    use RefreshDatabase;

    public function test_host_can_add_episode()
    {
        $user = User::factory()->create(['role'=>'host']);
        $podcast = Podcast::factory()->create(['user_id'=>$user->id]);
        $token = $user->createToken('api')->plainTextToken;

        $response = $this->post("/api/podcasts/$podcast->id/episodes", [
            'title'=>'Episode 1',
            'description'=>'desc',
        ], [
            'Authorization'=>"Bearer $token"
        ]);

        $response->assertStatus(200);
    }
}
