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
  { Button: WhatsappShareButton, Icon: SiWhatsapp },
  { Button: TelegramShareButton, Icon: SiTelegram },
  { Button: FacebookShareButton, Icon: SiFacebook },
  { Button: TwitterShareButton, Icon: SiX },
  { Button: ThreadsShareButton, Icon: SiThreads },
  { Button: BlueskyShareButton, Icon: SiBluesky },
  { Button: EmailShareButton, Icon: Mail },
];
