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
  // Read: https://formidable.com/open-source/urql/docs/graphcache/normalized-caching/#custom-keys-and-non-keyable-entities
  keys: {
    PageInfo: (data) => `${data.currentPage}`,
    MediaTitle: () => null,
    MediaCoverImage: () => null,
    Page: () => null,
  },
});

const client = new Client({
  url: 'https://graphql.anilist.co',
  exchanges: [cache, fetchExchange],
});

export default client;
