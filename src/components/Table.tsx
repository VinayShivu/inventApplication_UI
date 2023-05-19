import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles: any = makeStyles({
  root: {
    backgroundColor: "#E2E8F0",
  },
});

export default function StickyHeadTable(props: any) {
  const navigate = useNavigate();
  const classes = useStyles();
  const { columnNames, rowData } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={classes.root}>
            <TableRow>
              {columnNames.map((column: any, index: number) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{
                    backgroundColor: "inherit",
                  }}
                >
                  <div className="font-bold">{column.label.toUpperCase()}</div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row: any) => {
              return (
                <TableRow hover role="checkbox">
                  {columnNames.map((column: any) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            navigate(`/vendordetails/${value}`);
                          }}
                        >
                          {column.id === "payables"
                            ? `Rs ${value}`
                            : `${value}`}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rowData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
