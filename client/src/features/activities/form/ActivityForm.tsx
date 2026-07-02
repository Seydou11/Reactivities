import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { type z } from "zod";
import {
  activitySchema,
  type ActivitySchema,
} from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import Location from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {
  const { reset, control, handleSubmit } = useForm<
    z.input<typeof activitySchema>,
    unknown,
    ActivitySchema
  >({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (activity)
      reset({
        ...activity,
        location: {
          venue: activity.venue,
          city: activity.city,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
    const { location, ...reset } = data;
    const flattenedData = { ...reset, ...location };
    try {
      if (activity) {
        updateActivity.mutate(
          { ...activity, ...flattenedData },
          {
            onSuccess: () => {
              navigate(`/activities/${activity.id}`);
            },
          },
        );
      } else {
        createActivity.mutate(flattenedData, {
          onSuccess: (id) => {
            navigate(`/activities/${id}`);
          },
        });
      }
    } catch (error) {
      console.error("Error submitting activity:", error);
    }
  };

  if (isLoadingActivity) return <Typography>Loading Activity...</Typography>;

  return (
    <Paper style={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edit activity" : "Create Activity"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextInput label="Title" control={control} name="title" />
        <TextInput
          label="Description"
          control={control}
          name="description"
          multiline
          rows={3}
        />
        <Box sx={{ display: "flex", gap: 3 }}>
          <SelectInput
            items={categoryOptions}
            label="Category"
            control={control}
            name="category"
          />
          <DateTimeInput label="Date" control={control} name="date" />
        </Box>
        <Location
          control={control}
          label="Enter the location"
          name="location"
        />
        <Box sx={{ display: "flex", gap: 3, justifyContent: "flex-end" }}>
          <Button color="inherit">Cancel</Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            loading={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
