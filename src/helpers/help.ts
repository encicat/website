import {
  AtSign,
  Coins,
  Heart,
  HeartHandshake,
  Home,
  Megaphone,
  MessageCircle,
  Share2,
  Store,
  Users,
} from 'lucide-react';

const helpIconMap = {
  coins: Coins,
  home: Home,
  heart: Heart,
  users: Users,
  megaphone: Megaphone,
  'heart-handshake': HeartHandshake,
  share: Share2,
  message: MessageCircle,
  tag: AtSign,
  store: Store,
};

export const getHelpIcon = (name: string) =>
  helpIconMap[name as keyof typeof helpIconMap] ?? Heart;
