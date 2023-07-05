// import { NextApiRequest, NextApiResponse } from "next";
// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   organization: "org-fbDRNtsCbJ9mJFpSRuanIOiy",
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { message } = req.body;

//   try {
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: message,
//       temperature: 0,
//       max_tokens: 100,
//       top_p: 1,
//       frequency_penalty: 0.0,
//       presence_penalty: 0.0,
//       stop: ["\n"],
//     });

//     const aiResponse = response.data.choices[0].text?.trim();
//     res.status(200).json({ response: aiResponse });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// }
