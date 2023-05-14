type TranslationResponse = {
  responseData: {
    translatedText: string;
  };
};

export async function translateText(text: string, targetLang: string | 'es'): Promise<string> {
  const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|${targetLang}`);
  const data = await response.json();

  return data.responseData.translatedText;
}