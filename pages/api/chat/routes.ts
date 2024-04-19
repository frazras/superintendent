import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
 
// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'
 
export default async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages, temperature, model } = await req.json()
  console.log('messages is', messages);
  console.log('temperature is ', temperature);
  console.log('model.', model);
 
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: model || 'gpt-3.5-turbo-0125',//'gpt-4',
    stream: true,
    temperature: temperature || 0,
    //max_tokens: 10,
    messages
  })
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
