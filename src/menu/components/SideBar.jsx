import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const SideBar = ({ drawerWidth = 240 }) => {

 const navigate = useNavigate();
  
  const navegar = (url) => {
   console.log('click')
    navigate(url);
  }

  const MenuItems = [
        {Menu : 'Usuarios',
         Url  : '/menu'}

  ]

  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='permanent' // temporary
            open
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    IONIX
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    MenuItems.map( text => (
                        <ListItem key={ text.Menu } onClick={()=> navegar(text.Url)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={ text.Menu }/>                                   
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}
