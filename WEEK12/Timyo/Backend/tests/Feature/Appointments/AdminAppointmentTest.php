<?php

namespace Tests\Feature\Appointments;

use Tests\TestCase;
use App\Models\User;
use App\Models\Appointment;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AdminAppointmentTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function admin_can_list_all_appointments()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Appointment::factory(3)->create();

        $response = $this->actingAs($admin)->getJson('/api/appointments');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    /** @test */
    public function admin_can_change_status()
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $appointment = Appointment::factory()->create();

        $response = $this->actingAs($admin)
            ->patchJson('/api/appointments/' . $appointment->id . '/status', [
                'status' => 'approved'
            ]);


        $response->assertStatus(200);

        $this->assertDatabaseHas('appointments', [
            'id' => $appointment->id,
            'status' => 'approved'
        ]);
    }
}
