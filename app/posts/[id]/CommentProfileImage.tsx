import Image from 'next/image';
import { IoPersonCircleSharp } from 'react-icons/io5';

interface Props {
  src?: string | null;
  className?: string;
}

export default function ProfileImage({ src, className }: Props) {
  if (src == null) {
    return <IoPersonCircleSharp size={44} className={className} />
  }

  return (
    <Image
      src={src}
      width={44}
      height={44}
      alt={'Profile image'}
      className={className} />
  );
}