// List of inappropriate words/phrases to filter
// This is a basic list - extend as needed
const badWords = [
  // Common profanity
  "fuck", "shit", "ass", "bitch", "damn", "crap", "dick", "cock", "pussy",
  "asshole", "bastard", "cunt", "whore", "slut", "fag", "faggot", "nigger",
  "nigga", "retard", "retarded",
  // Variations with common letter substitutions
  "f*ck", "sh*t", "b*tch", "a$$", "d*ck", "c*ck", "p*ssy",
  "fck", "fuk", "fuq", "sht", "btch", "dck",
  // Hate speech
  "nazi", "hitler", "kys", "kill yourself",
  // Spam/scam patterns
  "buy now", "click here", "free money", "make money fast",
];

// Normalize text for comparison (lowercase, remove common substitutions)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/\$/g, "s")
    .replace(/@/g, "a")
    .replace(/\*/g, "")
    .replace(/[_-]/g, "")
    .replace(/\s+/g, " ");
}

interface FilterResult {
  isClean: boolean;
  reason?: string;
}

export function checkMessage(message: string): FilterResult {
  const normalized = normalizeText(message);

  for (const word of badWords) {
    const normalizedWord = normalizeText(word);
    // Check if the bad word appears as a whole word or substring
    if (normalized.includes(normalizedWord)) {
      return {
        isClean: false,
        reason: "Your message contains inappropriate language. Please keep it friendly!",
      };
    }
  }

  return { isClean: true };
}

export function checkName(name: string): FilterResult {
  const normalized = normalizeText(name);

  for (const word of badWords) {
    const normalizedWord = normalizeText(word);
    if (normalized.includes(normalizedWord)) {
      return {
        isClean: false,
        reason: "Please use an appropriate name.",
      };
    }
  }

  return { isClean: true };
}
