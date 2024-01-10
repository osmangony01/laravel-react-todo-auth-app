<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    public function login(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        } 

        // if(Auth::attempt(["email"=> $req->email, "password"=> $req->password])){
        //     $user = Auth::user();
        //     $token = $user->createToken("myApi")->accessToken;

        //     return response()->json([
        //         "status" => 200,
        //         "message" => "User Logged in successfully",
        //         "token" => $token
        //     ],200);
        // }
        // else{
        //     return response()->json([
        //         "status" => 401,
        //         "message" => "Invalid login credentials"
        //     ],401);
        // }
        return response()->json($req->all(), 200);
    }

    public function register(Request $req)
    {
        
        $validator = Validator::make($req->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        } 

        // User::create([
        //     "name" => $req->name,
        //     "email" => $req->email,
        //     "password" => Hash::make($req->password)
        // ]);
          
        // return response()->json([
        //     'status' => 200,
        //     'message' => 'User created successfully'
        // ], 200);
           
        return response()->json($req->all(), 200);
    }

    public function profile()
    {
        $user = Auth::user();

        return response()->json([
            "status" => 200,
            "message" => "Profile information",
            "details" => $user
        ],200);
    }
    
    public function logout()
    {
        auth()->user()->token()->revoke();

        return response()->json([
            "status" => 200,
            "message" => "User logged out"
        ], 200);
    }
}
