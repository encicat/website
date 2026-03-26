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
  { key: 'whatsapp', Button: WhatsappShareButton, Icon: SiWhatsapp },
  { key: 'telegram', Button: TelegramShareButton, Icon: SiTelegram },
  { key: 'facebook', Button: FacebookShareButton, Icon: SiFacebook },
  { key: 'twitter', Button: TwitterShareButton, Icon: SiX },
  { key: 'threads', Button: ThreadsShareButton, Icon: SiThreads },
  { key: 'bluesky', Button: BlueskyShareButton, Icon: SiBluesky },
  { key: 'email', Button: EmailShareButton, Icon: Mail },
];
