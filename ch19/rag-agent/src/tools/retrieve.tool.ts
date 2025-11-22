import * as z from 'zod';
import { tool } from '@langchain/core/tools';
import { vectorStore } from '../vectorstores/qdrant.vectorstore';

export const retrieve = tool(
  async ({ query }) => {
    const retriever = (await vectorStore).asRetriever(3);
    const retrievedDocs = await retriever.invoke(query);
    const serialized = retrievedDocs
      .map((doc) => `Source: ${doc.metadata.source}\nContent: ${doc.pageContent}`)
      .join('\n');
    return [serialized, retrievedDocs];
  },
  {
    name: 'retrieve',
    description: '檢索與查詢相關的資訊。',
    schema: z.object({ query: z.string() }),
    responseFormat: 'content_and_artifact',
  }
);
