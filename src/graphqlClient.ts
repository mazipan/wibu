import { Client, fetchExchange } from 'urql';
import { offlineExchange } from '@urql/exchange-graphcache';
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage';

import schema from './schema.json';
import { MAX_AGE, STORAGE_DB } from './helpers/constants';

const storage = makeDefaultStorage({
  idbName: STORAGE_DB.GQL, // The name of the IndexedDB database
  maxAge: MAX_AGE.GQL, // The maximum age of the persisted data in days
});

const cache = offlineExchange({
  schema,
  storage,
});

const client = new Client({
  url: 'https://graphql.anilist.co',
  exchanges: [cache, fetchExchange],
});

export default client;
