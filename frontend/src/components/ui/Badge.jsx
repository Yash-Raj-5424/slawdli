const variants = {
  default: 'bg-slate-100 text-clinical-muted',
  primary: 'bg-teal-50 text-clinical-primary',
  success: 'bg-green-50 text-clinical-success',
  warning: 'bg-amber-50 text-clinical-warning',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
