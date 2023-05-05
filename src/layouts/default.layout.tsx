import { AppShell, Header, Group, Title, ActionIcon, Anchor } from '@mantine/core';
import { IconMoon, IconBrandGithub } from '@tabler/icons-react';
import { Link, Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <AppShell
      header={
        <Header height={60} p='xs'>
          <Group position='apart' align='center'>
            <Anchor
              component={Link}
              to='/'
              color='dark'
              sx={{
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <Title order={1}>⛩ wibu</Title>
            </Anchor>
            <Group position='right' align='center' spacing='xs'>
              <ActionIcon
                variant='outline'
                component='a'
                href='https://github.com/mazipan/wibu'
                target='_blank'
                rel='noopener noreferrer'
              >
                <IconBrandGithub size='1.125rem' />
              </ActionIcon>
              <ActionIcon variant='outline'>
                <IconMoon size='1.125rem' />
              </ActionIcon>
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
      <Outlet />
    </AppShell>
  );
}
