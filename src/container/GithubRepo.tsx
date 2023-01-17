import { useMemo } from "react";
import Table from "../component/GithubRepoTable";

import { GITHUB_REPO_TABLE_HEADER } from "../constant/GithubRepo";

const GithubRepo = () => {
  // columns need to be memoized - https://react-table-v7.tanstack.com/docs/api/useTable#table-options
  const columns = useMemo(() => GITHUB_REPO_TABLE_HEADER, []);

  return <Table columns={columns} data={[]} />;
};

export default GithubRepo;
