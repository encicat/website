import { Age } from '../Age';
import { Card } from '../Card';
import { Gender } from '../Gender';

interface Props {
  name: string;
  birthdate: string;
  gender: string;
  img: string;
  slug: string;
}

export const AdoptionItem: React.FC<Props> = ({
  name,
  birthdate,
  gender,
  img,
  slug,
}) => {
  return (
    <Card
      title={name}
      titleExtra={<Gender gender={gender as 'male' | 'female'} iconOnly />}
      imgSrc={String(img)}
      url={`/adopciones/${slug}`}
    >
      <Age birthdate={birthdate} plain />
    </Card>
  );
};
