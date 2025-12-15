<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_register()
    {
        $data = [
            'name' => 'Sara',
            'email' => 'sara@example.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ];

        $response = $this->postJson('/api/register', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('users', [
            'email' => 'sara@example.com'
        ]);
    }

    /** @test */
    public function user_can_login()
    {
        User::factory()->create([
            'email' => 'sara@example.com',
            'password' => bcrypt('password')
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'sara@example.com',
            'password' => 'password'
        ]);

        $response->assertStatus(200);
    }

    /** @test */
    public function user_can_logout()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/logout');

        $response->assertStatus(200);
    }
}
