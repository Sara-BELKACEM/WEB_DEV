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
            'first_name' => 'Admin',
            'last_name'  => 'One',
            'email' => 'admin1@example.com',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'first_name' => 'Admin',
            'last_name'  => 'Two',
            'email' => 'admin2@example.com',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        // Hosts
        User::factory(3)->create([
            'role' => 'host',
            'password' => bcrypt('password'),
        ]);

        // Normal Users
        User::factory(10)->create([
            'role' => 'user',
            'password' => bcrypt('password'),
        ]);
    }
}
