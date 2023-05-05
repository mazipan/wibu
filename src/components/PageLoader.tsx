import { LoadingOverlay } from '@mantine/core';

export default function PageLoader() {
  return (
    <LoadingOverlay
      visible={true}
      overlayBlur={2}
      loaderProps={{ size: 'xl', color: 'blue', variant: 'bars' }}
    />
  );
}
