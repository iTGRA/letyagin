import { Head } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import { Placeholder, Section, SectionHeader } from '@/Components/UI/Primitives';

const CAT_LABELS = {
    culture: 'Культура',
    food: 'Еда',
    walks: 'Прогулки',
    shopping: 'Шопинг',
    arts: 'Искусство',
    other: 'Другое',
};

export default function Nearby({ page, places = [], placesByCategory = {} }) {
    return (
        <Layout heroTone="dark">
            <Head>
                <title>{page?.meta_title}</title>
                <meta name="description" content={page?.meta_description || ''} />
            </Head>

            {/* Hero coral — friendly, warm для путеводителя */}
            <section className="bg-[color:var(--color-coral)] text-paper">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-16 md:pb-20">
                    <div className="grid grid-cols-12 gap-6 mb-10">
                        <div className="col-span-12 md:col-span-8">
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.24em] text-[10px] opacity-80 mb-5">
                                Путеводитель от отеля
                            </div>
                            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-[-0.01em] mb-6 [text-wrap:balance] max-w-[780px]">
                                Самара в&nbsp;пешей доступности
                            </h1>
                            <p className="font-[family-name:var(--font-body)] text-base md:text-lg leading-[1.55] opacity-90 max-w-2xl">
                                {page?.intro_text}
                            </p>
                        </div>
                    </div>

                    {/* Карта-плейсхолдер на coral — чуть темнее тоном */}
                    <Placeholder className="aspect-[16/7] bg-paper/10 border-paper/20" label="интерактивная карта Яндекс" />
                </div>
            </section>

            {/* Группировка по категориям */}
            {Object.entries(placesByCategory).map(([cat, items]) => (
                <Section key={cat} bg={cat === Object.keys(placesByCategory)[1] ? 'surface' : 'paper'}>
                    <SectionHeader title={CAT_LABELS[cat] || 'Места'} caption={`${items.length} ${pluralPlaces(items.length)}`} />
                    <div className="grid grid-cols-12 gap-6">
                        {items.map((p) => (
                            <article key={p.id} className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface p-6 flex flex-col gap-3">
                                <Placeholder className="aspect-[4/3] -mx-6 -mt-6 mb-2" label={p.name.toLowerCase()} />
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] text-moss">
                                    {CAT_LABELS[p.category]}
                                </div>
                                <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl leading-[1.15]">
                                    {p.name}
                                </h3>
                                {p.description && (
                                    <p className="font-[family-name:var(--font-body)] text-sm opacity-75 leading-relaxed">
                                        {p.description}
                                    </p>
                                )}
                                <div className="mt-auto pt-3 flex items-center gap-3 font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-[11px] text-rust tnum">
                                    {p.distance_m && <span>{p.distance_m} м</span>}
                                    {p.walk_minutes && (
                                        <>
                                            <span className="opacity-40">·</span>
                                            <span>{p.walk_minutes} мин пешком</span>
                                        </>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </Section>
            ))}
        </Layout>
    );
}

function pluralPlaces(n) {
    if (n === 1) return 'место';
    if (n >= 2 && n <= 4) return 'места';
    return 'мест';
}
