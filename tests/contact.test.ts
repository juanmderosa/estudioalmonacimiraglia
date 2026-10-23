import { expect, test } from 'vitest';
import { buildWhatsAppUrl } from '../src/lib/whatsapp';

test('prepara WhatsApp con tildes, símbolos y saltos de línea sin alterar el mensaje', () => {
  const message = 'Consulta de prueba: información & documentación.\n¿Qué debería presentar?';
  const url = new URL(buildWhatsAppUrl({
    name: '  María Pérez  ',
    phone: '  11 1234-5678 ',
    area: 'Civil y Comercial',
    message,
  }));
  expect(url.origin).toBe('https://wa.me');
  expect(url.pathname).toBe('/5491137676838');
  expect(url.searchParams.size).toBe(1);
  const text = url.searchParams.get('text');
  expect(text).toContain('Nombre: María Pérez\nTeléfono: 11 1234-5678\nÁrea: Civil y Comercial\n\n');
  expect(text?.endsWith(message)).toBe(true);
});

test('permite consultar sin teléfono y no agrega una línea vacía para ese dato', () => {
  const url = new URL(buildWhatsAppUrl({
    name: 'Persona de prueba',
    phone: ' ',
    area: 'Familia',
    message: ' Una consulta de prueba. ',
  }));
  const text = url.searchParams.get('text');
  expect(text).not.toContain('Teléfono:');
  expect(text).toContain('Persona de prueba\nÁrea: Familia');
  expect(text?.endsWith('Una consulta de prueba.')).toBe(true);
});
