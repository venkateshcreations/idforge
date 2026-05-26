import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useStore } from '../../store';
import { Corporate, Modern, Minimal, Executive, Glassmorphism, NeoNoir, FestivalVibe, TechSpark, CreativePulse, NeonCyber, WidescreenPro, Artisan, RetroWave, NatureSerenity, OceanDepth, SunsetGlow, MidnightElegance, NordicMinimal, UrbanEdge, CherryBloom, CosmicDust, GoldenHour, SteelForge, VintageClassic } from '../templates';
import { Monitor, Printer, ZoomIn, ZoomOut } from 'lucide-react';
import type { TemplateType, UserData } from '../../types';

const templateComponents: Record<TemplateType, React.FC<{ userData: UserData }>> = {
  corporate: Corporate,
  modern: Modern,
  minimal: Minimal,
  executive: Executive,
  glassmorphism: Glassmorphism,
  neonoir: NeoNoir,
  festivalvibe: FestivalVibe,
  techspark: TechSpark,
  creativepulse: CreativePulse,
  neoncyber: NeonCyber,
  widescreenpro: WidescreenPro,
  artisan: Artisan,
  retrowave: RetroWave,
  natureserenity: NatureSerenity,
  oceandepth: OceanDepth,
  sunsetglow: SunsetGlow,
  midnightelegance: MidnightElegance,
  nordicminimal: NordicMinimal,
  urbanedge: UrbanEdge,
  cherrybloom: CherryBloom,
  cosmicdust: CosmicDust,
  goldenhour: GoldenHour,
  steelforge: SteelForge,
  vintageclassic: VintageClassic,
};

export const CardPreview = forwardRef<HTMLDivElement>((_, ref) => {
  const template = useStore((state) => state.template);
  const previewMode = useStore((state) => state.previewMode);
  const setPreviewMode = useStore((state) => state.setPreviewMode);
  const userData = useStore((state) => state.userData);
  const internalRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(100);

  useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

  const TemplateComponent = templateComponents[template] || templateComponents.corporate;
  const userDataWithPreview = { ...userData, previewMode };

  const getPreviewClasses = () => {
    switch (previewMode) {
      case 'print':
        return 'w-[540px] h-[340px]';
      default:
        return 'w-[540px] h-[340px]';
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleZoomReset = () => setZoom(100);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Live Preview</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomReset}
              className="px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors min-w-[3rem]"
              title="Reset zoom"
            >
              {zoom}%
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded-md transition-colors ${
                previewMode === 'desktop'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title="Desktop view"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode('print')}
              className={`p-2 rounded-md transition-colors ${
                previewMode === 'print'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title="Print preview"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
        <div 
          className="transition-all duration-300 flex items-center justify-center"
          style={{ 
            width: zoom === 100 ? 'auto' : `${540 * zoom / 100}px`,
            height: zoom === 100 ? 'auto' : `${340 * zoom / 100}px`,
            transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined,
            transformOrigin: 'center center'
          }}
        >
          <div ref={internalRef} className={getPreviewClasses()}>
            <TemplateComponent userData={userDataWithPreview} />
          </div>
        </div>
      </div>
    </div>
  );
});