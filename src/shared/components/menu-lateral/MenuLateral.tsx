
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  useTheme,
  ListItemText,
  Icon,
  useMediaQuery
} from '@mui/material';

import Perfil from '../../../assets/avatar-railson.jpg';
import { ReactNode } from 'react';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom';

interface IListItemProps {
  icon: string;
  to: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const hanldeClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={hanldeClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>

          <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
            <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12) }} src={Perfil} alt='Railson de Carvalho' />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component='nav'>
              {drawerOptions.map(drawerOption => (
                <ListItemLink
                  to={drawerOption.path}
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component='nav'>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary='Alternar tema' />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box></>
  );
};

