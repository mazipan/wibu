import { Card, Image, Text, Badge, Group, ActionIcon } from '@mantine/core';
import { IconThumbUp } from '@tabler/icons-react';

import type { Anime } from '../types/Anime';

export default function AnimeItem({ anime }: { anime: Anime }) {
  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Card.Section>
        <Image
          src={anime.coverImage.medium}
          width="100%"
          alt={anime.title.english}
        />
      </Card.Section>

      <Group position="apart" mt="md">
        <Text weight={500}>{anime.title.english}</Text>
      </Group>
      <Group position="apart" mt="md">
        <Badge px={1} radius="sm" color="blue" variant="light">
          {anime.episodes} Episodes
        </Badge>
        <Badge px={1} radius="sm" color="green" variant="light" leftSection={
          <ActionIcon size="xs" color="green" variant="transparent">
            <IconThumbUp size="0.9rem" />
          </ActionIcon>
        }>
          {anime.averageScore}%
        </Badge>
      </Group>
    </Card>
  );
}
