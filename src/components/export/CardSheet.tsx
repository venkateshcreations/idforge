import { useStore } from '../../store';
import { Corporate, Modern, Minimal, Executive, Glassmorphism, NeoNoir, FestivalVibe, TechSpark, CreativePulse, NeonCyber, WidescreenPro, Artisan, RetroWave, NatureSerenity, OceanDepth, SunsetGlow, MidnightElegance, NordicMinimal, UrbanEdge, CherryBloom, CosmicDust, GoldenHour, SteelForge, VintageClassic } from '../templates';
import type { TemplateType, UserData } from '../../types';
import { useState } from 'react';
import { X, Download, Grid, List } from 'lucide-react';

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

interface CardSheetProps {
  onClose: () => void;
}

export function CardSheet({ onClose }: CardSheetProps) {
  const managedCards = useStore((state) => state.managedCards);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const activeCards = managedCards.filter(card => card.status === 'active');

  const handleExport = () => {
    const printContent = document.getElementById('card-sheet-print');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ID Card Sheet</title>
          <style>
            @page {
              size: A4;
              margin: 10mm;
            }
            body {
              margin: 0;
              padding: 20px;
              font-family: system-ui, sans-serif;
            }
            .sheet {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 15px;
            }
            .card-wrapper {
              page-break-inside: avoid;
              width: 300px;
              height: 188px;
            }
            .card-wrapper * {
              max-width: 100%;
            }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="sheet">${printContent.innerHTML}</div>
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-800">Card Sheet for Printing</h3>
            <p className="text-sm text-slate-500">{activeCards.length} active cards</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
            </button>
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Print Sheet
            </button>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeCards.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No active cards to display. Save cards from the Enterprise panel.
            </div>
          ) : (
            <div id="card-sheet-print" className={viewMode === 'grid' ? 'grid grid-cols-3 gap-6' : 'space-y-4'}>
              {activeCards.map(card => {
                const TemplateComponent = templateComponents[card.template];
                return (
                  <div key={card.id} className="card-wrapper">
                    <div className="scale-[0.5] origin-top-left w-[540px] h-[340px]">
                      <TemplateComponent userData={card.userData} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}