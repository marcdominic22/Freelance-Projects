import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import AutoRefreshingCard from '../common/AutoRefreshingCard';
import type { TeamPerformance } from '../../types/dashboard';

interface TeamPerformanceCardProps {
  data?: TeamPerformance;
  isLoading?: boolean;
  onRefresh?: () => void;
}

const getProgressColor = (progress: number): 'success' | 'warning' | 'error' => {
  if (progress >= 1) return 'success';
  if (progress >= 0.75) return 'warning';
  return 'error';
};

const TeamPerformanceCard = ({ data, isLoading, onRefresh }: TeamPerformanceCardProps) => {
  const progress = data ? data.totalPackagesPicked / data.targetPackages : 0;
  const progressColor = getProgressColor(progress);

  return (
    <AutoRefreshingCard
      title="Team Performance"
      onRefresh={onRefresh}
      isLoading={isLoading}
      subheader={data ? `${data.totalPackagesPicked.toLocaleString()} / ${data.targetPackages.toLocaleString()} packages` : undefined}
    >
      {data ? (
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Progress toward daily goal
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min(progress * 100, 100)}
              sx={{
                height: 12,
                borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.08)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: (theme) => theme.palette[progressColor].main
                }
              }}
            />
          </Box>
          <Stack direction="row" spacing={4}>
            <Stat label="Packages Picked" value={data.totalPackagesPicked} />
            <Stat label="Pending Orders" value={data.pendingOrders} emphasize />
            <Stat label="Shipped Today" value={data.shippedToday} />
          </Stack>
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No data available
        </Typography>
      )}
    </AutoRefreshingCard>
  );
};

interface StatProps {
  label: string;
  value: number;
  emphasize?: boolean;
}

const Stat = ({ label, value, emphasize }: StatProps) => (
  <Box>
    <Typography variant="subtitle2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant={emphasize ? 'h4' : 'h5'} fontWeight={700} color={emphasize ? 'secondary.main' : 'inherit'}>
      {value.toLocaleString()}
    </Typography>
  </Box>
);

export default TeamPerformanceCard;
