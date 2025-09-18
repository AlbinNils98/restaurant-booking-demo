import { Box, Button, Chip, IconButton, Stack, TextField, Typography } from '@mui/material';
import type { RemoveTableMutation, RemoveTableMutationVariables, Table, UndoTableRemovalMutation, UndoTableRemovalMutationVariables, UpdateTableMutation, UpdateTableMutationVariables } from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { DeleteOutline, ErrorOutline, UndoOutlined } from '@mui/icons-material';
import ConfirmDialog from '../../../../components/Dialog';
import { useMutation } from '@apollo/client';
import { REMOVE_TABLE_MUTATION, UNDO_TABLE_REMOVAL_MUTATION, UPDATE_TABLE_MUTATION } from '../../../../graphql/mutation/table';
import { GET_TABLES_QUERY } from '../../../../graphql/query/tables';
import { useToast } from '../../../../context/Toast';

type TableItemEditProps = {
  table: Table;
}

const TableItemEdit = ({ table }: TableItemEditProps) => {
  const [edit, setEdit] = useState(false);
  const { showToast } = useToast();

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showUndoDialog, setShowUndoDialog] = useState(false);

  const [tableData, setTableData] = useState<UpdateTableMutationVariables>({
    tableId: table._id
  });

  const [errors, setErrors] = useState<{
    name?: string;
    seats?: string;
  }>({});

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const [updateTable] = useMutation<UpdateTableMutation, UpdateTableMutationVariables>(UPDATE_TABLE_MUTATION,
    {
      variables: { tableId: table._id },
      refetchQueries: [
        { query: GET_TABLES_QUERY, variables: { restaurantId: table.restaurantId } },
      ],
      onCompleted: () => {
        showToast('Table updated successfully', 'success');
        toggleEdit();
      }
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

  const [undoTableRemoval] = useMutation<UndoTableRemovalMutation, UndoTableRemovalMutationVariables>(UNDO_TABLE_REMOVAL_MUTATION,
    {
      variables: { tableId: table._id },
      refetchQueries: [
        { query: GET_TABLES_QUERY, variables: { restaurantId: table.restaurantId } },
      ],
    });

  useEffect(() => {
    if (!edit) {
      setTableData({ tableId: table._id });
      setErrors({});
    }
  }, [edit]);

  const updateTableData = (data: Partial<UpdateTableMutationVariables>) => {
    setTableData({
      ...tableData,
      ...data
    })
  };

  const handleSave = () => {
    const newErrors: typeof errors = {};
    if (tableData.name !== undefined) {
      if (!tableData.name) {
        newErrors.name = "Name is required";
      }
    }

    if (tableData.seats !== undefined && tableData.seats !== null) {
      if (tableData.seats < 1) {
        newErrors.seats = "Seats must be at least 1";
      }

      if (tableData.seats > 20) {
        newErrors.seats = "Seats cannot be more than 20";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setShowSaveDialog(true);
  }

  const save = () => {
    updateTable({ variables: tableData })
  };

  const remove = () => {
    removeTable();
  };

  const undo = () => {
    undoTableRemoval();
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
              <TextField
                label="Name"
                value={tableData.name ?? table.name}
                error={!!errors.name}
                helperText={errors.name}
                onChange={(e) => updateTableData({ name: e.target.value })}
              />
              <TextField
                label="Seats"
                value={tableData.seats ?? table.seats}
                error={!!errors.seats}
                helperText={errors.seats}
                type='number'
                onChange={(e) => updateTableData({ seats: Number(e.target.value) })} />
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
              {table.removalDate && <Chip color='error' icon={<ErrorOutline />} label={
                `To be removed ${new Date(table.removalDate).toLocaleDateString()}`} />}
            </Stack>
          }
        </Box>
        <Stack direction="row" gap={1}>
          {(!edit && table.removedAt) &&
            <IconButton onClick={() => setShowUndoDialog(true)}>
              <UndoOutlined />
            </IconButton>
          }
          {edit && <Button variant='outlined' onClick={handleSave}>Save</Button>}
          <Button variant='outlined' onClick={toggleEdit}>{edit ? "Abort" : "Edit"}</Button>
          {(!edit && !table.removedAt) &&
            <IconButton onClick={() => setShowRemoveDialog(true)}>
              <DeleteOutline color="error" />
            </IconButton>
          }
        </Stack>
      </Stack>
      <ConfirmDialog open={showSaveDialog} setOpen={setShowSaveDialog} text="Are you sure you want to make changes to this table?" onConfirm={save} onAbort={() => { }} />
      <ConfirmDialog open={showRemoveDialog} setOpen={setShowRemoveDialog} text="Are you sure you want to remove this table?" onConfirm={remove} onAbort={() => { }} />
      <ConfirmDialog open={showUndoDialog} setOpen={setShowUndoDialog} text="Are you sure you want to undo removal of this table?" onConfirm={undo} onAbort={() => { }} />


    </Box>
  )
}

export default TableItemEdit;