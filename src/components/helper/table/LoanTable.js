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

const createRowData = (amount, apr, id, owner_id, status, term, userId, loanOwnerName) => {
  let selfOwned;

  if (owner_id === userId) {
    selfOwned = 'Yes';
  }
  else {
    selfOwned = `Shared with ${loanOwnerName}`;
  }

  return { amount, apr, term, status, id, selfOwned };
}

const defaultValues = [{
  amount: 0,
  apr: 0,
  id: 0,
  owner_id: 0,
  status: 'inactive',
  term: 0
}];

const LoanTable = ({ values=defaultValues, userIds, userId }) => {

  const [tableValues, setTableValues] = useState(values)

  useEffect(() => {
    const formattedData = values.map((userValue) => {
      return createRowData(userValue.amount, userValue.apr, userValue.id, userValue.owner_id, userValue.status, userValue.term, userId, userIds[userValue.owner_id-1].label)
    })

    setTableValues(formattedData)
  }, [userId])

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#E3F6E8', borderColor: '#1F3425' }}>
      <Table sx={{ minWidth: 650}} aria-label="loan-table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Loan Amount ($)</TableCell>
            <TableCell align="right">APR</TableCell>
            <TableCell align="right">Term Number</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Loan ID</TableCell>
            <TableCell align="right">Owned by Self?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableValues.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.apr}</TableCell>
              <TableCell align="right">{row.term}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.selfOwned}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LoanTable