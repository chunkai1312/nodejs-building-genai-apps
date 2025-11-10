import 'dotenv/config';
import readline from 'readline';
import { AIMessage, BaseMessage, HumanMessage, initChatModel, SystemMessage } from 'langchain';

async function main() {
  const model = await initChatModel('gpt-4o-mini');

  const messages: BaseMessage[] = [
    new SystemMessage('你是一個樂於助人的 AI 助理。'),
  ];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('LLM Chatbot 已啟動，輸入訊息開始對話（按 Ctrl+C 離開）。\n');
  rl.setPrompt('> ');
  rl.prompt();

  rl.on('line', async (input) => {
    try {
      messages.push(new HumanMessage(input));
      const stream = await model.stream(messages);
      let aiMessage = '';

      for await (const chunk of stream) {
        const content = chunk.text;
        process.stdout.write(chunk.text);
        aiMessage += content;
      }

      process.stdout.write('\n\n');
      messages.push(new AIMessage(aiMessage));
    } catch (err) {
      console.error(err);
    }

    rl.prompt();
  });
}

main();
