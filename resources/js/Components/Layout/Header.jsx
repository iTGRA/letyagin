/**
 * Sticky header — логотип слева, навигация в центре, телефон + CTA справа.
 * На мобиле — hamburger + CTA.
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

export default function Header() {
    const { siteSettings } = usePage().props;
    const phone = siteSettings?.contacts?.phone || '';
    const phoneTel = siteSettings?.contacts?.phone_tel || '';

    const [open, setOpen] = useState(false);
    useEffect(() => { setOpen(false); }, []);

    return (
        <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-ink/10">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 flex items-center justify-between gap-4 h-16 md:h-20">

                {/* Logo */}
                <Link href="/" className="shrink-0 font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-none tracking-tight">
                    ЛетягинЪ
                </Link>

                {/* Desktop nav */}
                <nav className="hidden lg:flex items-center gap-7 font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[11px]">
                    {NAV.map((n) => (
                        <Link key={n.href} href={n.href} className="hover:text-rust transition-colors">
                            {n.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop right side */}
                <div className="hidden md:flex items-center gap-5">
                    {phone && (
                        <a href={`tel:${phoneTel}`} className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[11px] hover:text-rust transition-colors tnum">
                            {phone}
                        </a>
                    )}
                    <a href="#widget-hero" className="font-[family-name:var(--font-ui)] uppercase tracking-[0.14em] text-[11px] px-5 py-3 bg-rust text-paper hover:bg-[color:var(--color-rust-deep)] transition-colors">
                        Забронировать
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="lg:hidden flex items-center justify-center w-10 h-10 -mr-2"
                    onClick={() => setOpen(v => !v)}
                    aria-label="Меню"
                >
                    <div className="flex flex-col gap-1.5">
                        <span className="w-6 h-px bg-ink"></span>
                        <span className="w-6 h-px bg-ink"></span>
                        <span className="w-6 h-px bg-ink"></span>
                    </div>
                </button>
            </div>

            {/* Mobile overlay */}
            {open && (
                <div className="lg:hidden border-t border-ink/10 bg-paper">
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
