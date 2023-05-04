import { useRouteError } from 'react-router-dom';
import { createStyles, Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 150,
    paddingBottom: 80,
  },

  title: {
    fontSize: 40,
    marginBottom: theme.spacing.md,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

export default function ErrorPage() {
  const { classes } = useStyles();

  const error = useRouteError();
  console.debug(error);

  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
        <Image src='/public/404.svg' className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color='dimmed' size='lg' mb='lg'>
            Page you are trying to open does not exist.
          </Text>
          <Text color='dimmed' size='lg'>
            You may have mistyped the address, or the page has been moved to another URL.
          </Text>
          <Button
            variant='outline'
            size='md'
            mt='xl'
            className={classes.control}
            onClick={() => {
              window.location.assign('/');
            }}
          >
            Get back to home page
          </Button>
        </div>
        <Image src='/public/404.svg' className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
