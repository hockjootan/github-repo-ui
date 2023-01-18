import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import Table from "../components/GithubRepoTable";
import { getGithubRepo } from "../services/GithubRepoService";

import { GITHUB_REPO_TABLE_HEADER } from "../constants/GithubRepo";
import { GithubRepoData } from "../interfaces/GithubRepo";

import GithubLogo from "../assets/images/github-mark-white.png";

const StyledContainer = styled.div`
  background-color: #0d1116;
  color: white;
  height: 100%;
  max-height: 100%;
  padding: 2.5% 5%;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    margin-left: 15px;
  }
`;

const StyledGithubLogo = styled.img`
  width: 50px;
  height: 50px;
`;

const StyledProfileImage = styled.img`
  border-radius: 25%;
  width: 50px;
  height: 50px;
`;

const StyledGithubLink = styled.a`
  color: #b2beb5;
`;

const GithubRepo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [githubRepoData, setGithubRepoData] = useState<GithubRepoData[]>([]);

  const getGithubRepoData = async () => {
    const data = await getGithubRepo();
    setGithubRepoData(data);
    setIsLoading(false);
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
          repoOwnerProfileUrl: (
            <StyledProfileImage
              src={repo.owner.avatar_url}
              alt="owner-avatar"
            />
          ),
          ownerName: repo.owner.login,
          repoName: repo.name,
          repoUrl: (
            <StyledGithubLink href={repo.html_url} target="_blank">
              {repo.html_url}
            </StyledGithubLink>
          ),
          description: repo.description,
        };
      }),
    [githubRepoData]
  );

  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <StyledGithubLogo src={GithubLogo} alt="github-logo" />
        <h3>Github Repositories by Richard Tan</h3>
      </StyledHeaderContainer>

      {!isLoading && <Table columns={columns} data={data} />}
    </StyledContainer>
  );
};

export default GithubRepo;
