/**
 * Nomes dos 84 ícones de linha (folha Icons_2.svg), pela ordem da folha.
 * Os ficheiros estão em public/brand/line-icons/<nome>.webp (scripts/brand-assets.mjs).
 */
export const lineIconNames = [
  'thumbs-up', 'heart', 'zoom-in', 'zoom-out', 'qr-code', 'idea', 'notebook', 'pencil', 'trophy', 'globe', 'camera', 'power',
  'at', 'user', 'users', 'user-add', 'phone', 'phone-call', 'hand-person', 'hand-money', 'pin', 'flower', 'image', 'cursor',
  'mail', 'mail-open', 'headset', 'mute', 'volume', 'mic', 'share', 'paper-plane', 'home', 'cloud-sun', 'map', 'settings',
  'printer', 'barcode', 'eye', 'fingerprint', 'scissors', 'key', 'cart', 'hand-raise', 'compass', 'antenna', 'video', 'megaphone',
  'battery-low', 'battery-plug', 'battery-charge', 'battery-full', 'laptop', 'calendar', 'calculator', 'open-book', 'note-edit', 'clipboard', 'video-play', 'plane',
  'clip', 'folder', 'folder-open', 'folder-download', 'presentation', 'cloud-upload', 'cloud-download', 'bell-off', 'award', 'trash', 'navigation', 'link',
  'chart-bars', 'chart-growth', 'institution', 'logout', 'flag', 'chats', 'chat-dots', 'chat-text', 'edit', 'forward', 'tools', 'clock',
] as const;
export type LineIconName = (typeof lineIconNames)[number];
