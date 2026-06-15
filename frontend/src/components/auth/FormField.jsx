const inputClass =
  'w-full rounded-btn border border-clinical-border bg-white px-4 py-2.5 text-sm text-clinical-text placeholder:text-slate-400 transition-colors focus:border-clinical-primary focus:outline-none focus:ring-2 focus:ring-clinical-primary/20';

export default function FormField({
  id,
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  required = true,
  min,
  max,
  children,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-clinical-text">
        {label}
      </label>
      {children || (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          min={min}
          max={max}
          className={inputClass}
        />
      )}
    </div>
  );
}

export { inputClass };
