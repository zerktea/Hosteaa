import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../slice/userSlice';
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import '../Styles/Header.css';

//Defining styling
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #011627;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;


const theme = createTheme({
  palette: {
    header: {
      menu:'#FDFFFC',
      main: '#011627',
      light: '#FF9F1C',
      dark: '#E71D36',
      contrastText: '#2EC4B6',
    },
  },
});

const Search = styled("div")(({ theme }) => ({
  bordercolor: theme.palette.header.main,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.header.main, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.header.main, 0.10),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "theme.palette.header.main",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "35ch",
    },
  },
}));
//End of styling

export default function Header({ onLogout }) {
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  useEffect(() => {
    // Update local state when Redux state changes
    setAnchorEl(null);
  }, [user]);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1}} className="header fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50" >
      <AppBar position="static" sx={{bgcolor:  'header.menu',color: 'inherit', boxShadow: '0px 0.5px 0px 0px rgba(0,0,0,0.08)'}} >
        <Toolbar sx={{justifyContent: 'space-between'}} >
          <IconButton
            size="medium"
            edge="start"
            color='header.main'
            aria-label="menu"
            sx={{ mr: 2 }}
            float="left"
          >
            <StyledLink  to="/">LOGO</StyledLink>
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          
          {user ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt={user.name} src={`http://localhost:5000/${user.profilePic}`} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                  <MenuItem onClick={handleClose}><StyledLink to="/profile" >Profile</StyledLink></MenuItem>
                  <MenuItem onClick={() => {handleClose();}}> <StyledLink to="/login" onClick={onLogout}  >
                  Logout
                </StyledLink></MenuItem>
              </Menu>
            </div>
          ) : (
            <StyledLink to="/login">Login</StyledLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
}