<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        if ($user && $user->role === 'admin') {
            return $next($request);
        }

        return response()->json(['message' => 'Forbidden'], 403);
    }
}
