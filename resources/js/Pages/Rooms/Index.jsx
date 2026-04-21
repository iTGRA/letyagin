import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import { Placeholder, Section, SectionHeader } from '@/Components/UI/Primitives';
import KonturWidgetStub from '@/Components/Blocks/KonturWidgetStub';

export default function RoomsIndex({ page, rooms = [] }) {
    return (
        <Layout>
            <Head>
                <title>{page?.meta_title || 'Номера — Летягин'}</title>
                <meta name="description" content={page?.meta_description || ''} />
            </Head>

            <Section bg="paper">
                <SectionHeader title={page?.h1 || 'Номера'} caption={page?.intro_text || ''} />

                <div className="grid grid-cols-12 gap-6">
                    {rooms.map((r) => (
                        <Link
                            key={r.id}
                            href={`/rooms/${r.slug}`}
                            className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface p-5 hover:shadow-[0_8px_24px_rgba(58,27,28,0.08)] transition-shadow group"
                        >
                            <Placeholder className="aspect-[4/3] mb-4" label={r.name.toLowerCase()} />
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
