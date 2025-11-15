<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register()
    {
        $data = [
            'first_name' => 'Sara',
            'last_name'  => 'Belkacem',
            'email'      => 'sara@test.com',
            'password'   => 'password'
        ];

        $response = $this->post('/api/register', $data);
        $response->assertStatus(201);
    }

    public function test_user_can_login()
    {
        User::factory()->create([
            'email' => 'sara@test.com',
            'password' => bcrypt('password')
        ]);

        $response = $this->post('/api/login', [
            'email'=>'sara@test.com',
            'password'=>'password'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['token']);
    }
}
