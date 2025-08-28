import { Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import type { GetTablesQuery, GetTablesQueryVariables } from '../../../../generated/graphql';
import { useLazyQuery } from '@apollo/client';
import { GET_TABLES_QUERY } from '../../../../graphql/query/tables';
import { useEffect, useState } from 'react';
import TableItemEdit from './TableItemEdit';
import TableItemCreate from './TableItemCreate';

type TableEditProps = {
  selectedRestaurant: string;
}

const TableEdit = ({ selectedRestaurant }: TableEditProps) => {
  const [create, setCreate] = useState(false);

  const [getTables, { data: tables }] = useLazyQuery<GetTablesQuery, GetTablesQueryVariables>(GET_TABLES_QUERY);

  useEffect(() => {
    if (selectedRestaurant) {
      getTables({ variables: { restaurantId: selectedRestaurant } });
    }
  }, [selectedRestaurant]);

  const toggleCreate = () => {
    setCreate(!create);
  }

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" gutterBottom>
            Tables
          </Typography>
          {!create && <Button variant='outlined' onClick={toggleCreate}>Add Table</Button>}
        </Stack>
        <Divider sx={{ mb: 2, mt: 2 }} />
        <Stack spacing={1}>
          {create && <TableItemCreate restaurantId={selectedRestaurant} toggleCreate={toggleCreate} />}
          {tables?.getTables.map((table) => (
            <TableItemEdit key={table._id} table={table} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TableEdit;