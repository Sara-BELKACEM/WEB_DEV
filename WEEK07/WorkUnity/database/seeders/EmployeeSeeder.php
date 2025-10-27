<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;


class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // \App\Models\Employee::factory(20)->create();
        Employee::factory(20)->create();
    }
}
