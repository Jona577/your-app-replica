import DOMPurify from 'dompurify';

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: ['b', 'i', 'u', 'strong', 'em', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'font', 'sub', 'sup', 'strike', 's', 'blockquote', 'pre', 'code', 'a', 'hr'],
  ALLOWED_ATTR: ['style', 'class', 'href', 'target', 'rel', 'size', 'face', 'color'],
  RETURN_TRUSTED_TYPE: false,
};

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, SANITIZE_CONFIG) as string;
}
