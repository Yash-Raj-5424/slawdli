import Card from '../ui/Card';

export default function ImagePreview({ src, filename, onClear }) {
  if (!src) return null;

  return (
    <Card className="animate-fade-in overflow-hidden p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <img
          src={src}
          alt={filename ? `Preview of ${filename}` : 'Selected image preview'}
          className="max-h-64 w-full rounded-lg object-contain sm:max-w-xs"
        />
        <div className="flex flex-1 flex-col justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-clinical-text">Selected image</p>
            {filename && (
              <p className="mt-1 truncate text-sm text-clinical-muted">{filename}</p>
            )}
          </div>
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="self-start text-sm font-medium text-clinical-primary hover:text-clinical-primary-dark"
            >
              Remove image
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
