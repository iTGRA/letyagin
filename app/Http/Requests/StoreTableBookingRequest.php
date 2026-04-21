<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTableBookingRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'         => ['required', 'string', 'max:200'],
            'phone'        => ['required', 'string', 'max:60', 'regex:/^[\d+\s\-\(\)]{7,30}$/'],
            'email'        => ['nullable', 'email', 'max:200'],
            'desired_date' => ['required', 'date', 'after_or_equal:today'],
            'desired_time' => ['required', 'date_format:H:i'],
            'guests_count' => ['required', 'integer', 'min:1', 'max:50'],
            'comment'      => ['nullable', 'string', 'max:2000'],
            'source'       => ['required', 'string', 'max:80'],
            'consent'      => ['required', 'accepted'],
            // honeypot
            '_hp'          => ['nullable', 'max:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'phone.regex' => 'Телефон должен содержать цифры и разрешённые знаки (+, -, (, ), пробел)',
            'consent.accepted' => 'Необходимо согласие на обработку персональных данных',
        ];
    }
}
