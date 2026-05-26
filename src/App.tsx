import { useEffect } from 'react';
import { useStore } from './store';
import { Header } from './components/Header';
import { Sidebar } from './components/sidebar/Sidebar';
import { CardPreview } from './components/preview/CardPreview';
import { setCardRef } from './components/export/ExportPanel';
import { Corporate, Modern, Minimal, Executive, Glassmorphism, NeoNoir, FestivalVibe, TechSpark, CreativePulse, NeonCyber, WidescreenPro, Artisan, RetroWave, NatureSerenity, OceanDepth, SunsetGlow, MidnightElegance, NordicMinimal, UrbanEdge, CherryBloom, CosmicDust, GoldenHour, SteelForge, VintageClassic } from './components/templates';
import type { TemplateType, UserData } from './types';

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

function App() {
  const template = useStore((state) => state.template);
  const userData = useStore((state) => state.userData);

  useEffect(() => {
    const timer = setTimeout(() => {
      const cardElement = document.querySelector('.id-card-container') as HTMLDivElement;
      setCardRef(cardElement);
    }, 100);
    return () => clearTimeout(timer);
  }, [template, userData]);

  const TemplateComponent = templateComponents[template] || templateComponents.corporate;

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-96 flex-shrink-0 overflow-hidden border-r border-slate-200 bg-white">
          <Sidebar />
        </aside>
        
        <main className="flex-1 overflow-hidden bg-slate-100 flex items-center justify-center p-6">
          <CardPreview />
        </main>
      </div>

      <div className="fixed top-4 left-4 pointer-events-none z-[-1] opacity-0">
        <TemplateComponent userData={userData} />
      </div>
    </div>
  );
}

export default App;