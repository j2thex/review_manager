import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_CHATGPT_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
})

// Generates a **positive** Google Maps review only.
// We never generate negative reviews – if the user disliked the service
// they can type their own text in the UI instead.
export async function generateReview(stressPoints = []) {
  if (!import.meta.env.VITE_CHATGPT_API_KEY) {
    throw new Error('ChatGPT API key is not configured. Please set VITE_CHATGPT_API_KEY in your .env file.')
  }

  // ============================================
  // EDIT THE PROMPT HERE (positive reviews only)
  // ============================================
  // Construct the prompt based on user selections
  let prompt = `Write a positive Google Maps review for a Vodafone store. Be unique and creatve. Mention Eimy who helped you. Choose a random positive word from the English disctionary and use it in the review. `

  if (stressPoints && stressPoints.length > 0) {
    prompt += `Please highlight the following aspects in a natural way: ${stressPoints.join(', ')}. `
  }

  prompt += `The review should sound authentic, focus on what went well, be concise (2-4 sentences), and be appropriate for Google Maps. Write it from a happy customer's perspective.`

  try {
    // ============================================
    // CHOOSE MODEL HERE
    // Options: 'gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o', etc.
    // Or set VITE_CHATGPT_MODEL in .env
    // ============================================
    const model = import.meta.env.VITE_CHATGPT_MODEL || 'gpt-3.5-turbo'
    
    // ============================================
    // EDIT SYSTEM MESSAGE HERE
    // Or set VITE_CHATGPT_SYSTEM_MESSAGE in .env
    // ============================================
    const systemMessage = import.meta.env.VITE_CHATGPT_SYSTEM_MESSAGE || 
      'You are a helpful assistant that writes authentic, positive Google Maps reviews for businesses.'
    
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: systemMessage
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.9
    })

    const reviewText = completion.choices[0]?.message?.content?.trim()
    
    if (!reviewText) {
      throw new Error('No review text was generated')
    }

    return reviewText
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      throw new Error(`ChatGPT API error: ${error.message}`)
    } else if (error.message.includes('API key')) {
      throw error
    } else {
      throw new Error(`Failed to generate review: ${error.message}`)
    }
  }
}
