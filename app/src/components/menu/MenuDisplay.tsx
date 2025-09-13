import { Card, CardContent, Divider, List, Typography } from '@mui/material';
import { CategoryName, type GetMenuQuery, type MenuItem } from '../../generated/graphql';

type MenuDisplayProps = {
  menu: GetMenuQuery | undefined;
  RowComponent: React.ElementType<{ item: MenuItem }>;
};

export const MenuDisplay = ({ menu, RowComponent }: MenuDisplayProps) => {
  if (!menu) return null;

  const categoryOrder = [
    CategoryName.Appetizers,
    CategoryName.Breakfast,
    CategoryName.Lunch,
    CategoryName.Dinner,
    CategoryName.Desserts,
    CategoryName.Drinks,
  ];

  const orderMap = Object.fromEntries(categoryOrder.map((c, i) => [c, i]));

  const sortedMenu = [...menu.getMenu].sort((a, b) => {
    const orderA = orderMap[a.category as CategoryName] ?? categoryOrder.length;
    const orderB = orderMap[b.category as CategoryName] ?? categoryOrder.length;
    return orderA - orderB;
  });

  return (
    <div style={{ marginTop: 24 }}>
      {sortedMenu.map(
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