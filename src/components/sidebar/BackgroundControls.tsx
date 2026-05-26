import { useStore } from '../../store';
import { Select } from '../ui';
import type { BackgroundType } from '../../types';

const backgroundTypes: { value: BackgroundType; label: string }[] = [
  { value: 'solid', label: 'Solid Color' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'glass', label: 'Glassmorphism' },
  { value: 'pattern', label: 'Pattern' },
];

const presetGradients = [
  { name: 'Blue Purple', colors: ['#3B82F6', '#8B5CF6'] },
  { name: 'Emerald Teal', colors: ['#10B981', '#06B6D4'] },
  { name: 'Sunset', colors: ['#F59E0B', '#EF4444'] },
  { name: 'Ocean', colors: ['#0EA5E9', '#6366F1'] },
  { name: 'Forest', colors: ['#22C55E', '#14B8A6'] },
  { name: 'Rose', colors: ['#F43F5E', '#E11D48'] },
];

const patterns = [
  { name: 'None', value: '' },
  { name: 'Dots', value: 'dots' },
  { name: 'Grid', value: 'grid' },
  { name: 'Lines', value: 'lines' },
];

export function BackgroundControls() {
  const backgroundSettings = useStore((state) => state.userData.backgroundSettings);
  const updateBackgroundSettings = useStore((state) => state.updateBackgroundSettings);
  const brandingColors = useStore((state) => state.userData.brandingColors);
  const updateBrandingColors = useStore((state) => state.updateBrandingColors);

  return (
    <div className="space-y-4">
      <Select
        label="Background Type"
        options={backgroundTypes}
        value={backgroundSettings.type}
        onChange={(e) => updateBackgroundSettings({ type: e.target.value as BackgroundType })}
      />

      {backgroundSettings.type === 'solid' && (
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-600 dark:text-slate-400">Color</label>
          <input
            type="color"
            value={brandingColors.background}
            onChange={(e) => updateBrandingColors({ background: e.target.value })}
            className="w-10 h-10 rounded-lg cursor-pointer"
          />
        </div>
      )}

      {backgroundSettings.type === 'gradient' && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Preset Gradients</p>
          <div className="grid grid-cols-3 gap-2">
            {presetGradients.map((gradient) => (
              <button
                key={gradient.name}
                onClick={() =>
                  updateBackgroundSettings({
                    type: 'gradient',
                    gradientColors: gradient.colors,
                  })
                }
                className="h-12 rounded-lg border-2 border-transparent hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
                style={{
                  background: `linear-gradient(135deg, ${gradient.colors[0]}, ${gradient.colors[1]})`,
                }}
                title={gradient.name}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1">
              <label className="text-xs text-slate-500 dark:text-slate-400">Color 1</label>
              <input
                type="color"
                value={backgroundSettings.gradientColors?.[0] || '#3B82F6'}
                onChange={(e) =>
                  updateBackgroundSettings({
                    gradientColors: [e.target.value, backgroundSettings.gradientColors?.[1] || '#8B5CF6'],
                  })
                }
                className="w-full h-8 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-500 dark:text-slate-400">Color 2</label>
              <input
                type="color"
                value={backgroundSettings.gradientColors?.[1] || '#8B5CF6'}
                onChange={(e) =>
                  updateBackgroundSettings({
                    gradientColors: [backgroundSettings.gradientColors?.[0] || '#3B82F6', e.target.value],
                  })
                }
                className="w-full h-8 rounded"
              />
            </div>
          </div>
        </div>
      )}

      {backgroundSettings.type === 'glass' && (
        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Glassmorphism adds a frosted glass effect to your card background.
          </p>
        </div>
      )}

      {backgroundSettings.type === 'pattern' && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Pattern</p>
          <div className="grid grid-cols-3 gap-2">
            {patterns.map((pattern) => (
              <button
                key={pattern.value}
                onClick={() => updateBackgroundSettings({ pattern: pattern.value })}
                className={`h-12 rounded-lg border-2 transition-colors ${
                  backgroundSettings.pattern === pattern.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                {pattern.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}