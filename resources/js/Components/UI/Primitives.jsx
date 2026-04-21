/**
 * UI/Primitives.jsx — базовые примитивы, используемые всеми страницами.
 *
 * Набор взят из /lab — проверенные на стайл-гиде композиционные элементы.
 * Если что-то становится специфичным для одной страницы — выносится в
 * соответствующий Components/Blocks/*.jsx.
 */

export function Placeholder({ label = 'фото', className = '' }) {
    return (
        <div className={`relative bg-ink/5 border border-ink/10 flex items-center justify-center overflow-hidden ${className}`}>
            <div className="absolute inset-x-0 top-0 h-px bg-ink/15" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-ink/15" />
            <span className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-40 text-center px-2">
                {label}
            </span>
        </div>
    );
}

export function Label({ children, onDark = false }) {
    return (
        <div className={`font-[family-name:var(--font-ui)] uppercase tracking-[0.24em] text-[10px] mb-4 ${onDark ? 'text-paper/60' : 'opacity-55'}`}>
            {children}
        </div>
    );
}

export function PrimaryBtn({ children, as = 'button', href, size, ...rest }) {
    const pad = size === 'sm' ? 'px-6 py-3 text-[11px]' : 'px-8 py-4 text-sm';
    const cls = `font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] ${pad} bg-rust text-paper hover:bg-[color:var(--color-rust-deep)] transition-colors duration-[var(--duration-standard)] inline-block`;
    if (as === 'a') return <a href={href} className={cls} {...rest}>{children}</a>;
    return <button className={cls} {...rest}>{children}</button>;
}

export function SecondaryBtn({ children, as = 'button', href, size, onDark = false, ...rest }) {
    const pad = size === 'sm' ? 'px-6 py-3 text-[11px]' : 'px-8 py-4 text-sm';
    const base = onDark
        ? 'border border-paper text-paper hover:bg-paper hover:text-ink'
        : 'border border-ink text-ink hover:bg-ink hover:text-paper';
    const cls = `font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] ${pad} ${base} transition-colors duration-[var(--duration-standard)] inline-block`;
    if (as === 'a') return <a href={href} className={cls} {...rest}>{children}</a>;
    return <button className={cls} {...rest}>{children}</button>;
}

/**
 * Заголовочная полоса внутри Section — со split «номер/название/caption».
 */
export function SectionHeader({ number, total = 16, title, caption }) {
    return (
        <header className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
            {number && (
                <div className="col-span-12 md:col-span-2">
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.26em] text-[11px] tnum opacity-50">
                        {number}/{total}
                    </div>
                </div>
            )}
            <div className={`col-span-12 ${number ? 'md:col-span-7' : 'md:col-span-10'}`}>
                <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl leading-[0.95] tracking-[-0.01em]">
                    {title}
                </h2>
            </div>
            {caption && (
                <div className="col-span-12 md:col-span-3 md:text-right self-end">
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[11px] opacity-60 max-w-[260px] md:ml-auto">
                        {caption}
                    </div>
                </div>
            )}
        </header>
    );
}

export function Section({ children, bg = 'paper', className = '' }) {
    const bgClass = {
        paper: 'bg-paper text-ink',
        surface: 'bg-surface text-ink',
        ink: 'bg-ink text-paper',
        moss: 'bg-moss text-paper',
        brick: 'bg-[color:var(--color-brick)] text-paper',
        bone: 'bg-[color:var(--color-bone)] text-ink',
    }[bg];
    return (
        <section className={`${bgClass} px-6 md:px-12 py-20 md:py-28 ${className}`}>
            <div className="max-w-[1440px] mx-auto">
                {children}
            </div>
        </section>
    );
}

/** Divider — тонкая горизонтальная линия между секциями на одной плашке. */
export function Divider({ className = '' }) {
    return (
        <div className={`px-6 md:px-12 ${className}`}>
            <div className="max-w-[1440px] mx-auto h-px bg-ink/15" />
        </div>
    );
}

/** 1px-линия внутри секций, тёмная или светлая. */
export function InlineDivider({ onDark = false, className = '' }) {
    return <div className={`h-px ${onDark ? 'bg-paper/20' : 'bg-ink/15'} ${className}`} />;
}

/** Meta-строка «ключ — значение» для хэдера страниц. */
export function MetaPair({ k, v, onDark = false }) {
    return (
        <div className={`flex justify-between py-2 border-b ${onDark ? 'border-paper/20' : 'border-ink/20'} font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-[11px]`}>
            <span className="opacity-55">{k}</span>
            <span className="tnum">{v}</span>
        </div>
    );
}
