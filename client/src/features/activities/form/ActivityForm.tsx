import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityForm() {
  const {id} = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (activity) {
      const updatedActivity = { ...activity, ...data, id: activity.id };
      await updateActivity.mutateAsync(updatedActivity as Activity);
      navigate(`/activities/${activity.id}`);
    } else {
      createActivity.mutate(data as unknown as Activity, {
        onSuccess: (id) => {
          navigate(`/activities/${id}`);
        }
      });
    }
  };

  if (isLoadingActivity) return (<Typography>Loading Activity...</Typography>);

  return (
    <Paper style={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? 'Edit activity' : 'Create Activity'}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField name="title" label="Title" defaultValue={activity?.title} />
        <TextField
          name="description"
          label="Description"
          defaultValue={activity?.description}
          multiline
          rows={3}
        />
        <TextField
          name="category"
          label="Category"
          defaultValue={activity?.category}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={activity?.date 
            ? new Date(activity.date).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0]
          }
        />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
        <Box sx={{ display: "flex", gap: 3, justifyContent: "flex-end" }}>
          <Button color="inherit">
            {" "}
            Cancel{" "}
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            loading={updateActivity.isPending || createActivity.isPending}
          >
            {" "}
            Submit{" "}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
