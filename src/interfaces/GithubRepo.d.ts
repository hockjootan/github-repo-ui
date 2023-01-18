import { ReactNode } from "react";
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
  repoOwnerProfileUrl: ReactNode;
  ownerName: string;
  repoName: string;
  repoUrl: ReactNode;
  description: string;
}

export interface GithubRepoTable {
  columns: Column[];
  data: GithubRepoTableData[];
}
