/**
 * Img — если передан src, рендерит <img>; иначе — Placeholder с label.
 *
 * Используется везде, где можем иметь либо загруженное фото из Orchid,
 * либо заглушку (пока не загружено).
 *
 * Передавай className с aspect-* — заполняет родителя с object-cover.
 */

import { Placeholder } from './Primitives';

export default function Img({ src, alt = '', label = 'фото', className = '', loading = 'lazy' }) {
    if (!src) {
        return <Placeholder className={className} label={label} />;
    }

    return (
        <div className={`overflow-hidden bg-ink/5 ${className}`}>
            <img
                src={src}
                alt={alt}
                loading={loading}
                className="w-full h-full object-cover block"
            />
        </div>
    );
}
