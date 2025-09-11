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
  const { data, loading } = useQuery<GetAllRestaurantsQuery>(GET_ALL_RESTAURANTS_QUERY);
  const [selectedRestaurant, setSelectedRestaurant] = useState(formData.restaurantId || undefined);

  const handleSetRestaurant = () => {
    if (selectedRestaurant) {
      setFormData({ restaurantId: selectedRestaurant })
      onClick();
    }

  }

  useEffect(() => {
    if (!selectedRestaurant) {
      setSelectedRestaurant(data?.getAllRestaurants[0]._id)
    }
  }, [data])

  if (loading) return <Typography>Loading...</Typography>;



  return (
    <>
      {data && (
        <>
          <Typography>Please choose a restaurant</Typography>

          <FormControl fullWidth>
            <InputLabel id="restaurant-label">Restaurant</InputLabel>
            <Select
              labelId="restaurant-label"
              value={selectedRestaurant || data.getAllRestaurants[0]._id}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
            >
              {data.getAllRestaurants.map((restaurant) => (
                <MenuItem key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            onClick={handleSetRestaurant}
            variant="contained"
            fullWidth
          >
            Next
          </Button>
        </>
      )}
    </>
  );
};

export default RestaurantSelect;