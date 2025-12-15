<?php

namespace Tests\Feature\Appointments;

use Tests\TestCase;
use App\Models\User;
use App\Models\Appointment;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserAppointmentTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_create_appointment()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/appointments', [
            'date' => now()->addDays(2)->toDateString(),
            'time' => '10:00',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('appointments', [
            'user_id' => $user->id,
            'date' => now()->addDays(2)->toDateString(),
            'time' => '10:00',
        ]);
    }

    /** @test */
    public function user_can_list_his_appointments()
    {
        $user = User::factory()->create();

        Appointment::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->getJson('/api/appointments/my');

        $response->assertStatus(200)
            ->assertJsonCount(1);
    }

    /** @test */
    public function user_can_cancel_appointment()
    {
        $user = User::factory()->create();

        $appointment = Appointment::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)
            ->deleteJson('/api/appointments/' . $appointment->id);

        $response->assertStatus(200);

        $this->assertDatabaseHas('appointments', [
            'id' => $appointment->id,
            'status' => 'cancelled'
        ]);
    }
}
