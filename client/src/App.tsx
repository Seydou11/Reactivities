import { Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => response.data)
      .then(data => setActivities(data));
  }, []);

  return (
    <>
      <Typography variant="h3">Reactities</Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
);
}

export default App;
