import { useRef, useState } from 'react';
import { useStore } from '../../store';
import { Upload, X } from 'lucide-react';
import type { PhotoSettings } from '../../types';

const photoStyles: { value: PhotoSettings['style']; label: string }[] = [
  { value: 'circle', label: 'Circle' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'square', label: 'Square' },
  { value: 'borderGlow', label: 'Border Glow' },
  { value: 'glassEffect', label: 'Glass Effect' },
];

export function PhotoUploader() {
  const photoSettings = useStore((state) => state.userData.photoSettings);
  const updatePhotoSettings = useStore((state) => state.updatePhotoSettings);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setError(null);
    
    if (!file.type.match(/^image\/(png|jpe?g|webp)$/)) {
      setError('Please upload PNG, JPG, JPEG, or WEBP images only');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      updatePhotoSettings({ imageData: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearPhoto = () => {
    updatePhotoSettings({ imageData: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {photoSettings.imageData ? (
        <div className="relative">
          <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={photoSettings.imageData}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={clearPhoto}
            className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleChange}
            className="hidden"
          />
          <Upload className="w-8 h-8 mx-auto text-slate-400 dark:text-slate-500 mb-2" />
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Drag & drop or click to upload
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            PNG, JPG, WEBP (max 5MB)
          </p>
        </div>
      )}
      
      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Photo Style</p>
        <div className="flex flex-wrap gap-2">
          {photoStyles.map((style) => (
            <button
              key={style.value}
              onClick={() => updatePhotoSettings({ style: style.value })}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                photoSettings.style === style.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}