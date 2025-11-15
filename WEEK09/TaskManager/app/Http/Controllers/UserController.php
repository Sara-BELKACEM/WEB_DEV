<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(Request $request){
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ], 201);
        
    }
    public function logIn(Request $request){
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if(!Auth::attempt($request->only('email','password'))){
            return response()->json(['message'=>'Invalid login details'],401);}
            $user = User::where('email',$request->email)->first();
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'message' => 'User logged in successfully',
                'User' => $user,
                'Token' => $token,
            ], 201);
        
        
        
    }
    public function logOut(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'User logged out successfully',
        ], 200);
    }




    public function getProfile($id){
        $profile = User::find($id)->profile;
        return response()->json($profile, 200);
    }
    public function getUserTasks($id){
        $tasks = User::find($id)->tasks;
        return response()->json($tasks, 200);
    }
}
