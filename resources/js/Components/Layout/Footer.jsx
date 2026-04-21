/**
 * Footer с 4 колонками по CONTENT.md Блок 16.
 * Контакты, разделы, партнёрам, соцсети.
 */

import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { siteSettings } = usePage().props;
    const s = siteSettings || {};
    const contacts = s.contacts || {};
    const social = s.social || {};
    const promo = s.promo || {};

    return (
        <footer className="bg-ink text-paper px-6 md:px-12 pt-16 md:pt-24 pb-10">
            <div className="max-w-[1440px] mx-auto">

                {/* Top bar */}
                <div className="border-b border-paper/20 pb-8 mb-12 font-[family-name:var(--font-ui)] uppercase tracking-[0.2em] text-[11px] flex flex-wrap gap-x-8 gap-y-3 justify-between opacity-80">
                    <span>{contacts.address_full || 'ул. Самарская, 69, Самара'}</span>
                    <span className="tnum">{contacts.phone || '+7 987 979-00-00'}</span>
                    <span>Круглосуточный ресепшн</span>
                </div>

                {/* 4 columns */}
                <div className="grid grid-cols-12 gap-6 md:gap-10">

                    {/* Col 1 — бренд + контакты */}
                    <div className="col-span-12 md:col-span-4">
                        <div className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-none mb-3">ЛетягинЪ</div>
                        <div className="font-[family-name:var(--font-body)] text-sm opacity-80 mb-8">
                            Бутик-отель в Самаре
                        </div>
                        <div className="space-y-3 font-[family-name:var(--font-body)] text-sm opacity-85">
                            {contacts.phone && <div><a href={`tel:${contacts.phone_tel || contacts.phone}`} className="tnum hover:text-rust">{contacts.phone}</a></div>}
                            {contacts.email && <div><a href={`mailto:${contacts.email}`} className="hover:text-rust">{contacts.email}</a></div>}
                            <div className="pt-2">{contacts.address_full || 'ул. Самарская, 69'}</div>
                            <div className="opacity-60">Круглосуточный ресепшн</div>
                        </div>
                    </div>

                    {/* Col 2 — разделы сайта */}
                    <div className="col-span-6 md:col-span-3">
                        <FooterLabel>Сайт</FooterLabel>
                        <ul className="space-y-2 font-[family-name:var(--font-body)] text-sm">
                            <li><Link href="/rooms" className="hover:text-rust">Номера</Link></li>
                            <li><Link href="/restaurant" className="hover:text-rust">Ресторан «Дуся»</Link></li>
                            <li><Link href="/letyagin-hall" className="hover:text-rust">ЛетягинЪ-Холл</Link></li>
                            <li><Link href="/about" className="hover:text-rust">История особняка</Link></li>
                            <li><Link href="/nearby" className="hover:text-rust">Лучшее рядом</Link></li>
                            <li><Link href="/contacts" className="hover:text-rust">Контакты</Link></li>
                        </ul>
                    </div>

                    {/* Col 3 — гостям */}
                    <div className="col-span-6 md:col-span-3">
                        <FooterLabel>Гостям и&nbsp;партнёрам</FooterLabel>
                        <ul className="space-y-2 font-[family-name:var(--font-body)] text-sm">
                            <li><Link href="/corporate" className="hover:text-rust">Корпоративный договор</Link></li>
                            <li><Link href="/letyagin-hall" className="hover:text-rust">Свадьбы и банкеты</Link></li>
                            <li><a href="#" className="hover:text-rust opacity-60">Правила проживания</a></li>
                            <li><a href="#" className="hover:text-rust opacity-60">Реквизиты отеля</a></li>
                        </ul>
                    </div>

                    {/* Col 4 — соцсети + промо */}
                    <div className="col-span-12 md:col-span-2">
                        <FooterLabel>Соцсети</FooterLabel>
                        <div className="flex gap-3 mb-6 font-[family-name:var(--font-ui)] uppercase tracking-[0.14em] text-[10px]">
                            {social.telegram_url && <a href={social.telegram_url} target="_blank" rel="noreferrer" className="px-3 py-1.5 border border-paper/30 hover:bg-paper hover:text-ink">TG</a>}
                            {social.whatsapp_url && <a href={social.whatsapp_url} target="_blank" rel="noreferrer" className="px-3 py-1.5 border border-paper/30 hover:bg-paper hover:text-ink">WA</a>}
                            {social.instagram_url && <a href={social.instagram_url} target="_blank" rel="noreferrer" className="px-3 py-1.5 border border-paper/30 hover:bg-paper hover:text-ink">IG</a>}
                        </div>

                        {promo.code && (
                            <div className="font-[family-name:var(--font-body)] text-xs opacity-75 leading-relaxed">
                                Бронируйте на сайте — с&nbsp;промокодом <strong className="text-rust not-italic">{promo.code}</strong> дешевле.
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-paper/20 mt-12 pt-6 flex flex-wrap justify-between gap-3 font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] opacity-55">
                    <span>© 2026 Бутик-отель ЛетягинЪ</span>
                    <span>Разработка: Swipe</span>
                </div>
            </div>
        </footer>
    );
}

function FooterLabel({ children }) {
    return (
        <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.22em] text-[10px] opacity-60 mb-4">
            {children}
        </div>
    );
}
