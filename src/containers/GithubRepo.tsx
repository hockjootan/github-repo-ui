import { useState, useEffect, useMemo } from "react";

import Table from "../components/GithubRepoTable";
import { getGithubRepo } from "../services/GithubRepoService";

import { GITHUB_REPO_TABLE_HEADER } from "../constants/GithubRepo";
import { GithubRepoData } from "../interfaces/GithubRepo";

const GithubRepo = () => {
  const [githubRepoData, setGithubRepoData] = useState<GithubRepoData[]>([]);

  const getGithubRepoData = async () => {
    const data = await getGithubRepo();
    setGithubRepoData(data);
  };

  useEffect(() => {
    getGithubRepoData();
  }, []);

  // columns and data need to be memoized - https://react-table-v7.tanstack.com/docs/api/useTable#table-options
  const columns = useMemo(() => GITHUB_REPO_TABLE_HEADER, []);
  const data = useMemo(
    () =>
      githubRepoData.map((repo) => {
        return {
          repoOwnerProfileUrl: repo.owner.avatar_url,
          ownerName: repo.owner.login,
          repoName: repo.name,
          repoUrl: repo.html_url,
          description: repo.description,
        };
      }),
    [githubRepoData]
  );

  return <Table columns={columns} data={data} />;
};

export default GithubRepo;
