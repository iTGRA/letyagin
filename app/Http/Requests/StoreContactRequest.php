<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'    => ['required', 'string', 'max:200'],
            'phone'   => ['nullable', 'string', 'max:60', 'regex:/^[\d+\s\-\(\)]{7,30}$/', 'required_without:email'],
            'email'   => ['nullable', 'email', 'max:200', 'required_without:phone'],
            'message' => ['required', 'string', 'max:5000'],
            'source'  => ['required', 'string', 'max:80'],
            'consent' => ['required', 'accepted'],
            '_hp'     => ['nullable', 'max:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'phone.regex' => 'Телефон должен содержать цифры и разрешённые знаки',
            'consent.accepted' => 'Необходимо согласие на обработку персональных данных',
            'phone.required_without' => 'Укажите телефон или email',
            'email.required_without' => 'Укажите email или телефон',
        ];
    }
}
