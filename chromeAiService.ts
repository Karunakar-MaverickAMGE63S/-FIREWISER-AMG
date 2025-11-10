// --- TypeScript Declarations for Chrome Built-in AI API ---
// These declarations provide type safety for the experimental 'window.ai' object.

type AIStatus = 'readily' | 'after-download' | 'no';

interface SummarizerOptions {
  format?: 'plain_text' | 'bulleted_list';
  length?: 'short' | 'medium' | 'long';
}

interface RewriterOptions {
  tone?: 'formal' | 'casual' | 'emotive';
  length?: 'shorter' | 'longer' | 'unchanged';
}

interface Proofreader {
  proofread: (text: string) => Promise<string>;
}

interface Summarizer {
  summarize: (text: string, options?: SummarizerOptions) => Promise<string>;
}

interface Rewriter {
  rewrite: (text: string, options?: RewriterOptions) => Promise<string>;
}

interface Translator {
  translate: (text: string, options: { targetLanguage: string }) => Promise<string>;
  getTargetLanguages: () => Promise<string[]>;
}

declare global {
  interface Window {
    ai?: {
      canCreateSummarizer: () => Promise<AIStatus>;
      summarizer: () => Promise<Summarizer>;
      canCreateRewriter: () => Promise<AIStatus>;
      rewriter: () => Promise<Rewriter>;
      canCreateProofreader: () => Promise<AIStatus>;
      proofreader: () => Promise<Proofreader>;
      canCreateTranslator: () => Promise<AIStatus>;
      translator: () => Promise<Translator>;
    };
  }
}

// --- Service Implementation ---

export enum ChromeAIStatus {
  SUPPORTED,
  UNSUPPORTED,
}

let summarizerInstance: Summarizer | null = null;
let rewriterInstance: Rewriter | null = null;
let proofreaderInstance: Proofreader | null = null;
let translatorInstance: Translator | null = null;

/**
 * Checks for the availability of the Chrome AI APIs and initializes them.
 */
export const initializeChromeAI = async (): Promise<ChromeAIStatus> => {
  if (typeof window.ai === 'undefined') {
    return ChromeAIStatus.UNSUPPORTED;
  }
  try {
    if ((await window.ai.canCreateSummarizer()) === 'readily') {
      summarizerInstance = await window.ai.summarizer();
    }
    if ((await window.ai.canCreateRewriter()) === 'readily') {
      rewriterInstance = await window.ai.rewriter();
    }
    if ((await window.ai.canCreateProofreader()) === 'readily') {
      proofreaderInstance = await window.ai.proofreader();
    }
     if ((await window.ai.canCreateTranslator()) === 'readily') {
      translatorInstance = await window.ai.translator();
    }
    return ChromeAIStatus.SUPPORTED;
  } catch (e) {
    console.error("Error initializing Chrome AI:", e);
    return ChromeAIStatus.UNSUPPORTED;
  }
};

/**
 * Generates a concise, 3-point summary of a given text.
 * @param text The text to summarize.
 * @returns A bulleted list summary or an error message.
 */
export const summarizeText = async (text: string): Promise<string> => {
  if (!summarizerInstance) {
    return "Summarizer not available.";
  }
  try {
    return await summarizerInstance.summarize(text, { format: 'bulleted_list', length: 'short' });
  } catch (e) {
    console.error("Summarization error:", e);
    return "Could not generate summary.";
  }
};

/**
 * Rephrases a checklist item into a more urgent and direct tone.
 * @param text The text to rephrase.
 * @returns A rephrased string or the original text on error.
 */
export const rephraseForUrgency = async (text: string): Promise<string> => {
  if (!rewriterInstance) {
    return text; // Return original if rewriter is unavailable
  }
  try {
    return await rewriterInstance.rewrite(text, { tone: 'emotive', length: 'shorter' });
  } catch (e) {
    console.error("Rephrasing error:", e);
    return text;
  }
};


/**
 * Proofreads text for spelling and grammar errors.
 * @param text The text to proofread.
 * @returns A proofread string or the original text on error.
 */
export const proofreadText = async (text: string): Promise<string> => {
  if (!proofreaderInstance) {
    return text;
  }
  try {
    return await proofreaderInstance.proofread(text);
  } catch (e) {
    console.error("Proofreading error:", e);
    return text;
  }
};


/**
 * Gets the list of available target languages for translation.
 * @returns An array of language codes.
 */
export const getAvailableLanguages = async (): Promise<string[]> => {
  if (!translatorInstance) {
    return [];
  }
  try {
    return await translatorInstance.getTargetLanguages();
  } catch (e) {
    console.error("Error getting languages:", e);
    return [];
  }
};


/**
 * Translates text to a specified target language.
 * @param text The text to translate.
 * @param targetLanguage The language code to translate to.
 * @returns The translated string or an error message.
 */
export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  if (!translatorInstance) {
    return "Translator not available.";
  }
  try {
    return await translatorInstance.translate(text, { targetLanguage });
  } catch (e) {
    console.error("Translation error:", e);
    return "Translation failed.";
  }
};
