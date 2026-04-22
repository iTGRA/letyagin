/**
 * Блок «Номер — full-screen карточка».
 *
 * Split 1:1:
 *   - слева цветная плашка из расширенной палитры с описанием
 *   - справа галерея 2-3 фото со стрелками и dot-индикаторами
 *
 * Используется на /lab (эксперимент) и на главной.
 */

import { useState } from 'react';

function Chevron({ direction = 'right' }) {
    const path = direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6';
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="block">
            <path d={path} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/**
 * 5 номеров для showcase — подобраны по характеру, каждый со своей
 * цветовой плашкой из расширенной палитры. Текст хардкод пока —
 * позже вынесем в Orchid (поле Room::showcase_lead / showcase_body).
 */
export const ROOM_SHOWCASE = [
    {
        slug: 'letyagin-lux',
        name: 'ЛетягинЪ Люкс',
        category: 'Флагманский номер · 50 м²',
        guests: 'до 3 гостей',
        lead: 'Двухкомнатный номер в отдельном здании, собственный выход и внутренний дворик.',
        body: 'Спальня отделена от гостиной. Винтажная ванна в главной комнате, отдельная ванная с душем. Тихо, уединённо, с характером старой городской усадьбы.',
        slabBg: 'bg-ink text-paper',
        btn: 'border-paper text-paper hover:bg-paper hover:text-ink',
        photos: ['SPR_6525-HDR.jpg', 'SPR_6549-HDR.jpg', 'SPR_6712-HDR.jpg'],
    },
    {
        slug: 'junior-suite-letyagin',
        name: 'Джуниор Сюит ЛетягинЪ',
        category: 'Исторический сюит · 39 м²',
        guests: 'до 2 гостей',
        lead: 'Открытая кирпичная кладка 1870-х с клеймом И. П. Летягина на стене.',
        body: 'Не реплика и не стилизация — настоящий кирпич XIX века, оставленный без штукатурки. Рядом — современное оснащение: кровать King Size, тёплые полы, просторная ванная.',
        slabBg: 'bg-[color:var(--color-brick)] text-paper',
        btn: 'border-paper text-paper hover:bg-paper hover:text-[color:var(--color-brick)]',
        photos: ['SPR_6846-HDR.jpg', 'SPR_6432-HDR.jpg', 'SPR_6504-HDR.jpg'],
    },
    {
        slug: 'avdotya',
        name: 'Авдотьи Библиевой',
        category: 'Именной номер · 28 м²',
        guests: 'до 2 гостей',
        lead: 'Винтажная ванна в главной комнате, вид на центр старого города, имя последней хозяйки усадьбы.',
        body: 'Ванна на изогнутых ножках — рабочая, отреставрированная. Для душа — отдельная ванная с кабиной. Номер, который выбирают на годовщины, предложения, романтические выходные.',
        slabBg: 'bg-moss text-paper',
        btn: 'border-paper text-paper hover:bg-paper hover:text-moss',
        photos: ['SPR_6760-HDR.jpg', 'SPR_6230-HDR.jpg', 'SPR_6438-HDR.jpg'],
    },
    {
        slug: 'lux',
        name: 'Люкс',
        category: 'Тихий люкс · 30 м²',
        guests: 'до 2 гостей',
        lead: 'Окна во внутренний закрытый двор. Самый тихий номер в отеле.',
        body: 'Ни звука проезжающих машин, ни городского шума — только листва и тишина старого центра. Для гостей, которые чутко спят, и для работы в полной перезагрузке.',
        slabBg: 'bg-[color:var(--color-sage)] text-ink',
        btn: 'border-ink text-ink hover:bg-ink hover:text-[color:var(--color-sage)]',
        photos: ['SPR_6477-HDR.jpg', 'SPR_6543-HDR.jpg', 'SPR_6852-HDR.jpg'],
    },
    {
        slug: 'comfort',
        name: 'Комфорт',
        category: 'Базовая категория · 20 м²',
        guests: 'до 2 гостей',
        lead: 'На ступень выше Стандарта. Просторнее, светлее, удобнее.',
        body: 'Расширенная ванная, зона отдыха с креслом, больше места для вещей. Для пар на выходные и командировочных на несколько дней — когда функциональности мало, хочется ощущения комфорта.',
        slabBg: 'bg-[color:var(--color-stone)] text-ink',
        btn: 'border-ink text-ink hover:bg-ink hover:text-[color:var(--color-stone)]',
        photos: ['SPR_6840-HDR.jpg', 'SPR_6420-HDR.jpg', 'SPR_6402-HDR.jpg'],
    },
];

export default function RoomFullScreenCard({ room }) {
    const [idx, setIdx] = useState(0);
    const total = room.photos.length;
    const next = () => setIdx((i) => (i + 1) % total);
    const prev = () => setIdx((i) => (i - 1 + total) % total);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            {/* Left — colored slab with text */}
            <div className={`${room.slabBg} px-6 md:px-14 py-16 md:py-24 flex flex-col justify-between`}>
                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.28em] text-[10px] opacity-60">
                    {room.category.split('·')[0]?.trim()}
                </div>

                <div className="py-10">
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-70 mb-5">
                        {room.category} · {room.guests}
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.98] tracking-[-0.01em] mb-8 [text-wrap:balance]">
                        {room.name}
                    </h3>
                    <p className="font-[family-name:var(--font-display)] italic text-lg md:text-2xl leading-[1.3] opacity-90 mb-6 max-w-[560px] [text-wrap:balance]">
                        {room.lead}
                    </p>
                    <p className="font-[family-name:var(--font-body)] text-sm md:text-base leading-[1.65] opacity-80 max-w-[560px]">
                        {room.body}
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <a
                        href={`/rooms/${room.slug}`}
                        className={`font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-xs px-7 py-3.5 border transition-colors duration-[var(--duration-standard)] inline-block ${room.btn}`}
                    >
                        Смотреть номер →
                    </a>
                    <span className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] opacity-55 tnum">
                        {idx + 1} / {total}
                    </span>
                </div>
            </div>

            {/* Right — square gallery with arrows */}
            <div className="relative bg-ink/5 overflow-hidden">
                <div className="aspect-square md:aspect-auto md:h-full w-full relative">
                    {room.photos.map((p, i) => (
                        <img
                            key={i}
                            src={`/images/media-bank/${p}`}
                            alt={`${room.name} — фото ${i + 1}`}
                            loading={i === 0 ? 'eager' : 'lazy'}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[var(--duration-standard)] ${i === idx ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}

                    <button
                        onClick={prev}
                        aria-label="Предыдущее фото"
                        className="absolute top-1/2 left-4 md:left-6 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-paper/80 hover:bg-paper text-ink flex items-center justify-center transition-colors backdrop-blur-sm"
                    >
                        <Chevron direction="left" />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Следующее фото"
                        className="absolute top-1/2 right-4 md:right-6 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-paper/80 hover:bg-paper text-ink flex items-center justify-center transition-colors backdrop-blur-sm"
                    >
                        <Chevron direction="right" />
                    </button>

                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                        {room.photos.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIdx(i)}
                                aria-label={`Фото ${i + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-[var(--duration-standard)] ${i === idx ? 'w-8 bg-paper' : 'w-1.5 bg-paper/50 hover:bg-paper/75'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
