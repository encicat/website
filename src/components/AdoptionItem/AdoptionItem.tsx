import Link from 'next/link';
import { Age } from '../Age';
import { Gender } from '../Gender';
import { Polaroid } from '../Polaroid';
import { Card } from '../Card';

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

// export const AdoptionItem: React.FC<Props> = ({
//   name,
//   birthdate,
//   gender,
//   img,
//   slug,
// }) => {
//   const href = `/adopciones/${slug}`;
//   return (
//     <div className="flex pt-20">
//       <div className="bg-yellow-50 w-full text-black h-64 shadow-md">
//         <Link href={href}>
//           <Polaroid src={img} alt={name} />
//         </Link>
//         <div className="ml-64 mt-2 mr-3">
//           <div className="text-2xl border-b-2 border-[#ff0000] mb-4">
//             <Link href={href}>{name}</Link>
//           </div>
//           <ul>
//             <li className="m-2">
//               <Gender gender={gender} />
//             </li>
//             <li className="m-2">
//               <Age birthdate={birthdate} />
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };
