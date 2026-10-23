import {
  PanelsTopLeft,
  Database,
  CodeXml,
  ShoppingBag,
  Smartphone,
  Gauge,
  Zap,
  Palette,
  Shield,
  ChartLine,
  HeartHandshake,
  Globe,
  Compass,
} from 'lucide-react'

// Keep in sync with server/src/utils/iconOptions.js — this whitelist is what
// the Services, Why Us, and Founder-highlight icon pickers offer, and what
// the server validates.
export const ICON_OPTIONS = {
  PanelsTopLeft,
  Database,
  CodeXml,
  ShoppingBag,
  Smartphone,
  Gauge,
  Zap,
  Palette,
  Shield,
  ChartLine,
  HeartHandshake,
  Globe,
  Compass,
}

export const ICON_KEYS = Object.keys(ICON_OPTIONS)
