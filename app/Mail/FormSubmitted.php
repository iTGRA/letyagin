<?php

namespace App\Mail;

use App\Models\SiteSetting;
use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

/**
 * Единый Mailable для всех форм. Рендерит одно плейн-HTML письмо
 * с данными заявки. Получатель берётся из SiteSetting (lead_recipient_email).
 */
class FormSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $formType,     // «Бронь стола» / «Мероприятие» / «Корп-тариф» / «Обратная связь»
        public Model $record,        // экземпляр модели заявки
        public array $fields,        // [label => value]
    ) {}

    public function envelope(): Envelope
    {
        $fromAddress = SiteSetting::get('lead_email_from_address', 'noreply@letyaginhotel.com');
        $fromName = SiteSetting::get('lead_email_from_name', 'Сайт ЛетягинЪ');

        return new Envelope(
            from: new Address($fromAddress, $fromName),
            subject: "ЛетягинЪ · заявка · {$this->formType} · #{$this->record->id}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.form-submitted',
            with: [
                'formType' => $this->formType,
                'record' => $this->record,
                'fields' => $this->fields,
                'submittedAt' => $this->record->created_at?->format('d.m.Y H:i'),
            ],
        );
    }
}
