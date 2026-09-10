export const toTelHref = (phone: string) => `tel:${phone.replace(/\s+/g, '')}`;

export const toWhatsAppHref = (phone: string) =>
  `https://wa.me/${phone.replace(/\D/g, '')}`;

export const toTelegramHref = (phone: string) =>
  `https://t.me/+${phone.replace(/\D/g, '')}`;
