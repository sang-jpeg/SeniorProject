import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard,
  People,
  Assignment,
  BugReport,
  Payment,
  Person,
  Settings,
  ExitToApp,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
          { text: 'Users', icon: <People />, path: '/admin/users' },
          { text: 'Certifications', icon: <Assignment />, path: '/admin/certifications' },
          { text: 'Payments', icon: <Payment />, path: '/admin/payments' },
        ];
      case 'tester':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/tester' },
          { text: 'Certifications', icon: <Assignment />, path: '/tester/certifications' },
          { text: 'Test Cycles', icon: <Assignment />, path: '/tester/test-cycles' },
          { text: 'Issues', icon: <BugReport />, path: '/tester/issues' },
          { text: 'Earnings', icon: <Payment />, path: '/tester/earnings' },
        ];
      case 'client':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/client' },
          { text: 'Projects', icon: <Assignment />, path: '/client/projects' },
          { text: 'Test Cases', icon: <Assignment />, path: '/client/test-cases' },
          { text: 'Reports', icon: <Assignment />, path: '/client/reports' },
        ];
      default:
        return [];
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: (theme) =>
              theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            QA Testing Platform
          </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="account menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate('/profile')}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => navigate('/settings')}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
            ...{
              width: drawerWidth,
              transition: (theme) =>
                theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              overflowX: 'hidden',
            },
          }),
          ...(!open && {
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            overflowX: 'hidden',
            width: (theme) => theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
              width: (theme) => theme.spacing(9),
            },
          }),
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {getMenuItems().map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout; 