import React from 'react';
import clsx from 'clsx';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuToolBar from '../toolbar/MenuToolBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    list: {
      width: 250,
    },
  }),
);

const drawerItems = [
  { section: [  
      {
        icon: "palette",
        text: "Editor",
        selected: true,
      },
      {
        icon: "auto_fix_high",
        text: "Design Creator",
        selected: false,
      },
      {
        icon: "folder_open",
        text: "My Designs",
        selected: false,
      },
      {
        icon: "folder_shared",
        text: "Shared Folders",
        selected: false,
      },
    ],
  },
  { section: [  
      {
        icon: "",
        text: "Settings",
        selected: false,
      },
      {
        icon: "",
        text: "Support",
        selected: false,
      },
    ],
  }
]

export default function AppNavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      getContentAnchorEl={null}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      getContentAnchorEl={null}

    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={2} color="secondary">
            <span className="material-icons">
              notifications
            </span>
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <span className="material-icons">
            account_circle
          </span>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  //Drawer
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
  
    setDrawerOpen(open);
  };
  
  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {drawerItems.map((sections, index) => (
          <React.Fragment key={index}>
            {sections.section.map((item) => (
              <ListItem button key={item.text} selected={item.selected} >
                {item.icon && <ListItemIcon>
                  <span className="material-icons">
                    {item.icon}
                  </span>
                </ListItemIcon>}
                <ListItemText primary={item.text} />
              </ListItem>
              
            ))}
          {index + 1 < sections.section.length && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <div className={classes.grow}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <span className="material-icons">
                menu
              </span>
            </IconButton>
            {/* <Typography className={classes.title} variant="h6" noWrap>
              Embroidery
            </Typography> */}
            <MenuToolBar />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={2} color="secondary">
                  <span className="material-icons">
                    notifications
                  </span>
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <span className="material-icons">
                  account_circle
                </span>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <span className="material-icons">
                  more_vert
                </span>
              </IconButton>
            </div>
          </Toolbar>
          
        </AppBar>
        <SwipeableDrawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </div>
  );
}
