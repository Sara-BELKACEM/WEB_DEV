<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProfileRequest;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function show($id){
        $profile = Profile::where('user_id',$id)->first();
        return response()->json($profile, 200);
    }

    public function store(StoreProfileRequest $request){
        $userId = Auth::user()->id;
        $validated = $request->validated();
        $validated['user_id'] = $userId;
        if($request->hasFile('img')){
            $path = $request->file('img')->store('my pic','public');
            $validated['img'] = $path;
        }
        $profile = Profile::create($validated);
        return response()->json([
            'message' => 'Profile created successfully',
            'profile' => $profile,
        ], 201);
    }
}
