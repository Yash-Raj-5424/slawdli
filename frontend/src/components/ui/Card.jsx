export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={[
        'rounded-card border border-clinical-border bg-clinical-card p-6 shadow-card',
        hover ? 'transition-shadow duration-200 hover:shadow-card-hover' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
