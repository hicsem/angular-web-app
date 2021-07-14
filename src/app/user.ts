export interface IUsers {
    login: string;
    avatar_url: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    repos_url: string;
    type: string;
    site_admin: boolean;
  }


export interface IUser {
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  repos_url: string;
  type: string;
  site_admin: boolean;
  name: string,
  company: string,
  blog: string,
  location: string,
  email: string,
  hireable: boolean,
  bio: string,
  twitter_username: string,
  public_repos: number,
  public_gists: number,
  followers: number,
  following: number,
  created_at: string,
}
