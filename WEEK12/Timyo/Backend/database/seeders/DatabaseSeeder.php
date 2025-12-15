<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Appointment;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // create admin user    
        User::factory()->admin()->create([
            'name' => 'Admin',
            'email' => 'admin@timyo.test',
            'password' => bcrypt('password'),
        ]);

        // create 10 users
        User::factory(10)->create()->each(function ($user) {
            Appointment::factory(rand(1, 3))->create([
                'user_id' => $user->id,
                'date' => now()->addDays(rand(1, 30))->toDateString()
            ]);
        });
    }
}
