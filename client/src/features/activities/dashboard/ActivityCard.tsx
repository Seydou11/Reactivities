import { AccessTime, Place } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";
import type { Activity } from "../../../lib/types";

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const isHost = false;
  const isGoing = false;
  const label = isHost ? "You are hosting" : "You are going";
  const isCancelled = false;
  const color = isHost ? "secondary" : isGoing ? "warning" : "default";

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CardHeader
          avatar={<Avatar sx={{ height: 80, width: 80 }} />}
          title={
            <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
              {activity.title}
            </Typography>
          }
          subheader={
            <>
              Hosted by <Link to={`/profiles/bob`}>Bob</Link>
            </>
          }
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mr: 3 }}>
          {(isHost || isGoing) && (
            <Chip label={label} color={color} sx={{ borderRadius: 2 }} />
          )}
          {isCancelled && (
            <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, px: 2 }}>
          <Box sx={{ display: "flex", flexGrow: 0, alignItems: "center" }}>
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2">{formatDate(activity.date)}</Typography>
          </Box>
          <Place sx={{ ml: 3, mr: 1 }} />
          <Typography variant="body2">{activity.venue}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            backgroundColor: "grey.100",
            py: 3,
            pl: 3,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Attendees go here
          </Typography>
        </Box>
      </CardContent>
      <CardContent sx={{ pdx: 2 }}>
        <Typography variant="body2">{activity.description}</Typography>
        <Button
          component={Link}
          to={`/activities/${activity.id}`}
          size="medium"
          variant="contained"
          sx={{ display: "flex", justifySelf: "self-end", borderRadius: 3 }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
