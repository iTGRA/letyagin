import { Head } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import { Placeholder, Section, SectionHeader } from '@/Components/UI/Primitives';
import LeadForm from '@/Components/UI/LeadForm';

export default function Hall({ page }) {
    return (
        <Layout heroTone="dark">
            <Head>
                <title>{page?.meta_title}</title>
                <meta name="description" content={page?.meta_description || ''} />
            </Head>

            {/* Hero ink — правило DESIGN_SYSTEM */}
            <section className="bg-ink text-paper">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28">
                    <div className="grid grid-cols-12 gap-6 items-end">
                        <div className="col-span-12 md:col-span-7">
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-60 mb-5">
                                Зал для событий · до 60 гостей
                            </div>
                            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,7rem)] leading-[0.92] mb-8">
                                ЛетягинЪ-ХОЛЛ
                            </h1>
                            <p className="font-[family-name:var(--font-body)] text-lg md:text-xl leading-[1.55] opacity-85 max-w-xl">
                                {page?.intro_text}
                            </p>
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            <Placeholder className="aspect-[4/5] bg-paper/5 border-paper/15" label="зал с рассадкой" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Форматы */}
            <Section bg="paper">
                <SectionHeader title="Форматы мероприятий" caption="Свадьбы · банкеты · конференции · корпоративы" />
                <div className="grid grid-cols-12 gap-6">
                    {[
                        { title: 'Свадьба', body: 'Двор и зал, кейтеринг от «Дуси», отдельная логистика для гостей.' },
                        { title: 'Банкет', body: 'До 60 гостей, рассадка по вашему плану, живая музыка по желанию.' },
                        { title: 'Конференция', body: 'Проектор, микрофоны, флипчарт, кофе-брейки от «Дуси», парковка.' },
                        { title: 'День рождения', body: 'Камерный формат, зал на любое число гостей, кухня от шефа.' },
                    ].map((f) => (
                        <article key={f.title} className="col-span-12 md:col-span-6 lg:col-span-3 bg-surface p-6">
                            <Placeholder className="aspect-[4/3] mb-4" label={f.title.toLowerCase()} />
                            <h3 className="font-[family-name:var(--font-display)] text-xl leading-[1.15] mb-2">{f.title}</h3>
                            <p className="font-[family-name:var(--font-body)] text-sm opacity-75 leading-snug">{f.body}</p>
                        </article>
                    ))}
                </div>
            </Section>

            {/* Форма заявки */}
            <Section bg="surface">
                <SectionHeader title="Оставить заявку" caption="Свяжемся с вами в рабочий день" />
                <LeadForm
                    action="/api/forms/event"
                    source="hall-request"
                    submitLabel="Отправить заявку"
                    fields={[
                        { name: 'name', label: 'Ваше имя', required: true },
                        { name: 'phone', label: 'Телефон', required: true, placeholder: '+7 ___ ___ __ __' },
                        { name: 'email', label: 'Email', type: 'email' },
                        { name: 'event_type', label: 'Тип мероприятия (wedding / banquet / conference / birthday / corporate / other)', required: true, default: 'banquet' },
                        { name: 'event_date', label: 'Предполагаемая дата', type: 'date' },
                        { name: 'guests_count', label: 'Количество гостей', type: 'number' },
                        { name: 'comment', label: 'Детали (формат, время, пожелания)', textarea: true },
                    ]}
                />
            </Section>
        </Layout>
    );
}
