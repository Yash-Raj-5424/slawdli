import { useRef, useState } from 'react';
import { ImagePlus, Upload } from 'lucide-react';
import { validateImageFile } from '../../utils/formatLabel';
import Button from '../ui/Button';

export default function UploadZone({ onFileSelect, disabled = false }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (file) => {
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    onFileSelect(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload skin image. Drag and drop or press Enter to choose a file."
        className={[
          'relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-card border-2 border-dashed p-8 text-center transition-all duration-200',
          dragOver
            ? 'border-clinical-primary bg-teal-50/50'
            : 'border-clinical-border bg-white hover:border-teal-300 hover:bg-slate-50/50',
          disabled ? 'cursor-not-allowed opacity-60' : '',
        ].join(' ')}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={onKeyDown}
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-clinical-primary">
          <ImagePlus className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="text-base font-medium text-clinical-text">
          Drag and drop your image here
        </p>
        <p className="mt-1 text-sm text-clinical-muted">JPEG, PNG, or WebP up to 10 MB</p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-4"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
        >
          <Upload className="h-4 w-4" aria-hidden="true" />
          Choose image
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          capture="environment"
          className="sr-only"
          disabled={disabled}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = '';
          }}
        />
      </div>
      {error && (
        <p className="text-sm text-clinical-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
