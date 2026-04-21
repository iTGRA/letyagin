<?php

declare(strict_types=1);

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Mail\FormSubmitted;
use App\Models\EventRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class EventRequestController extends Controller
{
    public function __invoke(StoreEventRequest $request): RedirectResponse
    {
        $data = $request->validated();
        unset($data['consent'], $data['_hp']);

        $record = EventRequest::create([
            ...$data,
            'ip' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 500),
        ]);

        $recipient = SiteSetting::get('lead_recipient_email');
        if ($recipient) {
            try {
                Mail::to($recipient)->send(new FormSubmitted(
                    formType: 'Заявка на мероприятие',
                    record: $record,
                    fields: [
                        'Имя' => $record->name,
                        'Телефон' => $record->phone,
                        'Email' => $record->email,
                        'Тип мероприятия' => EventRequest::EVENT_TYPES[$record->event_type] ?? $record->event_type,
                        'Желаемая дата' => $record->event_date?->format('d.m.Y'),
                        'Количество гостей' => $record->guests_count,
                        'Комментарий' => $record->comment,
                        'Источник' => $record->source,
                    ],
                ));
            } catch (\Throwable $e) {
                report($e);
            }
        }

        return back()->with('success', 'Спасибо! Мы свяжемся с вами в течение рабочего дня.');
    }
}
