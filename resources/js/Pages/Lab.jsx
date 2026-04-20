/**
 * Pages/Lab.jsx — стайл-гид Фазы 2A.
 *
 * Показывает утверждённую дизайн-систему на примитивных блоках:
 * палитра, типографика, кнопки, карточки, формы, бэйджи, таймлайн.
 * Временная страница для визуальной оценки — удалим перед прод-запуском.
 *
 * Компоненты здесь — локальные «наброски», не экспортируются. Когда
 * система будет утверждена, DESIGN-KEEPER вынесет финальные
 * компоненты в Components/UI/.
 */

import { Head } from '@inertiajs/react';

const colors = [
    { name: 'Rum Raisin',   hex: '#3A1B1C', token: 'ink',     role: 'текст, навигация, ink-секции' },
    { name: 'Snow Drizzle', hex: '#CFC6BB', token: 'paper',   role: 'основной фон — тёплый лён' },
    { name: 'Burnt Orange', hex: '#A54A20', token: 'rust',    role: 'CTA, акценты — кирпич' },
    { name: 'Moss Green',   hex: '#635729', token: 'moss',    role: 'детали, иконки, second. акцент' },
    { name: 'Light Surface',hex: '#F5F1EC', token: 'surface', role: 'карточки, модальные' },
    { name: 'Line',         hex: '#8A7E6E', token: 'line',    role: 'разделители, тонкие границы' },
];

function Section({ title, children, bg = 'paper' }) {
    const bgClass = {
        paper:   'bg-paper text-ink',
        surface: 'bg-surface text-ink',
        ink:     'bg-ink text-paper',
        rust:    'bg-rust text-paper',
    }[bg];
    return (
        <section className={`${bgClass} px-6 md:px-16 py-20 md:py-28`}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-14 md:mb-20">
                    <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.24em] text-[10px] opacity-60 mb-3">
                        секция
                    </div>
                    <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl leading-[0.95]">
                        {title}
                    </h2>
                </div>
                {children}
            </div>
        </section>
    );
}

export default function Lab() {
    return (
        <>
            <Head title="Стайл-гид" />

            <main className="min-h-screen">
                {/* Навигация */}
                <header className="bg-paper text-ink px-6 md:px-16 py-6 border-b border-line/30">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="font-[family-name:var(--font-display)] text-2xl">
                            ЛетягинЪ <span className="opacity-40 text-lg italic">· лаборатория</span>
                        </div>
                        <a href="/" className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] opacity-60 hover:opacity-100">
                            ← на главную
                        </a>
                    </div>
                </header>

                {/* 1. Палитра */}
                <Section title="Палитра" bg="paper">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-line/30">
                        {colors.map((c) => (
                            <div
                                key={c.token}
                                className="bg-paper p-6 flex flex-col gap-3"
                                style={{ background: c.hex, color: ['#3A1B1C','#A54A20','#635729','#8A7E6E'].includes(c.hex) ? '#F5F1EC' : '#3A1B1C' }}
                            >
                                <div className="font-[family-name:var(--font-display)] text-3xl leading-none">
                                    {c.name}
                                </div>
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.15em] text-[11px] opacity-75 flex items-center justify-between">
                                    <span>{c.hex}</span>
                                    <span>—{c.token}</span>
                                </div>
                                <div className="font-[family-name:var(--font-body)] text-sm opacity-80 mt-auto">
                                    {c.role}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* 2. Типографика */}
                <Section title="Типографика" bg="surface">
                    <div className="space-y-12">
                        <div>
                            <Label>Display · Cormorant Garamond</Label>
                            <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl leading-[0.95]">
                                Исторический особняк
                            </h1>
                            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-[1] mt-6">
                                Ресторан Дуся
                            </h2>
                            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl italic leading-[1.1] mt-6">
                                Новая русская кухня
                            </h3>
                        </div>

                        <div>
                            <Label>Body · Arimo</Label>
                            <p className="font-[family-name:var(--font-body)] text-lg leading-[1.65] max-w-2xl">
                                Бутик-отель в особняке XIX века в центре старого города Самары. Девятнадцать дизайнерских номеров, ресторан авторской новой русской кухни, зал для событий в закрытом дворе. Реновация завершена в 2024 году — сохранена кирпичная кладка с клеймом промышленника И. П. Летягина.
                            </p>
                            <p className="font-[family-name:var(--font-body)] text-base leading-[1.65] max-w-2xl mt-4 opacity-75">
                                Пешеходная Ленинградская улица — 3 минуты. Театр Оперы и Балета — 7 минут. Волга — 15 минут пешком.
                            </p>
                        </div>

                        <div>
                            <Label>UI · Manrope</Label>
                            <div className="flex flex-wrap gap-6 font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-xs">
                                <span>Номера</span>
                                <span>Ресторан</span>
                                <span>ЛетягинЪ-Холл</span>
                                <span>О проекте</span>
                                <span>Лучшее рядом</span>
                                <span>Контакты</span>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 3. Кнопки */}
                <Section title="Кнопки" bg="paper">
                    <div className="space-y-16">
                        {/* Primary */}
                        <div>
                            <Label>Primary · rust на paper</Label>
                            <div className="flex flex-wrap gap-4 items-center">
                                <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-sm px-8 py-4 bg-rust text-paper hover:bg-[color:var(--color-rust-deep)] transition-colors duration-[var(--duration-standard)]">
                                    Забронировать
                                </button>
                                <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs px-6 py-3 bg-rust text-paper hover:bg-[color:var(--color-rust-deep)] transition-colors">
                                    Найти номер
                                </button>
                            </div>
                        </div>

                        {/* Secondary */}
                        <div>
                            <Label>Secondary · ghost ink</Label>
                            <div className="flex flex-wrap gap-4 items-center">
                                <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-sm px-8 py-4 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors duration-[var(--duration-standard)]">
                                    Смотреть номер
                                </button>
                                <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs px-6 py-3 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors">
                                    Полное меню
                                </button>
                            </div>
                        </div>

                        {/* Text link */}
                        <div>
                            <Label>Link · underline on hover</Label>
                            <div className="flex flex-wrap gap-8 items-center">
                                <a href="#" className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs text-rust hover:underline underline-offset-4">
                                    Все 19 номеров →
                                </a>
                                <a href="#" className="font-[family-name:var(--font-body)] text-base italic underline underline-offset-4 decoration-moss decoration-1">
                                    Полная история отеля
                                </a>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 4. Тёмная секция — как выглядят примитивы на ink */}
                <Section title="Ink-секция" bg="ink">
                    <div className="space-y-12">
                        <p className="font-[family-name:var(--font-body)] text-lg leading-[1.65] max-w-2xl text-paper/85">
                            Ink-фон используется для кинематографичных блоков — финального CTA, hero-деталей, ключевых цитат. Он даёт паузу в ритме paper-секций.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-sm px-8 py-4 bg-rust text-paper hover:bg-[color:var(--color-rust-deep)] transition-colors">
                                Забронировать
                            </button>
                            <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-sm px-8 py-4 border border-paper text-paper hover:bg-paper hover:text-ink transition-colors">
                                Смотреть меню
                            </button>
                        </div>
                    </div>
                </Section>

                {/* 5. Карточки — номер, отзыв, место */}
                <Section title="Карточки" bg="paper">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Карточка номера */}
                        <article className="bg-surface flex flex-col">
                            <div className="aspect-[4/3] bg-line/20 flex items-center justify-center">
                                <span className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] opacity-40">
                                    фото номера
                                </span>
                            </div>
                            <div className="p-6 flex flex-col gap-3">
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] text-moss">
                                    ЛЮКС · 50 м²
                                </div>
                                <h3 className="font-[family-name:var(--font-display)] text-3xl leading-[1.05]">
                                    ЛетягинЪ Люкс
                                </h3>
                                <p className="font-[family-name:var(--font-body)] text-sm leading-[1.6] opacity-75">
                                    Двухкомнатный номер в отдельном здании с видом на внутренний двор.
                                </p>
                                <a href="#" className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-[11px] text-rust mt-3 hover:underline underline-offset-4">
                                    Смотреть номер →
                                </a>
                            </div>
                        </article>

                        {/* Карточка отзыва */}
                        <article className="bg-surface p-6 flex flex-col gap-5">
                            <div className="flex items-center gap-2">
                                {[1,2,3,4,5].map(i => (
                                    <span key={i} className="text-rust text-lg">★</span>
                                ))}
                                <span className="font-[family-name:var(--font-ui)] uppercase tracking-[0.15em] text-[10px] ml-2 opacity-60">
                                    Яндекс · март 2026
                                </span>
                            </div>
                            <blockquote className="font-[family-name:var(--font-display)] text-2xl italic leading-[1.3]">
                                «Не первый раз приезжаю в&nbsp;Самару и&nbsp;останавливаюсь только здесь».
                            </blockquote>
                            <div className="font-[family-name:var(--font-body)] text-sm opacity-75 mt-auto">
                                Татьяна Бондаренко
                            </div>
                        </article>

                        {/* Карточка места рядом */}
                        <article className="bg-surface p-6 flex flex-col gap-4">
                            <div className="aspect-square w-full bg-line/20 -mx-6 -mt-6 mb-2 flex items-center justify-center">
                                <span className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] opacity-40">
                                    фото места
                                </span>
                            </div>
                            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[10px] text-moss">
                                Культура
                            </div>
                            <h3 className="font-[family-name:var(--font-display)] text-2xl leading-[1.1]">
                                Театр Оперы и&nbsp;Балета
                            </h3>
                            <div className="flex gap-4 font-[family-name:var(--font-ui)] uppercase tracking-[0.15em] text-[11px] text-rust tnum">
                                <span>7 мин пешком</span>
                                <span className="opacity-40">·</span>
                                <span>600 м</span>
                            </div>
                        </article>
                    </div>
                </Section>

                {/* 6. Trust Bar — шильдики */}
                <Section title="Шильдики и бэйджи" bg="surface">
                    <div className="space-y-10">
                        <div>
                            <Label>Яндекс-шильдик (hero)</Label>
                            <div className="inline-flex items-center gap-5 bg-ink text-paper px-6 py-4">
                                <div className="flex flex-col items-start">
                                    <div className="font-[family-name:var(--font-display)] text-4xl leading-none">5.0</div>
                                    <div className="flex gap-0.5 mt-1 text-rust text-xs">★★★★★</div>
                                </div>
                                <div className="h-10 w-px bg-paper/30" aria-hidden="true" />
                                <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] leading-[1.6]">
                                    Хорошее место<br />
                                    <span className="opacity-70">298 отзывов · Яндекс</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label>Trust-факты (4 в ряд)</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line/30">
                                {[
                                    { top: 'Объект',   mid: 'культурного',    bot: 'наследия' },
                                    { top: '#2',       mid: 'по завтракам',   bot: 'в Самаре' },
                                    { top: 'Всё',      mid: 'в пешей',        bot: 'доступности' },
                                    { top: 'Парковка', mid: 'охраняемая',     bot: 'бесплатно' },
                                ].map((f, i) => (
                                    <div key={i} className="bg-surface p-6 flex flex-col gap-1">
                                        <div className="font-[family-name:var(--font-display)] text-3xl text-rust leading-none">
                                            {f.top}
                                        </div>
                                        <div className="font-[family-name:var(--font-body)] text-sm opacity-80">
                                            {f.mid}
                                        </div>
                                        <div className="font-[family-name:var(--font-body)] text-sm opacity-60">
                                            {f.bot}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 7. Формы */}
                <Section title="Формы" bg="paper">
                    <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
                        <form className="space-y-8">
                            <Field label="Имя" placeholder="Как к вам обращаться" />
                            <Field label="Телефон" placeholder="+7 ___ ___ __ __" />
                            <Field label="Email" placeholder="you@example.com" />
                            <Field label="Комментарий" placeholder="Пожелания к заселению, особые запросы" textarea />
                            <button type="button" className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-sm px-8 py-4 bg-rust text-paper hover:bg-[color:var(--color-rust-deep)] transition-colors">
                                Отправить заявку
                            </button>
                        </form>

                        <div className="bg-surface p-8 space-y-6">
                            <h3 className="font-[family-name:var(--font-display)] text-2xl leading-[1.1]">
                                Корпоративный договор
                            </h3>
                            <p className="font-[family-name:var(--font-body)] text-sm opacity-75 leading-[1.6]">
                                Скидка до 10% для компаний с регулярными командировками. Приоритет заселения, закрывающие документы.
                            </p>
                            <ul className="space-y-2 font-[family-name:var(--font-body)] text-sm">
                                <Bullet>Фиксированный тариф</Bullet>
                                <Bullet>Приоритетное заселение</Bullet>
                                <Bullet>Закрывающие документы</Bullet>
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* 8. Таймлайн */}
                <Section title="Таймлайн истории" bg="surface">
                    <ol className="space-y-8 border-l-2 border-rust pl-8 max-w-3xl">
                        {[
                            { year: '1883',    text: 'Постоялый двор на усадьбе Сидоровых и Библиевых.' },
                            { year: '1917',    text: 'Авдотья Библиева — последняя хозяйка усадьбы до революции.' },
                            { year: '2023',    text: 'При реставрации обнаружено клеймо промышленника Летягина в кирпичной кладке.' },
                            { year: '2024',    text: 'Реновация завершена — бутик-отель открывается в новом облике.' },
                            { year: 'Сегодня', text: '19 дизайнерских номеров, ресторан «Дуся», рейтинг 5.0 на Яндексе.' },
                        ].map((v, i) => (
                            <li key={i} className="relative">
                                <div className="absolute -left-[40px] top-1.5 w-3 h-3 rounded-full bg-rust" />
                                <div className="font-[family-name:var(--font-display)] text-3xl leading-none text-rust tnum mb-2">
                                    {v.year}
                                </div>
                                <p className="font-[family-name:var(--font-body)] text-base leading-[1.6] opacity-85">
                                    {v.text}
                                </p>
                            </li>
                        ))}
                    </ol>
                </Section>

                {/* 9. Rust-секция — редкий акцент */}
                <Section title="Rust-секция — редкий акцент" bg="rust">
                    <p className="font-[family-name:var(--font-body)] text-lg leading-[1.65] max-w-2xl mb-8">
                        Rust-фон используется редко и только для приглашения к действию — финальный CTA или точечный анонс акции. Постоянно — утомляет.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-sm px-8 py-4 bg-ink text-paper hover:bg-[color:var(--color-rust-deep)] hover:text-paper transition-colors">
                            Забронировать сейчас
                        </button>
                        <button className="font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-sm px-8 py-4 border border-paper text-paper hover:bg-paper hover:text-rust transition-colors">
                            Подробнее
                        </button>
                    </div>
                </Section>

                {/* Футер лаборатории */}
                <footer className="bg-ink text-paper px-6 md:px-16 py-12">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
                        <div className="font-[family-name:var(--font-display)] text-xl">
                            ЛетягинЪ · стайл-гид
                        </div>
                        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] opacity-60">
                            Фаза 2A · временная страница
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}

function Label({ children }) {
    return (
        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-50 mb-5">
            {children}
        </div>
    );
}

function Field({ label, placeholder, textarea }) {
    return (
        <label className="block">
            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.15em] text-[10px] opacity-60 mb-2">
                {label}
            </div>
            {textarea ? (
                <textarea
                    placeholder={placeholder}
                    rows={3}
                    className="w-full bg-transparent border-0 border-b border-ink/40 focus:border-rust focus:outline-none py-2 font-[family-name:var(--font-body)] text-base placeholder:opacity-40"
                />
            ) : (
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full bg-transparent border-0 border-b border-ink/40 focus:border-rust focus:outline-none py-2 font-[family-name:var(--font-body)] text-base placeholder:opacity-40"
                />
            )}
        </label>
    );
}

function Bullet({ children }) {
    return (
        <li className="flex gap-3 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-rust mt-2 shrink-0" aria-hidden="true" />
            <span className="opacity-85">{children}</span>
        </li>
    );
}
