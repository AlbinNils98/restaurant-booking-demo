import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { GET_ALL_RESTAURANTS_QUERY } from '../../graphql/query/restaurant';
import type { GetAllRestaurantsQuery } from '../../generated/graphql';
import { useBooking } from '../../context/Booking';

type RestaurantSelectProps = {
  onClick: () => void;
}

const RestaurantSelect = ({ onClick }: RestaurantSelectProps) => {
  const { formData, setFormData } = useBooking();
  const { data, loading } = useQuery<GetAllRestaurantsQuery>(
    GET_ALL_RESTAURANTS_QUERY
  );
  const [selectedRestaurant, setSelectedRestaurant] = useState(
    formData.restaurantId || ""
  );

  const restaurants = data?.getAllRestaurants ?? [];

  useEffect(() => {
    if (!selectedRestaurant && restaurants.length > 0) {
      setSelectedRestaurant(restaurants[0]._id);
    }
  }, [restaurants]);

  if (loading) return <Typography>Loading...</Typography>;


  if (restaurants.length === 0) {
    return <Typography>No restaurants available</Typography>;
  }

  const handleSetRestaurant = () => {
    if (selectedRestaurant) {
      setFormData({ restaurantId: selectedRestaurant });
      onClick();
    }
  };

  return (
    <>
      <Typography>Please choose a restaurant</Typography>

      <FormControl fullWidth>
        <InputLabel id="restaurant-label">Restaurant</InputLabel>
        <Select
          labelId="restaurant-label"
          value={selectedRestaurant}
          onChange={(e) => setSelectedRestaurant(e.target.value)}
        >
          {restaurants.map((restaurant) => (
            <MenuItem key={restaurant._id} value={restaurant._id}>
              {restaurant.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button onClick={handleSetRestaurant} variant="contained" sx={{ width: 200 }}>
        Next
      </Button>
    </>
  );
};
export default RestaurantSelect;