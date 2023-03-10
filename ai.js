module.exports = ask;

const { Configuration, OpenAIApi } = require("openai");
require("dotenv/config");

const configuration = new Configuration({
   apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

async function ask(message) {
   const prompt = message.content.slice(5);
   console.log(prompt);
   if (!prompt) return "`!ask <mensagem>`";
   try {
      const completion = await openai.createChatCompletion({
         model: "gpt-3.5-turbo",
         temperature: 0.6,
         messages: [{ role: "user", content: prompt }],
      });
      const answer = completion.data.choices[0].message.content;
      if (!answer)
         return "Desculpe, não consegui encontrar uma resposta para a sua pergunta.";
      else return answer;
   } catch (error) {
      console.log(error);
      return "Desculpe, ocorreu um erro interno. Tente novamente.";
   }
}
