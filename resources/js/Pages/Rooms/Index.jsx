import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import { Section, SectionHeader } from '@/Components/UI/Primitives';
import Img from '@/Components/UI/Img';
import KonturWidgetStub from '@/Components/Blocks/KonturWidgetStub';

export default function RoomsIndex({ page, rooms = [] }) {
    return (
        <Layout heroTone="dark">
            <Head>
                <title>{page?.meta_title || 'Номера — Летягин'}</title>
                <meta name="description" content={page?.meta_description || ''} />
            </Head>

            {/* Hero — sage. Отделяется от paper body цветом. */}
            <section className="bg-[color:var(--color-sage)] text-paper">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-2">
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.24em] text-[10px] opacity-70">
                                12 категорий
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-8">
                            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] tracking-[-0.01em] mb-6 [text-wrap:balance] max-w-[700px]">
                                {page?.h1 || 'Номера бутик-отеля Летягин'}
                            </h1>
                            <p className="font-[family-name:var(--font-body)] text-base md:text-lg leading-[1.5] opacity-90 max-w-2xl">
                                {page?.intro_text || ''}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Section bg="paper">
                <div className="grid grid-cols-12 gap-6">
                    {rooms.map((r) => (
                        <Link
                            key={r.id}
                            href={`/rooms/${r.slug}`}
                            className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface p-5 hover:shadow-[0_8px_24px_rgba(58,27,28,0.08)] transition-shadow group"
                        >
                            <Img src={r.hero_image_url} alt={r.name} label={r.name.toLowerCase()} className="aspect-[4/3] mb-4" />
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] text-moss mb-2 tnum">
                                {r.area_m2} м² · до {r.guests} {pluralGuests(r.guests)}
                            </div>
                            <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl leading-[1.15] mb-2 group-hover:text-rust transition-colors">
                                {r.name}
                            </h3>
                            <p className="font-[family-name:var(--font-body)] text-sm opacity-75 leading-relaxed line-clamp-3">
                                {r.short_description}
                            </p>
                            <div className="mt-3 font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] text-rust">
                                Смотреть номер →
                            </div>
                        </Link>
                    ))}
                </div>
            </Section>

            <Section bg="surface">
                <KonturWidgetStub source="rooms-widget" />
            </Section>
        </Layout>
    );
}

function pluralGuests(n) {
    if (n === 1) return 'гостя';
    if (n >= 2 && n <= 4) return 'гостей';
    return 'гостей';
}
