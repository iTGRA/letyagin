import { Head } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import { Section, SectionHeader } from '@/Components/UI/Primitives';
import LeadForm from '@/Components/UI/LeadForm';

export default function Corporate({ page }) {
    return (
        <Layout heroTone="light">
            <Head>
                <title>{page?.meta_title}</title>
                <meta name="description" content={page?.meta_description || ''} />
            </Head>

            {/* Hero — stone (нейтральный warm для делового блока) */}
            <section className="bg-[color:var(--color-stone)] text-ink">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-8">
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-70 mb-5">
                                Для компаний
                            </div>
                            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] mb-6">
                                Корпоративный договор
                            </h1>
                            <p className="font-[family-name:var(--font-body)] text-lg md:text-xl leading-[1.5] opacity-90 max-w-xl">
                                {page?.intro_text}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Что получает компания */}
            <Section bg="paper">
                <SectionHeader title="Что получает компания" caption="Условия партнёрства" />
                <div className="grid grid-cols-12 gap-6">
                    {[
                        { n: '−10%', t: 'Скидка от базового тарифа', b: 'Фиксированная цена независимо от сезона.' },
                        { n: '★',    t: 'Приоритет при заселении', b: 'Номер всегда готов, очереди нет.' },
                        { n: '📑',   t: 'Закрывающие документы', b: 'Акт, счёт-фактура, УПД для бухгалтерии.' },
                        { n: '☎',    t: 'Выделенный менеджер', b: 'Один контакт для всех вопросов по договору.' },
                    ].map((f, i) => (
                        <div key={i} className="col-span-12 md:col-span-6 lg:col-span-3 bg-surface p-6 flex flex-col gap-3">
                            <div className="font-[family-name:var(--font-display)] text-5xl text-rust tnum leading-none">{f.n}</div>
                            <h3 className="font-[family-name:var(--font-display)] text-xl leading-[1.15]">{f.t}</h3>
                            <p className="font-[family-name:var(--font-body)] text-sm opacity-75 leading-snug">{f.b}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Процесс */}
            <Section bg="surface">
                <SectionHeader title="Как оформить" caption="Четыре шага" />
                <div className="grid grid-cols-12 gap-6 md:gap-8 border-t border-ink/25 pt-8">
                    {[
                        ['01', 'Заявка', 'Заполняете форму ниже — указываете компанию, примерное количество ночей в год.'],
                        ['02', 'Согласование', 'Наш менеджер связывается в рабочий день, обсуждает условия.'],
                        ['03', 'Подписание', 'Оформляем договор — на бумаге или электронный (с ЭЦП).'],
                        ['04', 'Начало работы', 'Бронируете любые номера, завтраки в «Дусе», зал ЛетягинЪ-ХОЛЛ.'],
                    ].map(([n, t, b]) => (
                        <div key={n} className="col-span-12 md:col-span-3">
                            <div className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-rust tnum leading-none mb-5">{n}</div>
                            <h3 className="font-[family-name:var(--font-display)] text-xl leading-[1.15] mb-3">{t}</h3>
                            <p className="font-[family-name:var(--font-body)] text-sm opacity-75 leading-snug">{b}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Форма */}
            <Section bg="paper">
                <SectionHeader title="Оставить заявку" caption="Свяжемся с вами в рабочий день" />
                <LeadForm
                    action="/api/forms/corporate"
                    source="corporate-request"
                    submitLabel="Отправить заявку"
                    fields={[
                        { name: 'name', label: 'Контактное лицо', required: true },
                        { name: 'company', label: 'Название компании', required: true },
                        { name: 'phone', label: 'Телефон', required: true, placeholder: '+7 ___ ___ __ __' },
                        { name: 'email', label: 'Email', type: 'email', required: true },
                        { name: 'estimated_nights_per_year', label: 'Примерное число ночей в год', type: 'number' },
                        { name: 'comment', label: 'Дополнительно (регулярность, специфика)', textarea: true },
                    ]}
                />
            </Section>
        </Layout>
    );
}
