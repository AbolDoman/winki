/**
 * Split HTML content into two parts at a specific paragraph index.
 * Used to inject inline related posts between paragraphs.
 */
export function splitContentAtParagraph(
  html: string,
  afterParagraph = 3,
): { before: string; after: string } | null {
  // Match closing </p> tags to find paragraph boundaries
  const closingPRegex = /<\/p>/gi;
  let count = 0;
  let match;

  while ((match = closingPRegex.exec(html)) !== null) {
    count++;
    if (count === afterParagraph) {
      const splitIndex = match.index + match[0].length;
      return {
        before: html.slice(0, splitIndex),
        after: html.slice(splitIndex),
      };
    }
  }

  // Not enough paragraphs — don't split
  return null;
}
