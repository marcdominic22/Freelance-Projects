import { Box, Stack, Typography } from '@mui/material';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartTooltip } from 'recharts';
import AutoRefreshingCard from '../common/AutoRefreshingCard';
import type { TeamPerformance } from '../../types/dashboard';

interface ProgressOverviewProps {
  data?: TeamPerformance;
  isLoading?: boolean;
  onRefresh?: () => void;
}

const COLORS = ['#16a34a', '#f59e0b', '#ef4444'];

const ProgressOverview = ({ data, isLoading, onRefresh }: ProgressOverviewProps) => {
  const picked = data?.totalPackagesPicked ?? 0;
  const target = data?.targetPackages ?? 0;
  const remaining = Math.max(target - picked, 0);
  const chartData = [
    { name: 'Picked', value: picked },
    { name: 'Remaining', value: remaining },
    { name: 'Pending Orders', value: data?.pendingOrders ?? 0 }
  ];

  return (
    <AutoRefreshingCard title="Progress Overview" onRefresh={onRefresh} isLoading={isLoading}>
      {data ? (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
          <Box sx={{ width: { xs: '100%', md: '50%' }, height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                  {chartData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartTooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#f9fafb'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Stack spacing={2} sx={{ width: { xs: '100%', md: '50%' } }}>
            <Metric label="Picked" value={picked} color="primary.main" />
            <Metric label="Remaining" value={remaining} color="warning.main" />
            <Metric label="Pending Orders" value={data.pendingOrders} color="error.main" />
            <Metric label="Shipped Today" value={data.shippedToday} color="secondary.main" />
          </Stack>
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Waiting for progress data
        </Typography>
      )}
    </AutoRefreshingCard>
  );
};

interface MetricProps {
  label: string;
  value: number;
  color: string;
}

const Metric = ({ label, value, color }: MetricProps) => (
  <Box>
    <Typography variant="subtitle2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="h5" fontWeight={700} color={color}>
      {value.toLocaleString()}
    </Typography>
  </Box>
);

export default ProgressOverview;
