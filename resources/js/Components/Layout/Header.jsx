/**
 * Sticky transparent header.
 *
 * Поведение:
 *   - По умолчанию прозрачный, текст адаптируется к hero:
 *       heroTone='light'  → тёмный текст (на surface/paper/stone hero)
 *       heroTone='dark'   → светлый текст (на sage/slate/moss/ink/brick/coral hero)
 *   - При hover и при скролле > 40px — заливается paper, текст ink
 *   - Мобильный overlay — всегда paper фон (как было)
 *
 * heroTone передаётся из Layout → из каждой Page.
 */

import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const NAV = [
    { label: 'Номера', href: '/rooms' },
    { label: 'Ресторан', href: '/restaurant' },
    { label: 'ЛетягинЪ-Холл', href: '/letyagin-hall' },
    { label: 'О проекте', href: '/about' },
    { label: 'Лучшее рядом', href: '/nearby' },
    { label: 'Контакты', href: '/contacts' },
];

export default function Header({ heroTone = 'light' }) {
    const { siteSettings } = usePage().props;
    const phone = siteSettings?.contacts?.phone || '';
    const phoneTel = siteSettings?.contacts?.phone_tel || '';

    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // При скролле > 40px — залить фон paper независимо от hover
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Adapt to hero tone
    const toneClass = heroTone === 'dark' ? 'letyagin-header--on-dark' : 'letyagin-header--on-light';
    const stateClass = scrolled ? 'letyagin-header--scrolled' : '';

    return (
        <header
            className={`letyagin-header ${toneClass} ${stateClass} sticky top-0 z-50 transition-colors duration-[var(--duration-standard)] ease-[var(--ease-standard)]`}
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 flex items-center justify-between gap-4 h-16 md:h-20">

                <Link href="/" className="shrink-0 font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-none tracking-tight">
                    ЛетягинЪ
                </Link>

                <nav className="hidden lg:flex items-center gap-7 font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[11px]">
                    {NAV.map((n) => (
                        <Link key={n.href} href={n.href} className="letyagin-header__link transition-colors">
                            {n.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-5">
                    {phone && (
                        <a href={`tel:${phoneTel}`} className="letyagin-header__link font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[11px] tnum transition-colors">
                            {phone}
                        </a>
                    )}
                    <a href="#widget-hero" className="font-[family-name:var(--font-ui)] uppercase tracking-[0.14em] text-[11px] px-5 py-3 bg-rust text-paper hover:bg-[color:var(--color-rust-deep)] transition-colors">
                        Забронировать
                    </a>
                </div>

                <button
                    className="lg:hidden flex items-center justify-center w-10 h-10 -mr-2 letyagin-header__link"
                    onClick={() => setOpen(v => !v)}
                    aria-label="Меню"
                >
                    <div className="flex flex-col gap-1.5">
                        <span className="w-6 h-px bg-current"></span>
                        <span className="w-6 h-px bg-current"></span>
                        <span className="w-6 h-px bg-current"></span>
                    </div>
                </button>
            </div>

            {open && (
                <div className="lg:hidden bg-paper text-ink border-t border-ink/10">
                    <nav className="px-6 py-6 flex flex-col gap-4 font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-xs">
                        {NAV.map((n) => (
                            <Link key={n.href} href={n.href} className="py-1" onClick={() => setOpen(false)}>
                                {n.label}
                            </Link>
                        ))}
                        <div className="h-px bg-ink/15 my-2"></div>
                        {phone && (
                            <a href={`tel:${phoneTel}`} className="tnum">{phone}</a>
                        )}
                        <a href="#widget-hero" className="inline-block bg-rust text-paper px-5 py-3 text-center" onClick={() => setOpen(false)}>
                            Забронировать
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
