import { TavilySearch } from '@langchain/tavily';

export const searchTool = new TavilySearch({
  tavilyApiKey: process.env.TAVILY_API_KEY,
  maxResults: 3,
  topic: 'general',
  timeRange: 'year',
  includeAnswer: true,
  includeRawContent: true
});
