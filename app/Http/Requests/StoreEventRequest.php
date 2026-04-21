<?php

namespace App\Http\Requests;

use App\Models\EventRequest;
use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'         => ['required', 'string', 'max:200'],
            'phone'        => ['required', 'string', 'max:60', 'regex:/^[\d+\s\-\(\)]{7,30}$/'],
            'email'        => ['nullable', 'email', 'max:200'],
            'event_type'   => ['required', 'string', 'in:' . implode(',', array_keys(EventRequest::EVENT_TYPES))],
            'event_date'   => ['nullable', 'date', 'after_or_equal:today'],
            'guests_count' => ['nullable', 'integer', 'min:1', 'max:500'],
            'comment'      => ['nullable', 'string', 'max:2000'],
            'source'       => ['required', 'string', 'max:80'],
            'consent'      => ['required', 'accepted'],
            '_hp'          => ['nullable', 'max:0'],
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
