import { Button, Card, CardContent, Chip, Stack, TextField, Typography } from '@mui/material';
import { type GetAllRestaurantsQuery, type SittingInput, type UpdateRestaurantMutation, type UpdateRestaurantMutationVariables, WeekDays } from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import TimeInput from './TimeInput';
import SittingsList from './SittingsList';
import SittingsEdit from './SittingsEdit';
import { useMutation } from '@apollo/client';
import { UPDATE_RESTAURANT_MUTATION } from '../../../../graphql/mutation/restaurant';
import ConfirmDialog from '../../../../components/Dialog';
import { GET_ALL_RESTAURANTS_QUERY } from '../../../../graphql/query/restaurant';

type RestaurantEditProps = {
  restaurant: GetAllRestaurantsQuery["getAllRestaurants"][number] | undefined;
}

const RestaurantEdit = ({ restaurant }: RestaurantEditProps) => {
  if (!restaurant) return <Typography>Loading...</Typography>
  const [edit, setEdit] = useState(false);

  const sittingsInput: SittingInput[] = restaurant.sittings.map(s => ({
    startTime: s.startTime,
    durationMinutes: s.durationMinutes,
  }));

  const [restaurantData, setRestaurantData] = useState<UpdateRestaurantMutationVariables>({
    restaurantId: restaurant._id,
    openingDays: restaurant.openingDays,
    sittings: sittingsInput,
  });

  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const [updateRestaurantMutation] = useMutation<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>(UPDATE_RESTAURANT_MUTATION, {
    refetchQueries: [
      { query: GET_ALL_RESTAURANTS_QUERY },
    ],
  }

  );

  useEffect(() => {
    console.log(restaurantData)
  }, [restaurantData])

  const toggleEdit = () => {
    setEdit(!edit);
  }

  const handleSave = () => {
    setShowSaveDialog(true);
  }

  const save = () => {
    updateRestaurantMutation({ variables: restaurantData });
    toggleEdit()
  }

  const updateRestaurantData = (data: Partial<UpdateRestaurantMutationVariables>) => {
    setRestaurantData(prev => {
      return { ...prev, ...data };
    });
  };

  const weekDayShortMap: Record<WeekDays, string> = {
    [WeekDays.Monday]: "Mon",
    [WeekDays.Tuesday]: "Tue",
    [WeekDays.Wednesday]: "Wed",
    [WeekDays.Thursday]: "Thu",
    [WeekDays.Friday]: "Fri",
    [WeekDays.Saturday]: "Sat",
    [WeekDays.Sunday]: "Sun",
  };

  const WEEKDAY_ORDER: WeekDays[] = [
    WeekDays.Monday,
    WeekDays.Tuesday,
    WeekDays.Wednesday,
    WeekDays.Thursday,
    WeekDays.Friday,
    WeekDays.Saturday,
    WeekDays.Sunday,
  ];
  return (
    <Card variant="outlined" sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={6} flexWrap="wrap">
            <Stack gap={2}>
              {edit ? (
                <>
                  <TextField
                    label="Name"
                    value={restaurantData?.name ?? restaurant.name}
                    onChange={(e) => updateRestaurantData({ name: e.target.value })}
                    sx={{ maxWidth: 200 }}
                  />
                  <TextField
                    label="Adress"
                    value={restaurantData?.adress ?? restaurant.adress}
                    onChange={(e) => updateRestaurantData({ adress: e.target.value })}
                    sx={{ maxWidth: 200 }}
                  />
                </>
              ) : (
                <>
                  <Typography variant='h6' fontWeight='bold'>{restaurant.name}</Typography>
                  <Typography>{restaurant.adress}</Typography>
                </>
              )}
            </Stack>

            <Stack gap={2} flex={1}>
              {edit ? (
                <>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <TimeInput
                      label="Opening Time"
                      value={restaurantData?.openingHours?.open ?? restaurant.openingHours.open}
                      onChange={(value) =>
                        updateRestaurantData({
                          openingHours: {
                            open: value,
                            close:
                              restaurantData.openingHours?.close ?? restaurant.openingHours.close,
                          },
                        })
                      }
                    />
                    <span>-</span>
                    <TimeInput
                      label="Closing Time"
                      value={restaurantData?.openingHours?.close ?? restaurant.openingHours.close}
                      onChange={(value) =>
                        updateRestaurantData({
                          openingHours: {
                            open: restaurantData.openingHours?.open ?? restaurant.openingHours.open,
                            close: value,
                          },
                        })
                      }
                    />
                  </Stack>

                  <Stack spacing={1} >
                    <Typography mr={0.5} fontWeight="bold">Days Open:</Typography>
                    <Stack direction={"row"}>
                      {WEEKDAY_ORDER.map((day) => {
                        const isSelected =
                          restaurantData?.openingDays?.includes(day) ??
                          restaurant.openingDays.includes(day);

                        return (
                          <Chip
                            key={day}
                            label={weekDayShortMap[day as WeekDays]}
                            clickable
                            variant={isSelected ? "filled" : "outlined"}
                            color={isSelected ? "primary" : "default"}
                            onClick={() => {
                              const currentDays = ([] as WeekDays[]).concat(
                                restaurantData.openingDays ?? []
                              );
                              if (isSelected) {
                                updateRestaurantData({
                                  openingDays: currentDays.filter((d) => d !== day),
                                });
                              } else {
                                updateRestaurantData({ openingDays: [...currentDays, day] });
                              }
                            }}
                            sx={{
                              minWidth: 40,
                              height: 40,
                              borderRadius: 0,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          />
                        );
                      })}
                    </Stack>
                  </Stack>
                </>
              ) : (
                <>
                  <Typography fontWeight='bold'>{`Opening Hours: ${restaurant.openingHours.open} - ${restaurant.openingHours.close}`}</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Typography mr={0.5} fontWeight='bold'>Opening Days:</Typography>
                    {restaurant.openingDays.map((day) => (
                      <Chip
                        key={day}
                        label={weekDayShortMap[day as WeekDays]}
                        variant="outlined"
                        sx={{
                          minWidth: 40,
                          height: 40,
                          borderRadius: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    ))}
                  </Stack>
                </>
              )}
            </Stack>


          </Stack>
          <Stack spacing={2} alignItems="flex-start" flexWrap="wrap" >
            <Typography fontWeight='bold'>Sittings:</Typography>
            {edit ?
              <SittingsEdit sittings={restaurantData.sittings as SittingInput[]}
                onChange={(newSittings) => updateRestaurantData({ sittings: newSittings })}
              />
              :
              <SittingsList sittings={restaurant.sittings} />}
          </Stack>
          <Stack direction="row" alignSelf="end" gap={1} sx={{ width: "max-content" }}>
            {edit && (
              <Button variant="outlined" onClick={handleSave} fullWidth>
                Save
              </Button>
            )}
            <Button variant="outlined" onClick={toggleEdit} fullWidth>
              {edit ? "Abort" : "Edit"}
            </Button>
          </Stack>

        </Stack>

      </CardContent>
      <ConfirmDialog open={showSaveDialog} setOpen={setShowSaveDialog} text="Are you sure you want to change this item?" onConfirm={save} onAbort={() => { }} />
    </Card>
  )
}

export default RestaurantEdit;