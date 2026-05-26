import { useState } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { useStore } from '../../store';
import { Button } from '../ui';
import { Download, FileImage, FileText } from 'lucide-react';

let cardElementRef: HTMLDivElement | null = null;

export const setCardRef = (ref: HTMLDivElement | null) => {
  cardElementRef = ref;
};

export function ExportPanel() {
  const [isExporting, setIsExporting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const exportSettings = useStore((state) => state.exportSettings);
  const setExportFormat = useStore((state) => state.setExportFormat);
  const setExportQuality = useStore((state) => state.setExportQuality);

  const qualityMultipliers = {
    standard: 1,
    hd: 2,
    '2k': 3,
    '4k': 4,
  };

  const exportAsImage = async (format: 'png' | 'jpeg') => {
    if (!cardElementRef) return;
    
    setIsExporting(true);
    try {
      const multiplier = qualityMultipliers[exportSettings.quality];
      const options = {
        pixelRatio: multiplier,
        cacheBust: true,
      };

      const dataUrl = format === 'png' 
        ? await toPng(cardElementRef, options)
        : await toJpeg(cardElementRef, { ...options, quality: 0.95 });

      const link = document.createElement('a');
      link.download = `id-card-${Date.now()}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
      setShowDropdown(false);
    }
  };

  const exportAsPDF = async () => {
    if (!cardElementRef) return;
    
    setIsExporting(true);
    try {
      const multiplier = qualityMultipliers[exportSettings.quality];
      const dataUrl = await toPng(cardElementRef, {
        pixelRatio: multiplier,
        cacheBust: true,
      });

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [3.375, 2.125],
      });

      const imgWidth = 3.375;
      const imgHeight = 2.125;
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`id-card-${Date.now()}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExporting(false);
      setShowDropdown(false);
    }
  };

  const handleExport = () => {
    if (exportSettings.format === 'pdf') {
      exportAsPDF();
    } else {
      exportAsImage(exportSettings.format);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setShowDropdown(!showDropdown)}
        variant="primary"
        size="sm"
        icon={<Download className="w-4 h-4" />}
        className="gap-2"
      >
        Export
      </Button>

      {showDropdown && (
        <div className="absolute right-0 top-12 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 z-50">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Format
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setExportFormat('png')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-colors ${
                    exportSettings.format === 'png'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <FileImage className="w-4 h-4" />
                  <span className="text-sm">PNG</span>
                </button>
                <button
                  onClick={() => setExportFormat('pdf')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-colors ${
                    exportSettings.format === 'pdf'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">PDF</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Quality
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['standard', 'hd', '2k', '4k'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setExportQuality(q)}
                    className={`py-2 px-3 rounded-lg border text-sm transition-colors ${
                      exportSettings.quality === q
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {q.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleExport}
              loading={isExporting}
              className="w-full"
              icon={isExporting ? undefined : <Download className="w-4 h-4" />}
            >
              {isExporting ? 'Exporting...' : `Download ${exportSettings.format.toUpperCase()}`}
            </Button>
          </div>
        </div>
      )}

      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}