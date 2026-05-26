import { useStore } from '../../store';
import { Input, Select } from '../ui';
import type { QRRedirectTarget } from '../../types';

const redirectOptions: { value: QRRedirectTarget; label: string }[] = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'website', label: 'Website' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'github', label: 'GitHub' },
  { value: 'custom', label: 'Custom URL' },
];

const errorCorrectionOptions = [
  { value: 'L', label: 'Low (7%)' },
  { value: 'M', label: 'Medium (15%)' },
  { value: 'Q', label: 'Quartile (25%)' },
  { value: 'H', label: 'High (30%)' },
];

export function QRControls() {
  const qrSettings = useStore((state) => state.userData.qrSettings);
  const socialLinks = useStore((state) => state.userData.socialLinks);
  const contactDetails = useStore((state) => state.userData.contactDetails);
  const updateQRSettings = useStore((state) => state.updateQRSettings);

  const getTargetUrl = (): string => {
    if (qrSettings.redirectTarget === 'custom') {
      return qrSettings.customUrl;
    }
    
    const links = {
      linkedin: socialLinks.linkedin,
      instagram: socialLinks.instagram,
      facebook: socialLinks.facebook,
      youtube: socialLinks.youtube,
      website: contactDetails.website,
      portfolio: socialLinks.portfolio,
      github: socialLinks.github,
      vcard: '',
    };
    
    return links[qrSettings.redirectTarget] || '';
  };

  return (
    <div className="space-y-4">
      <Select
        label="QR Redirect Target"
        options={redirectOptions}
        value={qrSettings.redirectTarget}
        onChange={(e) => updateQRSettings({ redirectTarget: e.target.value as QRRedirectTarget })}
      />

      {qrSettings.redirectTarget === 'custom' && (
        <Input
          label="Custom URL"
          placeholder="https://example.com"
          value={qrSettings.customUrl}
          onChange={(e) => updateQRSettings({ customUrl: e.target.value })}
        />
      )}

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">QR Customization</p>
        
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-600 dark:text-slate-400">Foreground</label>
          <input
            type="color"
            value={qrSettings.foregroundColor}
            onChange={(e) => updateQRSettings({ foregroundColor: e.target.value })}
            className="w-8 h-8"
          />
          <Input
            value={qrSettings.foregroundColor}
            onChange={(e) => updateQRSettings({ foregroundColor: e.target.value })}
            className="flex-1"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-600 dark:text-slate-400">Background</label>
          <input
            type="color"
            value={qrSettings.backgroundColor}
            onChange={(e) => updateQRSettings({ backgroundColor: e.target.value })}
            className="w-8 h-8"
          />
          <Input
            value={qrSettings.backgroundColor}
            onChange={(e) => updateQRSettings({ backgroundColor: e.target.value })}
            className="flex-1"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-600 dark:text-slate-400 w-16">Size</label>
          <input
            type="range"
            min="80"
            max="200"
            value={qrSettings.size}
            onChange={(e) => updateQRSettings({ size: parseInt(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-slate-500 w-12">{qrSettings.size}px</span>
        </div>

        <Select
          label="Error Correction"
          options={errorCorrectionOptions}
          value={qrSettings.errorCorrectionLevel}
          onChange={(e) => updateQRSettings({ errorCorrectionLevel: e.target.value as 'L' | 'M' | 'Q' | 'H' })}
        />
      </div>

      {getTargetUrl() && (
        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <p className="text-xs text-slate-500 dark:text-slate-400">QR will link to:</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 truncate">{getTargetUrl()}</p>
        </div>
      )}
    </div>
  );
}