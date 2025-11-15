<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        $user = $request->user();

        if ($user->role !== $role) {
            return response()->json(['message' => 'Refused Role : ' . $role], 403);
        }

        return $next($request);
    }
}