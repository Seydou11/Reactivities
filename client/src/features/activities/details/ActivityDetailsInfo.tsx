import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { formatDate } from "../../../lib/util/util";

type Props = {
    activity: Activity;
}

export default function ActivityDetailsInfo({activity}:Props) {
  return (
    <Paper sx={{ mb: 2 }}>
      <Grid container sx={{alignItems:"center", pl:2, py:1}}>
        <Grid sx={{xs:1, item:1}}>
          <Info color="info" fontSize="large" />
        </Grid>
        <Grid sx={{item:1, xs:11}}>
          <Typography>{activity.description}</Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container sx={{alignItems:"center", pl:2, py:1}}>
        <Grid sx={{item:1, xs:1}}>
          <CalendarToday color="info" fontSize="large" />
        </Grid>
        <Grid sx={{item:1, xs:11}}>
          <Typography>{formatDate(activity.date)}</Typography>
        </Grid>
      </Grid>
      <Divider />

      <Grid container sx={{alignItems:"center", pl:2, py:1}}>
        <Grid sx={{item:1, xs:1}}>
          <Place color="info" fontSize="large" />
        </Grid>
        <Grid sx={{item:1, xs:11}}>
          <Typography>{activity.venue}, {activity.city}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
