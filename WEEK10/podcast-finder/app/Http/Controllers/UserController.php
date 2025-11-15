<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
    $this->authorize('admin');
    return User::all();
}

public function store(Request $req) {
    $this->authorize('admin');
    return User::create([
        'first_name'=>$req->first_name,
        'last_name'=>$req->last_name,
        'email'=>$req->email,
        'password'=>bcrypt($req->password),
        'role'=>$req->role
    ]);
}

public function update(Request $req, User $user) {
    $this->authorize('admin');
    $user->update($req->all());
    return $user;
}

public function destroy(User $user) {
    $this->authorize('admin');
    $user->delete();
}

}
