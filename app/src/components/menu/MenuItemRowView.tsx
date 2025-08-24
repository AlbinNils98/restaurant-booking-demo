import { ListItem, ListItemText, Chip, Typography } from "@mui/material";
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span>{item.name}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

            {item.vegetarian && <Chip label="Vegetarian" size="small" color="success" variant="outlined" />}
            <Typography variant="body2" color="text.secondary">
              {(item.price / 100).toFixed(2)} kr
            </Typography>
          </div>
        </div>
      }
      secondary={item.description}
    />
    {children && children}

  </ListItem>
);

export default MenuItemRowView;