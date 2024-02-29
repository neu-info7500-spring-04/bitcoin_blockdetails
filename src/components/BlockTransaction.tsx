// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import { useEffect, useState } from "react";
import { getBitcoinTransactions } from "../service/BitcoinTranscationService";
import SingleTranscation from "./SingleTransaction";
import { formatDateTime } from "../helper/utils";
import { Button, IconButton, TablePagination } from "@material-ui/core";
import { Skeleton } from "@mui/material";

// ** Types Imports

export interface BitcoinTransactionInterface {
  block: {
    timestamp: {
      time: string;
    };
    height: number;
  };
  inputValue: number;
  input_value_usd: number;
  outputCount: number;
  inputCount: number;
  index: string;
  hash: string;
  feeValue: number;
  fee_value_usd: number;
  feeValueDecimal: string;
  minedValue: number;
  minedValueDecimal: string;
  outputValue: number;
  outputValueDecimal: string;
  txCoinbase: boolean;
  txLocktime: string;
  txSize: number;
  txVersion: number;
  txVsize: number;
  txWeight: number;
}

interface StatusObj {
  [key: string]: {
    color: any;
  };
}

const statusObj: StatusObj = {
  applied: { color: "info" },
  rejected: { color: "error" },
  current: { color: "primary" },
  resigned: { color: "warning" },
  professional: { color: "success" },
};

const DashboardTable = () => {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [transactions, setTransactions] = useState<
    BitcoinTransactionInterface[]
  >([]);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

  const [loading, setLoading] = useState<boolean>(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState<BitcoinTransactionInterface | null>(null);

  const handleHashClick = (transaction: BitcoinTransactionInterface) => {
    setSelectedTransaction(transaction);
  };

  const handleBackToTable = () => {
    setSelectedTransaction(null);
  };
  useEffect(() => {
    fetchData(offset);
  }, [offset]);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const bitcoinTransactions = await getBitcoinTransactions(page);
      if (transactions) {
        setTransactions((prevState) => [...prevState, ...bitcoinTransactions]);
      } else {
        setTransactions(bitcoinTransactions);
      }
      console.log("transcation", bitcoinTransactions);
    } catch (error) {
      // Handle error
    }
    setLoading(false);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {!loading && (
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setOffset((prevState) => prevState + 1);
          }}
          style={{ marginBottom: 20 }}
        >
          Load More
        </Button>
      )}
      {loading ? (
        <>
          {[1, 2, 3, 4, 5].map((index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width="100%"
              height={60}
              style={{ marginBottom: 5 }}
            />
          ))}
        </>
      ) : selectedTransaction ? (
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={handleBackToTable}
            style={{ marginBottom: 20 }}
          >
            Go Back
          </Button>

          <SingleTranscation data={selectedTransaction} />
        </div>
      ) : (
        transactions &&
        !loading && (
          <Card>
            <TableContainer>
              <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
                <TableHead>
                  <TableRow>
                    <TableCell>Hash</TableCell>
                    <TableCell>Amount Transacted</TableCell>
                    <TableCell>Date Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? transactions.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : transactions
                  ).map((row: BitcoinTransactionInterface) => (
                    <TableRow
                      hover
                      key={row.hash}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                      }}
                    >
                      <TableCell
                        sx={{
                          py: (theme) => `${theme.spacing(0.5)} !important`,
                          cursor: "pointer",
                        }}
                        onClick={() => handleHashClick(row)}
                      >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: "0.875rem !important",
                            }}
                          >
                            {row.hash}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          py: (theme) => `${theme.spacing(0.5)} !important`,
                        }}
                      >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              color: "black",
                              fontSize: "0.875rem !important",
                            }}
                          >
                            {row.inputValue}
                          </Typography>
                          <Typography variant="caption">
                            {row.input_value_usd.toFixed(2) + " (USD)"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {formatDateTime(row.block.timestamp.time)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={transactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )
      )}
    </>
  );
};

export default DashboardTable;
