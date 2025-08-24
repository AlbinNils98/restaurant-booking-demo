import { Card, CardContent, Divider, List, Typography } from '@mui/material';
import type { GetMenuQuery, MenuItem } from '../../generated/graphql';

type MenuDisplayProps = {
  menu: GetMenuQuery | undefined;
  RowComponent: React.ElementType<{ item: MenuItem }>;
};

export const MenuDisplay = ({ menu, RowComponent }: MenuDisplayProps) => {
  if (!menu) return null;

  return (
    <div style={{ marginTop: 24 }}>
      {menu.getMenu.map(
        (category) =>
          category.items.length > 0 && (
            <Card key={category.category} variant="outlined" style={{ marginBottom: 24 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {category.category}
                </Typography>
                <Divider style={{ marginBottom: 8 }} />
                <List>
                  {category.items.map((item) => (
                    <RowComponent key={item._id} item={item} />
                  ))}
                </List>
              </CardContent>
            </Card>
          )
      )}
    </div>
  );
};