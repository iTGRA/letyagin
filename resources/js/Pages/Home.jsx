/**
 * Pages/Home.jsx — временная стартовая страница.
 *
 * Заменим после утверждения брифа и дизайн-системы.
 * Цель сейчас: проверить что SSR и Tailwind 4 работают.
 */

import { Head } from '@inertiajs/react';

export default function Home({ siteName = 'Отель Летягинъ' }) {
    return (
        <>
            <Head title="Главная" />
            <main className="min-h-screen flex items-center justify-center px-6">
                <div className="max-w-xl text-center">
                    <div className="uppercase tracking-[0.2em] text-xs mb-6 text-[color:var(--color-sepia)]">
                        фаза&nbsp;1 · скелет
                    </div>
                    <h1 className="text-5xl md:text-6xl mb-6">
                        {siteName}
                    </h1>
                    <p className="text-lg opacity-80">
                        Каркас развёрнут. Ждём бриф, контент, референсы —
                        и превращаем эту страницу в лицо отеля.
                    </p>
                    <div className="mt-10 text-sm opacity-60">
                        <a href="/admin" className="underline underline-offset-4">
                            войти в админку
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}
