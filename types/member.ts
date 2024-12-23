export type Role = 'owner' | 'member' | 'visitor';

export interface Member {
  id: string;
  profileImageUrl: string;
  username: string;

  role: Role;

  joinTimestamp: number;
}
