import { Avatar, Box, Chip, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AutoRefreshingCard from '../common/AutoRefreshingCard';
import type { EmployeePerformance } from '../../types/dashboard';

interface IndividualLeaderboardProps {
  employees?: EmployeePerformance[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

const IndividualLeaderboard = ({ employees, isLoading, onRefresh }: IndividualLeaderboardProps) => {
  const sortedEmployees = employees?.slice().sort((a, b) => b.packagesPicked - a.packagesPicked) ?? [];

  return (
    <AutoRefreshingCard
      title="Individual Performance"
      onRefresh={onRefresh}
      isLoading={isLoading}
      subheader={sortedEmployees.length ? `${sortedEmployees.length} active pickers` : undefined}
    >
      {sortedEmployees.length ? (
        <List disablePadding>
          {sortedEmployees.map((employee, index) => (
            <ListItem key={employee.id} sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar src={employee.avatarUrl}>{employee.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body1" fontWeight={600}>
                      {employee.name}
                    </Typography>
                    {index < 3 && (
                      <Chip
                        icon={<EmojiEventsIcon fontSize="small" />}
                        label={index === 0 ? 'Top Picker' : `#${index + 1}`}
                        size="small"
                        color={index === 0 ? 'primary' : 'secondary'}
                      />
                    )}
                  </Stack>
                }
                secondary={`${employee.packagesPicked.toLocaleString()} packages picked`}
              />
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  {employee.packagesPicked.toLocaleString()}
                </Typography>
                {employee.targetPackages && (
                  <Typography variant="caption" color="text.secondary">
                    Goal: {employee.targetPackages.toLocaleString()}
                  </Typography>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No active pickers
        </Typography>
      )}
    </AutoRefreshingCard>
  );
};

export default IndividualLeaderboard;
