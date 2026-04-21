import { Head } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import { Placeholder, Section, SectionHeader } from '@/Components/UI/Primitives';

export default function About({ page, milestones = [] }) {
    return (
        <Layout>
            <Head>
                <title>{page?.meta_title}</title>
                <meta name="description" content={page?.meta_description || ''} />
            </Head>

            {/* Hero paper + фасад */}
            <section className="bg-paper text-ink">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-12 gap-6 items-end">
                    <div className="col-span-12 md:col-span-6">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] text-rust mb-5">
                            1874 — 2024 · 150 лет гостеприимства
                        </div>
                        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] mb-6">
                            История особняка на&nbsp;Самарской,&nbsp;69
                        </h1>
                        <p className="font-[family-name:var(--font-body)] text-lg leading-[1.5] opacity-85 max-w-xl">
                            {page?.intro_text}
                        </p>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <Placeholder className="aspect-[4/5] md:aspect-[5/6]" label="фасад особняка" />
                    </div>
                </div>
            </section>

            {/* Таймлайн — полный */}
            <Section bg="surface">
                <SectionHeader title="Пять эпох здания" caption="От купеческой усадьбы до бутик-отеля" />
                <ol className="border-l-2 border-rust pl-8 md:pl-12 space-y-12 max-w-3xl">
                    {milestones.map((v) => (
                        <li key={v.id} className="relative">
                            <div className="absolute -left-[42px] md:-left-[54px] top-3 w-3 h-3 rounded-full bg-rust" />
                            <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl leading-none text-rust tnum mb-3">
                                {v.year_label}
                            </div>
                            <div className="font-[family-name:var(--font-display)] text-xl md:text-2xl mb-3">
                                {v.headline}
                            </div>
                            <p className="font-[family-name:var(--font-body)] text-base md:text-lg leading-[1.6] opacity-80 max-w-prose">
                                {v.body}
                            </p>
                        </li>
                    ))}
                </ol>
            </Section>

            {/* Coal cinematic — большая италик-цитата */}
            <section className="bg-[color:var(--color-coal)] text-paper">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-28 md:py-40 text-center">
                    <blockquote className="font-[family-name:var(--font-display)] italic text-[clamp(2rem,5vw,4rem)] leading-[1.2] max-w-3xl mx-auto">
                        «Ещё вчера это был постоялый двор на купеческой усадьбе. Сегодня — бутик-отель. Завтра — как получится у гостей.»
                    </blockquote>
                    <div className="mt-10 font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[11px] opacity-60">
                        1874 — 2024 · 150 лет
                    </div>
                </div>
            </section>
        </Layout>
    );
}
