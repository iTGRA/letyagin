import { Head, usePage } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import { Placeholder, Section, SectionHeader, MetaPair } from '@/Components/UI/Primitives';
import LeadForm from '@/Components/UI/LeadForm';

export default function Contacts({ page }) {
    const { siteSettings } = usePage().props;
    const c = siteSettings?.contacts || {};
    const maps = siteSettings?.maps || {};

    return (
        <Layout heroTone="dark">
            <Head>
                <title>{page?.meta_title}</title>
                <meta name="description" content={page?.meta_description || ''} />
            </Head>

            {/* Hero — brick */}
            <section className="bg-[color:var(--color-brick)] text-paper">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28">
                    <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
                        <div className="col-span-12 md:col-span-7">
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-70 mb-5">
                                Как нас найти
                            </div>
                            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] mb-6">
                                Контакты
                            </h1>
                            <p className="font-[family-name:var(--font-body)] text-lg opacity-85 mb-8">
                                Круглосуточный ресепшн, парковка во дворе, 15 минут пешком до&nbsp;Волги.
                            </p>
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            <div className="space-y-0">
                                <MetaPair k="Адрес" v={c.address_full || ''} onDark />
                                <MetaPair k="Телефон" v={c.phone || ''} onDark />
                                <MetaPair k="Email" v={c.email || ''} onDark />
                                <MetaPair k="Заезд" v={c.checkin_time ? `с ${c.checkin_time}` : ''} onDark />
                                <MetaPair k="Выезд" v={c.checkout_time ? `до ${c.checkout_time}` : ''} onDark />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Карта */}
            <Section bg="paper">
                <SectionHeader title="На карте" caption={c.address_full || ''} />
                {maps.map_embed ? (
                    <div className="aspect-[16/7] border border-ink/15" dangerouslySetInnerHTML={{ __html: maps.map_embed }} />
                ) : (
                    <Placeholder className="aspect-[16/7]" label="Яндекс.Карта (подключим в админке)" />
                )}
            </Section>

            {/* Как добраться */}
            <Section bg="surface">
                <SectionHeader title="Как добраться" caption="Несколько вариантов — от вокзала до парковки" />
                <div className="grid grid-cols-12 gap-6">
                    {[
                        { t: 'От ж/д вокзала', b: 'Около 1.5 км, 5-7 минут на такси. Удобнее всего — Яндекс.Такси.' },
                        { t: 'От аэропорта Курумоч', b: 'Около 40 км, 50-60 минут на машине. Трансфер — по запросу.' },
                        { t: 'На своём автомобиле', b: 'Охраняемая парковка во внутреннем дворе отеля, бесплатно для гостей. 15 мест.' },
                        { t: 'Общественным транспортом', b: 'Ближайшие остановки — «Площадь Куйбышева» (автобус, трамвай) и метро «Алабинская».' },
                    ].map((i) => (
                        <article key={i.t} className="col-span-12 md:col-span-6 lg:col-span-3 bg-paper p-6">
                            <h3 className="font-[family-name:var(--font-display)] text-xl leading-[1.15] mb-3">{i.t}</h3>
                            <p className="font-[family-name:var(--font-body)] text-sm opacity-75 leading-relaxed">{i.b}</p>
                        </article>
                    ))}
                </div>
            </Section>

            {/* Форма */}
            <Section bg="paper">
                <SectionHeader title="Написать нам" caption="Ответим в рабочий день" />
                <LeadForm
                    action="/api/forms/contact"
                    source="contacts-form"
                    submitLabel="Отправить"
                    fields={[
                        { name: 'name', label: 'Имя', required: true },
                        { name: 'phone', label: 'Телефон', placeholder: '+7 ___ ___ __ __' },
                        { name: 'email', label: 'Email', type: 'email' },
                        { name: 'message', label: 'Сообщение', textarea: true, required: true },
                    ]}
                />
            </Section>
        </Layout>
    );
}
