/**
 * Pages/Home.jsx — заглушка Фазы 2A (брендинг).
 *
 * Задача: показать как выглядят утверждённые токены и типографика в живую:
 *   — палитра Rum Raisin / Snow Drizzle / Burnt Orange / Moss Green
 *   — Cormorant Garamond (display) + Arimo (body) + Manrope (UI)
 *
 * Заменим на полноценную главную с 16 блоками в Фазе 2C, когда будут
 * модели, контент и фото.
 */

import { Head } from '@inertiajs/react';

export default function Home({ siteName = 'Отель ЛетягинЪ' }) {
    return (
        <>
            <Head title="Главная" />

            <main className="min-h-screen flex flex-col bg-paper text-ink">
                {/* Тонкая линия сверху — акцент в духе интерьерной отделки */}
                <div className="w-full h-[3px] bg-rust" aria-hidden="true" />

                {/* Хедер */}
                <header className="pt-10 md:pt-14 px-6 md:px-12 flex items-center justify-between">
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.24em] text-[11px] text-ink/70">
                        Самара · ул. Самарская, 69
                    </div>
                    <div className="hidden md:block font-[family-name:var(--font-ui)] uppercase tracking-[0.24em] text-[11px] text-ink/70">
                        +7 987 979-00-00
                    </div>
                </header>

                {/* Центральный блок */}
                <section className="flex-1 flex items-center justify-center px-6 py-20">
                    <div className="max-w-3xl text-center">
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.3em] text-[10px] md:text-xs text-rust mb-8">
                            Бутик-отель · 19 номеров · Ресторан Дуся
                        </div>

                        <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl lg:text-[130px] leading-[0.95] mb-10 text-ink">
                            {siteName}
                        </h1>

                        <div className="w-20 h-px bg-rust mx-auto mb-10" aria-hidden="true" />

                        <p className="font-[family-name:var(--font-body)] text-lg md:text-xl leading-relaxed text-ink/80 mb-4 max-w-xl mx-auto">
                            Бутик-отель в историческом особняке в центре старого города.
                        </p>

                        <p className="font-[family-name:var(--font-body)] text-base md:text-lg italic leading-relaxed text-ink/60 max-w-xl mx-auto">
                            Сайт в разработке — скоро откроется в новом облике.
                        </p>

                        {/* CTA */}
                        <div className="mt-14 md:mt-20 flex flex-col md:flex-row gap-5 items-center justify-center">
                            <a
                                href="tel:+79879790000"
                                className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs md:text-sm inline-block px-8 py-4 bg-rust text-paper hover:bg-[color:var(--color-rust-deep)] transition-colors duration-[var(--duration-standard)]"
                            >
                                Позвонить
                            </a>
                            <a
                                href="mailto:info@letyaginhotel.com"
                                className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs md:text-sm inline-block px-8 py-4 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors duration-[var(--duration-standard)]"
                            >
                                Написать
                            </a>
                        </div>
                    </div>
                </section>

                {/* Разделитель — moss */}
                <div className="w-full h-px bg-moss/30" aria-hidden="true" />

                {/* Футер */}
                <footer className="px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.24em] text-[10px] md:text-xs text-ink/60">
                        © 2026 · Бутик-отель ЛетягинЪ
                    </div>
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.24em] text-[10px] md:text-xs text-ink/50">
                        Историческое здание 1883 года
                    </div>
                </footer>
            </main>
        </>
    );
}
