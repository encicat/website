import { Age } from '../Age';
import { Card } from '../Card';
import { Gender } from '../Gender';

interface Props {
  name: string;
  birthdate: string;
  gender: string;
  img: string;
  slug: string;
  priority?: boolean;
}

export const AdoptionItem: React.FC<Props> = ({
  name,
  birthdate,
  gender,
  img,
  slug,
  priority = false,
}) => {
  return (
    <Card
      title={name}
      titleExtra={<Gender gender={gender as 'male' | 'female'} iconOnly />}
      imgSrc={String(img)}
      url={`/adopciones/${slug}`}
      priority={priority}
    >
      <Age birthdate={birthdate} plain />
    </Card>
  );
};
