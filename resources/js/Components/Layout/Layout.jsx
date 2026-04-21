/**
 * Общий Layout для всех публичных страниц.
 * Оборачивает children в Header + Announcement + main + Footer.
 * Обрабатывает flash-сообщения.
 */

import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
    const { announcement, flash } = usePage().props;
    const [toast, setToast] = useState(null);

    // Flash sessions → toast
    useEffect(() => {
        if (flash?.success) {
            setToast({ type: 'success', text: flash.success });
            const t = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(t);
        }
        if (flash?.error) {
            setToast({ type: 'error', text: flash.error });
            const t = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(t);
        }
    }, [flash?.success, flash?.error]);

    return (
        <div className="min-h-screen flex flex-col bg-paper text-ink">
            {/* Announcement bar (optional) */}
            {announcement && <Announcement {...announcement} />}

            <Header />

            <main className="flex-1">{children}</main>

            <Footer />

            {/* Flash toast */}
            {toast && (
                <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 ${toast.type === 'success' ? 'bg-moss text-paper' : 'bg-[color:var(--color-error)] text-paper'} font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs shadow-lg`}>
                    {toast.text}
                </div>
            )}
        </div>
    );
}

function Announcement({ text, link_url, link_text, color_variant = 'coral' }) {
    const bg = {
        coral: 'bg-[color:var(--color-coral)] text-paper',
        brick: 'bg-[color:var(--color-brick)] text-paper',
        moss: 'bg-moss text-paper',
        ink: 'bg-ink text-paper',
    }[color_variant] || 'bg-[color:var(--color-coral)] text-paper';

    return (
        <div className={`${bg} px-6 md:px-12 py-3 text-center font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[11px]`}>
            <span>{text}</span>
            {link_url && link_text && (
                <>
                    {' '}
                    <a href={link_url} className="underline underline-offset-4 hover:no-underline">{link_text}</a>
                </>
            )}
        </div>
    );
}
