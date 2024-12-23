export type Role = 'owner' | 'member' | 'visitor';

export interface Member {
  id: string;
  profileImageUrl: string | null;
  username: string | null;

  role: Role;

  joinTimestamp: number;
}
