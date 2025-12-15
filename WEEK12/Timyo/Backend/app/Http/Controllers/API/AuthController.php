<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $req)
    {
        $data = $req->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => 'user', // default role
        ]);
        Auth::login($user); // creates session cookie
        return response()->json(['user' => $user], 201);
    }

    public function login(LoginRequest $req)
    {
        $credentials = $req->validated();
        if (!Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $user = Auth::user();
        return response()->json(['user' => $user], 200);
    }

    public function logout()
    {
        // Auth::logout();
        // request()->session()->invalidate();
        // request()->session()->regenerateToken();
        return response()->json(['message' => 'Logged out'], 200);
    }

    public function me()
    {
        return response()->json(Auth::user());
    }
}
