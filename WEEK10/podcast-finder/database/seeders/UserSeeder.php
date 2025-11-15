<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admins
        User::factory()->create([
            'email' => 'admin1@example.com',
            'role'  => 'admin'
        ]);

        User::factory()->create([
            'email' => 'admin2@example.com',
            'role'  => 'admin'
        ]);

        // Hosts
        User::factory()->count(3)->create([
            'role' => 'host'
        ]);

        // Normal users
        User::factory()->count(10)->create([
            'role' => 'user'
        ]);
    }
}
