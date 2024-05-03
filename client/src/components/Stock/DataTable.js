import React from 'react';
import { Table, TableBody, TableCell, TableRow, Paper } from '@mui/material';

function DataTable({ data }) {
    return (
        <Paper style={{ width: '100%', maxHeight: '400px', overflowY: 'auto', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Table>
                <TableBody>
                    {data.map((number, index) => (
                        <TableRow key={index} style={{ backgroundColor: index === 0 ? '#cc7a52' : 'rgba(255, 153, 102, 0.5)' }}>
                            <TableCell style={{ color: index === 0 ? '#fff' : '#333', fontWeight: 'bold', padding: '16px' }}>
                                {parseFloat(number.toFixed(2))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default DataTable;
