import { Button, ButtonBase, Chip, IconButton, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import type { MenuItem, RemoveMenuItemMutation, RemoveMenuItemMutationVariables, UpdateMenuItemMutation, UpdateMenuItemMutationVariables } from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_MENU_ITEM_MUTATION, UPDATE_MENU_ITEM_MUTATION } from '../../../../graphql/mutation/restaurant';
import { GET_MENU_QUERY } from '../../../../graphql/query/restaurant';
import { DeleteOutline } from '@mui/icons-material';
import ConfirmDialog from '../../../../components/Dialog';
import MenuItemRowView from '../../../../components/menu/MenuItemRowView';

type MenuItemRowProps = {
  item: MenuItem;
  restaurantId?: string;
}

const MenuItemRow = ({ item, restaurantId = "" }: MenuItemRowProps) => {
  const [menuItemData, setMenuItemData] = useState<UpdateMenuItemMutationVariables>({
    restaurantId,
    itemId: item._id,
    vegetarian: item.vegetarian,
  })
  const [edit, setEdit] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const [updateMenuItemMutation] = useMutation<UpdateMenuItemMutation, UpdateMenuItemMutationVariables>(UPDATE_MENU_ITEM_MUTATION, {
    onCompleted: () => {
      setEdit(false);
    },
    refetchQueries: [
      { query: GET_MENU_QUERY, variables: { restaurantId } },
    ],
  });

  const [removeMenuItemMutation] = useMutation<RemoveMenuItemMutation, RemoveMenuItemMutationVariables>(REMOVE_MENU_ITEM_MUTATION, {
    refetchQueries: [
      { query: GET_MENU_QUERY, variables: { restaurantId } },
    ],
  })

  useEffect(() => {
    if (!edit) {
      setMenuItemData({
        restaurantId,
        itemId: item._id,
        vegetarian: item.vegetarian
      });
    }
  }, [edit, item, restaurantId]);

  const updateMenuItemData = (data: Partial<typeof menuItemData>) => {
    setMenuItemData(prev => ({
      ...prev,
      ...data,
    }));
  };

  const handleEdit = () => {
    setEdit(!edit);
  }

  const handleSave = () => {
    setShowSaveDialog(true);
  }

  const handleDelete = () => {
    setShowDeleteDialog(true);
  }

  const saveItem = () => {
    updateMenuItemMutation({ variables: menuItemData })
  }

  const deleteItem = () => {
    removeMenuItemMutation({ variables: { restaurantId, itemId: item._id } });
  }

  return (
    <>
      {!edit ?
        <MenuItemRowView item={item} >
          <Stack direction="row" ml={2} spacing={1}>
            <Button variant='outlined' onClick={handleEdit}>Edit</Button>
            <IconButton onClick={handleDelete}>
              <DeleteOutline color="error" />
            </IconButton>
          </Stack>

        </MenuItemRowView>
        :
        <ListItem key={item._id}
          sx={{
            border: edit ? "1px solid" : "none",
            borderColor: edit ? "primary.main" : "transparent",
            borderRadius: 1,
            padding: edit ? 1 : 0.5,
          }}
        >
          <ListItemText
            primary={
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <TextField
                  label="Name"
                  variant='outlined'
                  size='small'
                  value={menuItemData.name ?? item.name}
                  onChange={(e) => updateMenuItemData({ name: e.target.value })}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

                  <ButtonBase onClick={() => updateMenuItemData({ vegetarian: !menuItemData.vegetarian })}>
                    <Chip
                      label="Vegetarian"
                      size="small"
                      color={menuItemData.vegetarian ? "success" : "error"}
                      variant="outlined"
                    />
                  </ButtonBase>

                  <TextField
                    label="Price (öre)"
                    value={menuItemData.price ?? item.price}
                    variant='outlined'
                    size='small'
                    onChange={(e) => updateMenuItemData({ price: Number(e.target.value) })}
                    sx={{ width: 90 }}
                  />

                </div>
              </div>
            }
            secondary={
              <TextField
                label="Description"
                value={menuItemData.description ?? item.description}
                onChange={(e) => updateMenuItemData({ description: e.target.value })}
                size="small"
                multiline
                sx={
                  { mt: 2 }
                }
                variant="outlined"
                fullWidth
              />
            }
            slotProps={{
              secondary: {
                component: "div",
              },
            }}

          />
          <Stack direction="column" ml={2} gap={1}>
            <Button variant='outlined' onClick={handleSave}>Save</Button>
            <Button variant='outlined' onClick={handleEdit}>Abort</Button>
          </Stack>


        </ListItem>}
      <ConfirmDialog open={showSaveDialog} setOpen={setShowSaveDialog} text="Are you sure you want to change this item?" onConfirm={saveItem} onAbort={() => { }} />
      <ConfirmDialog open={showDeleteDialog} setOpen={setShowDeleteDialog} text="Are you sure you want to delete this item from the menu?" onConfirm={deleteItem} onAbort={() => { }} />
    </>
  )
}

export default MenuItemRow;