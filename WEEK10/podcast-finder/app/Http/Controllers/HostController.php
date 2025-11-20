<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;


class HostController extends Controller
{
    public function index()
    {
        return response()->json(User::where('role', 'host')->get(), 200);
    }

    public function show($id)
    {
        $host = User::where('role', 'host')->findOrFail($id);
        return response()->json($host, 200);
    }
}
