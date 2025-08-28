import { ListItem, ListItemText, Chip, Typography, Box } from "@mui/material";
import type { MenuItem } from '../../generated/graphql';
import type React from 'react';

type MenuItemRowViewProps = {
  item: MenuItem;
  children?: React.ReactNode;

};

const MenuItemRowView = ({ item, children }: MenuItemRowViewProps) => (
  <ListItem
    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
  >
    <ListItemText
      primary={
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
          <Typography variant="body1">{item.name}</Typography>
        </Box>
      }
      secondary={
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      }
    />
    <Box display="flex" alignItems="center" gap={1}>
      {item.vegetarian && (
        <Chip label="Vegetarian" size="small" color="success" variant="outlined" />
      )}
      <Typography variant="body2" color="text.secondary">
        {(item.price / 100).toFixed(2)} kr
      </Typography>
    </Box>
    {children && children}
  </ListItem>
);

export default MenuItemRowView;