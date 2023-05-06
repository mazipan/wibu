import {
  AppShell,
  Header,
  Group,
  Title,
  ActionIcon,
  Anchor,
  Button,
  useMantineColorScheme,
  MediaQuery,
  CSSObject,
} from '@mantine/core';
import { IconBrandGithub, IconBookmarks } from '@tabler/icons-react';
import { Link, Outlet } from 'react-router-dom';

import AutoScrollToTop from '~/components/AutoScrollToTop';
import ThemeSwitcher from '~/components/ThemeSwitcher';

export default function DefaultLayout() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const hidden: CSSObject = {
    display: 'none',
  };
  return (
    <AppShell
      header={
        <Header height={60} p='xs'>
          <Group position='apart' align='center'>
            <Anchor
              component={Link}
              to='/'
              color={dark ? 'gray' : 'dark'}
              sx={{
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <Title order={1}>⛩ wibu</Title>
            </Anchor>
            <Group position='right' align='center' spacing='xs' mr='sm'>
              <MediaQuery smallerThan='sm' styles={hidden}>
                <Button leftIcon={<IconBookmarks />} component={Link} to='/bookmarks'>
                  My Bookmarks
                </Button>
              </MediaQuery>
              <MediaQuery largerThan='sm' styles={hidden}>
                <ActionIcon
                  variant='filled'
                  color='blue'
                  size='lg'
                  component={Link}
                  to='/bookmarks'
                  title='My Bookmarks'
                >
                  <IconBookmarks />
                </ActionIcon>
              </MediaQuery>
              <ActionIcon
                variant='filled'
                component='a'
                color={dark ? 'gray' : 'dark'}
                href='https://github.com/mazipan/wibu'
                target='_blank'
                rel='noopener noreferrer'
                size='lg'
                title='GitHub'
              >
                <IconBrandGithub />
              </ActionIcon>
              <ThemeSwitcher />
            </Group>
          </Group>
        </Header>
      }
      footer={
        <Group position='center' my='md'>
          ⛩ wibu © 2023, Crafted by mazipan
        </Group>
      }
    >
      <AutoScrollToTop />
      <Outlet />
    </AppShell>
  );
}
