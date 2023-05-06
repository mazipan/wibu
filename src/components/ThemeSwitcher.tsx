import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export default function ThemeSwitcher() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant='filled'
      color={dark ? 'yellow' : 'dark'}
      onClick={() => toggleColorScheme()}
      title='Toggle color scheme'
      size='lg'
    >
      {dark ? <IconSun /> : <IconMoonStars />}
    </ActionIcon>
  );
}
