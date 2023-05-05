import { Breadcrumbs, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';

interface BreadcrumbListProps {
  title: string;
  href: string;
}

export default function BreadcrumbList({ items }: { items?: [BreadcrumbListProps] }) {
  return (
    <Breadcrumbs>
      <Anchor to='/' component={Link}>
        Home
      </Anchor>
      {items &&
        items.length > 0 &&
        items.map((item: BreadcrumbListProps) => (
          <Anchor to={item.href} key={item.href} component={Link}>
            {item.title}
          </Anchor>
        ))}
    </Breadcrumbs>
  );
}
