import en from "../data/en.json";
import fr from "../data/fr.json";
import es from "../data/es.json";

// All visible copy lives in src/data/<lang>.json. Every language must keep the
// same shape and the same array lengths: src/data/site.json is matched to these
// arrays by index.
export const translations = { en, fr, es };

export const SUPPORTED_LANGUAGES = Object.keys(translations);
