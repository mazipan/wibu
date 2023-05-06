import { Card, Image, Text, Badge, Group, ActionIcon, Button, Stack } from '@mantine/core';
import { IconArrowRight, IconThumbUp } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from 'usehooks-ts';
import { useEffect, useRef, useState } from 'react';

import BookmarkButton from './BookmarkButton';

import type { Anime } from '~/types/Anime';
import ImageLoader from '~/components/ImageLoader';

interface AnimeItemProps {
  anime: Anime;
  withBookmark?: boolean;
}

export default function AnimeItem({ anime, withBookmark }: AnimeItemProps) {
  const [imageSrc, setImageSrc] = useState('');
  const imageRef = useRef<HTMLImageElement>(null);

  // Read: https://usehooks-ts.com/react-hook/use-intersection-observer
  const entry = useIntersectionObserver(imageRef, {
    freezeOnceVisible: true,
    rootMargin: '10%',
  });

  useEffect(() => {
    const isVisible = !!entry?.isIntersecting;
    if (isVisible) {
      setImageSrc(anime.coverImage.medium);
    }
  }, [anime.coverImage.medium, entry]);

  return (
    <Card shadow='sm' padding='sm' radius='md' withBorder>
      <Card.Section>
        <Image
          withPlaceholder
          placeholder={<ImageLoader />}
          src={imageSrc}
          width='100%'
          mih={350}
          miw={250}
          alt={anime.title.english}
          imageRef={imageRef}
          styles={{
            placeholder: {
              minHeight: '350px',
            },
          }}
        />
      </Card.Section>

      <Stack mt='md' spacing='xs'>
        <Group position='apart'>
          <Text weight={500}>{anime.title.english}</Text>
        </Group>
        <Group position='apart'>
          <Badge px={1} radius='sm' color='blue' variant='light'>
            {anime.episodes} Episodes
          </Badge>
          <Badge
            px={1}
            radius='sm'
            color='green'
            variant='light'
            leftSection={
              <ActionIcon size='xs' color='green' variant='transparent'>
                <IconThumbUp size='0.9rem' />
              </ActionIcon>
            }
          >
            {anime.averageScore}%
          </Badge>
        </Group>

        {withBookmark ? <BookmarkButton anime={anime} fullWidth={true} outline={true} /> : null}

        <Button
          component={Link}
          to={`/detail/${anime.id}`}
          rightIcon={<IconArrowRight size='1.1rem' />}
        >
          See Detail
        </Button>
      </Stack>
    </Card>
  );
}
