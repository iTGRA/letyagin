import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import { Placeholder, Section, SectionHeader, PrimaryBtn, MetaPair } from '@/Components/UI/Primitives';
import KonturWidgetStub from '@/Components/Blocks/KonturWidgetStub';

export default function RoomShow({ room, similarRooms = [] }) {
    return (
        <Layout>
            <Head>
                <title>{room.seo_title || room.name}</title>
                <meta name="description" content={room.seo_description || ''} />
            </Head>

            {/* HERO номера — brick плашка по правилу DESIGN_SYSTEM */}
            <section className="bg-[color:var(--color-brick)] text-paper">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28">
                    <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
                        <div className="col-span-12 md:col-span-7">
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[11px] opacity-65 mb-4">
                                Номер · бутик-отель ЛетягинЪ
                            </div>
                            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] mb-6">
                                {room.name}
                            </h1>
                            <p className="font-[family-name:var(--font-body)] text-lg md:text-xl leading-[1.5] opacity-90 max-w-xl">
                                {room.short_description}
                            </p>
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            <div className="space-y-0">
                                <MetaPair k="Метраж" v={`${room.area_m2} м²`} onDark />
                                <MetaPair k="Гостей" v={`до ${room.guests}`} onDark />
                                {room.view_text && <MetaPair k="Вид" v={room.view_text} onDark />}
                                <MetaPair k="Тихий номер" v={room.is_quiet ? 'Да' : 'Нет'} onDark />
                                <MetaPair k="Доп. кровать" v={room.extra_bed ? 'Возможна' : 'Нет'} onDark />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero-фото */}
            <Section bg="paper">
                <Placeholder className="aspect-[16/9] md:aspect-[21/9]" label="главное фото номера" />
            </Section>

            {/* Описание */}
            <Section bg="paper">
                <div className="grid grid-cols-12 gap-6 md:gap-10">
                    <div className="col-span-12 md:col-span-2">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[11px] opacity-55">Номер</div>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <div className="font-[family-name:var(--font-body)] text-lg leading-[1.7] space-y-5 whitespace-pre-line">
                            {room.description}
                        </div>
                    </div>
                </div>
            </Section>

            {/* Особенности + удобства */}
            {(room.features?.length > 0 || room.amenities?.length > 0) && (
                <Section bg="surface">
                    <SectionHeader title="Что есть в номере" />
                    <div className="grid grid-cols-12 gap-6 md:gap-10">
                        {room.features?.length > 0 && (
                            <div className="col-span-12 md:col-span-5">
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] text-moss mb-4">
                                    Особенности категории
                                </div>
                                <ul className="space-y-2 font-[family-name:var(--font-body)] text-base">
                                    {room.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-rust mt-2 shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {room.amenities?.length > 0 && (
                            <div className="col-span-12 md:col-span-6 md:col-start-7">
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] text-moss mb-4">
                                    Базовый стандарт всех номеров
                                </div>
                                <ul className="grid grid-cols-2 gap-x-5 gap-y-2 font-[family-name:var(--font-body)] text-base">
                                    {room.amenities.map((a) => (
                                        <li key={a.id} className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-ink/40 mt-2 shrink-0" />
                                            <span>{a.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </Section>
            )}

            {/* Widget */}
            <Section bg="paper">
                <SectionHeader title="Забронировать" caption={`${room.name} · проверить даты`} />
                <KonturWidgetStub source={`room-${room.slug}-widget`} />
            </Section>

            {/* Similar */}
            {similarRooms.length > 0 && (
                <Section bg="surface">
                    <SectionHeader title="Похожие категории" />
                    <div className="grid grid-cols-12 gap-6">
                        {similarRooms.map((r) => (
                            <Link key={r.id} href={`/rooms/${r.slug}`} className="col-span-12 md:col-span-4 group">
                                <Placeholder className="aspect-[4/3] mb-3" label={r.name.toLowerCase()} />
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] text-moss tnum mb-1">
                                    {r.area_m2} м²
                                </div>
                                <div className="font-[family-name:var(--font-display)] text-xl leading-[1.15] group-hover:text-rust transition-colors">
                                    {r.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-10">
                        <Link href="/rooms" className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs text-rust hover:underline underline-offset-4">
                            Все 12 категорий →
                        </Link>
                    </div>
                </Section>
            )}
        </Layout>
    );
}
