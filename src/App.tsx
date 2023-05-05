import { RouterProvider } from 'react-router-dom';
import { Provider } from 'urql';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import client from './graphqlClient';
import router from './router';
import theme from './theme';

function App() {
  return (
    <Provider value={client}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Notifications position="top-right" />
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  );
}

export default App;
