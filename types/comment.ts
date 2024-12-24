import { Member } from './member';

export interface Comment {
  comment: string;
  postId: string;
  timestamp: number;

  member: Member;

  id: string;
}
