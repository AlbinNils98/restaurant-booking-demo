import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { GET_TABLES_QUERY } from '../../../../graphql/query/tables';
import { useMutation } from '@apollo/client';
import type { AddTableMutation, AddTableMutationVariables } from '../../../../generated/graphql';
import { useState } from 'react';
import { ADD_TABLE_MUTATION } from '../../../../graphql/mutation/table';
import ConfirmDialog from '../../../../components/Dialog';
import { useToast } from '../../../../context/Toast';

type TableItemCreateProps = {
  restaurantId: string;
  toggleCreate: () => void;
}

const TableItemCreate = ({ restaurantId, toggleCreate }: TableItemCreateProps) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const { showToast } = useToast();

  const [tableData, setTableData] = useState<AddTableMutationVariables>({
    restaurantId,
    name: '',
    seats: 1
  });


  const [errors, setErrors] = useState<{
    name?: string;
    seats?: string;
  }>({});

  const [addTableMutation] = useMutation<AddTableMutation, AddTableMutationVariables>(ADD_TABLE_MUTATION,
    {
      variables: tableData,
      refetchQueries: [
        { query: GET_TABLES_QUERY, variables: { restaurantId } },
      ],
      onCompleted: () => {
        showToast('Table added successfully', 'success');
        toggleCreate();
      }
    }
  );

  const updateTableData = (data: Partial<AddTableMutationVariables>) => {
    setTableData({
      ...tableData,
      ...data
    })
  };

  const handleSave = () => {
    const newErrors: typeof errors = {};

    if (!tableData.name) {
      newErrors.name = "Name is required";
    }

    if (tableData.seats < 1) {
      newErrors.seats = "Seats must be at least 1";
    }

    if (tableData.seats > 20) {
      newErrors.seats = "Seats cannot be more than 20";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setShowSaveDialog(true);
  }

  const save = () => {
    addTableMutation({ variables: tableData })
  };

  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: "grey.400",
        borderRadius: 1,
      }}
    >

      <Typography variant="h6" gutterBottom>
        Add Table
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Box>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Name"
              value={tableData.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={(e) => updateTableData({ name: e.target.value })}
            />
            <TextField
              label="Seats"
              value={tableData.seats}
              error={!!errors.seats}
              helperText={errors.seats}
              type='number'
              onChange={(e) => updateTableData({ seats: Number(e.target.value) })}
            />
          </Stack>
        </Box>
        <Stack direction="row" gap={1}>
          <Button variant='outlined' onClick={handleSave}>Save</Button>
          <Button variant='outlined' onClick={toggleCreate}>Abort</Button>

        </Stack>
      </Stack>
      <ConfirmDialog open={showSaveDialog} setOpen={setShowSaveDialog} text="Are you sure you want to make changes to this table?" onConfirm={save} onAbort={() => { }} />
    </Box>
  )
}

export default TableItemCreate;