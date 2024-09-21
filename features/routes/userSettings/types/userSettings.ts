export interface UserSettingsFormProps {
  defaultNativeLanguageId: number;
  onNativeLanguageChange: (languageId: number) => void;
  defaultLearningLanguageId: number;
  onLearningLanguageChange: (languageId: number) => void;
  subscriptionStatus: number;
  onSubscriptionUpdate: (subscriptionStatus: number) => void;
  highlightColor: string;
  onHighlightColorChange: (color: string) => void;
}
