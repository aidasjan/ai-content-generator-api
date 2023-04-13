import fetch from 'node-fetch'

export const generateContent = async (prompt: string) => {
  const response = await fetch(`${process.env.OPEN_AI_URL}/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPEN_AI_TOKEN}`
    },
    body: JSON.stringify({
      model: process.env.OPEN_AI_MODEL,
      prompt,
      temperature: parseFloat(process.env.OPEN_AI_TEMPERATURE ?? '1'),
      max_tokens: parseFloat(process.env.OPEN_AI_MAX_TOKENS ?? '0.5')
    })
  })
  const result = await response.json()
  return result.choices[0].text
}
