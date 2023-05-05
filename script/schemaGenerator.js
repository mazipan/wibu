import * as fs from 'fs';

import { getIntrospectionQuery } from 'graphql';
import fetch from 'node-fetch';
import { getIntrospectedSchema, minifyIntrospectionQuery } from '@urql/introspection';

fetch('https://graphql.anilist.co', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: getIntrospectionQuery({ descriptions: false }),
  }),
})
  .then((result) => result.json())
  .then(({ data }) => {
    const minified = minifyIntrospectionQuery(getIntrospectedSchema(data));
    fs.writeFileSync('./src/schema.json', JSON.stringify(minified));
  });
