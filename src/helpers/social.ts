import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import type { Entry } from '@keystatic/core/reader';

import type keystaticConfig from '@/keystatic.config';

export const socialIconMap = {
  instagram: SiInstagram,
  tiktok: SiTiktok,
  youtube: SiYoutube,
  facebook: SiFacebook,
};

export const getSocialIcon = (name: string) =>
  socialIconMap[name.toLowerCase() as keyof typeof socialIconMap];

export type SocialNetworks = Entry<
  (typeof keystaticConfig)['singletons']['social']
>['socials_networks'];
