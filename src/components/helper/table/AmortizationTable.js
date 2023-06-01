import { useEffect, useState }  from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material/';

const createRowData = (month, open_balance, total_payment, principal_payment, interest_payment, close_balance) => {
  open_balance = Math.round(open_balance * 100) / 100
  total_payment = Math.round(total_payment * 100) / 100
  principal_payment = Math.round(principal_payment * 100) / 100
  interest_payment = Math.round(interest_payment * 100) / 100
  close_balance = Math.round(close_balance * 100) / 100
  return { month, open_balance, total_payment, principal_payment, interest_payment, close_balance };
}

const defaultValues = [{
  month: 0,
  open_balance: 0,
  total_payment: 0,
  principal_payment: 0,
  interest_payment: 0,
  close_balance: 0
}];

const AmortizationTable = ({ values = defaultValues }) => {

  
  const [tableValues, setTableValues] = useState(values)

  useEffect(() => {
    const formattedData = values.map((userValue) => {
      return createRowData(userValue.month, userValue.open_balance, userValue.total_payment, userValue.principal_payment, userValue.interest_payment, userValue.close_balance)
    });

    setTableValues(formattedData);
  }, [values[0].month])

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#E3F6E8', borderColor: '#1F3425' }}>
      <Table sx={{ minWidth: 650}} aria-label="loan-table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Payment Month</TableCell>
            <TableCell align="right">Balance ($)</TableCell>
            <TableCell align="right">Total Payment ($)</TableCell>
            <TableCell align="right">Principal Payment ($)</TableCell>
            <TableCell align="right">Interest Payment ($)</TableCell>
            <TableCell align="right">Closed Balance ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableValues.map((row) => (
            <TableRow
              key={row.month}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.month}</TableCell>
              <TableCell align="right">{row.open_balance}</TableCell>
              <TableCell align="right">{row.total_payment}</TableCell>
              <TableCell align="right">{row.principal_payment}</TableCell>
              <TableCell align="right">{row.interest_payment}</TableCell>
              <TableCell align="right">{row.close_balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AmortizationTable