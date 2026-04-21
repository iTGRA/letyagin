<?php

namespace App\Http\Middleware;

use App\Models\Announcement;
use App\Models\Popup;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

/**
 * Shared Inertia props на каждый запрос:
 *   appName, flash, siteSettings, announcement, popup.
 *
 * siteSettings — единый объект с группами (contacts/social/maps/promo/email).
 * Кэш 1 час, флашится через CacheCleaner на save SiteSetting.
 */
class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'appName' => config('app.name'),

            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
            ],

            'siteSettings' => fn () => $this->buildSiteSettings(),

            'announcement' => fn () => Cache::remember('announcement.shared', 3600, function () {
                $a = Announcement::singleton();
                if (! $a->exists || ! $a->isLive()) return null;
                return [
                    'text' => $a->text,
                    'link_url' => $a->link_url,
                    'link_text' => $a->link_text,
                    'color_variant' => $a->color_variant,
                ];
            }),

            'popup' => fn () => Cache::remember('popup.shared', 3600, function () {
                $p = Popup::singleton();
                if (! $p->exists || ! $p->isLive()) return null;
                return [
                    'title' => $p->title,
                    'body' => $p->body,
                    'image_url' => null,
                    'cta_text' => $p->cta_text,
                    'cta_url' => $p->cta_url,
                    'trigger_type' => $p->trigger_type,
                    'delay_seconds' => $p->delay_seconds,
                    'frequency' => $p->frequency,
                ];
            }),
        ];
    }

    /**
     * Сгруппированный объект settings для фронта.
     * Кэш один ключ inertia.shared — флашится через CacheCleaner
     * на save SiteSetting / Announcement / Popup / Page.
     */
    protected function buildSiteSettings(): array
    {
        return Cache::remember('inertia.shared', 3600, function () {
            $all = SiteSetting::all();

            return [
                'contacts' => [
                    'phone'         => $all['phone'] ?? '',
                    'phone_tel'     => preg_replace('/[^\d+]/', '', $all['phone'] ?? ''),
                    'email'         => $all['email'] ?? '',
                    'address_full'  => $all['address_full'] ?? '',
                    'checkin_time'  => $all['checkin_time'] ?? '',
                    'checkout_time' => $all['checkout_time'] ?? '',
                ],
                'social' => [
                    'instagram_url' => $all['instagram_url'] ?? '',
                    'telegram_url'  => $all['telegram_url'] ?? '',
                    'whatsapp_url'  => $all['whatsapp_url'] ?? '',
                ],
                'maps' => [
                    'yandex_maps_url' => $all['yandex_maps_url'] ?? '',
                    'twogis_url'      => $all['twogis_url'] ?? '',
                    'geo_lat'         => $all['geo_lat'] ?? '',
                    'geo_lng'         => $all['geo_lng'] ?? '',
                    'map_embed'       => $all['map_embed'] ?? '',
                ],
                'promo' => [
                    'code'    => $all['promo_code'] ?? 'LETYAGIN',
                    'percent' => $all['promo_percent'] ?? '',
                    'caption' => $all['promo_caption'] ?? '',
                ],
                'kontur' => [
                    'hotel_id'   => $all['kontur_hotel_id'] ?? '',
                    'script_url' => $all['kontur_script_url'] ?? '',
                    'init_snippet' => $all['kontur_init_snippet'] ?? '',
                ],
                'analytics' => [
                    'yandex_metrika_id'   => $all['yandex_metrika_id'] ?? '',
                    'yandex_metrika_code' => $all['yandex_metrika_code'] ?? '',
                    'gtm_code'            => $all['google_tag_manager_code'] ?? '',
                ],
            ];
        });
    }
}
