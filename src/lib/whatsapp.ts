import { business } from '../data/business';
export interface ContactDetails {
  name: string;
  phone?: string;
  area: string;
  message: string;
}

export function buildWhatsAppUrl(details: ContactDetails): string {
  const phone = details.phone?.trim();
  const message = [
    `Hola, quisiera realizar una consulta con ${business.name}.`,
    `Nombre: ${details.name.trim()}`,
    ...(phone ? [`Teléfono: ${phone}`] : []),
    `Área: ${details.area.trim()}`,
    "",
    details.message.trim(),
  ].join("\n");
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
