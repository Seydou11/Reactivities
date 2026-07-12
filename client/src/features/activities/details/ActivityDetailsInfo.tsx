import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useState } from "react";
import MapComponent from "../../../app/shared/components/MapComponent";
import type { Activity } from "../../../lib/types";
import { formatDate } from "../../../lib/util/util";

type Props = {
  activity: Activity;
};

export default function ActivityDetailsInfo({ activity }: Props) {
  const [mapOpen, setMapOpen] = useState(false);
  const location = [activity.venue, activity.city].filter(Boolean).join(", ");
  const rowSx = {
    display: "grid",
    gridTemplateColumns: "72px minmax(0, 1fr)",
    alignItems: "center",
    columnGap: 3,
    px: 2,
    py: 2,
  };

  return (
    <Paper sx={{ mb: 2, overflow: "hidden" }}>
      <Box sx={rowSx}>
        <Info color="info" fontSize="large" />
        <Typography>{activity.description}</Typography>
      </Box>
      <Divider />
      <Box sx={rowSx}>
        <CalendarToday color="info" fontSize="large" />
        <Typography>{formatDate(activity.date)}</Typography>
      </Box>
      <Divider />
      <Box sx={rowSx}>
        <Place color="info" fontSize="large" />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            minWidth: 0,
          }}
        >
          <Typography sx={{ minWidth: 0 }}>{location}</Typography>
          <Button onClick={() => setMapOpen(!mapOpen)} sx={{ flexShrink: 0, whiteSpace: 'nowrap', mx:2 }}>
            {mapOpen ? "Hide Map" : "Show Map"}
          </Button>
        </Box>
      </Box>
      {mapOpen && (
        <Box sx={{ height: 400, zIndex: 1000, width: "100%", display: 'block' }}>
          <MapComponent
            position={[activity.latitude, activity.longitude]}
            venue={activity.venue}
          />
        </Box>
      )}
    </Paper>
  );
}