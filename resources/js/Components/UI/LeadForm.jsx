/**
 * LeadForm — универсальная форма для 4 типов заявок.
 * Принимает action URL, fields config, source-tag.
 * Использует Inertia useForm.
 */

import { useForm } from '@inertiajs/react';
import Field from './Field';
import { PrimaryBtn } from './Primitives';

export default function LeadForm({ action, source, fields, submitLabel = 'Отправить заявку' }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        _hp: '',
        source,
        consent: false,
        ...Object.fromEntries(fields.map(f => [f.name, f.default ?? ''])),
    });

    const submit = (e) => {
        e.preventDefault();
        post(action, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit} className="max-w-xl">
            {/* Honeypot — скрытое поле для ботов */}
            <input
                type="text"
                name="_hp"
                value={data._hp}
                onChange={(e) => setData('_hp', e.target.value)}
                className="absolute left-[-9999px]"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
            />

            {fields.map((f) => (
                <Field
                    key={f.name}
                    label={f.label}
                    name={f.name}
                    value={data[f.name]}
                    onChange={(n, v) => setData(n, v)}
                    error={errors[f.name]}
                    placeholder={f.placeholder}
                    type={f.type || 'text'}
                    textarea={f.textarea}
                    required={f.required}
                />
            ))}

            {/* Consent */}
            <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <input
                    type="checkbox"
                    name="consent"
                    checked={data.consent}
                    onChange={(e) => setData('consent', e.target.checked)}
                    className="mt-1 accent-rust"
                />
                <span className="font-[family-name:var(--font-body)] text-xs opacity-75 leading-relaxed">
                    Соглашаюсь на обработку персональных данных
                    в&nbsp;соответствии с&nbsp;<a href="#" className="underline underline-offset-2">политикой конфиденциальности</a>.
                </span>
            </label>
            {errors.consent && (
                <div className="mb-4 text-[color:var(--color-error)] text-xs font-[family-name:var(--font-ui)] uppercase tracking-[0.1em]">
                    {errors.consent}
                </div>
            )}

            <div className="flex items-center gap-6 pt-2">
                <PrimaryBtn type="submit" disabled={processing}>
                    {processing ? 'Отправляю…' : submitLabel}
                </PrimaryBtn>
                <span className="font-[family-name:var(--font-ui)] uppercase tracking-[0.18em] text-[10px] opacity-60">
                    в рабочий день ответим
                </span>
            </div>

            {recentlySuccessful && (
                <div className="mt-5 text-moss font-[family-name:var(--font-ui)] uppercase tracking-[0.16em] text-xs">
                    ✓ Спасибо, заявка получена
                </div>
            )}
        </form>
    );
}
