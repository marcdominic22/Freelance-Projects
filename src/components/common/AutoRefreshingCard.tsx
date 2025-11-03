import { Card, CardContent, CardHeader, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import type { ReactNode } from 'react';

interface AutoRefreshingCardProps {
  title: string;
  actionLabel?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
  subheader?: ReactNode;
  children: ReactNode;
}

const AutoRefreshingCard = ({
  title,
  actionLabel = 'Refresh data',
  isLoading,
  onRefresh,
  subheader,
  children
}: AutoRefreshingCardProps) => (
  <Card elevation={0} sx={{ height: '100%' }}>
    <CardHeader
      title={<Typography variant="h6">{title}</Typography>}
      subheader={typeof subheader === 'string' ? <Typography variant="body2">{subheader}</Typography> : subheader}
      action=
        {onRefresh ? (
          <Tooltip title={actionLabel}>
            <span>
              <IconButton aria-label={actionLabel} onClick={onRefresh} disabled={isLoading} color="inherit">
                {isLoading ? <CircularProgress size={20} /> : <RefreshIcon />}
              </IconButton>
            </span>
          </Tooltip>
        ) : undefined}
    />
    <CardContent>{children}</CardContent>
  </Card>
);

export default AutoRefreshingCard;
