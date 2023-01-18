import { useState, FC } from "react";
import styled from "styled-components";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useAsyncDebounce,
  Row,
  TableInstance,
  UseGlobalFiltersInstanceProps,
  UsePaginationInstanceProps,
} from "react-table";

import { GithubRepoTable } from "../interfaces/GithubRepo";

const StyledTable = styled.div``;

// Inteface merging for custom option as per say in react-table types
interface useTableProps
  extends TableInstance,
    Partial<UsePaginationInstanceProps<{}>>,
    Partial<UseGlobalFiltersInstanceProps<{}>> {
  state: any;
  flatRows: TableInstance["flatRows"];
  rows: TableInstance["rows"];
  rowsById: TableInstance["rowsById"];
}

interface searchFilter {
  preGlobalFilteredRows: Row[];
  globalFilter: any;
  setGlobalFilter: (filterValue: any) => void;
}

const SearchFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: searchFilter) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
};

const Table: FC<GithubRepoTable> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    visibleColumns,
    state: { pageIndex, pageSize, globalFilter },
    // search filters
    preGlobalFilteredRows,
    setGlobalFilter,
    // pagination filters
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  }: useTableProps = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 } as any,
    },
    useGlobalFilter,
    usePagination
  );

  const isSearchReady = preGlobalFilteredRows && setGlobalFilter !== undefined;
  const isPaginationReady =
    gotoPage &&
    previousPage &&
    nextPage &&
    pageOptions &&
    pageCount &&
    setPageSize;

  return (
    <StyledTable>
      <table {...getTableProps()}>
        <thead>
          <tr>
            {isSearchReady ? (
              <th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: "left",
                }}
              >
                <SearchFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            ) : null}
          </tr>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page &&
            page.map((row, i) => {
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
      {isPaginationReady ? (
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </StyledTable>
  );
};

export default Table;
