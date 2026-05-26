import { useStore } from '../../store';
import {
  Briefcase,
  Sparkles,
  Circle,
  Award,
  Glasses,
  Moon,
  Calendar,
  Rocket,
  ArrowUpDown,
  ArrowLeftRight,
  BriefcaseBusiness,
  Palette,
  Music,
  Leaf,
  Waves,
  Sunset,
  Diamond,
  Building2,
  Heart,
  Sparkle,
  Crown,
  Hammer,
  PenTool
} from 'lucide-react';
import type { TemplateType } from '../../types';

const templates: { id: TemplateType; name: string; description: string; icon: React.ReactNode }[] = [
  { id: 'corporate', name: 'Corporate', description: 'Professional blue/gray scheme', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'modern', name: 'Modern', description: 'Bold colors, rounded corners', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'minimal', name: 'Minimal', description: 'Clean whitespace design', icon: <Circle className="w-4 h-4" /> },
  { id: 'executive', name: 'Executive', description: 'Premium dark with gold', icon: <Award className="w-4 h-4" /> },
  { id: 'glassmorphism', name: 'Glassmorphism', description: 'Frosted glass effect', icon: <Glasses className="w-4 h-4" /> },
  { id: 'neonoir', name: 'Neo Noir', description: 'Tech/Futuristic - dark with neon accents', icon: <Moon className="w-4 h-4" /> },
  { id: 'festivalvibe', name: 'Festival Vibe', description: 'Creative/Artistic - bold colors, gradient waves', icon: <Calendar className="w-4 h-4" /> },
  { id: 'techspark', name: 'Tech Spark', description: 'Tech/Futuristic - dark mode, glowing elements', icon: <Rocket className="w-4 h-4" /> },
  { id: 'creativepulse', name: 'Creative Pulse', description: 'Creative/Artistic - dynamic shapes, vibrant', icon: <BriefcaseBusiness className="w-4 h-4" /> },
  { id: 'neoncyber', name: 'Neon Cyber', description: 'Tech/Futuristic - neon cyberpunk aesthetic', icon: <ArrowUpDown className="w-4 h-4" /> },
  { id: 'widescreenpro', name: 'Widescreen Pro', description: 'Clean/Professional - balanced, readable', icon: <ArrowLeftRight className="w-4 h-4" /> },
  { id: 'artisan', name: 'Artisan', description: 'Creative/Artistic - handcrafted feel', icon: <Palette className="w-4 h-4" /> },
  { id: 'retrowave', name: 'Retro Wave', description: '80s synthwave aesthetic with neon grids', icon: <Music className="w-4 h-4" /> },
  { id: 'natureserenity', name: 'Nature Serenity', description: 'Calm green tones with organic feel', icon: <Leaf className="w-4 h-4" /> },
  { id: 'oceandepth', name: 'Ocean Depth', description: 'Deep blue ocean with wave patterns', icon: <Waves className="w-4 h-4" /> },
  { id: 'sunsetglow', name: 'Sunset Glow', description: 'Warm orange and gold gradient', icon: <Sunset className="w-4 h-4" /> },
  { id: 'midnightelegance', name: 'Midnight Elegance', description: 'Premium black with gold accents', icon: <Diamond className="w-4 h-4" /> },
  { id: 'nordicminimal', name: 'Nordic Minimal', description: 'Ultra-clean white minimal design', icon: <Building2 className="w-4 h-4" /> },
  { id: 'urbanedge', name: 'Urban Edge', description: 'Industrial dark with lime accents', icon: <Hammer className="w-4 h-4" /> },
  { id: 'cherrybloom', name: 'Cherry Bloom', description: 'Soft pink gradient with romantic feel', icon: <Heart className="w-4 h-4" /> },
  { id: 'cosmicdust', name: 'Cosmic Dust', description: 'Deep purple with star particles', icon: <Sparkle className="w-4 h-4" /> },
  { id: 'goldenhour', name: 'Golden Hour', description: 'Luxurious gold and amber tones', icon: <Crown className="w-4 h-4" /> },
  { id: 'steelforge', name: 'Steel Forge', description: 'Industrial metal with orange sparks', icon: <Hammer className="w-4 h-4" /> },
  { id: 'vintageclassic', name: 'Vintage Classic', description: 'Classic beige with sepia tones', icon: <PenTool className="w-4 h-4" /> },
];

export function TemplateSelector() {
  const template = useStore((state) => state.template);
  const setTemplate = useStore((state) => state.setTemplate);

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Choose a template for your ID card
      </p>
      <div className="overflow-y-auto max-h-[400px] pr-1">
        <div className="grid grid-cols-1 gap-2">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left ${
                template === t.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  template === t.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {t.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-slate-200">{t.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}