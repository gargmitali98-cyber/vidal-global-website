'use client';

import {
  Award,
  Briefcase,
  Building2,
  Clock,
  Cloud,
  Cpu,
  FileCheck,
  Globe,
  HeartPulse,
  Layers,
  Link2,
  Lock,
  Mail,
  MapPin,
  Network,
  Pill,
  ScanText,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

/**
 * Content files are plain .ts, so they reference icons by name and this map
 * resolves them. Keeps homepage iconography in the same lucide set the
 * product pages already use, rather than emoji.
 */
const ICONS = {
  Award,
  Briefcase,
  Building2,
  Clock,
  Cloud,
  Cpu,
  FileCheck,
  Globe,
  HeartPulse,
  Layers,
  Link2,
  Lock,
  Mail,
  MapPin,
  Network,
  Pill,
  ScanText,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
  Zap,
} as const;

export type IconName = keyof typeof ICONS;

export default function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  className,
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const Glyph = ICONS[name as IconName];
  if (!Glyph) return null;
  return <Glyph size={size} strokeWidth={strokeWidth} className={className} aria-hidden />;
}
