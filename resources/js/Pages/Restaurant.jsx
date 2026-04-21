import { Head } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import { Placeholder, Section, SectionHeader, PrimaryBtn, SecondaryBtn } from '@/Components/UI/Primitives';
import LeadForm from '@/Components/UI/LeadForm';

export default function Restaurant({ page, chef, menuHeadliners = [], menuByCategory = {} }) {
    const e = page?.extra ?? {};
    return (
        <Layout heroTone="dark">
            <Head>
                <title>{page?.meta_title || 'Ресторан Дуся'}</title>
                <meta name="description" content={page?.meta_description || ''} />
            </Head>

            {/* Hero moss */}
            <section className="bg-moss text-paper">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28">
                    <div className="grid grid-cols-12 gap-6 items-end">
                        <div className="col-span-12 md:col-span-7">
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-70 mb-5">
                                Ресторан · 62 посадки · с 8:00
                            </div>
                            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] mb-6">
                                Ресторан «Дуся»
                            </h1>
                            <p className="font-[family-name:var(--font-body)] text-lg md:text-xl leading-[1.5] opacity-90 max-w-xl mb-8">
                                {page?.intro_text}
                            </p>
                            <div className="flex flex-wrap gap-4 mb-8">
                                <div className="bg-paper/10 px-5 py-3 font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px]">
                                    #2 по завтракам — «Как Есть»
                                </div>
                                <div className="bg-paper/10 px-5 py-3 font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px]">
                                    #17 в гастрорейтинге города
                                </div>
                            </div>
                            <a href="tel:+79879790000" className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-sm px-8 py-4 bg-paper text-moss hover:bg-rust hover:text-paper transition-colors inline-block">
                                Бронь стола · +7 987 979-00-00
                            </a>
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            <Placeholder className="aspect-[4/5] bg-paper/5 border-paper/20" label="зал Дуси" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Концепция */}
            <Section bg="paper">
                <SectionHeader title="Что такое «Дуся»" />
                <div className="grid grid-cols-12 gap-6 md:gap-10">
                    <div className="col-span-12 md:col-span-8 space-y-5 font-[family-name:var(--font-body)] text-lg leading-[1.65]">
                        {e.concept_body_1 && <p>{e.concept_body_1}</p>}
                        {e.concept_body_2 && <p className="opacity-85">{e.concept_body_2}</p>}
                        {e.concept_body_3 && <p className="opacity-80">{e.concept_body_3}</p>}
                    </div>
                </div>
            </Section>

            {/* Шеф */}
            {chef && (
                <Section bg="surface">
                    <SectionHeader title={`Шеф · ${chef.name}`} caption={chef.role} />
                    <div className="grid grid-cols-12 gap-6 md:gap-10">
                        <div className="col-span-12 md:col-span-5">
                            <Placeholder className="aspect-[4/5]" label="портрет шефа" />
                        </div>
                        <div className="col-span-12 md:col-span-6 md:col-start-7">
                            <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl leading-[1.1] mb-6">
                                {chef.role}
                            </div>
                            <p className="font-[family-name:var(--font-body)] text-base md:text-lg leading-[1.65] opacity-85 whitespace-pre-line">
                                {chef.bio}
                            </p>
                        </div>
                    </div>
                </Section>
            )}

            {/* Хэдлайнеры меню */}
            <Section bg="paper">
                <SectionHeader title="Что попробовать" caption="Фирменные блюда «Дуси»" />
                <div className="grid grid-cols-12 gap-6">
                    {menuHeadliners.map((m) => (
                        <article key={m.id} className="col-span-12 md:col-span-6 lg:col-span-3 bg-surface p-5">
                            <Placeholder className="aspect-square mb-4" label={m.name.toLowerCase()} />
                            <h3 className="font-[family-name:var(--font-display)] text-xl leading-[1.15] mb-2">{m.name}</h3>
                            <p className="font-[family-name:var(--font-body)] text-sm opacity-75 leading-snug">{m.description}</p>
                        </article>
                    ))}
                </div>
            </Section>

            {/* Форма брони стола */}
            <Section bg="surface">
                <SectionHeader title="Забронировать стол" caption="Свяжемся в рабочий день для подтверждения" />
                <LeadForm
                    action="/api/forms/table-booking"
                    source="restaurant-book-table"
                    submitLabel="Отправить заявку"
                    fields={[
                        { name: 'name', label: 'Ваше имя', required: true },
                        { name: 'phone', label: 'Телефон', required: true, placeholder: '+7 ___ ___ __ __' },
                        { name: 'email', label: 'Email', type: 'email' },
                        { name: 'desired_date', label: 'Дата', type: 'date', required: true },
                        { name: 'desired_time', label: 'Время (ЧЧ:ММ)', type: 'time', required: true, default: '19:00' },
                        { name: 'guests_count', label: 'Количество гостей', type: 'number', required: true, default: '2' },
                        { name: 'comment', label: 'Комментарий', textarea: true },
                    ]}
                />
            </Section>
        </Layout>
    );
}
