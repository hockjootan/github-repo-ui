import { FC } from "react";
import styled from "styled-components";
import { useTable, Column } from "react-table";

interface GithubRepoProps {
  repoOwnerProfileUrl: string;
  ownerName: string;
  repoName: string;
  repoUrl: string;
  description: string;
}

interface GithubRepoTableProps {
  columns: Column[];
  data: GithubRepoProps[];
}

const StyledTable = styled.div``;

const Table: FC<GithubRepoTableProps> = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <StyledTable>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </StyledTable>
  );
};

export default Table;
