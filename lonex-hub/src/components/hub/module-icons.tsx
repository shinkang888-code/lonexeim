import {
  Bot,
  Calendar,
  DollarSign,
  Gavel,
  HardDrive,
  Headphones,
  Languages,
  Mail,
  MessageCircle,
  PenLine,
  Search,
  Settings,
  Shield,
  Video,
  VideoIcon,
  type LucideIcon,
} from "lucide-react";

export const MODULE_ICONS: Record<string, LucideIcon> = {
  Bot,
  MessageCircle,
  Mail,
  Calendar,
  Video,
  Languages,
  VideoIcon,
  Gavel,
  HardDrive,
  PenLine,
  Headphones,
  DollarSign,
  Shield,
  Search,
  Settings,
};

export function ModuleIcon({
  icon,
  className = "h-5 w-5",
}: {
  icon?: string;
  className?: string;
}) {
  const mod = icon ?? "Bot";
  const Icon = MODULE_ICONS[mod] ?? Bot;
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}
