<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCorporateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'                     => ['required', 'string', 'max:200'],
            'company'                  => ['required', 'string', 'max:300'],
            'phone'                    => ['required', 'string', 'max:60', 'regex:/^[\d+\s\-\(\)]{7,30}$/'],
            'email'                    => ['required', 'email', 'max:200'],
            'estimated_nights_per_year'=> ['nullable', 'integer', 'min:1', 'max:5000'],
            'comment'                  => ['nullable', 'string', 'max:2000'],
            'source'                   => ['required', 'string', 'max:80'],
            'consent'                  => ['required', 'accepted'],
            '_hp'                      => ['nullable', 'max:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'phone.regex' => 'Телефон должен содержать цифры и разрешённые знаки',
            'consent.accepted' => 'Необходимо согласие на обработку персональных данных',
        ];
    }
}
