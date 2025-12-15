<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAppointmentRequest;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    // Admin: list all appointments with user info
    public function index()
    {
        return Appointment::with('user')->orderBy('date')->orderBy('time')->get();
    }

    // User: get my appointments
    public function my()
    {
        return auth()->user()->appointments()->orderBy('date')->orderBy('time')->get();
    }

    // Store new appointment (user)
    public function store(StoreAppointmentRequest $request)
    {
        $data = $request->validated();

        $appointment = auth()->user()->appointments()->create([
            'date' => $data['date'],
            'time' => $data['time'],
            'notes' => $data['notes'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json($appointment, 201);
    }

    // Cancel appointment by user (set status cancelled)
    public function cancel($id)
    {
        $appointment = Appointment::findOrFail($id);

        if ($appointment->user_id !== auth()->id()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // Prevent cancelling on or after the appointment date
        if ($appointment->date <= now()->toDateString()) {
            return response()->json(['message' => 'Cannot cancel on or after the appointment date'], 422);
        }

        $appointment->status = 'cancelled';
        $appointment->save();

        return response()->json($appointment);
    }

    // Admin: change status to approved/rejected
    public function changeStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected'
        ]);

        $appointment = Appointment::findOrFail($id);
        $appointment->status = $request->input('status');
        $appointment->save();

        return response()->json($appointment);
    }
}
