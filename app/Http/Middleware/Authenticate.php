<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login');
    }

    // public function handle($request, Closure $next, ...$guards)
    // {
    //     if ($request->hasCookie('access_token')) {
    //         $token = $request->cookie('access_token');
    //         auth()->onceUsingId($this->auth->authenticate($token)->getAuthIdentifier());
    //     }

    //     $this->authenticate($request, $guards);

    //     return $next($request);
    // }
}
