import { Box, Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_ALL_RESTAURANTS_QUERY } from '../../../graphql/query/restaurant'
import type { GetAllRestaurantsQuery, GetTablesQuery, GetTablesQueryVariables } from '../../../generated/graphql'
import RestaurantSelect from '../../../components/RestaurantSelect'
import { useEffect, useState } from 'react'
import { GET_TABLES_QUERY } from '../../../graphql/query/tables'
import RestaurantEdit from './components/RestaurantEdit'

const RestaurantPortalPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const { data: restaurants } = useQuery<GetAllRestaurantsQuery>(GET_ALL_RESTAURANTS_QUERY);
  const [getTables, { data: tables }] = useLazyQuery<GetTablesQuery, GetTablesQueryVariables>(GET_TABLES_QUERY);

  useEffect(() => {
    if (selectedRestaurant) {
      getTables({ variables: { restaurantId: selectedRestaurant } });
    } else if (restaurants && restaurants?.getAllRestaurants.length > 0) {
      getTables({ variables: { restaurantId: restaurants?.getAllRestaurants[0]._id } })
    }
  }, [selectedRestaurant, restaurants]);

  useEffect(() => {
    if (!selectedRestaurant && restaurants?.getAllRestaurants?.length) {
      setSelectedRestaurant(restaurants.getAllRestaurants[0]._id);
    }
  }, [restaurants, selectedRestaurant]);

  const restaurant = restaurants?.getAllRestaurants.find(
    (res) => res._id === selectedRestaurant
  );

  return (
    <Box>
      <RestaurantSelect data={restaurants} selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant} />
      <RestaurantEdit restaurant={restaurant} />
      <Card variant="outlined" style={{ marginBottom: 24 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tables
          </Typography>
          <Divider style={{ marginBottom: 8 }} />
          <List>
            {tables?.getTables.map((table) => (
              <ListItem key={table._id}>
                <ListItemText
                  primary={`Name: ${table.name}`}
                  secondary={`Seats: ${table.seats}`}
                />
              </ListItem>
            ))
            }
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

export default RestaurantPortalPage