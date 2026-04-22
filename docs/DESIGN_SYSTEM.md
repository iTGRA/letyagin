# DESIGN_SYSTEM — Бутик-отель ЛетягинЪ

> Источник правды по визуальной системе проекта.
> При конфликте с кодом или другими документами — **побеждает этот**.
> Редактирует только DESIGN-KEEPER.

---

## 1. Палитра

### 1.1 Базовая (основа системы)

| Роль | Имя | HEX | Token |
|------|-----|-----|-------|
| Ink / текст | Rum Raisin | `#3A1B1C` | `ink` |
| Paper / фон | Snow Drizzle | `#CFC6BB` | `paper` |
| Rust / CTA | Burnt Orange | `#A54A20` | `rust` |
| Rust hover/pressed | Deep Rust | `#7D3818` | `rust-deep` |
| Moss / детали | Moss Green | `#635729` | `moss` |
| Surface / карточки | Light Surface | `#F5F1EC` | `surface` |
| Line / разделители | Line | `#8A7E6E` | `line` |
| Error | Error Red | `#A83D2B` | `error` |
| Success | Moss Success | `#5C7A3A` | `success` |

**Где использовать:**
- `paper` — основной фон сайта (тёплый лён — НЕ белый)
- `ink` — весь текст и ink-секции (финальный CTA, цитаты-кинематография)
- `rust` — ТОЛЬКО для CTA и ключевых акцентов. Редкий.
- `moss` — вторичные акценты: категории, подписи, иконки удобств
- `surface` — карточки, модальные окна, secondary-секции (отдых от `paper`)
- `line` — разделители, тонкие рамки 1px
- `rust-deep` — hover-состояние для rust-кнопок

### 1.2 Расширенная (добавлена в Фазе 2A после /lab v2)

Точечные токены, НЕ заменяют базовые. Каждый имеет узкую роль.

| Роль | Имя | HEX | Token | Где использовать |
|------|-----|-----|-------|------------------|
| Ночной cool-акцент | Slate | `#2E3D4D` | `slate` | Редко. «Холл ночью», корп-блок, вечер-моменты |
| Кирпичный красный | Brick | `#9C2D2A` | `brick` | Серьёзный CTA в тёмных секциях, «кирпич» как материал |
| Тёплый мягкий red | Coral | `#CB5041` | `coral` | Friendly-вариант rust: тэги, announcement, inline-метки |
| Светлый Moss | Sage | `#899370` | `sage` | Surface в Дусе (карточки с зеленью), quieter moss-alternative |
| Камень | Stone | `#A39A8C` | `stone` | Ambient surface между paper и ink, тихие блоки |
| Уголь (value-anchor) | Coal | `#1A1817` | `coal` | Newsprint-hero, Swiss-типографика, строгие цитатные секции |
| Кость (value-anchor) | Bone | `#F1ECE3` | `bone` | Фон карточек отзывов, галерейные детали, FAQ-surface |

**Правила:**
- Расширенная палитра не ломает базовую. `rust` остаётся главным CTA.
- `slate` — единственный cool-токен в системе. Использовать 1-2 раза на сайт, не более.
- `brick` и `coral` — оба красные, но **разные роли**: brick = серьёзно/материал, coral = приветливо/метка.
- `sage` и `stone` — оба светлые «между paper и moss/ink», но: sage = зелёный под Дусю, stone = нейтральный.
- `coal` ≠ `ink`: **coal** — чернее и холоднее (near-black #1A1817), для Swiss-типографики; **ink** — тёплый бордо (#3A1B1C), для основных ink-секций. Не взаимозаменяемы.
- `bone` ≠ `surface`: **bone** — светлее и нейтральнее (#F1ECE3), для фона фото/цитат; **surface** — тёплый (#F5F1EC), для карточек.
- НЕ миксовать `slate` с `moss` в одной секции — холодное с тёплым вместе зачесается.

---

## 2. Hero-цвет по страницам (финальная карта — 2026-04-21)

Каждая страница = свой ключ-цвет. Hero занимает `min-h-screen`, body после
него всегда `paper` (кроме full-bleed moss/ink секций на главной). Это
создаёт ритм и мгновенно узнаваемость раздела.

| Страница | Фон hero | Token | heroTone |
|----------|----------|-------|----------|
| `/` главная | Light Surface | `surface` | `light` |
| `/rooms` каталог | Sage | `sage` | `dark` |
| `/rooms/[slug]` номер | Brick | `brick` | `dark` |
| `/restaurant` Дуся | Moss Green | `moss` | `dark` |
| `/letyagin-hall` Холл | Rum Raisin | `ink` | `dark` |
| `/about` история | Slate | `slate` | `dark` |
| `/nearby` путеводитель | Coral | `coral` | `dark` |
| `/contacts` | Brick | `brick` | `dark` |
| `/corporate` | Stone | `stone` | `light` |

**heroTone** управляет цветом sticky-header (см. §12). Передаётся в
`<Layout heroTone="...">` в каждой Page.

**Обоснование:**
- **Surface** на главной — светлейший: приглашение, tabula rasa
- **Sage** на номерах — жилое, мирное, спокойное (светлый moss)
- **Brick** на карточке номера и контактах — кирпич как материал дома
- **Moss** на Дусе — «русское зелёное» (грузди, укроп, медная кухня)
- **Ink** на Холле — вечер, торжество, свадьбы-банкеты
- **Slate** на истории — ночной архив, холодная дистанция XIX века
- **Coral** на путеводителе — приглашение «выйти во двор»
- **Stone** на корпоративе — нейтральный warm, деловая речь

Один цвет не повторяется соседями в меню — навигация физически
переключает глаз.

---

## 3. Типографика (утверждена)

| Роль | Шрифт | Где | Размер / weight |
|------|-------|-----|-----------------|
| Display | **Cormorant Garamond** | H1, H2, цитаты | 48–130px / 400–500 |
| Body | **Arimo** | абзацы, описания | 15–19px / 400 |
| UI | **Manrope** | кнопки, меню, метки, счётчики, табы | 10–14px uppercase tracking-[0.16em+] |

**Правила tracking:**
- UI label: `tracking-[0.2em]`, uppercase, opacity 60-70%
- UI button: `tracking-[0.16em]`, uppercase
- UI nav: `tracking-[0.24em]`, uppercase
- Display: `tracking-[-0.01em]` (чуть плотнее)
- Body: default

**Italic в Cormorant** используется для цитат и редакторских акцентов (например, «Подзаголовок второго порядка» + italic даёт редакторскую интонацию).

**tabular-nums** (`tnum` class) применять для:
- метража номеров («50 м²», «19 м²»)
- расстояний в «Местах рядом» (600 м, 1.2 км)
- годов в таймлайне (1883, 1917)
- цен если появятся

**Будущее:** если бюджет позволит — заменить Cormorant на лицензированный **New Rome Trial** как display. Остальное не трогаем.

---

## 4. Кнопки и CTA

**Primary (rust):**
- `bg-rust text-paper hover:bg-rust-deep`
- `font-[family-name:var(--font-ui)] uppercase tracking-[0.16em]`
- Padding: `px-8 py-4` (дефолт), `px-6 py-3` (sm)
- Используется для **главного CTA каждого блока** (Забронировать, Оставить заявку, Найти номер)

**Secondary (ghost ink):**
- `border border-ink text-ink hover:bg-ink hover:text-paper`
- Тот же typography + padding
- Используется для **вторичных действий** (Смотреть номер, Полное меню)

**На ink-фоне:**
- Primary остаётся rust, но может быть в варианте ink (чёрный на bordo)
- Secondary — `border-paper text-paper hover:bg-paper hover:text-ink`

**Link (без кнопки):**
- UI-стиль: `text-rust uppercase tracking-[0.16em] text-[11px]`, `hover:underline underline-offset-4`
- Body-стиль: `italic underline underline-offset-4 decoration-moss decoration-1`

---

## 5. Формы

**Editorial input (1px-линия снизу):**
```
<input class="w-full bg-transparent border-0 border-b border-ink/40
              focus:border-rust focus:outline-none py-2
              font-body text-base placeholder:opacity-40" />
```

**Label** над полем: uppercase Manrope 10px, tracking 0.15em, opacity 60%.

**Ошибка:** `border-b border-error`, error-текст снизу в Manrope 10px цвета error.

**Submit-кнопка:** всегда Primary (rust). НЕ дублировать label на кнопке («Отправить заявку» лучше «Отправить»).

---

## 6. Карточки

**Базовая карточка:**
- `bg-surface` (не paper — чтобы отделялась)
- Без рамки, с px-6 py-6 паддингом
- `rounded-sm` (2px) — минимальный радиус
- Никаких теней по умолчанию

**Варианты:**
- **Номер** — 4:3 фото сверху + padding ниже
- **Отзыв** — только текст, акцент на цитате italic Cormorant
- **Место рядом** — квадратное фото сверху + категория + название + метраж
- **Услуга** — иконка + название (без фото)

**Hover-состояние:** edge-lift (`translate-y-[-2px]`) + subtle shadow (`shadow-[0_8px_24px_rgba(58,27,28,0.08)]`). Не агрессивно.

---

## 7. Шильдики (badges)

**Яндекс-шильдик** (hero, инлайн):
- Фон `bg-ink text-paper`, padding `px-6 py-4`
- Число 5.0 в Cormorant 4xl + звёзды rust + текст Manrope uppercase 10px
- Разделитель: `h-10 w-px bg-paper/30`

**Trust-fact бэйдж** (в ряду 2×2 или 1×4):
- Фон `bg-surface`, padding `p-6`
- Большое число/слово в rust Cormorant 3xl
- Пояснение Arimo 14px, opacity-80/60

---

## 8. Таймлайн

**Вертикальный** (страницы `/about`, блок 11 главной):
- `border-l-2 border-rust pl-8`
- Каждая веха: `rust`-кружок 12px слева-абсолютный, `-left-[40px]`
- Год Cormorant 3xl rust, tabular-nums
- Текст Arimo 16px opacity-85

**Горизонтальный** (вариант для Сомов-стиля):
- Возможно в `/about` полной версии
- Решение оставляем за DESIGN на этапе реализации

---

## 9. Разделители и дыхание

**Между секциями на одной странице:** `py-20` (mobile) / `py-28` (desktop).
**Горизонтальный разделитель в тексте:** `w-16 h-px bg-rust mx-auto` (короткая линия-дыхание).
**Grid с пиксельной сеткой:** используем `gap-px bg-line/30` для Palette-swatches, Trust-fact bar — создаёт тонкие линии между ячейками без явных рамок.

---

## 10. Моушн

- `duration-quick` (180ms) — hover / focus
- `duration-standard` (320ms) — переходы цветов кнопок
- `duration-slow` (560ms) — reveal/entry animations

- `ease-standard` — дефолт для UI
- `ease-editorial` — для reveal-анимаций, более мягкий character

**Обязательно:** `@media (prefers-reduced-motion: reduce)` отключает анимации — уже в `app.css`.

---

## 11. Sticky transparent Header (2026-04-22)

Hero занимает весь viewport → header должен быть прозрачным и адаптивным:

**Состояния:**
1. **На hero** — transparent, текст `ink` или `paper` по `heroTone`
2. **При hover** — заливка `paper/95` + `backdrop-blur-sm` + `border-b` 1px
3. **При скролле > 40px** — такая же заливка как hover, независимо от курсора

**Цвет текста:**
- `heroTone="light"` (surface/stone hero) → `text-ink`
- `heroTone="dark"` (все остальные) → `text-paper`
- В залитом состоянии — всегда `text-ink`

**Nav hover underline:** тонкая 1px линия под пунктом меню, анимация
`scaleX 0→1 left-origin` за 320ms. CSS-класс `.letyagin-header__navlink`
через псевдо-`::after`.

**Реализация:**
- CSS: `resources/css/app.css` — блок `.letyagin-header*`
- JS: `resources/js/Components/Layout/Header.jsx` слушает `scroll`
  (`useEffect` с guard `typeof window`), переключает `--scrolled`

**Mobile overlay:** при открытии гамбургера — всегда `bg-paper text-ink`,
даже на dark hero. Hover не применяется (touch).

---

## 12. Иконография

**Правило:** custom SVG или нейтральные line-icons в цвете `ink` или `moss`.

**Чего не делаем:**
- Плоских цветных иконок из паков (Font Awesome, Material)
- Кружков-иконок (WiFi в круге, завтрак в круге) — слишком casual
- 3D или градиентных

**Где нужны иконки:**
- Trust bar (4 факта) — пока **эмодзи-плейсхолдеры** (🏛 🥐 🚶 🅿) допустимы, заменим на SVG на этапе DESIGN
- Удобства номеров — минимальные line-icons
- Формы (чекбоксы, стрелки) — минимальные Manrope-совместимые SVG

---

## 13. Что НЕ делать (стоп-правила дизайна)

1. **Букинг-стиль** — яркие баннеры, «Забронируй сейчас −50%!!», таймеры
2. **Радиусы больше 8px** — 16-24px радиусов не существует в этом бренде
3. **Тени тяжёлые** — max `rgba(ink, 0.08)` на hover, и точечно
4. **Градиенты** — нет
5. **Glossy / 3D** — нет
6. **Чистый #FFF или #000** — только палитра
7. **Стоковые фото** — только реальные фото отеля
8. **«Кто-то только что забронировал»-поп-апы** — исключено
9. **Бесконечные карусели** — только scroll-snap или пагинация
10. **Uppercase в body-тексте** — только в UI-labels

---

## 14. Sample-компоненты и референс

**Живой референс системы:** `/lab` на сайте (временная страница Фазы 2A, удалим перед прод-запуском).

Содержит 9 секций на разных фонах: палитра, типографика, кнопки, ink-секция, карточки, шильдики, формы, таймлайн, rust-секция.

---

*Статус: [x] Утверждено Ильёй. Hero-цвета по страницам — решение от 2026-04-20.*
