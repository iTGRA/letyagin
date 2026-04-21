<?php

declare(strict_types=1);

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCorporateRequest;
use App\Mail\FormSubmitted;
use App\Models\CorporateRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class CorporateRequestController extends Controller
{
    public function __invoke(StoreCorporateRequest $request): RedirectResponse
    {
        $data = $request->validated();
        unset($data['consent'], $data['_hp']);

        $record = CorporateRequest::create([
            ...$data,
            'ip' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 500),
        ]);

        $recipient = SiteSetting::get('lead_recipient_email');
        if ($recipient) {
            try {
                Mail::to($recipient)->send(new FormSubmitted(
                    formType: 'Заявка на корп-договор',
                    record: $record,
                    fields: [
                        'Контактное лицо' => $record->name,
                        'Компания' => $record->company,
                        'Телефон' => $record->phone,
                        'Email' => $record->email,
                        'Ночей в год' => $record->estimated_nights_per_year,
                        'Комментарий' => $record->comment,
                        'Источник' => $record->source,
                    ],
                ));
            } catch (\Throwable $e) {
                report($e);
            }
        }

        return back()->with('success', 'Заявка получена. Наш менеджер свяжется с вами в рабочий день.');
    }
}
