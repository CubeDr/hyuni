import { Comment as CommentData } from '@/types/comment';
import { timestampToString } from '@/utils/time';
import Image from 'next/image';
import styles from './Comment.module.css';
import CommentControl from './CommentControl';
import { IoPersonCircleSharp } from "react-icons/io5";

interface Props {
  comment: CommentData;
}

function ProfileImage({ src }: { src: string | null }) {
  if (src == null) {
    return <IoPersonCircleSharp size={44} className={styles.Image} />
  }

  return <Image
    src={src}
    width={44}
    height={44}
    alt={'Profile image'}
    className={styles.Image} />;
}

export default function Comment({ comment }: Props) {
  return (
    <>
      <div className={styles.Comment}>
        <ProfileImage src={comment.member.profileImageUrl} />
        <div className={styles.Content}>
          <div className={styles.Metadata}>
            <span className={styles.UserName}>{comment.member.username}</span>
            <span className={styles.Timestamp}>{timestampToString(comment.timestamp)}</span>
          </div>
          <div className={styles.Comment}>{comment.comment}</div>
          <CommentControl userId={comment.member.id} postId={comment.postId} commentId={comment.id} />
        </div>
      </div>
      <div className={styles.Divider} />
    </>
  );
}