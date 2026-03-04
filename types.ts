
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  active: boolean;
}

export interface UserProfile {
  name: string;
  bio: string;
  avatarUrl: string;
  theme: string;
}

export enum ThemeType {
  DEEP_SPACE = 'deep-space',
  AURORA = 'aurora',
  SUNSET = 'sunset',
  MINIMAL = 'minimal'
}
