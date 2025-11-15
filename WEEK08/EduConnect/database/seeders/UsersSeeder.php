<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'teacher']);
        Role::firstOrCreate(['name' => 'student']);

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole('admin');

        $teacher = User::create([
            'name' => 'Teacher One',
            'email' => 'teacher@example.com',
            'password' => bcrypt('password'),
        ]);
        $teacher->assignRole('teacher');

        $student = User::create([
            'name' => 'Student One',
            'email' => 'student@example.com',
            'password' => bcrypt('password'),
        ]);
        $student->assignRole('student');
    }
}
