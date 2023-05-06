import { RouterProvider } from 'react-router-dom';
import { Provider } from 'urql';
import { ColorScheme, MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import client from './graphqlClient';
import router from './router';
import theme from './theme';

const THEME_COOKIE_KEY = 'theme';

function App() {
  const [themeStorage, setThemeStorage] = useLocalStorage<ColorScheme>({
    key: THEME_COOKIE_KEY,
    defaultValue: 'light',
  });

  const [colorScheme, setColorScheme] = useState<ColorScheme>(themeStorage);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextTheme = (value as ColorScheme) || (colorScheme === 'dark' ? 'light' : 'dark');
    if (colorScheme !== nextTheme) {
      setColorScheme(nextTheme);
      setThemeStorage(nextTheme);
    }
  };

  useEffect(() => {
    if (themeStorage) {
      setColorScheme(themeStorage);
      setThemeStorage(themeStorage);
    }
  }, [setThemeStorage, themeStorage]);

  return (
    <Provider value={client}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ ...theme, colorScheme }}>
          <Notifications position='top-right' />
          <RouterProvider router={router} />
        </MantineProvider>
      </ColorSchemeProvider>
    </Provider>
  );
}

export default App;
