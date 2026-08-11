import {
  Zap, Plug, Lightbulb, ShieldCheck, Gauge, HardHat,
  Droplets, Wrench, Bath, PlusCircle,
  Clock, School, BookOpen, Moon, Baby, Users,
  CheckCircle2,
} from 'lucide-react';

// Decorative icon per "Informations utiles" card, purely visual (never translated
// content) — keyed by serviceId, ordered to match card1..card6 in the locale files.
// Services not listed here fall back to DEFAULT_ICON for every card; that's expected
// while the card system is rolled out service by service, not a bug.
export const SERVICE_CARD_ICONS = {
  electrician: [Zap, Plug, Lightbulb, ShieldCheck, Gauge, HardHat],
  plumbing: [Droplets, Wrench, Bath, PlusCircle, HardHat],
  babysitting: [Clock, School, BookOpen, Moon, Baby, Users],
};

export const DEFAULT_CARD_ICON = CheckCircle2;

export function getServiceCardIcon(serviceId, index) {
  return SERVICE_CARD_ICONS[serviceId]?.[index] || DEFAULT_CARD_ICON;
}
