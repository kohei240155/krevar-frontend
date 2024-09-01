export const imageGenerationPrompt = {
  instruction:
    "あなたは画像生成のプロフェッショナルです。与えられた単語について、以下の情報を参考に人間が長期間記憶できるような単語のイメージ画像を生成してください。",
  referenceInformation: [
    "言語学習者にとって、単語を覚える際には単語の意味だけではなく、画像として覚えた方が記憶に残りやすいと言われています。",
    "記憶に残りやすい画像は、空間的に大きく情報量が多い印象的な画像です。劇場や空港のような広い場面は、見ているときに時間を長く感じさせ、記憶にも強く残りやすい一方で、雑然とした画像は記憶に残りにくく時間を短く感じさせます。",
  ],
  constraints:
    "コンテンツポリシーに抵触する場合は抵触しない画像にして画像を必ず生成してください。",
  inputContent: {
    englishText: "{英文}",
    word: "{単語}",
  },
  replacePlaceholders: (englishText: string, word: string) => {
    return {
      ...imageGenerationPrompt,
      inputContent: {
        englishText: englishText,
        word: word,
      },
    };
  },
};
