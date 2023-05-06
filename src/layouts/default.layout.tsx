import {
  AppShell,
  Header,
  Group,
  Title,
  ActionIcon,
  Anchor,
  Button,
  useMantineColorScheme,
} from '@mantine/core';
import { IconBrandGithub, IconBookmarks } from '@tabler/icons-react';
import { Link, Outlet } from 'react-router-dom';

import AutoScrollToTop from '~/components/AutoScrollToTop';
import ThemeSwitcher from '~/components/ThemeSwitcher';

export default function DefaultLayout() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

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
            <Group position='right' align='center' spacing='xs' mr='lg'>
              <Button leftIcon={<IconBookmarks />} component={Link} to='/bookmarks'>
                My Bookmarks
              </Button>
              <ActionIcon
                variant='outline'
                component='a'
                href='https://github.com/mazipan/wibu'
                target='_blank'
                rel='noopener noreferrer'
                size='lg'
              >
                <IconBrandGithub size='1.125rem' />
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
