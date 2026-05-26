import { useStore } from '../../store';
import { Input } from '../ui';

const colorControls = [
  { key: 'primary', label: 'Primary Color' },
  { key: 'secondary', label: 'Secondary Color' },
  { key: 'accent', label: 'Accent Color' },
  { key: 'text', label: 'Text Color' },
  { key: 'background', label: 'Background Color' },
  { key: 'border', label: 'Border Color' },
] as const;

export function BrandingControls() {
  const brandingColors = useStore((state) => state.userData.brandingColors);
  const updateBrandingColors = useStore((state) => state.updateBrandingColors);

  const handleColorChange = (key: string, value: string) => {
    updateBrandingColors({ [key]: value });
  };

  const resetToDefaults = () => {
    updateBrandingColors({
      primary: '#3B82F6',
      secondary: '#64748B',
      accent: '#10B981',
      text: '#0F172A',
      background: '#FFFFFF',
      border: '#E2E8F0',
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Customize your organization's brand colors
      </p>

      <div className="grid grid-cols-2 gap-3">
        {colorControls.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2">
            <input
              type="color"
              value={brandingColors[key]}
              onChange={(e) => handleColorChange(key, e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{label}</p>
              <Input
                value={brandingColors[key]}
                onChange={(e) => handleColorChange(key, e.target.value)}
                className="text-xs py-1"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={resetToDefaults}
        className="w-full py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        Reset to Defaults
      </button>
    </div>
  );
}