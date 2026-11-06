import { Box, Grid, Typography } from '@mui/material';
import { WeatherWidget } from '../components/weather/WeatherWidget';
import { CustomersList } from '../components/customers/CustomersList';
import { AgentsDailyReportTable } from '../components/reports/AgentsDailyReportTable';

export default function Dashboard() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
        ConnexAI Dashboard
      </Typography>

      <WeatherWidget />

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid
          size={{
            xs: 12,
            md: 4,
            lg: 2,
          }}
        >
          <CustomersList />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 8,
            lg: 10,
          }}
        >
          <AgentsDailyReportTable />
        </Grid>
      </Grid>
    </Box>
  );
}
