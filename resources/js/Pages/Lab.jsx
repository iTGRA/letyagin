/**
 * Pages/Lab.jsx — стайл-гид Фазы 2A (v2, Swiss grid).
 *
 * Композиционная система в духе Müller-Brockmann:
 * — строгая 12-колонная сетка
 * — крупная типографика, воздух как элемент композиции
 * — асимметрия от контента, не от декора
 * — 1px разделители как структурный приём
 * — full-bleed блоки с цветовыми «плашками» для отдельных вселенных (Дуся moss / Холл ink)
 *
 * Временная страница — удалим перед прод-запуском.
 */

import { Head } from '@inertiajs/react';
import { useState } from 'react';
import RoomFullScreenCard, { ROOM_SHOWCASE } from '@/Components/Blocks/RoomFullScreenCard';

export default function Lab() {
    return (
        <>
            <Head title="Стайл-гид" />

            <main className="min-h-screen bg-paper text-ink font-[family-name:var(--font-body)]">
                <TopBar />

                {/* ── NEW 23 · эксперимент — полноэкранные карточки номеров ── */}
                <Section number="23" title="Номера — full-screen блоки" caption="Эксперимент: плашка слева · галерея справа · 5 цветовых воплощений">
                    <RoomShowcaseExperiment />
                </Section>

                <Divider />

                <Section number="01" title="Сетка" caption="12-колонный модуль, 4 / 8 / 12 gutter">
                    <GridDemo />
                </Section>

                <Divider />

                <Section number="02" title="Палитра" caption="Шесть токенов системы">
                    <Palette />
                </Section>

                <Divider />

                <Section number="03" title="Типографика" caption="Cormorant · Arimo · Manrope">
                    <TypeScale />
                </Section>

                <Divider />

                <Section number="04" title="Hero-варианты" caption="Три композиции для главных страниц">
                    <HeroVariants />
                </Section>

                {/* Full-bleed 05 — Restaurant preview (moss) */}
                <RestaurantPreview />

                {/* Full-bleed 06 — Hall preview (ink) */}
                <HallPreview />

                <Section number="07" title="Номера" caption="Сетка каталога — 12 колонок, ритм 4/4/4">
                    <RoomsGrid />
                </Section>

                <Divider />

                <Section number="08" title="Отзывы и цитаты" caption="Две модели — карточка и простыня">
                    <Reviews />
                </Section>

                <Divider />

                <Section number="09" title="Цифры как графика" caption="Число — главный объект композиции">
                    <NumbersBlock />
                </Section>

                <Divider />

                <Section number="10" title="Таймлайн" caption="Вертикальный и горизонтальный варианты">
                    <Timelines />
                </Section>

                <Divider />

                <Section number="11" title="Кнопки и формы" caption="Примитивы интерфейса">
                    <ButtonsAndForms />
                </Section>

                {/* Full-bleed 12 — cinematic ink */}
                <CinematicInk />

                <Section number="13" title="Шильдики" caption="Yandex-бэйдж и trust-bar">
                    <Badges />
                </Section>

                <Divider />

                <Section number="14" title="Медиа-кластер" caption="Мульти-фото спред в стиле ресторанной редакции">
                    <MediaCluster />
                </Section>

                {/* 15 — full-bleed spec page (brick) */}
                <SpecPage />

                {/* 16 — architecture frame (ink + full-bleed photo) */}
                <ArchitectureFrame />

                <Section number="17" title="Lifestyle-спред" caption="Сплит H1 с кластером фото" bleedTop>
                    <LifestyleSpread />
                </Section>

                {/* 18 — full-bleed moss chapter cover */}
                <ChapterCover />

                <Section number="19" title="Ценности в ряд" caption="4 фото-образа + 2-колонный текст (FRUTTA core values)">
                    <ValuesRow />
                </Section>

                <Divider />

                <Section number="20" title="Mood-board" caption="Асимметричный фото-кластер для атмосферы">
                    <MoodBoard />
                </Section>

                <Divider />

                <Section number="21" title="Микс-плашки" caption="Два голоса в одной композиции — moss и surface zigzag">
                    <MixPlates />
                </Section>

                <Divider />

                <Section number="22" title="4-колонный реестр" caption="Перечисление услуг/шагов в Swiss-стиле">
                    <ColumnsRegistry />
                </Section>

                <FooterBar />
            </main>
        </>
    );
}

/* =============================================================================
 * Layout primitives
 * ========================================================================== */

function TopBar() {
    return (
        <header className="border-b border-ink/15 px-6 md:px-12 py-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <span className="font-[family-name:var(--font-display)] text-2xl leading-none">ЛетягинЪ</span>
                <span className="font-[family-name:var(--font-ui)] uppercase tracking-[0.24em] text-[10px] opacity-50 hidden md:inline">
                    Стайл-гид · Фаза 2A
                </span>
            </div>
            <div className="flex gap-6 items-center">
                <a href="/" className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] opacity-60 hover:opacity-100">
                    ← на главную
                </a>
            </div>
        </header>
    );
}

function FooterBar() {
    return (
        <footer className="bg-ink text-paper px-6 md:px-12 py-20">
            <div className="grid grid-cols-12 gap-6 max-w-[1440px] mx-auto">
                <div className="col-span-12 md:col-span-5">
                    <div className="font-[family-name:var(--font-display)] text-5xl md:text-7xl leading-[0.95] mb-6">
                        Конец<br />стайл-гида
                    </div>
                    <p className="font-[family-name:var(--font-body)] text-base opacity-70 max-w-md leading-relaxed">
                        Эта страница создана для визуальной оценки системы до разработки 16 блоков главной. Удалим перед публичным запуском.
                    </p>
                </div>
                <div className="col-span-6 md:col-span-3 md:col-start-9">
                    <Label onDark>Меты</Label>
                    <dl className="space-y-3 font-[family-name:var(--font-ui)] uppercase tracking-[0.14em] text-[11px]">
                        <Meta k="секций" v="22" />
                        <Meta k="цветов" v="13" />
                        <Meta k="шрифтов" v="3" />
                        <Meta k="фаза" v="2A" />
                    </dl>
                </div>
            </div>
        </footer>
    );
}

function Section({ number, title, caption, children }) {
    return (
        <section className="relative px-6 md:px-12 pt-24 pb-20 md:pt-32 md:pb-28">
            <div className="max-w-[1440px] mx-auto">
                {/* Header — number + title + caption on 12-col grid */}
                <header className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
                    <div className="col-span-12 md:col-span-2">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.28em] text-[11px] tnum opacity-50">
                            {number}/22
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-7">
                        <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl leading-[0.95]">
                            {title}
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-3 md:text-right self-end">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-[11px] opacity-60 max-w-[240px] md:ml-auto">
                            {caption}
                        </div>
                    </div>
                </header>

                {children}
            </div>
        </section>
    );
}

function Divider() {
    return (
        <div className="px-6 md:px-12">
            <div className="max-w-[1440px] mx-auto h-px bg-ink/15" />
        </div>
    );
}

function Label({ children, onDark = false }) {
    return (
        <div className={`font-[family-name:var(--font-ui)] uppercase tracking-[0.24em] text-[10px] mb-5 ${onDark ? 'text-paper/50' : 'opacity-50'}`}>
            {children}
        </div>
    );
}

function Meta({ k, v }) {
    return (
        <div className="flex justify-between gap-6 border-b border-paper/15 pb-2">
            <dt className="opacity-50">{k}</dt>
            <dd className="tnum">{v}</dd>
        </div>
    );
}

function Placeholder({ label = 'фото', className = '' }) {
    return (
        <div className={`relative bg-ink/5 border border-ink/10 flex items-center justify-center overflow-hidden ${className}`}>
            <div className="absolute inset-x-0 top-0 h-px bg-ink/15" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-ink/15" />
            <span className="font-[family-name:var(--font-ui)] uppercase tracking-[0.24em] text-[10px] opacity-40">
                {label}
            </span>
        </div>
    );
}

/* =============================================================================
 * 01. Grid demo
 * ========================================================================== */

function GridDemo() {
    return (
        <div className="space-y-10">
            <div className="grid grid-cols-12 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-24 bg-ink/5 border border-ink/10 flex items-end justify-start p-2">
                        <span className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] tnum opacity-60">
                            {String(i + 1).padStart(2, '0')}
                        </span>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-12 gap-6 text-sm font-[family-name:var(--font-body)] opacity-70">
                <p className="col-span-12 md:col-span-8 leading-relaxed">
                    Вся вёрстка сайта опирается на 12 колонок с gutter 24px. Max-width контента — 1440px. На мобильных — одна колонка с боковыми полями 24px. Ширины блоков всегда задаются числом колонок (3/12, 5/12, 7/12), никогда в px.
                </p>
                <p className="col-span-12 md:col-span-4 md:col-start-9 leading-relaxed opacity-60 italic font-[family-name:var(--font-display)] text-base">
                    Müller-Brockmann: «Сетка — это способ внести порядок, а не способ ограничить свободу».
                </p>
            </div>
        </div>
    );
}

/* =============================================================================
 * 02. Palette
 * ========================================================================== */

function Palette() {
    const base = [
        { name: 'Rum Raisin',    hex: '#3A1B1C', token: 'ink',     role: 'текст, ink-секции',        onDark: true,  bg: '#3A1B1C' },
        { name: 'Snow Drizzle',  hex: '#CFC6BB', token: 'paper',   role: 'основной фон — лён',       onDark: false, bg: '#CFC6BB' },
        { name: 'Burnt Orange',  hex: '#A54A20', token: 'rust',    role: 'CTA, акценты — кирпич',    onDark: true,  bg: '#A54A20' },
        { name: 'Moss Green',    hex: '#635729', token: 'moss',    role: 'детали, вселенная Дуси',    onDark: true,  bg: '#635729' },
        { name: 'Light Surface', hex: '#F5F1EC', token: 'surface', role: 'карточки, secondary',       onDark: false, bg: '#F5F1EC' },
        { name: 'Line',          hex: '#8A7E6E', token: 'line',    role: 'разделители 1px',           onDark: true,  bg: '#8A7E6E' },
    ];
    const extended = [
        { name: 'Slate',  hex: '#2E3D4D', token: 'slate',  role: 'редкий cool — ночной Холл',       onDark: true,  bg: '#2E3D4D' },
        { name: 'Brick',  hex: '#9C2D2A', token: 'brick',  role: 'материал — серьёзный CTA',         onDark: true,  bg: '#9C2D2A' },
        { name: 'Coral',  hex: '#CB5041', token: 'coral',  role: 'friendly — тэги, announcement',    onDark: true,  bg: '#CB5041' },
        { name: 'Sage',   hex: '#899370', token: 'sage',   role: 'светлый moss — surface Дуси',      onDark: true,  bg: '#899370' },
        { name: 'Stone',  hex: '#A39A8C', token: 'stone',  role: 'нейтральный warm — ambient',       onDark: true,  bg: '#A39A8C' },
        { name: 'Coal',   hex: '#1A1817', token: 'coal',   role: 'near-black — Swiss-типографика',   onDark: true,  bg: '#1A1817' },
        { name: 'Bone',   hex: '#F1ECE3', token: 'bone',   role: 'neutral ivory — фон отзывов',      onDark: false, bg: '#F1ECE3' },
    ];

    return (
        <div className="space-y-14">
            {/* Base palette — 6 swatches 2x3 */}
            <div>
                <Label>Базовая · 6 токенов</Label>
                <div className="grid grid-cols-12 gap-px bg-ink/15">
                    {base.map((c) => (
                        <div
                            key={c.token}
                            className="col-span-6 md:col-span-4 aspect-square p-6 md:p-8 flex flex-col justify-between"
                            style={{ background: c.bg, color: c.onDark ? '#F5F1EC' : '#3A1B1C' }}
                        >
                            <div>
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] opacity-70 mb-2 tnum">
                                    {c.hex}
                                </div>
                                <div className="font-[family-name:var(--font-display)] text-3xl md:text-5xl leading-none">
                                    {c.name}
                                </div>
                            </div>
                            <div className="flex justify-between items-end font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px]">
                                <span className="opacity-80 max-w-[60%]">{c.role}</span>
                                <span className="opacity-60">—{c.token}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Extended palette — 7 swatches, row-of-7 on xl, 4+3 on md, 2+2+2+1 on mobile */}
            <div>
                <Label>Расширенная · 7 точечных токенов (5 цветов + 2 value-якоря)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-px bg-ink/15">
                    {extended.map((c) => (
                        <div
                            key={c.token}
                            className="aspect-[4/5] md:aspect-square p-5 md:p-6 flex flex-col justify-between"
                            style={{ background: c.bg, color: c.onDark ? '#F5F1EC' : '#3A1B1C' }}
                        >
                            <div>
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] opacity-70 mb-2 tnum">
                                    {c.hex}
                                </div>
                                <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-none">
                                    {c.name}
                                </div>
                            </div>
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-[10px]">
                                <div className="opacity-80 mb-1 leading-snug">{c.role}</div>
                                <div className="opacity-60">—{c.token}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* In-context demo — каждый новый цвет в живой роли */}
            <div>
                <Label>Расширенная — в контексте</Label>
                <div className="grid grid-cols-12 gap-6">

                    {/* SLATE — ночной Холл */}
                    <div className="col-span-12 md:col-span-6 bg-[color:var(--color-slate)] text-paper p-10 flex flex-col justify-between min-h-[260px]">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-70">
                            slate · ночной Холл
                        </div>
                        <div>
                            <h4 className="font-[family-name:var(--font-display)] italic text-3xl md:text-4xl leading-[1.05] mb-3">
                                Камерный ужин на 14 персон
                            </h4>
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] opacity-65">
                                19:30 · 27 апреля · исторический зал
                            </div>
                        </div>
                    </div>

                    {/* STONE — ambient card */}
                    <div className="col-span-12 md:col-span-6 bg-[color:var(--color-stone)] text-ink p-10 flex flex-col justify-between min-h-[260px]">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-70">
                            stone · ambient surface
                        </div>
                        <div>
                            <h4 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl leading-[1.05] mb-3">
                                FAQ — ответы на 8 вопросов
                            </h4>
                            <div className="font-[family-name:var(--font-body)] text-sm opacity-75 leading-relaxed">
                                Ранний заезд, парковка, дети, животные, тихие номера — всё по полочкам.
                            </div>
                        </div>
                    </div>

                    {/* BRICK — серьёзный CTA в тёмной секции */}
                    <div className="col-span-12 md:col-span-7 bg-ink text-paper p-10 flex items-center justify-between gap-6 flex-wrap">
                        <div>
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-65 mb-3">
                                brick · CTA в ink-контексте
                            </div>
                            <h4 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl leading-[1.05] max-w-md">
                                Корпоративный договор
                            </h4>
                        </div>
                        <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-xs px-8 py-4 bg-[color:var(--color-brick)] text-paper hover:opacity-85 transition-opacity">
                            Оставить заявку
                        </button>
                    </div>

                    {/* CORAL — announcement плашка */}
                    <div className="col-span-12 md:col-span-5 bg-[color:var(--color-coral)] text-paper p-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 border border-paper/50 flex items-center justify-center font-[family-name:var(--font-ui)] text-[10px] tnum">%</div>
                            <div>
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] opacity-80 mb-1">
                                    coral · announcement
                                </div>
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.14em] text-xs">
                                    Промокод LETYAGIN
                                </div>
                            </div>
                        </div>
                        <button aria-label="Закрыть" className="font-[family-name:var(--font-ui)] text-xl opacity-70 hover:opacity-100">×</button>
                    </div>

                    {/* SAGE — surface в Дусе */}
                    <div className="col-span-12 bg-[color:var(--color-sage)] text-ink p-10 md:p-14">
                        <div className="grid grid-cols-12 gap-6 items-center">
                            <div className="col-span-12 md:col-span-6">
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-70 mb-4">
                                    sage · карточка-ингредиент в Дусе
                                </div>
                                <h4 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-[1] mb-4">
                                    Белые грузди<br /><span className="italic">из&nbsp;Мордовии</span>
                                </h4>
                                <p className="font-[family-name:var(--font-body)] text-base opacity-85 leading-relaxed max-w-md">
                                    В Дусе — собственная засолка на рассоле с укропом и корнем хрена. Базовая позиция завтраков и холодных закусок.
                                </p>
                            </div>
                            <div className="col-span-12 md:col-span-5 md:col-start-8 flex gap-3 flex-wrap">
                                {['Грузди', 'Укроп', 'Хрен', 'Чёрный хлеб', 'Сметана'].map((t) => (
                                    <span key={t} className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-[10px] px-4 py-2 border border-ink/30">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COAL — Swiss newsprint-hero */}
                    <div className="col-span-12 bg-[color:var(--color-coal)] text-paper p-10 md:p-16">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 md:col-span-2">
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-55">
                                    coal · newsprint
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-8">
                                <div className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] tracking-[-0.015em] mb-6">
                                    Обычный день<br />
                                    <span className="italic opacity-75">в купеческой Самаре</span>
                                </div>
                                <p className="font-[family-name:var(--font-body)] text-base md:text-lg leading-[1.55] opacity-80 max-w-2xl">
                                    В 1883 году на месте особняка стоял постоялый двор. Через дорогу торговали с Нижегородской ярмаркой, в лавках покупали калачи, а в банях Челышева отдыхала после дороги купеческая молодёжь.
                                </p>
                            </div>
                            <div className="col-span-12 md:col-span-2 md:text-right self-end">
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] opacity-55 tnum">
                                    1883<br />
                                    <span className="opacity-70">Самара</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BONE — карточка отзыва (нейтральный фон без тёплого оттенка) */}
                    <div className="col-span-12 md:col-span-6 bg-[color:var(--color-bone)] text-ink p-10 min-h-[280px] flex flex-col">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-55 mb-6">
                            bone · отзыв · neutral surface
                        </div>
                        <blockquote className="font-[family-name:var(--font-display)] text-2xl md:text-3xl italic leading-[1.25] mb-auto">
                            «Номер был не просто чист — он был вылизан. Идеально чистое бельё, четыре подушки и мягкий халат».
                        </blockquote>
                        <div className="flex justify-between items-center pt-6 border-t border-ink/15 mt-6 font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px]">
                            <span className="opacity-70">Анастасия</span>
                            <span className="text-rust">★★★★★</span>
                        </div>
                    </div>

                    {/* BONE — сравнение: та же карточка на surface, чтобы показать разницу */}
                    <div className="col-span-12 md:col-span-6 bg-surface text-ink p-10 min-h-[280px] flex flex-col">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-55 mb-6">
                            surface · та же карточка для сравнения
                        </div>
                        <blockquote className="font-[family-name:var(--font-display)] text-2xl md:text-3xl italic leading-[1.25] mb-auto">
                            «Номер был не просто чист — он был вылизан. Идеально чистое бельё, четыре подушки и мягкий халат».
                        </blockquote>
                        <div className="flex justify-between items-center pt-6 border-t border-ink/15 mt-6 font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px]">
                            <span className="opacity-70">Анастасия</span>
                            <span className="text-rust">★★★★★</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =============================================================================
 * 03. Type scale
 * ========================================================================== */

function TypeScale() {
    return (
        <div className="space-y-16">
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-2"><Label>D/1</Label></div>
                <div className="col-span-12 md:col-span-10">
                    <div className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,11vw,11rem)] leading-[0.9] tracking-[-0.015em]">
                        Исторический<br />особняк
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 items-baseline">
                <div className="col-span-12 md:col-span-2"><Label>D/2</Label></div>
                <div className="col-span-12 md:col-span-7 font-[family-name:var(--font-display)] text-5xl md:text-7xl leading-[0.95]">
                    Ресторан Дуся
                </div>
                <div className="col-span-12 md:col-span-3 font-[family-name:var(--font-display)] text-3xl md:text-4xl italic leading-[1.1] opacity-70">
                    Новая русская
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-2"><Label>Body</Label></div>
                <div className="col-span-12 md:col-span-7">
                    <p className="font-[family-name:var(--font-body)] text-lg leading-[1.65] opacity-90">
                        Бутик-отель в особняке XIX века в центре старого города Самары. Девятнадцать дизайнерских номеров, ресторан авторской русской кухни, зал для событий в закрытом дворе. Реновация завершена в 2024 году — сохранена кирпичная кладка с клеймом промышленника И.&nbsp;П. Летягина.
                    </p>
                </div>
                <div className="col-span-12 md:col-span-3 border-l border-ink/20 pl-4">
                    <p className="font-[family-name:var(--font-body)] text-sm leading-[1.6] opacity-70">
                        Ленинградская — 3 мин.<br />
                        Театр Оперы — 7 мин.<br />
                        Волга — 15 мин пешком.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-2"><Label>UI</Label></div>
                <div className="col-span-12 md:col-span-10 flex flex-wrap gap-x-8 gap-y-3 font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-xs">
                    <span>Главная</span>
                    <span className="opacity-40">·</span>
                    <span>Номера</span>
                    <span className="opacity-40">·</span>
                    <span>Ресторан</span>
                    <span className="opacity-40">·</span>
                    <span>ЛетягинЪ-Холл</span>
                    <span className="opacity-40">·</span>
                    <span>О проекте</span>
                    <span className="opacity-40">·</span>
                    <span>Лучшее рядом</span>
                    <span className="opacity-40">·</span>
                    <span>Контакты</span>
                </div>
            </div>
        </div>
    );
}

/* =============================================================================
 * 04. Hero variants
 * ========================================================================== */

function HeroVariants() {
    return (
        <div className="space-y-20">
            {/* V1 — классический: фото 7, текст 5 */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-5 flex flex-col justify-center order-2 md:order-1">
                    <Label>Hero — Главная (V1)</Label>
                    <h3 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl leading-[0.95] mb-6">
                        19 номеров в центре старой Самары
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-base leading-[1.6] opacity-80 max-w-md mb-8">
                        Бутик-отель в особняке 1883 года. Ресторан «Дуся», зал для событий, охраняемая парковка — в пешей доступности от Волги.
                    </p>
                    <div className="flex gap-4">
                        <PrimaryBtn>Забронировать</PrimaryBtn>
                        <SecondaryBtn>Смотреть номера</SecondaryBtn>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-7 order-1 md:order-2">
                    <Placeholder className="aspect-[4/5] md:aspect-[5/6]" label="фасад особняка" />
                </div>
            </div>

            {/* V2 — редакторский: крупный заголовок на всю ширину, фото под ним, мета справа */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 mb-4">
                    <Label>Hero — Главная (V2 · редакторский)</Label>
                </div>
                <div className="col-span-12">
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,9vw,9rem)] leading-[0.9] tracking-[-0.015em] mb-10">
                        Особняк<br />
                        <span className="italic opacity-70">с клеймом</span> Летягина
                    </h3>
                </div>
                <div className="col-span-12 md:col-span-8">
                    <Placeholder className="aspect-[16/9]" label="деталь кирпичной кладки" />
                </div>
                <div className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col justify-end">
                    <div className="space-y-3 font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px]">
                        <Meta2 k="год" v="1883" />
                        <Meta2 k="номеров" v="19" />
                        <Meta2 k="рейтинг" v="5.0" />
                    </div>
                </div>
            </div>

            {/* V3 — асимметричный: rust-плашка 5 + фото 7 */}
            <div className="grid grid-cols-12 gap-0">
                <div className="col-span-12 md:col-span-5 bg-rust text-paper p-8 md:p-14 flex flex-col justify-between min-h-[400px]">
                    <Label onDark>Hero — Главная (V3 · плашка)</Label>
                    <div>
                        <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl leading-[0.95] mb-6">
                            Прямая бронь — скидка по промокоду
                        </h3>
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-sm tnum">
                            LETYAGIN · 7%
                        </div>
                        <div className="mt-8">
                            <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-xs px-8 py-4 bg-ink text-paper hover:opacity-80 transition-opacity">
                                Проверить даты
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-7">
                    <Placeholder className="aspect-[4/3] md:aspect-auto md:h-full" label="интерьер номера" />
                </div>
            </div>
        </div>
    );
}

function Meta2({ k, v }) {
    return (
        <div className="flex justify-between border-b border-ink/20 pb-2">
            <span className="opacity-50">{k}</span>
            <span className="tnum">{v}</span>
        </div>
    );
}

/* =============================================================================
 * 05. RESTAURANT preview (FULL-BLEED MOSS)
 * ========================================================================== */

function RestaurantPreview() {
    return (
        <section className="w-full bg-moss text-paper">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-36">
                <div className="grid grid-cols-12 gap-6 mb-14">
                    <div className="col-span-12 md:col-span-2">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.28em] text-[11px] opacity-60 tnum">
                            05/22
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl leading-[0.95]">
                            Превью Дуси
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-2 md:text-right self-end">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] opacity-70">
                            Full-bleed · moss
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 items-end">
                    <div className="col-span-12 md:col-span-7">
                        <Placeholder className="aspect-[4/5] md:aspect-[1/1] bg-paper/10 border-paper/20" label="блюдо шефа" />
                    </div>

                    <div className="col-span-12 md:col-span-5">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] mb-6 opacity-70">
                            Ресторан · 62 посадки
                        </div>
                        <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] mb-6">
                            Дуся.<br />
                            <span className="italic">Русская</span><br />кухня.
                        </h3>
                        <p className="font-[family-name:var(--font-body)] text-base leading-[1.65] opacity-85 mb-8 max-w-md">
                            Шеф Иван Жуковкин. #2 по завтракам в Самаре по рейтингу «Как Есть». Грузди, рассольник, домашние пирожки — при всей новой русской.
                        </p>
                        <div className="flex gap-4">
                            <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs px-6 py-3 bg-paper text-ink hover:bg-rust hover:text-paper transition-colors">
                                Меню ресторана
                            </button>
                            <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs px-6 py-3 border border-paper/40 text-paper hover:bg-paper hover:text-moss transition-colors">
                                Забронировать стол
                            </button>
                        </div>
                    </div>
                </div>

                {/* Шильдики в moss-контексте */}
                <div className="grid grid-cols-12 gap-6 mt-20 pt-10 border-t border-paper/20">
                    <div className="col-span-6 md:col-span-3">
                        <div className="font-[family-name:var(--font-display)] text-5xl md:text-6xl leading-none mb-2">#2</div>
                        <div className="font-[family-name:var(--font-body)] text-sm opacity-75">по завтракам в Самаре</div>
                    </div>
                    <div className="col-span-6 md:col-span-3">
                        <div className="font-[family-name:var(--font-display)] text-5xl md:text-6xl leading-none mb-2">#17</div>
                        <div className="font-[family-name:var(--font-body)] text-sm opacity-75">в гастро-рейтинге «Как Есть»</div>
                    </div>
                    <div className="col-span-6 md:col-span-3">
                        <div className="font-[family-name:var(--font-display)] text-5xl md:text-6xl leading-none mb-2 tnum">62</div>
                        <div className="font-[family-name:var(--font-body)] text-sm opacity-75">посадочных места</div>
                    </div>
                    <div className="col-span-6 md:col-span-3">
                        <div className="font-[family-name:var(--font-display)] text-5xl md:text-6xl leading-none mb-2 tnum">8:00</div>
                        <div className="font-[family-name:var(--font-body)] text-sm opacity-75">завтраки — когда все закрыто</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =============================================================================
 * 06. HALL preview (FULL-BLEED INK)
 * ========================================================================== */

function HallPreview() {
    return (
        <section className="w-full bg-ink text-paper">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-36">
                <div className="grid grid-cols-12 gap-6 mb-14">
                    <div className="col-span-12 md:col-span-2">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.28em] text-[11px] opacity-60 tnum">
                            06/22
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl leading-[0.95]">
                            Превью Холла
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-2 md:text-right self-end">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] opacity-70">
                            Full-bleed · ink
                        </div>
                    </div>
                </div>

                {/* Ink-плашка 7 + фото 5 (зеркально к Дусе) */}
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-7 md:pr-16">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] mb-6 opacity-60">
                            ЛетягинЪ-Холл · зал событий
                        </div>
                        <h3 className="font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,8.5rem)] leading-[0.88] mb-10">
                            Вечер<br />
                            в&nbsp;историческом<br />
                            особняке
                        </h3>
                        <p className="font-[family-name:var(--font-body)] text-lg leading-[1.65] opacity-80 mb-10 max-w-xl">
                            Свадьбы, банкеты, конференции и дни рождения в закрытом дворе и исторических залах. Кейтеринг — от ресторана «Дуся». Всё под одной крышей.
                        </p>
                        <div className="flex flex-wrap gap-3 mb-10">
                            <Tag>Свадьбы</Tag>
                            <Tag>Банкеты</Tag>
                            <Tag>Конференции</Tag>
                            <Tag>Корпоративы</Tag>
                        </div>
                        <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-xs px-8 py-4 bg-rust text-paper hover:bg-[color:var(--color-rust-deep)] transition-colors">
                            Оставить заявку
                        </button>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                        <Placeholder className="aspect-[4/5] bg-paper/5 border-paper/15" label="зал с рассадкой" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Tag({ children }) {
    return (
        <span className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] px-4 py-2 border border-paper/40">
            {children}
        </span>
    );
}

/* =============================================================================
 * 07. Rooms grid
 * ========================================================================== */

function RoomsGrid() {
    const rooms = [
        { name: 'ЛетягинЪ Люкс',        cat: 'Люкс · 50 м²',      img: '4/3', span: 'col-span-12 md:col-span-6', tag: 'флагман' },
        { name: 'Джуниор Сюит ЛетягинЪ', cat: 'Джуниор · 39 м²',   img: '4/3', span: 'col-span-12 md:col-span-6', tag: 'исторический' },
        { name: 'Авдотьи Библиевой',    cat: 'Историк · 28 м²',   img: '3/4', span: 'col-span-6 md:col-span-4',  tag: 'винтажная ванна' },
        { name: 'Люкс',                  cat: 'Люкс · 30 м²',      img: '3/4', span: 'col-span-6 md:col-span-4',  tag: '' },
        { name: 'Комфорт',               cat: 'Комфорт · 22 м²',   img: '3/4', span: 'col-span-12 md:col-span-4', tag: '' },
    ];
    return (
        <div>
            <div className="grid grid-cols-12 gap-6 mb-10">
                {rooms.map((r, i) => (
                    <article key={i} className={`${r.span} group`}>
                        <Placeholder
                            className={`mb-4 ${r.img === '4/3' ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}
                            label={r.name.toLowerCase()}
                        />
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] text-moss mb-2">
                                    {r.cat}
                                </div>
                                <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-[1.05]">
                                    {r.name}
                                </h3>
                            </div>
                            {r.tag && (
                                <span className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-[9px] bg-rust/10 text-rust px-2 py-1 shrink-0 mt-1">
                                    {r.tag}
                                </span>
                            )}
                        </div>
                    </article>
                ))}
            </div>
            <div className="border-t border-ink/15 pt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                <div className="font-[family-name:var(--font-body)] text-base opacity-70 max-w-md leading-relaxed">
                    Итого в отеле 19 номеров десяти категорий — от 16-метрового стандарта до двухкомнатного люкса 50&nbsp;м².
                </div>
                <PrimaryBtn>Все 19 номеров</PrimaryBtn>
            </div>
        </div>
    );
}

/* =============================================================================
 * 08. Reviews
 * ========================================================================== */

function Reviews() {
    return (
        <div className="space-y-16">
            {/* Большая одна-цитата — полноформатная */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-2">
                    <Label>Цитата L</Label>
                </div>
                <div className="col-span-12 md:col-span-10">
                    <blockquote className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,4.5rem)] italic leading-[1.1] mb-8">
                        «Теперь, проезжая Самару, я&nbsp;точно знаю, где остановлюсь.»
                    </blockquote>
                    <div className="flex items-baseline gap-6 font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[11px] opacity-60">
                        <span>Иван П.</span>
                        <span className="opacity-40">·</span>
                        <span>Яндекс · март 2026</span>
                        <span className="opacity-40">·</span>
                        <span className="text-rust">★★★★★</span>
                    </div>
                </div>
            </div>

            {/* Три карточки отзывов в сетке */}
            <div className="grid grid-cols-12 gap-6">
                {[
                    { quote: 'Номер был не просто чист — он был вылизан. Идеально чистое бельё, 4 подушки и мягкий халат.', author: 'Анастасия', topic: 'Сервис' },
                    { quote: 'Не первый раз приезжаю в Самару и останавливаюсь только здесь.', author: 'Татьяна Бондаренко', topic: 'Лояльность' },
                    { quote: 'Очень нравятся завтраки и ужины в ресторане Дуся. Очень вкусно и душевно.', author: 'Мария', topic: 'Завтраки' },
                ].map((r, i) => (
                    <article key={i} className="col-span-12 md:col-span-4 bg-surface p-8 flex flex-col min-h-[280px]">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] text-moss mb-5">
                            {r.topic}
                        </div>
                        <blockquote className="font-[family-name:var(--font-display)] text-xl italic leading-[1.35] mb-auto">
                            «{r.quote}»
                        </blockquote>
                        <div className="mt-6 pt-6 border-t border-ink/15 flex justify-between items-center font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px]">
                            <span className="opacity-70">{r.author}</span>
                            <span className="text-rust">★★★★★</span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

/* =============================================================================
 * 09. Numbers as graphic
 * ========================================================================== */

function NumbersBlock() {
    return (
        <div className="grid grid-cols-12 gap-0 border-t border-b border-ink/20 divide-x divide-ink/20">
            {[
                { n: '5.0',  label: 'оценка Яндекс',       sub: '298 отзывов' },
                { n: '19',   label: 'номеров',              sub: '10 категорий' },
                { n: '1883', label: 'год постройки',        sub: 'объект ОКН' },
                { n: '300',  label: 'метров до Ленинград.', sub: '≈ 4 минуты' },
            ].map((x, i) => (
                <div key={i} className="col-span-6 md:col-span-3 py-10 md:py-16 px-6 flex flex-col">
                    <div className="font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,6rem)] leading-none tnum mb-6 text-rust">
                        {x.n}
                    </div>
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] opacity-80 mb-1">
                        {x.label}
                    </div>
                    <div className="font-[family-name:var(--font-body)] text-xs opacity-50">
                        {x.sub}
                    </div>
                </div>
            ))}
        </div>
    );
}

/* =============================================================================
 * 10. Timelines — vertical + horizontal
 * ========================================================================== */

function Timelines() {
    const items = [
        { year: '1883',    text: 'Постоялый двор на усадьбе Сидоровых и Библиевых.' },
        { year: '1917',    text: 'Авдотья Библиева — последняя хозяйка усадьбы до революции.' },
        { year: '2023',    text: 'При реставрации обнаружено клеймо промышленника Летягина в кирпичной кладке.' },
        { year: '2024',    text: 'Реновация завершена — бутик-отель открывается в новом облике.' },
        { year: 'Сегодня', text: '19 дизайнерских номеров, ресторан «Дуся», рейтинг 5.0 на Яндексе.' },
    ];
    return (
        <div className="space-y-20">
            <div>
                <Label>Вертикальный</Label>
                <div className="grid grid-cols-12 gap-6">
                    <ol className="col-span-12 md:col-span-8 space-y-10 border-l-2 border-rust pl-8 md:pl-12">
                        {items.map((v, i) => (
                            <li key={i} className="relative">
                                <div className="absolute -left-[42px] md:-left-[54px] top-3 w-3 h-3 rounded-full bg-rust" />
                                <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl leading-none text-rust tnum mb-2">
                                    {v.year}
                                </div>
                                <p className="font-[family-name:var(--font-body)] text-base leading-[1.6] opacity-85 max-w-prose">
                                    {v.text}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            <div>
                <Label>Горизонтальный · Müller style</Label>
                <div className="relative">
                    <div className="absolute left-0 right-0 top-[22px] h-px bg-rust" />
                    <div className="grid grid-cols-5 gap-6 relative">
                        {items.map((v, i) => (
                            <div key={i} className="flex flex-col">
                                <div className="w-3 h-3 rounded-full bg-rust mb-4" />
                                <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-none text-rust tnum mb-3">
                                    {v.year}
                                </div>
                                <p className="font-[family-name:var(--font-body)] text-xs md:text-sm leading-[1.5] opacity-80">
                                    {v.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =============================================================================
 * 11. Buttons + forms
 * ========================================================================== */

function ButtonsAndForms() {
    return (
        <div className="grid grid-cols-12 gap-6">
            {/* Buttons */}
            <div className="col-span-12 md:col-span-5 space-y-10">
                <div>
                    <Label>Primary · rust</Label>
                    <div className="flex flex-wrap gap-3">
                        <PrimaryBtn>Забронировать</PrimaryBtn>
                        <PrimaryBtn size="sm">Найти номер</PrimaryBtn>
                    </div>
                </div>
                <div>
                    <Label>Secondary · ghost</Label>
                    <div className="flex flex-wrap gap-3">
                        <SecondaryBtn>Смотреть номер</SecondaryBtn>
                        <SecondaryBtn size="sm">Полное меню</SecondaryBtn>
                    </div>
                </div>
                <div>
                    <Label>Link</Label>
                    <div className="flex flex-col gap-4">
                        <a href="#" className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[11px] text-rust hover:underline underline-offset-4 w-fit">
                            Все 19 номеров →
                        </a>
                        <a href="#" className="font-[family-name:var(--font-display)] italic underline underline-offset-4 decoration-moss decoration-1 w-fit">
                            Полная история отеля
                        </a>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="col-span-12 md:col-span-6 md:col-start-7">
                <Label>Форма · editorial input</Label>
                <form className="space-y-7">
                    <Field label="Имя" placeholder="Как к вам обращаться" />
                    <Field label="Телефон" placeholder="+7 ___ ___ __ __" />
                    <Field label="Email" placeholder="you@example.com" />
                    <Field label="Комментарий" placeholder="Особые пожелания к заселению" textarea />
                    <div className="pt-4 flex items-center gap-6">
                        <PrimaryBtn>Отправить заявку</PrimaryBtn>
                        <span className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] opacity-50">
                            в рабочий день ответим
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* =============================================================================
 * 12. Cinematic ink (FULL-BLEED)
 * ========================================================================== */

function CinematicInk() {
    return (
        <section className="w-full bg-ink text-paper overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-32 md:py-48 relative">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-2">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.28em] text-[11px] opacity-50 tnum">
                            12/22
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <div className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,9rem)] italic leading-[0.95] mb-12">
                            «Ещё вчера это<br />был постоялый двор<br />на купеческой усадьбе.»
                        </div>
                        <div className="flex items-baseline gap-6 font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[11px] opacity-60">
                            <span>1883 — 2024</span>
                            <span className="opacity-40">·</span>
                            <span>141 год истории</span>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-2 md:text-right self-end">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] opacity-60">
                            Full-bleed · ink<br />кинематографический блок
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =============================================================================
 * 13. Badges
 * ========================================================================== */

function Badges() {
    return (
        <div className="space-y-16">
            <div>
                <Label>Яндекс-шильдик · вставка в hero</Label>
                <div className="inline-flex items-center gap-5 bg-ink text-paper px-6 py-4">
                    <div className="flex flex-col items-start">
                        <div className="font-[family-name:var(--font-display)] text-4xl leading-none tnum">5.0</div>
                        <div className="flex gap-0.5 mt-1 text-rust text-xs">★★★★★</div>
                    </div>
                    <div className="h-10 w-px bg-paper/30" aria-hidden="true" />
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] leading-[1.6]">
                        Хорошее место<br />
                        <span className="opacity-70">298 отзывов · Яндекс</span>
                    </div>
                </div>
            </div>

            <div>
                <Label>Trust-bar · 4 факта в строке</Label>
                <div className="grid grid-cols-12 gap-0 border-t border-b border-ink/20 divide-x divide-ink/20">
                    {[
                        { top: 'Объект',   mid: 'культурного',    bot: 'наследия' },
                        { top: '#2',       mid: 'по завтракам',   bot: 'в Самаре' },
                        { top: 'Всё',      mid: 'в пешей',        bot: 'доступности' },
                        { top: 'Парковка', mid: 'охраняемая',     bot: 'бесплатно' },
                    ].map((f, i) => (
                        <div key={i} className="col-span-6 md:col-span-3 p-6 md:p-8 flex flex-col gap-1">
                            <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-rust leading-none mb-1">
                                {f.top}
                            </div>
                            <div className="font-[family-name:var(--font-body)] text-sm opacity-85">{f.mid}</div>
                            <div className="font-[family-name:var(--font-body)] text-sm opacity-55">{f.bot}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* =============================================================================
 * 14. Media cluster — мульти-фото спред (Restaurant editorial style)
 *
 * Паттерн как на референсе «Authentic italian flavours»:
 * крупный главный кадр слева, связка мелких кадров + 2-колонные тексты справа,
 * массивный H1 снизу-слева.
 * ========================================================================== */

function MediaCluster() {
    return (
        <div className="bg-[color:var(--color-bone)] -mx-6 md:-mx-12 px-6 md:px-16 py-16 md:py-24">
            <div className="grid grid-cols-12 gap-6 md:gap-8">
                {/* Главный кадр слева */}
                <div className="col-span-12 md:col-span-6 lg:col-span-5 row-span-2 order-1">
                    <Placeholder className="aspect-[4/5] md:aspect-[5/6] lg:aspect-[4/5]" label="накрытый стол — сверху" />
                </div>

                {/* Мелкий портрет верх-центр */}
                <div className="col-span-4 md:col-span-2 lg:col-span-2 md:col-start-7 lg:col-start-6 order-2">
                    <Placeholder className="aspect-[3/4]" label="портрет шефа" />
                </div>

                {/* Бар — описание правее портрета */}
                <div className="col-span-8 md:col-span-4 lg:col-span-4 order-3 flex flex-col">
                    <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-3">
                        Бар
                    </div>
                    <p className="font-[family-name:var(--font-body)] text-sm md:text-base leading-[1.55] opacity-80 max-w-xs">
                        Авторские настойки на сосновой шишке, кедровом орехе, чёрной смородине. Каждая — история одного лета в саду Самарской области.
                    </p>
                </div>

                {/* Ресторан — текст + маленькое фото */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4 md:col-start-7 lg:col-start-6 order-5 md:order-4">
                    <div className="flex gap-5 items-start">
                        <div className="w-28 md:w-36 shrink-0">
                            <Placeholder className="aspect-[4/5]" label="блюдо" />
                        </div>
                        <div>
                            <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-3">
                                Ресторан
                            </div>
                            <p className="font-[family-name:var(--font-body)] text-sm leading-[1.55] opacity-80 mb-5">
                                Завтраки с 8:00, когда все закрыто. Ланч 12–16. Вечером — подовый хлеб, груздь, рассольник.
                            </p>
                            <a href="#" className="font-[family-name:var(--font-display)] italic text-base underline underline-offset-4 decoration-ink/40 hover:decoration-ink">
                                Забронировать стол →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Массивный H1 снизу-слева под главным фото */}
                <div className="col-span-12 md:col-span-8 lg:col-span-8 lg:col-start-1 order-4 md:order-5 mt-6 md:mt-16">
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.01em]">
                        Подлинные<br />
                        <span className="italic">самарские</span> вкусы
                    </h3>
                </div>
            </div>
        </div>
    );
}

/* =============================================================================
 * 15. Spec page — full-bleed brick с spec-таблицей
 *
 * Паттерн как на референсе «Rustic charm meets modern comfort»:
 * большой H1 слева, таблица фактов справа, пилюля-CTA снизу.
 * ========================================================================== */

function SpecPage() {
    return (
        <section className="w-full bg-[color:var(--color-brick)] text-paper">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-36">
                <div className="grid grid-cols-12 gap-6 mb-20">
                    <div className="col-span-12 md:col-span-2">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.28em] text-[11px] opacity-65 tnum">
                            15/22
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-7">
                        <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl leading-[0.95]">
                            Spec-страница
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-3 md:text-right self-end">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] opacity-75">
                            Full-bleed · brick<br />для страницы номера
                        </div>
                    </div>
                </div>

                {/* Верх: H1 слева + таблица справа */}
                <div className="grid grid-cols-12 gap-6 mb-24">
                    <div className="col-span-12 md:col-span-7">
                        <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.01em] mb-8">
                            История<br />
                            встречает<br />
                            <span className="italic">современный комфорт</span>
                        </h3>
                        <p className="font-[family-name:var(--font-body)] text-base md:text-lg leading-[1.6] opacity-85 max-w-lg">
                            ЛетягинЪ Люкс — двухкомнатный номер в отдельном корпусе с собственным выходом во внутренний двор. Кирпичная кладка — из материалов самого И.&nbsp;П. Летягина.
                        </p>
                    </div>

                    <div className="col-span-12 md:col-span-5">
                        <dl className="divide-y divide-paper/20 font-[family-name:var(--font-ui)] uppercase tracking-[0.14em] text-xs">
                            {[
                                ['Метраж',         '50 м²'],
                                ['Гостей',         '2 + 1 раскладной'],
                                ['Вид',            'Двор, крыши'],
                                ['Завтрак',        'Включён · 8:00–11:00'],
                                ['Кондиционер',    'Да'],
                                ['Wi-Fi',          '200 Мбит/с'],
                                ['Парковка',       'Охраняемая · бесплатно'],
                                ['Доступная среда','Да'],
                            ].map(([k, v]) => (
                                <div key={k} className="flex justify-between py-3">
                                    <dt className="opacity-65">{k}</dt>
                                    <dd className="tnum">{v}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                {/* Низ: маленькое фото слева + pill-CTA справа */}
                <div className="grid grid-cols-12 gap-6 items-end">
                    <div className="col-span-6 md:col-span-4">
                        <Placeholder className="aspect-[4/3] bg-paper/5 border-paper/20" label="интерьер номера" />
                    </div>
                    <div className="col-span-6 md:col-span-8 flex justify-end">
                        <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-xs px-10 py-4 rounded-full border border-paper/50 hover:bg-paper hover:text-[color:var(--color-brick)] transition-colors">
                            Проверить наличие
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =============================================================================
 * 16. Architecture frame — italic quote + full-bleed city photo
 *
 * Паттерн как на референсе «Wake up to stunning views of Milan's skyline»:
 * italic serif центровая цитата слева, архитектурное фото справа full-bleed,
 * блок контакта/адреса снизу слева.
 * ========================================================================== */

function ArchitectureFrame() {
    return (
        <section className="w-full bg-[color:var(--color-brick)] text-paper">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-12 gap-0">
                    {/* Левая половина — цитата */}
                    <div className="col-span-12 md:col-span-5 p-8 md:p-14 lg:p-20 flex flex-col justify-between min-h-[500px] md:min-h-[720px]">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.28em] text-[11px] opacity-65 tnum">
                            16/22
                        </div>

                        <div className="py-16">
                            <blockquote className="font-[family-name:var(--font-display)] italic text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.3] text-center">
                                Проснитесь в&nbsp;номере с&nbsp;видом на&nbsp;двор, где&nbsp;под&nbsp;акациями подают завтрак, а&nbsp;в&nbsp;10 минутах пешком — площадь Куйбышева и&nbsp;Волга.
                            </blockquote>
                        </div>

                        <div>
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-75 mb-2">
                                Адрес
                            </div>
                            <address className="font-[family-name:var(--font-body)] text-sm not-italic opacity-85 leading-relaxed">
                                443020, Самара<br />
                                ул. Самарская, 69<br />
                                +7 987 979-00-00
                            </address>
                        </div>
                    </div>

                    {/* Правая половина — архитектурное фото */}
                    <div className="col-span-12 md:col-span-7">
                        <Placeholder
                            className="aspect-[4/5] md:aspect-auto md:h-full bg-paper/5 border-0"
                            label="городская перспектива — ленинградская"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =============================================================================
 * 17. Lifestyle spread — split H1 + photo cluster
 *
 * Паттерн как на референсе «Rooftop views, refined service»:
 * 3 фото разных размеров сверху, центровая italic-цитата, крупный
 * split-H1 слева/справа внизу.
 * ========================================================================== */

function LifestyleSpread() {
    return (
        <div className="bg-[color:var(--color-bone)] -mx-6 md:-mx-12 px-6 md:px-16 py-20 md:py-28">
            {/* Top: 3 фото */}
            <div className="grid grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-20">
                <div className="col-span-12 md:col-span-5">
                    <Placeholder className="aspect-[5/4]" label="пара на террасе во дворе" />
                </div>
                <div className="col-span-4 md:col-span-2 md:pt-10">
                    <Placeholder className="aspect-square" label="деталь — подушки" />
                </div>
                <div className="col-span-8 md:col-span-5">
                    <Placeholder className="aspect-[5/4]" label="ванная с видом" />
                </div>
            </div>

            {/* Middle: центровая italic quote */}
            <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
                <div className="col-span-12 md:col-span-8 md:col-start-3">
                    <blockquote className="font-[family-name:var(--font-display)] italic text-center text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.5] text-ink/85">
                        Медная чайная в&nbsp;номере, собственный ключ от&nbsp;внутреннего двора, завтрак с&nbsp;подовым хлебом — мелочи, ради которых возвращаются.
                    </blockquote>
                    <div className="text-center mt-8">
                        <a href="#" className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[11px] text-rust hover:underline underline-offset-4">
                            Посмотреть номера →
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom: split H1 */}
            <div className="grid grid-cols-12 gap-6 items-end">
                <div className="col-span-12 md:col-span-6">
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.015em]">
                        Виды<br />на&nbsp;Волгу,
                    </h3>
                </div>
                <div className="col-span-12 md:col-span-6 md:text-right">
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.015em] italic opacity-85">
                        качество сервиса.
                    </h3>
                </div>
            </div>
        </div>
    );
}

/* =============================================================================
 * 18. Chapter cover — editorial full-bleed moss
 *
 * Паттерн как на FRUTTA «OUR Brand»: большой italic H1 вверху-слева,
 * маленький интро-параграф справа, атмосферное фото в центре, italic-
 * цитата внизу-слева. Для открытия /about и будущих brand-book разделов.
 * ========================================================================== */

function ChapterCover() {
    return (
        <section className="w-full bg-moss text-paper">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-36">
                {/* Top meta row */}
                <div className="grid grid-cols-12 gap-6 mb-20 md:mb-28 items-start">
                    <div className="col-span-4 md:col-span-2 font-[family-name:var(--font-ui)] uppercase tracking-[0.28em] text-[10px] opacity-70 tnum">
                        18/22
                    </div>
                    <div className="col-span-4 md:col-span-4 md:col-start-5 text-center font-[family-name:var(--font-ui)] uppercase tracking-[0.28em] text-[10px] opacity-70">
                        ЛетягинЪ · дизайн-книга
                    </div>
                    <div className="col-span-4 md:col-span-3 md:col-start-10 text-right font-[family-name:var(--font-ui)] uppercase tracking-[0.28em] text-[10px] opacity-70">
                        Раздел 01 · бренд
                    </div>
                </div>

                {/* Main composition */}
                <div className="grid grid-cols-12 gap-6 md:gap-8">
                    <div className="col-span-12 md:col-span-7">
                        <h3 className="font-[family-name:var(--font-display)] text-[clamp(4rem,13vw,12rem)] leading-[0.9] tracking-[-0.02em]">
                            Наш <span className="italic">дом</span>
                        </h3>
                    </div>
                    <div className="col-span-12 md:col-span-5 md:pt-16">
                        <p className="font-[family-name:var(--font-body)] text-base md:text-lg leading-[1.65] opacity-90">
                            Раздел описывает, что такое бутик-отель ЛетягинЪ сегодня — как мы понимаем гостеприимство, чем живём и что обещаем.
                        </p>
                        <p className="font-[family-name:var(--font-body)] text-base md:text-lg leading-[1.65] opacity-80 mt-4">
                            Это про внимание, а&nbsp;не&nbsp;про количество.
                        </p>
                    </div>

                    {/* Photo + quote row */}
                    <div className="col-span-12 md:col-span-5 mt-10 md:mt-20">
                        <Placeholder className="aspect-[4/5] bg-paper/10 border-paper/20" label="деталь — рука с ключом" />
                    </div>

                    <div className="col-span-12 md:col-span-6 md:col-start-7 self-end md:pt-20">
                        <blockquote className="font-[family-name:var(--font-display)] italic text-2xl md:text-3xl leading-[1.35] max-w-lg">
                            «Бутик-отель — это не про 19 номеров. Это про то, что&nbsp;в&nbsp;каждом из&nbsp;них мы знаем гостя по&nbsp;имени.»
                        </blockquote>
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] mt-6 opacity-60">
                            Из выступления основателя · 2024
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =============================================================================
 * 19. Values row — 4 образа + 2-колонный текст (FRUTTA brand core values)
 *
 * Сверху 4 маленьких фото с UI-метками-ценностями, снизу 2-колонный текст
 * про философию отеля. Для /about или блока «Ценности».
 * ========================================================================== */

function ValuesRow() {
    const values = [
        { img: 'накрытие', label: 'сервис',   sub: 'каждая мелочь' },
        { img: 'кирпич',   label: 'материал', sub: 'подлинность' },
        { img: 'повар',    label: 'вкус',     sub: 'авторская кухня' },
        { img: 'вид',      label: 'место',    sub: 'центр пешком' },
    ];
    return (
        <div className="space-y-14 md:space-y-20">
            {/* 4 фото в ряд с капшенами */}
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                {values.map((v) => (
                    <div key={v.label} className="col-span-6 md:col-span-3">
                        <Placeholder className="aspect-square mb-4" label={v.img} />
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] text-rust mb-1">
                            {v.label}
                        </div>
                        <div className="font-[family-name:var(--font-body)] text-sm opacity-70">
                            {v.sub}
                        </div>
                    </div>
                ))}
            </div>

            {/* 2-колонный манифест + sidenote */}
            <div className="grid grid-cols-12 gap-6 md:gap-10">
                <div className="col-span-12 md:col-span-3">
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-60 mb-3">
                        Четыре ценности
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl leading-[1.1]">
                        Что <span className="italic">нами</span> движет
                    </h3>
                </div>
                <div className="col-span-12 md:col-span-5">
                    <p className="font-[family-name:var(--font-body)] text-base md:text-lg leading-[1.65] opacity-90 mb-5">
                        Мы верим, что бутик-отель делают не стены и не мебель — его делает внимание. К тому, как накрыт завтрак. К тому, что за кладкой XIX века. К тому, чем пахнет лестница после дождя.
                    </p>
                    <p className="font-[family-name:var(--font-body)] text-base md:text-lg leading-[1.65] opacity-80">
                        Эти четыре ценности — не маркетинговые слоганы. Это то, что видно в каждом решении: от&nbsp;выбора кирпича для реставрации до&nbsp;способа заваривания кофе.
                    </p>
                </div>
                <div className="col-span-12 md:col-span-3 md:col-start-10 border-l border-ink/25 pl-5 md:pt-4">
                    <p className="font-[family-name:var(--font-display)] italic text-lg leading-[1.4] opacity-80">
                        «Мелочь — это не мелочь, если она повторяется каждый день.»
                    </p>
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] mt-4 opacity-55">
                        Внутренний кодекс отеля
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =============================================================================
 * 20. Mood-board — асимметричный фото-кластер
 *
 * Paper фон, слева описание (4 col), справа 8 col с 6-7 фотографиями
 * разных аспектов и размеров. Для галерей, atmosphere-секций, teaser'ов.
 * ========================================================================== */

function MoodBoard() {
    return (
        <div className="grid grid-cols-12 gap-6 md:gap-8">
            {/* Левая колонка — описание */}
            <div className="col-span-12 md:col-span-4">
                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-55 mb-4">
                    Mood-board
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-[1.05] mb-6">
                    Атмосфера<br /><span className="italic">как она&nbsp;есть</span>
                </h3>
                <p className="font-[family-name:var(--font-body)] text-base leading-[1.6] opacity-80 mb-4 max-w-sm">
                    Живые фрагменты — без постановки. Утренний свет на кирпичной кладке, чашка на столике, гость у окна, медная ручка двери — детали, из которых складывается тон места.
                </p>
                <a href="#" className="font-[family-name:var(--font-display)] italic underline underline-offset-4 decoration-ink/50 text-base">
                    Смотреть полную галерею →
                </a>
            </div>

            {/* Правая часть — фото-кластер */}
            <div className="col-span-12 md:col-span-8 grid grid-cols-6 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[140px]">
                <Placeholder className="col-span-3 row-span-2" label="интерьер" />
                <Placeholder className="col-span-3 row-span-1" label="ручка двери" />
                <Placeholder className="col-span-2 row-span-1" label="завтрак" />
                <Placeholder className="col-span-4 row-span-2" label="коридор" />
                <Placeholder className="col-span-2 row-span-1" label="окно" />
                <Placeholder className="col-span-3 row-span-1" label="цветы на столе" />
                <Placeholder className="col-span-3 row-span-1" label="кладка крупно" />
            </div>
        </div>
    );
}

/* =============================================================================
 * 21. Mix plates — два голоса в одной композиции (FRUTTA «Our mission»)
 *
 * Левая плашка: moss с фото вверху + текст внизу.
 * Правая плашка: surface с текстом вверху + фото внизу.
 * Показывает Отель ↔ Дуся как одно целое из двух контрастов.
 * ========================================================================== */

function MixPlates() {
    return (
        <div className="grid grid-cols-12 gap-0">
            {/* Левая плашка — moss */}
            <div className="col-span-12 md:col-span-6 bg-moss text-paper flex flex-col">
                <div className="aspect-[4/3] md:aspect-[5/4]">
                    <Placeholder className="w-full h-full bg-paper/5 border-paper/20" label="грядка на террасе" />
                </div>
                <div className="p-8 md:p-12 flex flex-col gap-5">
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-70">
                        вселенная Дуси
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl leading-[1.05]">
                        От&nbsp;травы<br /><span className="italic">до&nbsp;тарелки</span>
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-base leading-[1.6] opacity-85 max-w-md">
                        Зелень — с террасы во внутреннем дворе. Хлеб подовый — из печи на кухне. Настойки — из трав, которые растут за окном.
                    </p>
                </div>
            </div>

            {/* Правая плашка — surface */}
            <div className="col-span-12 md:col-span-6 bg-surface text-ink flex flex-col">
                <div className="p-8 md:p-12 flex flex-col gap-5 flex-1">
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-60">
                        вселенная отеля
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl leading-[1.05]">
                        От&nbsp;двора<br /><span className="italic">до&nbsp;номера</span>
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-base leading-[1.6] opacity-85 max-w-md">
                        Кирпич с клеймом Летягина в стене вашего номера. Медь в ванной — с Колыванского завода. Окна XIX века сохранили переплёты.
                    </p>
                </div>
                <div className="aspect-[4/3] md:aspect-[5/4]">
                    <Placeholder className="w-full h-full" label="интерьер с медью" />
                </div>
            </div>
        </div>
    );
}

/* =============================================================================
 * 22. 4-column registry — Swiss «Next Steps» style
 *
 * Каждая колонка: маленькая нумерация + UI-метка + короткий headline +
 * 2-3 строки описания. Для перечисления услуг, шагов процесса, FAQ-тизеров.
 * ========================================================================== */

function ColumnsRegistry() {
    const items = [
        { n: '01', label: 'Бронирование',     title: 'Прямо на сайте',         body: 'Через виджет Контур.Отеля, с промокодом LETYAGIN — скидка, которой нет на агрегаторах.' },
        { n: '02', label: 'Встреча',           title: 'Персональный ключ',      body: 'Ресепшн круглосуточно, заезд без очереди. По предварительному запросу — трансфер от вокзала.' },
        { n: '03', label: 'Проживание',        title: 'Удобства без счётчика',  body: 'Wi-Fi 200 Мбит/с, охраняемая парковка, прачечная, ранний заезд — включены в стоимость.' },
        { n: '04', label: 'Ресторан',          title: '«Дуся» — в пути',        body: 'Завтраки с 8:00 (обычно — до 11:00). Ужины — новая русская, 62 посадки. Вином занимается шеф лично.' },
    ];
    return (
        <div>
            <div className="grid grid-cols-12 gap-6 mb-16">
                <div className="col-span-12 md:col-span-5">
                    <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-[1.05]">
                        Как всё <span className="italic">устроено</span>
                    </h3>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-7">
                    <p className="font-[family-name:var(--font-body)] text-base leading-[1.6] opacity-75 max-w-md">
                        Четыре шага, за которые отвечает команда отеля — от момента, как вы нашли нас в Яндексе, до утреннего кофе.
                    </p>
                </div>
            </div>

            {/* 4 колонки */}
            <div className="grid grid-cols-12 gap-6 md:gap-8 border-t border-ink/25 pt-8">
                {items.map((it) => (
                    <div key={it.n} className="col-span-12 md:col-span-3 flex flex-col">
                        <div className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-rust leading-none tnum mb-5">
                            {it.n}
                        </div>
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-60 mb-3">
                            {it.label}
                        </div>
                        <h4 className="font-[family-name:var(--font-display)] text-2xl leading-[1.1] mb-3">
                            {it.title}
                        </h4>
                        <p className="font-[family-name:var(--font-body)] text-sm leading-[1.55] opacity-80">
                            {it.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* =============================================================================
 * 23. Room Showcase — перенесено в Components/Blocks/RoomFullScreenCard.jsx
 * ========================================================================== */

function RoomShowcaseExperiment() {
    return (
        <div className="-mx-6 md:-mx-12">
            {ROOM_SHOWCASE.map((room) => (
                <RoomFullScreenCard key={room.slug} room={room} />
            ))}
        </div>
    );
}

/* =============================================================================
 * Shared buttons / fields
 * ========================================================================== */

function PrimaryBtn({ children, size }) {
    const pad = size === 'sm' ? 'px-6 py-3 text-[11px]' : 'px-8 py-4 text-sm';
    return (
        <button className={`font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] ${pad} bg-rust text-paper hover:bg-[color:var(--color-rust-deep)] transition-colors duration-[var(--duration-standard)]`}>
            {children}
        </button>
    );
}

function SecondaryBtn({ children, size }) {
    const pad = size === 'sm' ? 'px-6 py-3 text-[11px]' : 'px-8 py-4 text-sm';
    return (
        <button className={`font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] ${pad} border border-ink text-ink hover:bg-ink hover:text-paper transition-colors duration-[var(--duration-standard)]`}>
            {children}
        </button>
    );
}

function Field({ label, placeholder, textarea }) {
    return (
        <label className="block">
            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.15em] text-[10px] opacity-60 mb-2">
                {label}
            </div>
            {textarea ? (
                <textarea
                    placeholder={placeholder}
                    rows={3}
                    className="w-full bg-transparent border-0 border-b border-ink/40 focus:border-rust focus:outline-none py-2 font-[family-name:var(--font-body)] text-base placeholder:opacity-40"
                />
            ) : (
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full bg-transparent border-0 border-b border-ink/40 focus:border-rust focus:outline-none py-2 font-[family-name:var(--font-body)] text-base placeholder:opacity-40"
                />
            )}
        </label>
    );
}
