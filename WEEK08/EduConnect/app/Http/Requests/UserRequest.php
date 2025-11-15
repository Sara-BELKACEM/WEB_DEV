<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
   public function authorize()
{
    return auth()->check() && auth()->user()->hasRole('admin');
}

public function rules()
{
    $rules = [
        'name' => 'sometimes|required|string|max:255',
        'email' => 'sometimes|required|email|unique:users,email,' . $this->id,
        'password' => 'sometimes|required|min:6|confirmed',
        'role' => 'sometimes|string|in:admin,teacher,student',
    ];

    if ($this->isMethod('post')) {
        $rules['name'] = 'required|string|max:255';
        $rules['email'] = 'required|email|unique:users,email';
        $rules['password'] = 'required|min:6|confirmed';
    }

    return $rules;
}

}
