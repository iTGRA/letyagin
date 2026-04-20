/**
 * Pages/Home.jsx — временная заглушка до получения фактуры отеля.
 *
 * После утверждения брифа и дизайн-системы — переверстаем в полноценный
 * лендинг. Пока: имя, короткое обещание, контакт.
 */

import { Head } from '@inertiajs/react';

export default function Home({ siteName = 'Отель Летягинъ' }) {
    return (
        <>
            <Head title="Главная" />

            <main className="min-h-screen flex flex-col">
                {/* Верхняя декоративная строка — сепия */}
                <div className="w-full h-1 bg-[color:var(--color-sepia)]" aria-hidden="true" />

                {/* Хедер — пусто, только лого-строка по центру */}
                <header className="pt-8 md:pt-10 flex justify-center">
                    <div className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-[color:var(--color-sepia-deep)]">
                        Самара · Волга · 2026
                    </div>
                </header>

                {/* Центральный блок */}
                <section className="flex-1 flex items-center justify-center px-6">
                    <div className="max-w-2xl text-center">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.95] mb-8 md:mb-10">
                            {siteName}
                        </h1>

                        <div className="w-16 h-px bg-[color:var(--color-sepia)] mx-auto mb-8" aria-hidden="true" />

                        <p className="text-lg md:text-xl text-[color:var(--color-ink)] opacity-80 mb-3">
                            Сайт в разработке.
                        </p>
                        <p className="text-base md:text-lg text-[color:var(--color-ink)] opacity-60">
                            Скоро здесь будут номера, вид на Волгу
                            <br className="hidden md:block" />
                            и живой образ отеля.
                        </p>

                        <div className="mt-14 md:mt-20 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center text-sm">
                            <a
                                href="tel:+78001234567"
                                className="inline-block px-6 py-3 border border-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)] transition-colors duration-[var(--duration-standard)]"
                            >
                                связаться с нами
                            </a>
                            <span className="opacity-50 text-xs uppercase tracking-widest">
                                по вопросам размещения
                            </span>
                        </div>
                    </div>
                </section>

                {/* Футер */}
                <footer className="px-6 py-8 text-center">
                    <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[color:var(--color-sepia-deep)] opacity-70">
                        © 2026 · {siteName}
                    </div>
                </footer>
            </main>
        </>
    );
}
