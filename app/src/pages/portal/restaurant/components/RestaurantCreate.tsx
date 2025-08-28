import { Button, Card, CardContent, Chip, Stack, TextField, Typography } from '@mui/material';
import SittingsEdit from './SittingsEdit';
import ConfirmDialog from '../../../../components/Dialog';
import { WeekDays, type AddRestaurantMutation, type AddRestaurantMutationVariables, type SittingInput } from '../../../../generated/graphql';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RESTAURANT_MUTATION } from '../../../../graphql/mutation/restaurant';
import { GET_ALL_RESTAURANTS_QUERY } from '../../../../graphql/query/restaurant';
import TimeInput from './TimeInput';

type RestaurantCreateProps = {
  toggleCreate: () => void;
}

const RestaurantCreate = ({ toggleCreate }: RestaurantCreateProps) => {
  const [restaurantData, setRestaurantData] = useState<AddRestaurantMutationVariables>({
    name: "",
    adress: "",
    openingHours: {
      open: "00:00",
      close: "00:00",
    },
    openingDays: [],
    sittings: [] as SittingInput[],
  });

  const [errors, setErrors] = useState<{
    name?: string;
    adress?: string;
    openingDays?: string;
    openingHours?: string;
    sittings?: string;
  }>({});

  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const [addRestaurantMutation] = useMutation<
    AddRestaurantMutation,
    AddRestaurantMutationVariables
  >(ADD_RESTAURANT_MUTATION, {
    variables: restaurantData,
    refetchQueries: [{ query: GET_ALL_RESTAURANTS_QUERY }],
  });

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

  const updateRestaurantData = (data: Partial<AddRestaurantMutationVariables>) => {
    setRestaurantData((prev) => ({ ...prev, ...data }));
  };

  const handleSave = () => {
    const newErrors: typeof errors = {};

    if (!restaurantData.name) newErrors.name = "Name is required";
    if (!restaurantData.adress) newErrors.adress = "Adress is required";
    if (restaurantData.openingDays.length === 0)
      newErrors.openingDays = "Select at least one opening day";

    const sittings = Array.isArray(restaurantData.sittings)
      ? restaurantData.sittings
      : [restaurantData.sittings];

    if (sittings.length === 0) newErrors.sittings = "Add at least one sitting";
    if (sittings.some((s) => !s.startTime || !s.durationMinutes || s.durationMinutes <= 0)) {
      newErrors.sittings = "All sittings must have start time and positive duration";
    }

    if (restaurantData.openingHours.open >= restaurantData.openingHours.close) {
      newErrors.openingHours = "Opening time must be before closing time";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setShowSaveDialog(true);
  };

  const save = () => {
    addRestaurantMutation();
    toggleCreate();
  };

  return (
    <Card variant="outlined" sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Add Restaurant
        </Typography>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={6} flexWrap="wrap">
            <Stack gap={2}>
              <TextField
                label="Name"
                value={restaurantData.name}
                onChange={(e) => updateRestaurantData({ name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
                sx={{ maxWidth: 200 }}
              />
              <TextField
                label="Adress"
                value={restaurantData.adress}
                onChange={(e) => updateRestaurantData({ adress: e.target.value })}
                error={!!errors.adress}
                helperText={errors.adress}
                sx={{ maxWidth: 200 }}
              />
            </Stack>

            <Stack gap={2} flex={1}>
              <Stack direction="row" spacing={2} alignItems="center">
                <TimeInput
                  label="Opening Time"
                  value={restaurantData.openingHours?.open ?? "00:00"}
                  onChange={(value) =>
                    updateRestaurantData({
                      openingHours: {
                        open: value,
                        close: restaurantData.openingHours?.close ?? "00:00",
                      },
                    })
                  }
                />
                <span>-</span>
                <TimeInput
                  label="Closing Time"
                  value={restaurantData.openingHours?.close ?? "00:00"}
                  onChange={(value) =>
                    updateRestaurantData({
                      openingHours: {
                        open: restaurantData.openingHours?.open ?? "00:00",
                        close: value,
                      },
                    })
                  }
                />
              </Stack>
              {errors.openingHours && (
                <Typography color="error" variant="body2">
                  {errors.openingHours}
                </Typography>
              )}

              <Stack spacing={1}>
                <Typography mr={0.5} fontWeight="bold">
                  Days Open:
                </Typography>
                <Stack direction={"row"}>
                  {WEEKDAY_ORDER.map((day) => {
                    const isSelected =
                      restaurantData?.openingDays?.includes(day) ?? false;

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
                            updateRestaurantData({
                              openingDays: [...currentDays, day],
                            });
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
                {errors.openingDays && (
                  <Typography color="error">{errors.openingDays}</Typography>
                )}
              </Stack>
            </Stack>
          </Stack>

          <Stack spacing={2} alignItems="flex-start" flexWrap="wrap">
            <Typography fontWeight="bold">Sittings:</Typography>
            <SittingsEdit
              sittings={restaurantData.sittings as SittingInput[] ?? []}
              onChange={(newSittings) => updateRestaurantData({ sittings: newSittings })}
            />
            {errors.sittings && <Typography color="error">{errors.sittings}</Typography>}
          </Stack>

          <Stack direction="row" alignSelf="end" gap={1} sx={{ width: "max-content" }}>
            <Button variant="outlined" onClick={handleSave} fullWidth>
              Save
            </Button>
            <Button variant="outlined" onClick={toggleCreate} fullWidth>
              Abort
            </Button>
          </Stack>
        </Stack>
      </CardContent>

      <ConfirmDialog
        open={showSaveDialog}
        setOpen={setShowSaveDialog}
        text="Are you sure you want to add this restaurant?"
        onConfirm={save}
        onAbort={() => { }}
      />
    </Card>
  );
};

export default RestaurantCreate;