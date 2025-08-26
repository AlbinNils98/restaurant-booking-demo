import { Box, Button, Chip, IconButton, Stack, TextField, Typography } from '@mui/material';
import type { RemoveTableMutation, RemoveTableMutationVariables, Table, UpdateTableMutation, UpdateTableMutationVariables } from '../../../../generated/graphql';
import { useState } from 'react';
import { DeleteOutline, UndoOutlined } from '@mui/icons-material';
import ConfirmDialog from '../../../../components/Dialog';
import { useMutation } from '@apollo/client';
import { REMOVE_TABLE_MUTATION, UPDATE_TABLE_MUTATION } from '../../../../graphql/mutation/table';
import { GET_TABLES_QUERY } from '../../../../graphql/query/tables';

type TableItemEditProps = {
  table: Table;
}

const TableItemEdit = ({ table }: TableItemEditProps) => {
  const [edit, setEdit] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const [tableData, setTableData] = useState<UpdateTableMutationVariables>({
    tableId: table._id
  });

  const [updateTable] = useMutation<UpdateTableMutation, UpdateTableMutationVariables>(UPDATE_TABLE_MUTATION,
    {
      variables: { tableId: table._id },
      refetchQueries: [
        { query: GET_TABLES_QUERY, variables: { restaurantId: table.restaurantId } },
      ],
    }
  );

  const [removeTable] = useMutation<RemoveTableMutation, RemoveTableMutationVariables>(REMOVE_TABLE_MUTATION,
    {
      variables: { tableId: table._id },
      refetchQueries: [
        { query: GET_TABLES_QUERY, variables: { restaurantId: table.restaurantId } },
      ],
    }

  );

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const updateTableData = (data: Partial<UpdateTableMutationVariables>) => {
    setTableData({
      ...tableData,
      ...data
    })
  };

  const handleSave = () => {
    setShowSaveDialog(true)
  };

  const handleRemove = () => {
    setShowRemoveDialog(true)
  };

  const save = () => {
    updateTable({ variables: tableData })
  };

  const remove = () => {
    removeTable();
  };

  return (
    <Box
      key={table._id}
      sx={{
        p: 2,
        border: 1,
        borderColor: "grey.400",
        borderRadius: 1,
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Box>
          {edit ?
            <Stack direction="row" spacing={2}>
              <TextField label="Name" value={tableData.name ?? table.name} onChange={(e) => updateTableData({ name: e.target.value })} />
              <TextField label="Seats" value={tableData.seats ?? table.seats} type='number' onChange={(e) => updateTableData({ seats: Number(e.target.value) })} />
            </Stack>
            :
            <Stack direction='row' alignItems='center' spacing={2}>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {table.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Seats: {table.seats}
                </Typography>
              </Box>
              {table.removedAt && <Chip color='error' label={`To be removed ${new Date(table.removedAt).toLocaleDateString()}`} />}
            </Stack>
          }
        </Box>
        <Stack direction="row" gap={1}>
          {(!edit && table.removedAt) && <IconButton>
            <UndoOutlined />
          </IconButton>}
          {edit && <Button variant='outlined' onClick={handleSave}>Save</Button>}
          <Button variant='outlined' onClick={toggleEdit}>{edit ? "Abort" : "Edit"}</Button>
          {(!edit && !table.removedAt) &&
            <IconButton onClick={handleRemove}>
              <DeleteOutline color="error" />
            </IconButton>}
        </Stack>
      </Stack>
      <ConfirmDialog open={showSaveDialog} setOpen={setShowSaveDialog} text="Are you sure you want to make changes to this table?" onConfirm={save} onAbort={() => { }} />
      <ConfirmDialog open={showRemoveDialog} setOpen={setShowRemoveDialog} text="Are you sure you want to remove this table?" onConfirm={remove} onAbort={() => { }} />


    </Box>
  )
}

export default TableItemEdit;