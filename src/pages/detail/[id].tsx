import { useQuery } from 'urql';
import { useParams } from 'react-router-dom';
import {
  Stack,
  Group,
  Image,
  Title,
  Badge,
  ActionIcon,
  TypographyStylesProvider,
} from '@mantine/core';
import { IconThumbUp } from '@tabler/icons-react';

import PageLoader from '~/components/PageLoader';
import ErrorBox from '~/components/ErrorBox';
import ImageLoader from '~/components/ImageLoader';
import BreadcrumbList from '~/components/BreadcrumbList';
import BookmarkButton from '~/components/BookmarkButton';
import GetMediaDetail from '~/queries/MediaDetailQuery.graphql';
import { Anime } from '~/types/Anime';

interface DataMediaDetailResponse {
  media: Anime;
}

export default function DetailPage() {
  const { id } = useParams();
  const [{ data, fetching, error }] = useQuery<DataMediaDetailResponse>({
    query: GetMediaDetail,
    variables: { id },
  });

  if (fetching) return <PageLoader />;
  if (error) return <ErrorBox message={error.message} />;

  return (
    <Stack>
      {data && data.media ? (
        <Stack>
          <BreadcrumbList
            items={[
              {
                title: data.media?.title?.english,
                href: `/detail/${data.media?.id}`,
              },
            ]}
          />
          <Image
            withPlaceholder
            placeholder={<ImageLoader />}
            src={data.media?.bannerImage}
            width='100%'
            alt={data.media?.title?.english}
            styles={{
              placeholder: {
                minHeight: '350px',
              },
            }}
          />
          <Stack mt='sm' spacing='xs'>
            <Group position='apart'>
              <Title order={1}>{data.media?.title?.english}</Title>
              <BookmarkButton anime={data.media} />
            </Group>
            <Title order={2} color='gray'>
              {data.media?.title?.native} - ({data.media?.title?.romaji})
            </Title>
            <Group position='left'>
              <Badge px={1} radius='sm' color='blue' variant='light'>
                {data.media?.episodes} Episodes
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
                {data.media?.averageScore}%
              </Badge>
            </Group>
            <Group position='left' spacing='xs'>
              {data.media?.genres &&
                data.media?.genres.map((genre: string) => (
                  <Badge radius='sm' color='grape' variant='dot' key={genre}>
                    {genre}
                  </Badge>
                ))}
            </Group>

            <TypographyStylesProvider>
              <div dangerouslySetInnerHTML={{ __html: data.media?.description }} />
            </TypographyStylesProvider>
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
}
