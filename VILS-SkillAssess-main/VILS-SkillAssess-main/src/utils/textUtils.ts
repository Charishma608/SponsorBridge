/**
 * Counts the number of words in a given passage.
 * @param passage The passage to count words from.
 * @returns The number of words in the passage.
 */
export const countWords = (passage: string | number): number => {
    if (!passage) return 0;
    const words: string[] = passage
        .toString()
        .split(/\s+/)
        .filter((word) => word.trim() !== '');
    return words.length;
};

/**
 * Counts the number of spaces in a given paragraph.
 * @param paragraph The paragraph to count spaces from.
 * @returns The number of spaces in the paragraph.
 */
export const countSpaces = (paragraph: string): number => {
    // Check if the paragraph is empty or undefined
    if (!paragraph) return 0;

    // Split the paragraph using regular expression to count spaces
    const spaceCount: number = paragraph.split(/\s+/).length - 1;

    return spaceCount;
};

/**
 * Counts the number of paragraphs in a given text.
 * @param text The text to count paragraphs from.
 * @returns The number of paragraphs in the text.
 */
export const countParagraphs = (text: string): number => {
    // Check if the text is empty or undefined
    if (!text.trim()) return 0;

    // Split the text using regular expression to count paragraphs
    const paragraphs: string[] = text
        .split(/\n\s*\n|\r\n\s*\r\n|\r\s*\r/)
        .filter((paragraph) => paragraph.trim() !== '');

    return paragraphs.length;
};
