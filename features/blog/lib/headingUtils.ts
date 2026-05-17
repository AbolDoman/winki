export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/** Extract h2/h3 headings from HTML string */
export function extractHeadings(html: string): TocItem[] {
  const regex = /<h([23])[^>]*?(?:id=["']([^"']+)["'])?[^>]*>(.*?)<\/h[23]>/gi;
  const items: TocItem[] = [];
  let match;
  let index = 0;

  while ((match = regex.exec(html)) !== null) {
    const level = Number(match[1]);
    const existingId = match[2];
    const text = match[3].replace(/<[^>]*>/g, '').trim();
    if (!text) continue;

    const id = existingId || `heading-${index}`;
    items.push({ id, text, level });
    index++;
  }

  return items;
}

/** Inject id attributes into h2/h3 tags that don't have one */
export function injectHeadingIds(html: string): string {
  let index = 0;
  return html.replace(/<h([23])([^>]*)>/gi, (fullMatch, level, attrs) => {
    if (/id=["']/.test(attrs)) return fullMatch;
    const id = `heading-${index++}`;
    return `<h${level} id="${id}"${attrs}>`;
  });
}
