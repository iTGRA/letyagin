# ARCHITECTURE — Бутик-отель ЛетягинЪ

> Источник правды по схеме БД, Eloquent-моделям, маршрутам, кэшу и
> контракту Inertia props. Утверждается Ильёй до написания миграций.
>
> При конфликте с IA.md/BRIEF.md — приоритет за этими документами.
> При конфликте с кодом — правим код, не этот файл.

---

## 1. Принципы

1. **Key-value для singular настроек** — один `SiteSettings` на все строки уровня «телефон», «код метрики», «процент промокода». Никогда не плодим таблицы под разовые поля.
2. **Коллекционные модели — каждая своя таблица**. Номера, отзывы, блюда — Eloquent с полями, связями, сортировкой.
3. **Singleton-модели через id=1**. Announcement, Popup, ChefProfile-подобные — `Model::query()->firstOrNew(['id' => 1])`. В Orchid — один экран без списка.
4. **Slug где есть публичная страница**. Room, NearbyPlace, Page — да. Review, FAQ, Service — нет.
5. **`is_active`/`sort_order`/`timestamps`** — на всех контентных моделях по умолчанию.
6. **Кэш по событию модели** — `saved`/`deleted` событие вычищает кэш через service-level listener.
7. **Формы — отдельные таблицы** с `source`, `status`, `ip`, `user_agent`. Потом отчётность через Orchid.
8. **Page-модель для SEO** — per-URL метаданные, редактируются в админке.

---

## 2. Контракт IDов и slug'ов

| Модель | PK | Публичный slug | URL |
|---|---|---|---|
| Room | id | `slug` UNIQUE | `/rooms/{slug}` |
| NearbyPlace | id | `slug` UNIQUE | `/nearby#{slug}` (якорь, пока не отдельная страница) |
| Page | id | `slug` UNIQUE | `/` (пусто), `rooms`, `restaurant`, `letyagin-hall`, `about`, `nearby`, `contacts`, `corporate` |

Rooms slug'и — предварительно (из SEO.md §3.3):
```
standart-single       standart          comfort          comfort-twin
junior-twin           deluxe            avdotya          junior-suite
junior-semilux        lux               junior-suite-letyagin   letyagin-lux
```
Итого 12 базовых — но у нас 19 комнат. **Следствие:** несколько комнат делят категорию — нужен либо суффикс (`standart-1`, `standart-2`), либо принять, что 19 → 12 URL. **Решение на утверждение Ильи, открыто в §9.**

---

## 3. Модели — детальная схема

### 3.1 SiteSettings (key-value store)

```
id            BIGINT UNSIGNED PK AUTO_INCREMENT
key           VARCHAR(120) UNIQUE NOT NULL
value         TEXT NULLABLE
group         VARCHAR(60) DEFAULT 'general'
label         VARCHAR(200) NULLABLE   -- человекочитаемый заголовок для Orchid
hint          VARCHAR(500) NULLABLE   -- подсказка в админке
type          ENUM('text','textarea','boolean','json','file','color') DEFAULT 'text'
sort_order    INT DEFAULT 0
timestamps
```

**Helper:** `SiteSettings::get('key', $default)` кеширует на час, флашит на `saved`.

**Ключи (стартовый сид):**
```
# КОНТАКТЫ
phone                  "+7 (987) 979-00-00"       group=contacts
email                  "info@letyaginhotel.com"   group=contacts
address_full           "443020, Самара, ул. Самарская, 69"  group=contacts
checkin_time           "14:00"                    group=contacts
checkout_time          "12:00"                    group=contacts

# СОЦСЕТИ
instagram_url          ""                         group=social
telegram_url           ""                         group=social
whatsapp_url           ""                         group=social

# КАРТЫ
yandex_maps_url        ""                         group=maps
twogis_url             ""                         group=maps
geo_lat                "53.186358"                group=maps
geo_lng                "50.101116"                group=maps
map_embed              ""                         group=maps  (текст — Яндекс embed-код)

# ИНТЕГРАЦИЯ КОНТУР.ОТЕЛЬ
kontur_hotel_id        ""                         group=integrations  (пусто до прод-данных)
kontur_script_url      "https://bookonline24.ru/widget.js"  group=integrations
kontur_init_snippet    ""                         group=integrations  (html/js от клиента)

# АНАЛИТИКА
yandex_metrika_id      ""                         group=analytics
yandex_metrika_code    ""                         group=analytics  (полный код счётчика)
google_tag_manager_code ""                        group=analytics

# ПРОМОКОД
promo_code             "LETYAGIN"                 group=promo
promo_percent          "7"                        group=promo  (пока плейсхолдер, уточняем с отелем)
promo_caption          "При бронировании через сайт — скидка по промокоду"  group=promo

# EMAIL ПОЛУЧАТЕЛЕЙ ФОРМ
lead_recipient_email        "4259623@gmail.com"   group=email  (тестовый, заменим на info@ перед прод)
lead_email_from_address     "noreply@letyaginhotel.com"  group=email
lead_email_from_name        "Сайт ЛетягинЪ"       group=email

# СОСТОЯНИЯ
announcement_enabled    "0"                       group=state
popup_enabled           "0"                       group=state
```

---

### 3.2 HeroSlide

```
id           BIGINT PK
image_id     BIGINT NULLABLE  -- orchid_attachments FK
video_url    VARCHAR(500) NULLABLE  -- Rutube/YouTube URL для видео-hero (будущее)
title        VARCHAR(200) NULLABLE  -- per-slide override
subtitle     VARCHAR(400) NULLABLE
is_active    BOOLEAN DEFAULT 1
sort_order   INT DEFAULT 0
timestamps
```

Общий slogan hero хранится в `Page` модели (главная), per-slide — опционально.

---

### 3.3 Room + RoomPhoto + RoomAmenity pivot

**Rooms:**
```
id               BIGINT PK
slug             VARCHAR(120) UNIQUE NOT NULL
name             VARCHAR(200) NOT NULL           -- «ЛетягинЪ Люкс»
category         VARCHAR(60) NOT NULL            -- standart|comfort|junior|deluxe|lux|avdotya (enum-like)
area_m2          SMALLINT UNSIGNED NOT NULL       -- 50
guests           TINYINT UNSIGNED NOT NULL        -- 2
extra_bed        BOOLEAN DEFAULT 0
view_text        VARCHAR(200) NULLABLE            -- «Двор, крыши»
short_description TEXT NULLABLE                   -- 1-2 предложения, для карточки
description      LONGTEXT NULLABLE                -- полный rich-text для страницы
features         JSON NULLABLE                    -- ["Винтажная ванна", "Выход во двор", ...]
is_quiet         BOOLEAN DEFAULT 0                -- «окна во двор»
is_featured      BOOLEAN DEFAULT 0                -- hero на /rooms
hero_image_id    BIGINT NULLABLE
video_url        VARCHAR(500) NULLABLE            -- Rutube
seo_title        VARCHAR(255) NULLABLE
seo_description  VARCHAR(500) NULLABLE
is_active        BOOLEAN DEFAULT 1
sort_order       INT DEFAULT 0
timestamps

INDEX (slug), INDEX (category, is_active, sort_order)
```

**RoomPhotos (галерея, one-to-many):**
```
id             BIGINT PK
room_id        BIGINT NOT NULL (FK)
image_id       BIGINT NOT NULL
alt_text       VARCHAR(200)
sort_order     INT DEFAULT 0
timestamps
```

**RoomAmenities (справочник) + pivot:**
```
room_amenities:
  id, name, icon_name, sort_order, is_active, timestamps

room_amenity_room (pivot):
  room_id, amenity_id, PRIMARY KEY(room_id, amenity_id)
```

---

### 3.4 Service

Блок «Услуги и удобства» на главной.

```
id           BIGINT PK
name         VARCHAR(200) NOT NULL      -- «Охраняемая парковка»
description  VARCHAR(500) NULLABLE      -- «Бесплатно для гостей»
icon_name    VARCHAR(80) NULLABLE       -- имя SVG-иконки
sort_order   INT DEFAULT 0
is_active    BOOLEAN DEFAULT 1
timestamps
```

---

### 3.5 NearbyPlace

```
id            BIGINT PK
slug          VARCHAR(120) UNIQUE
name          VARCHAR(200) NOT NULL          -- «Театр Оперы и Балета»
category      ENUM('culture','food','walks','shopping','arts','other')
description   TEXT
image_id      BIGINT NULLABLE
distance_m    INT UNSIGNED                   -- 600
walk_minutes  TINYINT UNSIGNED               -- 7
geo_lat       DECIMAL(9,6) NULLABLE
geo_lng       DECIMAL(9,6) NULLABLE
url           VARCHAR(500) NULLABLE          -- внешний сайт
sort_order    INT DEFAULT 0
is_active     BOOLEAN DEFAULT 1
timestamps
```

---

### 3.6 RestaurantMenuItem

```
id            BIGINT PK
name          VARCHAR(200) NOT NULL
category      ENUM('breakfast','starter','soup','main','dessert','drink','other')
description   TEXT
price_hint    VARCHAR(60) NULLABLE           -- «от 650 ₽» (текст, не число)
image_id      BIGINT NULLABLE
is_featured   BOOLEAN DEFAULT 0              -- на превью главной/ресторана
is_available  BOOLEAN DEFAULT 1
sort_order    INT DEFAULT 0
timestamps
```

---

### 3.7 TeamMember

```
id           BIGINT PK
name         VARCHAR(200) NOT NULL       -- «Иван Жуковкин»
role         VARCHAR(200) NOT NULL       -- «Шеф-повар»
slug         VARCHAR(120) UNIQUE         -- будущие страницы биографий, опционально
bio          TEXT
photo_id     BIGINT NULLABLE
facts        JSON NULLABLE               -- [{"label":"стаж","value":"14 лет"}, ...]
is_featured  BOOLEAN DEFAULT 0           -- на главной/ресторане
is_active    BOOLEAN DEFAULT 1
sort_order   INT DEFAULT 0
timestamps
```

---

### 3.8 GalleryItem

«Галерея деталей» — клеймо, интерьер, фактуры.

```
id           BIGINT PK
image_id     BIGINT NOT NULL
alt_text     VARCHAR(200) NOT NULL
caption      VARCHAR(500) NULLABLE
category     VARCHAR(60) NULLABLE        -- interior|detail|terrace|bath|restaurant|exterior
aspect       ENUM('tall','wide','square') DEFAULT 'wide'   -- для masonry/asymmetric grid
is_active    BOOLEAN DEFAULT 1
sort_order   INT DEFAULT 0
timestamps
```

---

### 3.9 Review

```
id           BIGINT PK
author_name  VARCHAR(200) NOT NULL
source       ENUM('yandex','twogis','ostrovok','101hotels','manual') NOT NULL
source_url   VARCHAR(500) NULLABLE
rating       TINYINT UNSIGNED       -- 1..5
text         TEXT NOT NULL
topic        VARCHAR(60) NULLABLE   -- service|breakfast|location|feeling|general
posted_at    DATE NULLABLE
is_featured  BOOLEAN DEFAULT 0
is_active    BOOLEAN DEFAULT 1
sort_order   INT DEFAULT 0
timestamps
```

---

### 3.10 FAQ

```
id           BIGINT PK
question     VARCHAR(500) NOT NULL
answer       TEXT NOT NULL
sort_order   INT DEFAULT 0
is_active    BOOLEAN DEFAULT 1
timestamps
```

---

### 3.11 HistoryMilestone

Вехи таймлайна.

```
id           BIGINT PK
year_label   VARCHAR(30) NOT NULL       -- «1883» / «Сегодня»
headline     VARCHAR(200) NOT NULL
body         TEXT NOT NULL
image_id     BIGINT NULLABLE
sort_order   INT NOT NULL               -- для хронологического порядка
is_active    BOOLEAN DEFAULT 1
timestamps
```

---

### 3.12 Announcement (singleton, id=1)

```
id              BIGINT PK
is_enabled      BOOLEAN DEFAULT 0
text            VARCHAR(500) NOT NULL
link_url        VARCHAR(500) NULLABLE
link_text       VARCHAR(200) NULLABLE
color_variant   ENUM('coral','brick','moss','ink') DEFAULT 'coral'
date_from       TIMESTAMP NULLABLE
date_to         TIMESTAMP NULLABLE
timestamps
```

---

### 3.13 Popup (singleton, id=1)

```
id              BIGINT PK
is_enabled      BOOLEAN DEFAULT 0
title           VARCHAR(200) NOT NULL
body            TEXT NOT NULL
image_id        BIGINT NULLABLE
cta_text        VARCHAR(200) NULLABLE
cta_url         VARCHAR(500) NULLABLE
trigger_type    ENUM('on_load','on_exit','on_scroll_50') DEFAULT 'on_load'
delay_seconds   SMALLINT UNSIGNED DEFAULT 0
frequency       ENUM('every_visit','once_per_session','once_per_user') DEFAULT 'once_per_session'
date_from       TIMESTAMP NULLABLE
date_to         TIMESTAMP NULLABLE
timestamps
```

---

### 3.14 Page (per-URL SEO + контент)

```
id             BIGINT PK
slug           VARCHAR(120) UNIQUE NOT NULL  -- '' (главная), 'rooms', 'restaurant', ...
h1             VARCHAR(300) NULLABLE
meta_title     VARCHAR(300) NULLABLE
meta_description VARCHAR(500) NULLABLE
og_image_id    BIGINT NULLABLE
intro_text     TEXT NULLABLE                 -- для hero subtitle главной
extra          JSON NULLABLE                 -- любые страничные строки (headline секции, подписи)
schema_type    ENUM('Hotel','Restaurant','Article','Event','Organization') DEFAULT 'Hotel'
is_active      BOOLEAN DEFAULT 1
timestamps
```

Страница не удаляется — просто редактируется.

---

### 3.15 TableBookingRequest (форма ресторана)

```
id               BIGINT PK
name             VARCHAR(200) NOT NULL
phone            VARCHAR(60) NOT NULL
email            VARCHAR(200) NULLABLE
desired_date     DATE NOT NULL
desired_time     TIME NOT NULL
guests_count     TINYINT UNSIGNED NOT NULL
comment          TEXT NULLABLE
source           VARCHAR(80) NOT NULL      -- CTA-тег из IA.md (restaurant-book-table, home-restaurant, ...)
status           ENUM('new','contacted','confirmed','cancelled') DEFAULT 'new'
admin_notes      TEXT NULLABLE
ip               VARCHAR(45)
user_agent       VARCHAR(500)
created_at, updated_at

INDEX (status, created_at)
```

---

### 3.16 EventRequest (форма мероприятий)

```
id               BIGINT PK
name             VARCHAR(200) NOT NULL
phone            VARCHAR(60) NOT NULL
email            VARCHAR(200) NULLABLE
event_type       ENUM('wedding','banquet','conference','birthday','corporate','other') NOT NULL
event_date       DATE NULLABLE
guests_count     SMALLINT UNSIGNED NULLABLE
comment          TEXT NULLABLE
source           VARCHAR(80) NOT NULL
status           ENUM('new','contacted','booked','declined','cancelled') DEFAULT 'new'
admin_notes      TEXT NULLABLE
ip, user_agent, timestamps

INDEX (status, event_date)
```

---

### 3.17 CorporateRequest

```
id               BIGINT PK
name             VARCHAR(200) NOT NULL
company          VARCHAR(300) NOT NULL
phone            VARCHAR(60) NOT NULL
email            VARCHAR(200) NOT NULL
estimated_nights_per_year SMALLINT UNSIGNED NULLABLE
comment          TEXT NULLABLE
source           VARCHAR(80) NOT NULL
status           ENUM('new','contacted','signed','declined') DEFAULT 'new'
admin_notes      TEXT NULLABLE
ip, user_agent, timestamps

INDEX (status, created_at)
```

---

### 3.18 ContactFormRequest

```
id               BIGINT PK
name             VARCHAR(200) NOT NULL
phone            VARCHAR(60) NULLABLE
email            VARCHAR(200) NULLABLE
message          TEXT NOT NULL
source           VARCHAR(80) NOT NULL
status           ENUM('new','replied','closed') DEFAULT 'new'
admin_notes      TEXT NULLABLE
ip, user_agent, timestamps
```

Хотя бы одно из phone/email — обязательно (валидация на уровне FormRequest).

---

### 3.19 (опционально, под вопросом) HomepageBlockToggles

Если появится необходимость включать/отключать блоки главной из админки без кода — завести отдельную таблицу `homepage_blocks` со списком блоков и флагом `is_enabled`. **На старте не закладываем — все 16 блоков жёстко в порядке по IA.md.**

---

## 4. Eloquent-модели — связи и ключевые методы

```
Room
  - belongsToMany RoomAmenity  (pivot: room_amenity)
  - hasMany RoomPhoto
  - belongsTo Attachment hero_image
  - scopeActive(), scopeFeatured(), scopeByCategory($cat)

RoomAmenity  belongsToMany Room

NearbyPlace  scopeActive(), scopeByCategory()

RestaurantMenuItem  scopeAvailable(), scopeFeatured()

Review  scopeActive(), scopeFeatured(), scopeByTopic()

Page  staticfirstForSlug($slug) — firstOrCreate c defaults

Announcement / Popup — override getKeyType(), singleton()-метод для id=1

SiteSettings  static get($key, $default = null) с Cache
```

---

## 5. Маршруты

### Публичные (web.php)
```php
Route::get('/',                       HomeController::class)->name('home');
Route::get('/rooms',                  RoomsIndexController::class)->name('rooms.index');
Route::get('/rooms/{room:slug}',      RoomsShowController::class)->name('rooms.show');
Route::get('/restaurant',             RestaurantController::class)->name('restaurant');
Route::get('/letyagin-hall',          HallController::class)->name('hall');
Route::get('/about',                  AboutController::class)->name('about');
Route::get('/nearby',                 NearbyController::class)->name('nearby');
Route::get('/contacts',               ContactsController::class)->name('contacts');
Route::get('/corporate',              CorporateController::class)->name('corporate');  // скрытая
Route::get('/lab',                    fn () => Inertia::render('Lab'));  // только staging, удалим
```

### API форм (middleware: throttle:5,1)
```php
Route::prefix('api/forms')->middleware('throttle:5,1')->group(function () {
    Route::post('restaurant-booking', TableBookingController::class)->name('forms.restaurant');
    Route::post('event-request',      EventRequestController::class)->name('forms.event');
    Route::post('corporate-request',  CorporateRequestController::class)->name('forms.corporate');
    Route::post('contact',            ContactController::class)->name('forms.contact');
});
```

### Admin
```
/admin/* → Orchid
```

---

## 6. Orchid Resources → модели

| Orchid Screen/Resource | Модель | Тип |
|---|---|---|
| `SiteSettingsScreen` | SiteSettings | tabbed screen по `group`: contacts / social / maps / integrations / analytics / promo / email / state |
| `HeroSlideResource` | HeroSlide | list + form, drag-n-drop sort |
| `RoomResource` | Room | list с фильтрами (категория, активен), form c nested RoomPhoto gallery + amenities picker |
| `RoomAmenityResource` | RoomAmenity | simple справочник |
| `ServiceResource` | Service | simple list + form |
| `NearbyPlaceResource` | NearbyPlace | list с фильтром по категории + map preview |
| `RestaurantMenuItemResource` | RestaurantMenuItem | list с фильтром по категории |
| `TeamMemberResource` | TeamMember | список + form с JSON-редактором facts |
| `GalleryItemResource` | GalleryItem | grid-превью + масса-загрузка |
| `ReviewResource` | Review | list с фильтрами по источнику, featured-тогглом |
| `FAQResource` | FAQ | drag-n-drop |
| `HistoryMilestoneResource` | HistoryMilestone | drag-n-drop |
| `AnnouncementScreen` | Announcement | singleton — редактирование одной записи |
| `PopupScreen` | Popup | singleton |
| `PageResource` | Page | list (9 записей), form с tabs SEO / контент |
| `TableBookingRequestResource` | — | read-heavy, статус-смена |
| `EventRequestResource` | — | read-heavy, статус-смена |
| `CorporateRequestResource` | — | read-heavy, статус-смена |
| `ContactFormRequestResource` | — | read-heavy, статус-смена |
| `Dashboard` (screen) | — | плитки метрик + «Открыт/закрыт сегодня» toggle (SiteSettings.is_open) + быстрые ссылки |

**Итого 19 ресурсов + 1 дашборд = 20 экранов.**

---

## 7. Inertia props — контракт

**Shared (каждый запрос):**
```js
{
  appName: string,
  flash: { success, error },
  siteSettings: {            // из SiteSettings, кешируется
    contacts: { phone, email, address_full, checkin_time, checkout_time },
    social:   { instagram_url, telegram_url, whatsapp_url },
    maps:     { yandex_maps_url, geo_lat, geo_lng },
    promo:    { code, percent, caption },
    kontur:   { script_url },
  },
  announcement: null | {
    text, link_url, link_text, color_variant
  },
  popup: null | { /* если активен */ },
}
```

**Per-page:**
```js
// Home (пример)
{
  page: { h1, meta_title, meta_description, og_image, intro_text, extra },
  heroSlides: HeroSlide[],
  featuredRooms: Room[5],
  services: Service[],
  featuredMenuItems: RestaurantMenuItem[5],
  featuredChef: TeamMember | null,
  nearbyPreview: NearbyPlace[8],
  historyPreview: HistoryMilestone[5],
  galleryPreview: GalleryItem[12],
  featuredReviews: Review[6],
  faqs: FAQ[],
}

// Room show
{
  page, room: { ...fields, photos, amenities },
  similarRooms: Room[3],
}
```

---

## 8. Кэш

**Что кэшим:**
- `SiteSettings::all()` → 1 час, ключ `site.settings`
- `featuredRooms` / `allActiveRooms` → 1 день
- `reviewsFeatured` → 1 час
- `nearbyPlaces` → 1 день
- `menuItemsFeatured` → 1 час

**Как инвалидируем:**
- Единый `CacheCleaner` service
- Eloquent события `saved`/`deleted` для каждой модели → вызывают `CacheCleaner::forModel($model)` → флашит свои ключи
- `AppServiceProvider::boot()` навешивает observers

**Что НЕ кэшим:**
- Заявки (формы) — read редко, всегда свежие
- Orchid views — платформа управляет сама
- Страницы номеров детальные — рендерим из модели, но отдаём через Inertia (Laravel route cache + OPcache делают своё)

---

## 9. Решения на утверждение Ильёй

Ответить на каждое — потом пишем миграции.

- [ ] **D1. Номера: 19 записей = 19 slug'ов?**
  В SEO.md 12 базовых slug'ов (по категориям). У отеля 19 физ. номеров.
  Вариант А: 19 записей Room, у каждого свой slug (`standart`, `standart-2`, или `standart-101`...). Каждая → своя страница.
  Вариант B: 19 записей, но несколько делят slug — тогда у Room должен быть ещё `room_number` и один slug для категории.
  Вариант C: 12 категорий = 12 Room-записей, внутри каждой хранится `rooms_count`, а отдельной сущностью идёт «физическая комната» (но это нам сейчас не нужно).

  **Рекомендация:** А — 19 уникальных записей, уникальные slug'и, 19 публичных страниц. Максимум гибкости, не усложняем схему.

- [ ] **D2. `Page` — фиксированный список или редактируемый?**
  Фиксируем 9 слагов в сидере, не даём создавать новые через Orchid (только edit). Это предотвращает «случайные» страницы.

- [ ] **D3. `Announcement` / `Popup` — true singleton?**
  Редактируем единственную запись. В Orchid — экран без списка, метод `query()` возвращает `firstOrNew(1)`.

- [ ] **D4. Room category — VARCHAR или отдельная таблица?**
  Пока VARCHAR с enum-валидацией на Laravel-уровне. Если клиент захочет добавлять категории — мигрируем в отдельную таблицу `room_categories`. Стартуем с жёстких 10 значений: `standart, comfort, comfort-twin, junior-twin, deluxe, avdotya, junior-suite, junior-semilux, lux, junior-suite-letyagin, letyagin-lux`.

- [ ] **D5. Rutube-видео — одна ссылка на номер?**
  У 7 номеров есть видео (AUDIT 3.1). Храним как VARCHAR(500) `video_url` на Room. Фронт определяет Rutube/YouTube по домену.

- [ ] **D6. `Review.source='manual'` — нужно ли?**
  Да. Админ может добавить цитату, которую гость прислал лично (не с Яндекса).

- [ ] **D7. `homepage_blocks` toggles — нужна?**
  **Не на старте.** Порядок и включённость блоков главной — жёстко в коде. Если клиент захочет скрывать блоки — добавим таблицу позже. Экономим сложность.

- [ ] **D8. Lab-страница — удалить из продакшн-роутов?**
  Пока оставляем доступной — она нужна для обсуждения дизайн-системы. Перед реальным запуском удаляем маршрут `/lab` + файл `Pages/Lab.jsx`.

---

## 10. План реализации Фазы 2B

Последовательность (каждый пункт — commit):

1. **Миграции** — 19 миграций + 2 pivot + 1 на создание файла таблицы Orchid attachments (уже есть)
2. **Модели** — 19 Eloquent-моделей с fillable, casts, relations, scopes
3. **Сидеры** — realistic-данные из брифа (5-6 номеров, 6 цитат-отзывов, 8 мест, манифест, FAQ)
4. **Factories** — для каждой модели, нужные для будущих тестов
5. **CacheCleaner + Observers** — автоинвалидация
6. **SiteSettings helper** — `SiteSettings::get()` + кэш
7. **Orchid Resources** — 19 CRUD-экранов + Dashboard
8. **Контроллеры публичных страниц** — 9 controllers, все возвращают `Inertia::render('PageName', [...])`, props = кешированные коллекции
9. **Shared Inertia props** — HandleInertiaRequests возвращает siteSettings + announcement + popup
10. **Форм-контроллеры + FormRequests + Mailables** — 4 формы, каждая: валидация → store → mail
11. **SEO-хелпер** — компонент `<SeoHead>` на React + middleware Laravel для schema.org inject
12. **Smoke test** — руками проходим все маршруты, заполняем формы, проверяем что письма приходят, админка не падает на singleton-экранах

Примерная длительность: 3-4 рабочих дня концентрированной работы.

---

## 11. Что НЕ делаем в Фазе 2B

- Финальные тексты (это Фаза 2C, CONTENT-агент)
- Готовые фото-активы (Фаза 2C, после получения)
- Стилизация React-блоков (Фаза 2C-D)
- Интеграцию с Контур.Отелем (ждём prod-данных)
- Яндекс.Метрику (встроим позже, код через админку)
- Schema.org JSON-LD (Фаза 4)
- Деплой на прод-домен `letyaginhotel.com` (Фаза 5)

---

*Статус: [ ] Черновик на утверждение → [ ] Утверждён Ильёй → [ ] Реализован*
