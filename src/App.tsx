import {
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'urql';
import client from './graphqlClient';
import router from "./router";
import { MantineProvider } from '@mantine/core';
import theme from "./theme";

function App() {
  return (
    <Provider value={client}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  )
}

export default App
