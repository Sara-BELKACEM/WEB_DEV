<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class HostController extends Controller
{
    public function index()
{
    return User::where('role','host')->get();
}

public function show($id)
{
    return User::where('role','host')->findOrFail($id);
}

}
