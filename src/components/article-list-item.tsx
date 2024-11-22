import dayjs from 'dayjs';
import { PropsWithChildren } from 'hono/jsx';

type ArticleListItemProps = PropsWithChildren<{
  date: string;
  description: string;
  id: string;
  title: string;
}>;

export function ArticleListItem({
  date,
  description,
  id,
  title,
}: ArticleListItemProps) {
  const Heading = 'h2';

  return (
    <a href={`/posts/${id}/`}>
      <Heading>{title}</Heading>
      <p>{dayjs(date).format('YYYY/MM/DD')}</p>
      <p>{description}</p>
    </a>
  );
}
