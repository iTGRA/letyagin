/**
 * KonturWidgetStub — плейсхолдер виджета Контур.Отеля.
 *
 * При наличии реального script_url + kontur_hotel_id — рендерит div,
 * куда Контур вставит свой виджет через initWidget.
 * Пока нет данных — показывает заглушку с сообщением.
 *
 * Source-тег передаётся в аналитику при событии submit (реализуется
 * после интеграции).
 */

import { useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';

export default function KonturWidgetStub({ source = 'widget', className = '' }) {
    const { siteSettings } = usePage().props;
    const kontur = siteSettings?.kontur || {};
    const configured = !!(kontur.script_url && kontur.hotel_id);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!configured) return;
        if (typeof window === 'undefined') return;
        // TODO: init real widget here once Контур configuration is received
    }, [configured]);

    return (
        <div id={source === 'hero' ? 'widget-hero' : undefined} className={`bg-surface border border-ink/10 p-6 md:p-8 ${className}`}>
            {configured ? (
                <div ref={containerRef} data-kontur-source={source} className="min-h-[80px]" />
            ) : (
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] text-moss mb-2">
                            Виджет бронирования
                        </div>
                        <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-[1.1]">
                            Проверить даты и&nbsp;забронировать
                        </div>
                        <div className="font-[family-name:var(--font-body)] text-sm opacity-70 mt-2">
                            Контур.Отель — подключим перед запуском. Source-тег: <code className="font-mono">{source}</code>.
                        </div>
                    </div>
                    <a
                        href="tel:+79879790000"
                        className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-xs px-8 py-4 bg-rust text-paper hover:bg-[color:var(--color-rust-deep)] transition-colors shrink-0"
                    >
                        Позвонить
                    </a>
                </div>
            )}
        </div>
    );
}
