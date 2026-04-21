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
        <Layout>
            <Head>
                <title>{page?.meta_title}</title>
                <meta name="description" content={page?.meta_description || ''} />
            </Head>

            <section className="bg-paper text-ink">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28">
                    <div className="grid grid-cols-12 gap-6 mb-10">
                        <div className="col-span-12 md:col-span-8">
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] text-rust mb-5">
                                Путеводитель от отеля
                            </div>
                            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] mb-6">
                                Самара в пешей доступности
                            </h1>
                            <p className="font-[family-name:var(--font-body)] text-lg leading-[1.5] opacity-85 max-w-2xl">
                                {page?.intro_text}
                            </p>
                        </div>
                    </div>

                    {/* Карта-плейсхолдер */}
                    <Placeholder className="aspect-[16/7]" label="интерактивная карта Яндекс" />
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
