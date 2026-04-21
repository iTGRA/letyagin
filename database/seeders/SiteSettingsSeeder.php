<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            // ─── КОНТАКТЫ ────────────────────────────────────────────
            ['key' => 'phone',         'value' => '+7 (987) 979-00-00',          'group' => 'contacts', 'label' => 'Телефон',           'type' => 'text'],
            ['key' => 'email',         'value' => 'info@letyaginhotel.com',      'group' => 'contacts', 'label' => 'Email',             'type' => 'text'],
            ['key' => 'address_full',  'value' => '443020, Самара, ул. Самарская, 69', 'group' => 'contacts', 'label' => 'Полный адрес', 'type' => 'text'],
            ['key' => 'checkin_time',  'value' => '14:00', 'group' => 'contacts', 'label' => 'Время заезда',  'type' => 'text'],
            ['key' => 'checkout_time', 'value' => '12:00', 'group' => 'contacts', 'label' => 'Время выезда',  'type' => 'text'],

            // ─── СОЦСЕТИ ─────────────────────────────────────────────
            ['key' => 'instagram_url', 'value' => '', 'group' => 'social', 'label' => 'Instagram',  'type' => 'text'],
            ['key' => 'telegram_url',  'value' => '', 'group' => 'social', 'label' => 'Telegram',   'type' => 'text'],
            ['key' => 'whatsapp_url',  'value' => '', 'group' => 'social', 'label' => 'WhatsApp',   'type' => 'text'],

            // ─── КАРТЫ ───────────────────────────────────────────────
            ['key' => 'yandex_maps_url', 'value' => '', 'group' => 'maps', 'label' => 'Ссылка на Яндекс.Карты', 'type' => 'text'],
            ['key' => 'twogis_url',      'value' => '', 'group' => 'maps', 'label' => 'Ссылка на 2ГИС',         'type' => 'text'],
            ['key' => 'geo_lat',         'value' => '53.186358', 'group' => 'maps', 'label' => 'Широта',         'type' => 'text'],
            ['key' => 'geo_lng',         'value' => '50.101116', 'group' => 'maps', 'label' => 'Долгота',        'type' => 'text'],
            ['key' => 'map_embed',       'value' => '', 'group' => 'maps', 'label' => 'HTML-embed Яндекс.Карт',  'type' => 'textarea', 'hint' => 'Вставить iframe-код из Яндекс.Карт'],

            // ─── КОНТУР.ОТЕЛЬ ────────────────────────────────────────
            ['key' => 'kontur_hotel_id',    'value' => '', 'group' => 'integrations', 'label' => 'Контур.Отель — ID отеля', 'type' => 'text', 'hint' => 'Уточнить в ЛК Контура перед запуском'],
            ['key' => 'kontur_script_url',  'value' => 'https://bookonline24.ru/widget.js', 'group' => 'integrations', 'label' => 'URL скрипта виджета', 'type' => 'text'],
            ['key' => 'kontur_init_snippet','value' => '', 'group' => 'integrations', 'label' => 'Код инициализации (initWidget.js)', 'type' => 'textarea', 'hint' => 'Вставить фрагмент от Контура'],

            // ─── АНАЛИТИКА ───────────────────────────────────────────
            ['key' => 'yandex_metrika_id',   'value' => '', 'group' => 'analytics', 'label' => 'ID счётчика Метрики', 'type' => 'text'],
            ['key' => 'yandex_metrika_code', 'value' => '', 'group' => 'analytics', 'label' => 'Полный код счётчика Метрики', 'type' => 'textarea', 'hint' => 'Вставить <script> от Метрики целиком'],
            ['key' => 'google_tag_manager_code','value' => '', 'group' => 'analytics', 'label' => 'Код Google Tag Manager', 'type' => 'textarea'],

            // ─── ПРОМОКОД ────────────────────────────────────────────
            ['key' => 'promo_code',    'value' => 'LETYAGIN', 'group' => 'promo', 'label' => 'Промокод',      'type' => 'text'],
            ['key' => 'promo_percent', 'value' => '7',        'group' => 'promo', 'label' => 'Процент скидки','type' => 'text', 'hint' => 'Временное значение, уточнить с отелем'],
            ['key' => 'promo_caption', 'value' => 'При бронировании через сайт — скидка по промокоду', 'group' => 'promo', 'label' => 'Подпись у виджета', 'type' => 'text'],

            // ─── EMAIL ПОЛУЧАТЕЛЕЙ ФОРМ ──────────────────────────────
            ['key' => 'lead_recipient_email',    'value' => '4259623@gmail.com',             'group' => 'email', 'label' => 'Email-получатель заявок', 'type' => 'text', 'hint' => 'Тестовый адрес, заменим на info@ перед прод'],
            ['key' => 'lead_email_from_address', 'value' => 'noreply@letyaginhotel.com',     'group' => 'email', 'label' => 'Email-отправитель',       'type' => 'text'],
            ['key' => 'lead_email_from_name',    'value' => 'Сайт ЛетягинЪ',                 'group' => 'email', 'label' => 'Имя отправителя',         'type' => 'text'],

            // ─── СОСТОЯНИЯ ───────────────────────────────────────────
            ['key' => 'announcement_enabled', 'value' => '0', 'group' => 'state', 'label' => 'Бегущая строка активна',  'type' => 'boolean'],
            ['key' => 'popup_enabled',        'value' => '0', 'group' => 'state', 'label' => 'Popup активен',           'type' => 'boolean'],
        ];

        foreach ($items as $i => $item) {
            SiteSetting::updateOrCreate(
                ['key' => $item['key']],
                array_merge($item, ['sort_order' => $i]),
            );
        }
    }
}
