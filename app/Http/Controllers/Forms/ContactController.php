<?php

declare(strict_types=1);

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Mail\FormSubmitted;
use App\Models\ContactFormRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function __invoke(StoreContactRequest $request): RedirectResponse
    {
        $data = $request->validated();
        unset($data['consent'], $data['_hp']);

        $record = ContactFormRequest::create([
            ...$data,
            'ip' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 500),
        ]);

        $recipient = SiteSetting::get('lead_recipient_email');
        if ($recipient) {
            try {
                Mail::to($recipient)->send(new FormSubmitted(
                    formType: 'Обращение через сайт',
                    record: $record,
                    fields: [
                        'Имя' => $record->name,
                        'Телефон' => $record->phone,
                        'Email' => $record->email,
                        'Сообщение' => $record->message,
                        'Источник' => $record->source,
                    ],
                ));
            } catch (\Throwable $e) {
                report($e);
            }
        }

        return back()->with('success', 'Спасибо! Мы скоро ответим.');
    }
}
