/**
 * Editorial form-field с 1px-линией снизу.
 * Используется в LeadForm и других формах.
 */

export default function Field({ label, name, value, onChange, error, placeholder, type = 'text', textarea = false, required = false }) {
    const common = {
        name,
        value: value ?? '',
        onChange: (e) => onChange(name, e.target.value),
        placeholder,
        required,
        className: `w-full bg-transparent border-0 border-b ${error ? 'border-[color:var(--color-error)]' : 'border-ink/40 focus:border-rust'} focus:outline-none py-2 font-[family-name:var(--font-body)] text-base placeholder:opacity-40`,
    };

    return (
        <label className="block mb-6">
            <div className="font-[family-name:var(--font-ui)] uppercase tracking-[0.15em] text-[10px] opacity-60 mb-2">
                {label}{required && <span className="text-rust ml-1">*</span>}
            </div>
            {textarea ? (
                <textarea rows={3} {...common} />
            ) : (
                <input type={type} {...common} />
            )}
            {error && (
                <div className="mt-1 text-[color:var(--color-error)] text-xs font-[family-name:var(--font-ui)] uppercase tracking-[0.1em]">
                    {error}
                </div>
            )}
        </label>
    );
}
