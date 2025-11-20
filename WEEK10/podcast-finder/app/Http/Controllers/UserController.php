<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        $user = auth()->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        return response()->json(User::all(), 200);
    }

    public function store(Request $req) {
        $user = auth()->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $req->validate([
            'first_name' => 'required|string|max:100',
            'last_name'  => 'required|string|max:100',
            'email'      => 'required|email|unique:users',
            'password'   => 'required|min:6',
            'role'       => 'required|in:admin,host,user,superAdmin'
        ]);

        $created = User::create([
            'first_name'=>$req->first_name,
            'last_name'=>$req->last_name,
            'email'=>$req->email,
            'password'=>bcrypt($req->password),
            'role'=>$req->role
        ]);

        return response()->json($created, 201);
    }

    public function update(Request $req, User $user) {
        $auth = auth()->user();
        if ($auth->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $data = $req->validate([
            'first_name' => 'sometimes|string|max:100',
            'last_name'  => 'sometimes|string|max:100',
            'email'      => 'sometimes|email|unique:users,email,'.$user->id,
            'password'   => 'sometimes|min:6',
            'role'       => 'sometimes|in:admin,host,user,superAdmin'
        ]);

        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $user->update($data);
        return response()->json($user, 200);
    }

    public function destroy(User $user) {
        $auth = auth()->user();
        if ($auth->role !== 'admin' || $auth->role !== 'superAdmin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted'], 200);
    }
}
