import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export default function ErrorBox({ title = 'Error!', message = 'Something bad happens' }) {
  return (
    <Alert icon={<IconAlertCircle size='1rem' />} title={title} color='red'>
      {message}
    </Alert>
  );
}
