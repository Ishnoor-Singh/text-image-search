import OpenAI from 'openai';

const SYSTEM_MESSAGE = `You are a precursor to an image search tool, and you need to describe the image to help the search engine find it.
You can assume the user is not going to see this, so you can be very technical.
You can output in terms of short phrases and sentences too. keep it less than 200 tokens.
Ensure that the respnse in the following json format:
{
  "tags": "<comma sepatated list of tags for eg: twitter, screenshot, landscape>",
  "description": "<plain text description of the image>",
  "text": "<any extracted text from the image if any, otherwise skip this field>"
}
Make sure to finish the json! don't include markdown or any other formatting. Also make sure to escape all quotes in the json.
`

const USER_PROMPT = `Process this image for the search engine: `


const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export async function processImageFromURL(imageUrl: string, systemMessage: string = SYSTEM_MESSAGE, userPrompt: string = USER_PROMPT) {
    console.log('Processing image from URL', imageUrl)
    const response = openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        max_tokens: 1000,
        messages: [{ role: 'system', content: systemMessage },
        { role: 'user', content: [{ type: 'text', 'text': userPrompt }, { type: 'image_url', image_url: { url: imageUrl } }] }]
    });
    return response.then((res) => cleanMarkDownJSON(res.choices[0].message.content)).catch((err) => console.error(err));
}

function cleanMarkDownJSON(jsonString: string) {
    return jsonString.replace(/```json/g, '').replace(/```/g, '').replace(/\n/g, '');
}