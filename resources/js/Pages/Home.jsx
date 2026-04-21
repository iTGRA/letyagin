/**
 * Home.jsx — главная страница.
 * 16 блоков по CONTENT.md §2 + Layout (Header/Footer/Announcement).
 *
 * Данные приходят через Inertia props из HomeController:
 *   page.h1, page.meta_title, page.extra (все подписи и хэдлайны секций)
 *   featuredRooms, services, roomAmenities, featuredMenuItems, featuredChef,
 *   nearbyPreview, historyPreview, galleryPreview, featuredReviews, faqs.
 */

import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import { Placeholder, SectionHeader, Section, InlineDivider } from '@/Components/UI/Primitives';
import Img from '@/Components/UI/Img';
import KonturWidgetStub from '@/Components/Blocks/KonturWidgetStub';

export default function Home(props) {
    const { page, featuredRooms = [], services = [], roomAmenities = [], featuredMenuItems = [],
            nearbyPreview = [], historyPreview = [], galleryPreview = [], featuredReviews = [], faqs = [] } = props;
    const e = page?.extra ?? {};

    return (
        <Layout heroTone="light">
            <Head>
                <title>{page?.meta_title || 'Бутик-отель ЛетягинЪ'}</title>
                <meta name="description" content={page?.meta_description || ''} />
            </Head>

            {/* ─── BLOCK 01 · HERO (surface — светлее paper, отделяется от body) ──── */}
            <section className="bg-surface text-ink">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-14 md:pb-20 grid grid-cols-12 gap-6 md:gap-10 items-center md:min-h-screen">
                    <div className="col-span-12 md:col-span-6 order-2 md:order-1">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[11px] text-rust mb-5">
                            Бутик-отель · 12 категорий · 19 номеров
                        </div>
                        <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.875rem,3.3vw,3.25rem)] leading-[1.08] tracking-[-0.005em] mb-6 md:mb-8 [text-wrap:balance] max-w-[580px]">
                            {page?.h1 || 'Летягин. Бутик-отель в центре Самары'}
                        </h1>
                        <p className="font-[family-name:var(--font-body)] text-base md:text-lg leading-[1.5] opacity-90 max-w-xl mb-8">
                            {e.hero_subtitle || ''}
                        </p>

                        {/* Шильдики */}
                        <div className="flex flex-wrap gap-3">
                            <div className="inline-flex items-center gap-4 bg-ink text-paper px-4 py-2.5">
                                <div className="font-[family-name:var(--font-display)] text-2xl leading-none tnum">5.0</div>
                                <div className="h-7 w-px bg-paper/30" />
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] leading-[1.4]">
                                    298 отзывов<br />Яндекс
                                </div>
                            </div>
                            <div className="inline-flex items-center gap-3 border border-ink/40 px-4 py-2.5">
                                <span className="text-rust text-base">🏛</span>
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] leading-[1.4]">
                                    Хорошее место<br />отметка Яндекса
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 order-1 md:order-2">
                        <Img
                            src={props.heroSlides?.[0]?.image_url}
                            alt="Бутик-отель ЛетягинЪ"
                            label="фасад особняка"
                            className="aspect-[4/5] md:aspect-[4/5] md:max-h-[calc(100vh-160px)]"
                        />
                    </div>
                </div>
            </section>

            {/* ─── BLOCK 02 · WIDGET (hero) ─────────────────────── */}
            <section className="bg-paper text-ink" id="widget-hero">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-10 md:pt-14 pb-10">
                    <KonturWidgetStub source="hero-widget" />
                </div>
            </section>

            {/* ─── BLOCK 03 · TRUST BAR ─────────────────────────── */}
            <section className="bg-paper text-ink">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pb-16">
                    <div className="grid grid-cols-12 gap-0 border-t border-b border-ink/20 divide-x divide-ink/20">
                        {(e.trust_bar || []).map((f, i) => (
                            <div key={i} className="col-span-6 md:col-span-3 p-6 md:p-8 flex flex-col gap-1">
                                <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-rust leading-none mb-1">{f.title}</div>
                                <div className="font-[family-name:var(--font-body)] text-sm opacity-80">{f.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── BLOCK 04 · ABOUT ─────────────────────────────── */}
            <Section bg="paper">
                <div className="grid grid-cols-12 gap-6 md:gap-10">
                    <div className="col-span-12 md:col-span-5">
                        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em]">
                            {e.about_headline || 'Особняк, где сохранили дух места.'}
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-5 font-[family-name:var(--font-body)] text-base md:text-lg leading-[1.65]">
                        {e.about_body_1 && <p>{e.about_body_1}</p>}
                        {e.about_body_2 && <p className="opacity-85">{e.about_body_2}</p>}
                    </div>
                </div>
            </Section>

            {/* ─── BLOCK 05 · ROOMS showcase ────────────────────── */}
            <Section bg="surface">
                <SectionHeader title="Номера" caption={e.rooms_subtitle || ''} />
                <div className="grid grid-cols-12 gap-6">
                    {featuredRooms.slice(0, 5).map((r, i) => (
                        <Link
                            key={r.id}
                            href={`/rooms/${r.slug}`}
                            className={`${i === 0 ? 'col-span-12 md:col-span-6' : 'col-span-6 md:col-span-3'} group`}
                        >
                            <Img
                                src={r.hero_image_url}
                                alt={r.name}
                                label={r.name.toLowerCase()}
                                className={`mb-4 ${i === 0 ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}
                            />
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] text-moss mb-2 tnum">
                                {r.area_m2} м² · до {r.guests} гостя
                            </div>
                            <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl leading-[1.1] mb-2 group-hover:text-rust transition-colors">
                                {r.name}
                            </h3>
                            <p className="font-[family-name:var(--font-body)] text-sm opacity-75 leading-relaxed">
                                {r.short_description}
                            </p>
                        </Link>
                    ))}
                </div>
                <div className="mt-10 text-center md:text-left">
                    <Link
                        href="/rooms"
                        className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs inline-block px-8 py-4 border border-ink hover:bg-ink hover:text-paper transition-colors"
                    >
                        Все 19 номеров →
                    </Link>
                </div>
            </Section>

            {/* ─── BLOCK 06a · Hotel services ───────────────────── */}
            <Section bg="paper">
                <SectionHeader title="Что есть в отеле" caption="Общие услуги" />
                <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8">
                    {services.map((s) => (
                        <div key={s.id} className="flex flex-col gap-2">
                            <div className="font-[family-name:var(--font-display)] text-xl leading-[1.2]">
                                {s.name}
                            </div>
                            <div className="font-[family-name:var(--font-body)] text-sm opacity-70 leading-snug">
                                {s.description}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ─── BLOCK 06b · In-room amenities ────────────────── */}
            <Section bg="surface">
                <SectionHeader title="В каждом номере есть" caption="Базовое оснащение" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 font-[family-name:var(--font-body)] text-base">
                    {roomAmenities.map((a) => (
                        <div key={a.id} className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-rust" />
                            <span>{a.name}</span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ─── BLOCK 07 · Restaurant Дуся (moss full-bleed) ── */}
            <section className="bg-moss text-paper">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-32">
                    <div className="grid grid-cols-12 gap-6 items-end mb-14">
                        <div className="col-span-12 md:col-span-7">
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-70 mb-4">
                                Ресторан · #2 по завтракам в Самаре
                            </div>
                            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] mb-6">
                                Ресторан «Дуся»
                            </h2>
                            <p className="font-[family-name:var(--font-body)] text-lg leading-[1.65] opacity-85 max-w-lg mb-4">
                                {e.restaurant_subtitle || ''}
                            </p>
                            <p className="font-[family-name:var(--font-body)] text-base leading-[1.65] opacity-75 max-w-xl">
                                {e.restaurant_body || ''}
                            </p>
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            <Placeholder className="aspect-[4/5] bg-paper/5 border-paper/20" label="блюдо шефа" />
                        </div>
                    </div>

                    {/* Хэдлайнеры меню — превью 6 карточек */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">
                        {featuredMenuItems.slice(0, 6).map((m) => (
                            <div key={m.id} className="bg-paper/5 border border-paper/20 p-5">
                                <div className="font-[family-name:var(--font-display)] text-xl leading-[1.15] mb-2">{m.name}</div>
                                <div className="font-[family-name:var(--font-body)] text-sm opacity-75 leading-snug">{m.description}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-14">
                        <Link
                            href="/restaurant"
                            className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs inline-block px-8 py-4 bg-paper text-moss hover:bg-rust hover:text-paper transition-colors"
                        >
                            Смотреть меню и ресторан →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── BLOCK 08 · HALL (ink full-bleed) ─────────────── */}
            <section className="bg-ink text-paper">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28">
                    <div className="grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-12 md:col-span-7">
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-65 mb-4">
                                Зал для событий
                            </div>
                            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl leading-[0.95] mb-6">
                                ЛетягинЪ-ХОЛЛ
                            </h2>
                            <p className="font-[family-name:var(--font-body)] text-lg leading-[1.6] opacity-85 max-w-xl mb-8">
                                {e.hall_subtitle || ''}
                            </p>
                            <p className="font-[family-name:var(--font-body)] text-base leading-[1.6] opacity-70 max-w-xl mb-8">
                                {e.hall_body || ''}
                            </p>

                            <div className="flex flex-wrap gap-3 mb-10">
                                {['Конференции и переговоры', 'Свадьбы и банкеты', 'Дни рождения и корпоративы'].map((t) => (
                                    <span key={t} className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] px-4 py-2 border border-paper/40">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <Link
                                href="/letyagin-hall"
                                className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs inline-block px-8 py-4 bg-rust text-paper hover:bg-[color:var(--color-rust-deep)] transition-colors"
                            >
                                Подробнее о зале →
                            </Link>
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            <Placeholder className="aspect-[4/5] bg-paper/5 border-paper/15" label="зал с рассадкой" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── BLOCK 09 · Corporate ─────────────────────────── */}
            <Section bg="surface">
                <SectionHeader title="Корпоративный договор" caption={e.corporate_subtitle || ''} />
                <div className="grid grid-cols-12 gap-6 md:gap-10">
                    <div className="col-span-12 md:col-span-6">
                        <p className="font-[family-name:var(--font-body)] text-lg leading-[1.65] mb-8">
                            {e.corporate_body || ''}
                        </p>
                        <Link
                            href="/corporate"
                            className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs inline-block px-8 py-4 bg-rust text-paper hover:bg-[color:var(--color-rust-deep)] transition-colors"
                        >
                            Оставить заявку на договор →
                        </Link>
                    </div>
                    <div className="col-span-12 md:col-span-6 grid grid-cols-1 gap-4">
                        {[
                            { n: '−10%', t: 'Скидка от базового тарифа' },
                            { n: '★',    t: 'Приоритет при заселении' },
                            { n: '📑',   t: 'Акт, счёт-фактура, УПД' },
                        ].map((f, i) => (
                            <div key={i} className="flex items-center gap-5 bg-paper p-5">
                                <div className="font-[family-name:var(--font-display)] text-3xl text-rust tnum shrink-0 min-w-[60px]">{f.n}</div>
                                <div className="font-[family-name:var(--font-body)] text-base">{f.t}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ─── BLOCK 10 · Nearby preview ────────────────────── */}
            <Section bg="paper">
                <SectionHeader title="Вся Самара в пешей доступности" caption={e.nearby_subtitle || ''} />
                <div className="grid grid-cols-12 gap-6">
                    {nearbyPreview.slice(0, 6).map((p) => (
                        <article key={p.id} className="col-span-6 md:col-span-4 bg-surface p-5 flex flex-col gap-3">
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] text-moss">
                                {categoryLabel(p.category)}
                            </div>
                            <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl leading-[1.15]">
                                {p.name}
                            </h3>
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-[11px] text-rust tnum mt-auto">
                                {p.distance_m ? `${p.distance_m} м` : ''}{p.walk_minutes ? ` · ${p.walk_minutes} мин` : ''}
                            </div>
                        </article>
                    ))}
                </div>
                <div className="mt-10">
                    <Link
                        href="/nearby"
                        className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs text-rust hover:underline underline-offset-4"
                    >
                        Полный путеводитель →
                    </Link>
                </div>
            </Section>

            {/* ─── BLOCK 11 · History timeline ──────────────────── */}
            <Section bg="surface">
                <SectionHeader title="История особняка" caption={e.history_subtitle || ''} />
                <ol className="border-l-2 border-rust pl-8 md:pl-12 space-y-10 max-w-3xl">
                    {historyPreview.map((v) => (
                        <li key={v.id} className="relative">
                            <div className="absolute -left-[42px] md:-left-[54px] top-3 w-3 h-3 rounded-full bg-rust" />
                            <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-none text-rust tnum mb-2">
                                {v.year_label}
                            </div>
                            <div className="font-[family-name:var(--font-display)] text-lg md:text-xl mb-2 opacity-90">
                                {v.headline}
                            </div>
                            <p className="font-[family-name:var(--font-body)] text-base leading-[1.6] opacity-75 max-w-prose">
                                {v.body}
                            </p>
                        </li>
                    ))}
                </ol>
                <div className="mt-10">
                    <Link
                        href="/about"
                        className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs text-rust hover:underline underline-offset-4"
                    >
                        Полная история особняка →
                    </Link>
                </div>
            </Section>

            {/* ─── BLOCK 12 · Gallery details ───────────────────── */}
            <Section bg="paper">
                <SectionHeader title="Детали" caption={e.gallery_subtitle || ''} />
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Placeholder key={i} className="aspect-square" label={`деталь ${i + 1}`} />
                    ))}
                </div>
            </Section>

            {/* ─── BLOCK 13 · Reviews ──────────────────────────── */}
            <Section bg="surface">
                <SectionHeader title="Что говорят гости" caption={e.reviews_subtitle || ''} />

                {/* Шильдик */}
                <div className="mb-12 inline-flex items-center gap-4 bg-ink text-paper px-6 py-4">
                    <div className="font-[family-name:var(--font-display)] text-3xl tnum leading-none">5.0</div>
                    <div className="h-10 w-px bg-paper/30" />
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] leading-[1.5]">
                        298 отзывов<br /><span className="opacity-65">Яндекс.Карты</span>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {featuredReviews.slice(0, 4).map((r) => (
                        <article key={r.id} className="col-span-12 md:col-span-6 bg-[color:var(--color-bone)] p-7 flex flex-col">
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] text-moss mb-4">
                                {topicLabel(r.topic)} · {sourceLabel(r.source)}
                            </div>
                            <blockquote className="font-[family-name:var(--font-display)] text-xl md:text-2xl italic leading-[1.3] mb-auto">
                                «{r.text}»
                            </blockquote>
                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-ink/15 font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px]">
                                <span className="opacity-70">{r.author_name}</span>
                                <span className="text-rust">★★★★★</span>
                            </div>
                        </article>
                    ))}
                </div>
            </Section>

            {/* ─── BLOCK 14 · FAQ ───────────────────────────────── */}
            <Section bg="paper">
                <SectionHeader title="Коротко о важном" caption={e.faq_subtitle || ''} />
                <div className="max-w-3xl">
                    {faqs.map((f, i) => (
                        <details key={f.id} className="border-b border-ink/15 py-5 group" open={i === 0}>
                            <summary className="flex justify-between items-start gap-4 cursor-pointer list-none font-[family-name:var(--font-display)] text-xl md:text-2xl leading-[1.2]">
                                <span>{f.question}</span>
                                <span className="font-[family-name:var(--font-ui)] text-xl opacity-40 shrink-0 group-open:rotate-45 transition-transform">+</span>
                            </summary>
                            <div className="mt-4 font-[family-name:var(--font-body)] text-base leading-[1.65] opacity-80 max-w-prose">
                                {f.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </Section>

            {/* ─── BLOCK 15 · Final widget ──────────────────────── */}
            <section className="bg-[color:var(--color-bone)] text-ink">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28">
                    <div className="grid grid-cols-12 gap-6 mb-10">
                        <div className="col-span-12 md:col-span-7">
                            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl leading-[0.95] mb-4">
                                {e.final_headline || 'Ждём вас в Самаре'}
                            </h2>
                            <p className="font-[family-name:var(--font-body)] text-lg opacity-80 max-w-xl">
                                {e.final_subtitle || ''}
                            </p>
                        </div>
                    </div>
                    <KonturWidgetStub source="footer-widget" />
                </div>
            </section>
        </Layout>
    );
}

function categoryLabel(c) {
    return ({
        culture: 'Культура', food: 'Еда', walks: 'Прогулки',
        shopping: 'Шопинг', arts: 'Искусство', other: 'Другое',
    })[c] || '—';
}

function topicLabel(t) {
    return ({
        service: 'Сервис', breakfast: 'Завтраки',
        location: 'Локация', feeling: 'Впечатление', general: 'Общее',
    })[t] || '';
}

function sourceLabel(s) {
    return ({
        yandex: 'Яндекс', twogis: '2ГИС',
        ostrovok: 'Островок', '101hotels': '101hotels', manual: 'из публикации',
    })[s] || s;
}
