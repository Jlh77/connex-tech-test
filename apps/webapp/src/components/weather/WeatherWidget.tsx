import { Grid } from '@mui/material';
import { useGetWeather } from '../../lib/api';
import { WeatherCard } from './WeatherCard';

export const WeatherWidget = () => {
  const { data } = useGetWeather();
  const locations = data?.data.data;

  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      {locations?.map((locationTemp) => (
        <Grid size={{ xs: 6, sm: 4, lg: 2 }} key={locationTemp.location}>
          <WeatherCard
            location={locationTemp.location ?? 'Loading...'}
            temp={locationTemp.temp ?? null}
          />
        </Grid>
      ))}
    </Grid>
  );
};
