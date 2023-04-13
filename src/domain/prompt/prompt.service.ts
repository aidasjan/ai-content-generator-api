export const generatePrompt = async (
  category: string,
  properties: string[],
  keywords: string[]
) => {
  if (!category || !properties) {
    return null
  }

  const prompt = `Create ${category} about the following topics: ${keywords.join(
    ', '
  )}. The ${category} should have the following properties: ${properties.join(
    ', '
  )}.`

  return prompt
}
