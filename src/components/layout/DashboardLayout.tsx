import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated?: Date;
  children: ReactNode;
}

const DashboardLayout = ({ title, subtitle, lastUpdated, children }: DashboardLayoutProps) => (
  <Box sx={{ minHeight: '100vh', background: (theme) => theme.palette.background.default }}>
    <AppBar position="sticky" elevation={0} color="transparent" sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
        {lastUpdated && (
          <Typography variant="caption" color="text.secondary">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {children}
    </Container>
  </Box>
);

export default DashboardLayout;
