import { Client, cacheExchange, fetchExchange } from 'urql';

const client = new Client({
  url: 'https://graphql.anilist.co',
  exchanges: [cacheExchange, fetchExchange],
});

export default client;
