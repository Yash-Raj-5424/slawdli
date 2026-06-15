const variants = {
  primary:
    'bg-clinical-primary text-white hover:bg-clinical-primary-dark shadow-sm',
  secondary:
    'bg-white text-clinical-text border border-clinical-border hover:bg-slate-50 shadow-sm',
  ghost: 'text-clinical-primary hover:bg-teal-50',
  danger: 'bg-rose-50 text-clinical-error border border-rose-200 hover:bg-rose-100',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-btn font-medium transition-all duration-200',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
