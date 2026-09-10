export const toTelHref = (phone: string) => `tel:${phone.replace(/\s+/g, '')}`;
