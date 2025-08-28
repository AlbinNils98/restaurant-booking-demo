import { Box, Button, ButtonBase, Chip, TextField } from '@mui/material';
import CategorySelect from './CategorySelect';
import { CategoryName, type AddMenuItemMutation, type AddMenuItemMutationVariables } from '../../../../generated/graphql';
import { ADD_MENU_ITEM_MUTATION } from '../../../../graphql/mutation/restaurant';
import { useEffect, useState } from 'react';
import { GET_MENU_QUERY } from '../../../../graphql/query/restaurant';
import { useMutation } from '@apollo/client';
import { useToast } from '../../../../context/Toast';
import ConfirmDialog from '../../../../components/Dialog';

type MenuItemAddProps = {
  restaurantId: string;
  toggleAddItem: () => void;
  addItem: boolean;
}

const MenuItemAdd = ({ restaurantId, toggleAddItem, addItem }: MenuItemAddProps) => {
  const { showToast } = useToast();

  const [newMenuItem, setNewMenuItem] = useState({
    restaurantId,
    categoryName: CategoryName.Appetizers,
    name: "",
    description: "",
    price: 0,
    vegetarian: false,
  });
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!addItem) {
      setNewMenuItem({
        restaurantId,
        categoryName: CategoryName.Appetizers,
        name: "",
        description: "",
        price: 0,
        vegetarian: false,
      });
    }
  }, [addItem])

  const [addMenuItemMutation] = useMutation<AddMenuItemMutation, AddMenuItemMutationVariables>(ADD_MENU_ITEM_MUTATION, {
    onCompleted: () => {
      toggleAddItem();
      showToast("Menu item added!", "success");
    },
    refetchQueries: [
      { query: GET_MENU_QUERY, variables: { restaurantId } },
    ],
  });

  const updateNewMenuItem = (data: Partial<typeof newMenuItem>) => {
    setNewMenuItem(prev => ({
      ...prev,
      ...data,
    }));
  };

  const handleAddMenuItem = () => {
    setShowDialog(true);
  };

  const addMenuItem = () => {
    addMenuItemMutation({
      variables: {
        ...newMenuItem
      }
    })
  }
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "primary.main",
        borderRadius: 1,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        mt: 2,
        mb: 2
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TextField
          label="Name"
          size="small"
          variant="outlined"
          value={newMenuItem.name}
          onChange={(e) => updateNewMenuItem({ name: e.target.value })}
        />
        <CategorySelect value={newMenuItem.categoryName} onChange={(category) => updateNewMenuItem({ categoryName: category })} />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <ButtonBase
            onClick={() => updateNewMenuItem({ vegetarian: !newMenuItem.vegetarian })}
          >
            <Chip
              label="Vegetarian"
              size="small"
              color={newMenuItem.vegetarian ? "success" : "error"}
              variant="outlined"
            />
          </ButtonBase>
          <TextField
            label="Price"
            size="small"
            variant="outlined"
            value={newMenuItem.price}
            onChange={(e) => updateNewMenuItem({ price: Number(e.target.value) })}
            sx={{ width: 80 }}
          />
        </Box>
      </Box>

      <TextField
        label="Description"
        multiline
        fullWidth
        size="small"
        variant="outlined"
        value={newMenuItem.description}
        onChange={(e) => updateNewMenuItem({ description: e.target.value })}
      />


      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant='outlined' onClick={handleAddMenuItem}>Save</Button>
        <Button variant='outlined' onClick={toggleAddItem}>Abort</Button>
      </Box>
      <ConfirmDialog open={showDialog} setOpen={setShowDialog} text="Are you sure you want to add this item to the menu?" onConfirm={addMenuItem} onAbort={() => { }} />

    </Box>
  )
}

export default MenuItemAdd;