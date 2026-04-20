# Отель Летягинъ — CLAUDE.md

> Отель на волжском берегу Самары.
> Стек: Laravel 13 + Inertia 3 + React 19 (SSR) + Tailwind 4 + Orchid 14 + MySQL 9 (prod: 8)

---

## Ссылки на playbook

Общий опыт между проектами лежит в `~/.claude/playbook/`:

- `~/.claude/playbook/AGENTS.md` — 8 агентов команды
- `~/.claude/playbook/WORKFLOW.md` — промты, дроблёжка, аудит
- `~/.claude/playbook/STACK.md` — стек + cross-project правила R1–R5

Файлы агентов `.claude/agents/*.md` в этом проекте скопированы из playbook.
При изменении правил команды — править сначала здесь (локально), и только
после подтверждения на втором проекте — поднимать в playbook.

---

## Команда агентов

Проект ведут 8 агентов. Перед любой задачей — определи, кто её выполняет,
и думай как он. Детали в `.claude/agents/*.md`.

1. **architect** — схема БД, модели, маршруты, SSR-контракт, кэш
2. **design-keeper** — дизайн-система, токены, типографика (охраняет drift)
3. **backend** — controllers, services, FormRequests, Inertia responses
4. **frontend** — React-компоненты, SSR-safe, формы через Inertia.useForm
5. **admin** — Orchid Screens/Resources, удобство для владельца
6. **content** — копирайт, голос бренда, микрокопия UI
7. **conversion-engineer** — формы, CTA-карта, аналитика, throttle
8. **devops** — сервер, деплой, SSL, бэкапы, очереди

---

## Контекст проекта

**Что за проект:** отель «Летягинъ» — гостиничный комплекс на волжском
берегу Самары. Детали (тип, номерной фонд, позиционирование, история
бренда) появятся в `docs/BRIEF.md` после получения фактуры от клиента.

**Позиционирование:** уточняется в брифе.

**Целевая аудитория:** уточняется в брифе.

**Главная бизнес-задача сайта:** уточняется в брифе. По умолчанию —
лендинг + форма заявки на бронь (без PMS-интеграции на первой итерации).

**TODO до начала Фазы 2:** получить от клиента бриф, контент, фото,
дизайн-референсы. Сложить в `docs/` — тексты дословно, референсы
скриншотами в `docs/refs/`.

---

## Модели данных

Пока не заведены. Набор появится после утверждения брифа. Предполагаемая
базовая структура для отеля:

- `Room` — тип номера (название, описание, вместимость, цена, фото)
- `RoomPhoto` — галерея по номеру
- `Amenity` — услуга / удобство (SPA, ресторан, парковка и т.п.)
- `Booking` / `Lead` — заявка на бронь (имя, телефон, даты, номер, гости)
- `GalleryPhoto` — общая галерея
- `SiteSettings` — key/value store (часы работы, контакты, соцсети, toggles)

---

## Маршруты

```
GET  /              → HomeController@index (пока inline-Inertia в web.php)
/admin/*            → Orchid Dashboard
```

Расширится по мере появления страниц (номера, услуги, ресторан, контакты).

---

## Жёсткие правила проекта

Появятся после утверждения брифа. Пока работают cross-project правила
из `~/.claude/playbook/STACK.md` (R1–R5).

---

## Источники правды

1. `docs/BRIEF.md` — краткий бриф от клиента (после получения фактуры)
2. `docs/brief/*.txt` — сырые дословные тексты
3. `docs/DESIGN_SYSTEM.md` — дизайн-система (после утверждения)
4. Этот `CLAUDE.md` — агенты и процесс
5. Код

**Когда markdown противоречит сырым txt/html — правда в сырых.**

---

## QA-прогон (обязательно перед коммитом)

После ЛЮБОГО изменения — прогнать чек-лист из `~/.claude/playbook/WORKFLOW.md §4`.

Минимум:

**Публичные маршруты:**
- `GET /` → 200, в HTML есть `data-server-rendered`

**Админка:**
- `/admin` дашборд грузится (при наличии auth — по креденшалам)
- Каждый ресурс: список + create + edit → 200

**Билды:**
- `npm run build` без ошибок
- `npm run build -- --ssr` без ошибок

Любая 500-ка → читать `storage/logs/laravel.log`, чинить ДО коммита.

---

## 🌱 Выращенные правила

Правила, которые мы вывели ИЗ инцидентов на этом проекте.

### Как обогащать правила

**Триггер записи:** любой фикс бага, где симптом неочевиден из причины,
и отладка заняла больше 20 минут.

**Где сначала писать:** здесь (проектный CLAUDE.md).
**Эскалация в playbook:** только после второго подтверждения на другом проекте.

**Формат:** см. `~/.claude/playbook/CLAUDE_TEMPLATE.md` §«Как обогащать правила».

### Текущие правила

### L1. При rsync локаль→прод исключать `bootstrap/cache/*.php`

```bash
rsync -az \
  --exclude='bootstrap/cache/*.php' \   # ← важно
  --exclude='bootstrap/ssr' \
  --exclude='.env' \
  ./ na-ugle:/var/www/letyagin/
```

**Почему:** локально `composer install` ставит dev-зависимости (Pail, Pint,
Collision). Laravel кеширует их в `bootstrap/cache/packages.php` и
`services.php`. Rsync'ом эти файлы попадают на прод, где `composer install
--no-dev` dev-пакеты не установил — и на первом запросе Laravel пытается
загрузить `Laravel\Pail\PailServiceProvider` → фатал 500.

**Симптом:** `Class "Laravel\Pail\PailServiceProvider" not found` в
`storage/logs/laravel.log`.

**Фикс в инциденте:**
```bash
rm bootstrap/cache/packages.php bootstrap/cache/services.php
composer dump-autoload --optimize --no-dev
php artisan package:discover
```

**Как применять:** всегда исключать `bootstrap/cache/*.php` из rsync-деплоя
и регенерировать на сервере через `package:discover`. Это также часть
штатной деплой-последовательности (добавить в будущий CI/CD).

**Инцидент-триггер:** 2026-04-20, Фаза 2A, первый rsync после установки
@fontsource пакетов.

### L2. После rsync восстанавливать права на `storage` и `bootstrap/cache`

```bash
sudo chown -R claude:www-data /var/www/letyagin/storage /var/www/letyagin/bootstrap/cache
sudo chmod -R 775 /var/www/letyagin/storage /var/www/letyagin/bootstrap/cache
```

**Почему:** rsync `-a` сохраняет локальный owner (user `ilyakhalzov`,
group `staff`). На прод-сервере php-fpm запускается под `www-data` —
и `tempnam()` падает на записи в `storage/framework/cache/data/`, выдавая
`500 tempnam(): file created in the system's temporary directory`.

**Как применять:** после каждого rsync — восстанавливать ownership на
storage и bootstrap/cache. Войдёт в deploy-скрипт.

**Инцидент-триггер:** 2026-04-20, тот же rsync что и L1.

---

## Инфраструктура

**Локальная разработка (macOS):**
- PHP 8.3 (Homebrew) — `/opt/homebrew/opt/php@8.3/bin/php`
- Composer 2.9 (Homebrew)
- MySQL 9.6 локально, БД `letyagin`, user `letyagin`@`localhost`
- Node.js 24, npm 11
- `.npmrc` — кастомный cache в `~/.npm-cache-letyagin/` (временный фикс
  ownership issue в дефолтном `~/.npm`)

**Продакшн (будет развёрнут):**
- Домен: `https://letyagin.swipeandev.ru` (DNS готов)
- Путь: `/var/www/letyagin` (owner `claude:www-data`)
- SSR systemd: `letyagin-ssr.service`, порт `127.0.0.1:13716`
- Nginx vhost: `/etc/nginx/sites-available/letyagin`
- MySQL: БД `letyagin`, user `letyagin`@`localhost`
- Git remote: пока локально, GitHub репо будет создан перед Фазой 5
- SSH alias: `na-ugle` (тот же VDS, 85.236.186.16, Ubuntu 24.04)

**Занятые SSR-порты на сервере** (source of truth — `~/.claude/playbook/STACK.md`):
- 13714 — na-ugle
- 13715 — dom-na-utese
- **13716 — letyagin (новый)**

---

## Локальная разработка — команды

```bash
cd ~/Letyagin_Project

# первый раз
composer install
npm install
cp .env.example .env    # если .env нет
php artisan key:generate
php artisan migrate

# dev-цикл
php artisan serve          # backend на :8000
npm run dev                # Vite dev-server с HMR на :5173
# открыть http://localhost:8000

# билды
npm run build                  # клиентский bundle
npx vite build --ssr           # SSR bundle
```

**Orchid admin:**
- URL: `/admin`
- логин: `admin@letyagin.local`
- пароль: `letyaginadmin2026` (локальный dev, на проде — другой)

---

## Стоп-правила (универсальные)

1. Не коммитить `.env` и любые токены/пароли.
2. Не хардкодить пользовательские тексты в React — всё через Orchid / SiteSettings / props.
3. Не ломать SSR — никаких `window`/`document` без guard.
4. Mobile-first — 80%+ трафика с телефона.
5. Destructive ops на сервере (dropping DB, `git reset --hard`, `ufw reset`)
   — только с подтверждением.
6. Не амендить опубликованные коммиты — всегда новый коммит.
7. Не коммитить с known bug.
