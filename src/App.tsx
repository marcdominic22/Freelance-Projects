import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';
import DashboardLayout from './components/layout/DashboardLayout';
import TeamPerformanceCard from './components/performance/TeamPerformanceCard';
import IndividualLeaderboard from './components/performance/IndividualLeaderboard';
import ProgressOverview from './components/progress/ProgressOverview';
import { useDashboardData } from './hooks/useDashboardData';

const App = () => {
  const { data, error, isLoading, lastUpdated, refresh } = useDashboardData();

  return (
    <DashboardLayout
      title="Dura Fulfillment Dashboard"
      subtitle="Real-time performance of the fulfillment floor"
      lastUpdated={lastUpdated}
    >
      <Grid container spacing={3}>
        {error && (
          <Grid item xs={12}>
            <Alert severity="error" onClose={() => refresh()} sx={{ borderRadius: 2 }}>
              {error.message}
            </Alert>
          </Grid>
        )}

        <Grid item xs={12} md={6} lg={4}>
          <TeamPerformanceCard data={data?.team} isLoading={isLoading} onRefresh={refresh} />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <ProgressOverview data={data?.team} isLoading={isLoading} onRefresh={refresh} />
        </Grid>

        <Grid item xs={12} lg={4}>
          <IndividualLeaderboard employees={data?.employees} isLoading={isLoading} onRefresh={refresh} />
        </Grid>

        {isLoading && !data && !error && (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center" py={6}>
              <CircularProgress color="primary" sx={{ mr: 2 }} />
              <Typography variant="body1" color="text.secondary">
                Loading dashboard metrics…
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </DashboardLayout>
  );
};

export default App;
