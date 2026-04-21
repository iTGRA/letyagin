<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Dashboard;

use App\Models\ContactFormRequest;
use App\Models\CorporateRequest;
use App\Models\EventRequest;
use App\Models\Faq;
use App\Models\NearbyPlace;
use App\Models\Review;
use App\Models\Room;
use App\Models\TableBookingRequest;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Fields\Label;
use Orchid\Screen\Screen;
use Orchid\Screen\Sight;
use Orchid\Support\Facades\Layout;

class DashboardScreen extends Screen
{
    public function query(): iterable
    {
        return [
            'metrics' => [
                'rooms_total'       => Room::count(),
                'rooms_active'      => Room::where('is_active', true)->count(),
                'reviews_featured'  => Review::featured()->count(),
                'faqs_active'       => Faq::active()->count(),
                'places_active'     => NearbyPlace::active()->count(),
                'new_table'         => TableBookingRequest::where('status', 'new')->count(),
                'new_event'         => EventRequest::where('status', 'new')->count(),
                'new_corporate'     => CorporateRequest::where('status', 'new')->count(),
                'new_contact'       => ContactFormRequest::where('status', 'new')->count(),
            ],
        ];
    }

    public function name(): ?string { return 'ЛетягинЪ — дашборд'; }

    public function description(): ?string
    {
        return 'Быстрые метрики + новые заявки + переходы к ключевым разделам.';
    }

    public function layout(): iterable
    {
        return [
            Layout::metrics([
                'Всего номеров'      => 'metrics.rooms_total',
                'Активных'           => 'metrics.rooms_active',
                'Избр. отзывов'      => 'metrics.reviews_featured',
                'FAQ'                => 'metrics.faqs_active',
                'Мест в путеводителе'=> 'metrics.places_active',
            ]),

            Layout::metrics([
                'Новых — бронь стола'      => 'metrics.new_table',
                'Новых — мероприятия'      => 'metrics.new_event',
                'Новых — корп-тариф'       => 'metrics.new_corporate',
                'Новых — обратная связь'   => 'metrics.new_contact',
            ]),

            Layout::view('platform::dummy'),
        ];
    }
}
