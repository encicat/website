import {
  SiBluesky,
  SiFacebook,
  SiTelegram,
  SiThreads,
  SiWhatsapp,
  SiX,
} from '@icons-pack/react-simple-icons';
import { Mail } from 'lucide-react';
import {
  BlueskyShareButton,
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  ThreadsShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

export const networks = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    Button: WhatsappShareButton,
    Icon: SiWhatsapp,
  },
  {
    key: 'telegram',
    label: 'Telegram',
    Button: TelegramShareButton,
    Icon: SiTelegram,
  },
  {
    key: 'facebook',
    label: 'Facebook',
    Button: FacebookShareButton,
    Icon: SiFacebook,
  },
  { key: 'twitter', label: 'X', Button: TwitterShareButton, Icon: SiX },
  {
    key: 'threads',
    label: 'Threads',
    Button: ThreadsShareButton,
    Icon: SiThreads,
  },
  {
    key: 'bluesky',
    label: 'Bluesky',
    Button: BlueskyShareButton,
    Icon: SiBluesky,
  },
  { key: 'email', label: 'Email', Button: EmailShareButton, Icon: Mail },
];
