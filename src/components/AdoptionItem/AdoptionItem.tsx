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
    <Card title={name} imgSrc={String(img)} url={`/adopciones/${slug}`}>
      <div className="flex gap-2">
        <Gender gender={gender as 'male' | 'female'} />
        <Age birthdate={birthdate} />
      </div>
    </Card>
  );
};
