import { Column } from "react-table";

export interface GithubRepoData {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    type: string;
  };
  html_url: string;
  description: string;
  url: string;
}

export interface GithubRepoTableData {
  repoOwnerProfileUrl: string;
  ownerName: string;
  repoName: string;
  repoUrl: string;
  description: string;
}

export interface GithubRepoTable {
  columns: Column[];
  data: GithubRepoTableData[];
}
