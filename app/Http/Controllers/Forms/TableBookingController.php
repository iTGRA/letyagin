<?php

declare(strict_types=1);

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTableBookingRequest;
use App\Mail\FormSubmitted;
use App\Models\SiteSetting;
use App\Models\TableBookingRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class TableBookingController extends Controller
{
    public function __invoke(StoreTableBookingRequest $request): RedirectResponse
    {
        $data = $request->validated();
        unset($data['consent'], $data['_hp']);

        $record = TableBookingRequest::create([
            ...$data,
            'ip' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 500),
        ]);

        $this->sendNotification($record);

        return back()->with('success', 'Спасибо! Мы свяжемся с вами для подтверждения брони.');
    }

    protected function sendNotification(TableBookingRequest $r): void
    {
        $recipient = SiteSetting::get('lead_recipient_email');
        if (! $recipient) return;

        try {
            Mail::to($recipient)->send(new FormSubmitted(
                formType: 'Бронь стола в «Дусе»',
                record: $r,
                fields: [
                    'Имя гостя' => $r->name,
                    'Телефон' => $r->phone,
                    'Email' => $r->email,
                    'Желаемая дата' => $r->desired_date?->format('d.m.Y'),
                    'Время' => $r->desired_time,
                    'Гостей' => $r->guests_count,
                    'Комментарий' => $r->comment,
                    'Источник' => $r->source,
                ],
            ));
        } catch (\Throwable $e) {
            report($e);
        }
    }
}
