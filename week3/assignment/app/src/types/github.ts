export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  followers: number;
  following: number;
}

export interface UserInfoState {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  data: GitHubUser | null;
} 