import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { GetAllRestaurantsQuery } from '../generated/graphql';
import type { Dispatch } from 'react';

type RestaurantSelectProps = {
  data?: GetAllRestaurantsQuery;
  selectedRestaurant: string;
  setSelectedRestaurant: Dispatch<React.SetStateAction<string>>
}

const RestaurantSelect = ({ data, selectedRestaurant, setSelectedRestaurant }: RestaurantSelectProps) => {

  return (
    <>
      {data && (
        <>
          <FormControl fullWidth>
            <InputLabel id="restaurant-label">Restaurant</InputLabel>
            <Select
              labelId="restaurant-label"
              value={selectedRestaurant || data.getAllRestaurants[0]._id}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              label="Restaurant"
            >
              {data.getAllRestaurants.map((restaurant) => (
                <MenuItem key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    </>
  )
}

export default RestaurantSelect;