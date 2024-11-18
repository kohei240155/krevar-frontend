export interface UserSettings {
  name: string;
  defaultNativeLanguageId: number;
  defaultLearningLanguageId: number;
  imageGenerationRemaining: number;
  imageGenerationResetDate: string;
  subscriptionStatusId: number;
  subscriptionId: null;
  highlightColor: string;
}

export interface LanguageList {
  languageId: number;
  languageName: string;
}
