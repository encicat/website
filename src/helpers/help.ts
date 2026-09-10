import { Coins, Heart, Home, Megaphone, Users } from 'lucide-react';

export const helpIconMap = {
  coins: Coins,
  home: Home,
  heart: Heart,
  users: Users,
  megaphone: Megaphone,
};

export const getHelpIcon = (name: string) =>
  helpIconMap[name as keyof typeof helpIconMap] ?? Heart;
