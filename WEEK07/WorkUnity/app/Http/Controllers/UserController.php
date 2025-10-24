<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    function index(){
        $users = [
            ['id' => 1, 'name' => 'Sara'],
            ['id' => 2, 'name' => 'Khaoula'],
            ['id' => 3, 'name' => 'Houda'],
        ];
        // foreach($users as $user){
        //     echo $user['id'] . ' - ' . $user['name'] . "\n";
        // }
        return response()->json($users);
    }
    function check($id){
        return response()->json($id);
    }
}
