import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate ,Link} from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { getCart } from '../../config/MyService';
import {useDispatch,useSelector} from 'react-redux'
import { Badge } from '@mui/material';


export default function Header1() {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const cartCount = useSelector(state=>state.cartCount);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userdata=JSON.parse(localStorage.getItem('user'))
React.useEffect(()=>{
  let user=JSON.parse(localStorage.getItem('user'))
  if(user.email){
    getCart(user.email)
    .then(res=>{
      if(res.data.err){
        console.log(res.data.err);
      }
      else{
        dispatch({type:'cart',payload:res.data.cart.length})
      }
    })
    }
})
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu1=()=>{
    navigate('/cart')
  }

  const handleClose = () => {
    setAnchorEl(null);
  
  };
  const handleregister = () => {
      navigate('/register')
  }
  const handlesigne = () => {
      localStorage.clear();
      navigate('/login')
  }
  const handlelogin= () => {
        navigate('/login')
      setAnchorEl(null);
  }


 const handleProfile=()=>{
   navigate('myprofile')
 }
  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon/>
          </IconButton>
         <img src="./Capture.PNG" width="100px" alt="logo" height="50px" style={{borderRadius:"100px 100px 100px 100px"}}/>
          <Typography variant="h6"  sx={{ flexGrow: 1}}>
          <Link style={{padding:"4%",textDecoration:"none",color:"white"}} to="/dashboard">Home</Link>
          <Link style={{padding:"4%",textDecoration:"none",color:"white"}} to="/contact">Contact us</Link>
          <Link style={{padding:"4%",textDecoration:"none",color:"white"}} to="/about">About us</Link>
          </Typography>
          
            <div >
             
              <IconButton
                size="large"
                onClick={handleMenu1}
                color="inherit"
              >
                <ShoppingBagIcon><Badge>{cartCount}</Badge></ShoppingBagIcon>
              </IconButton>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {userdata? <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                 
                <MenuItem onClick={handleProfile} >Profile</MenuItem>
                <MenuItem onClick={handlesigne}>SignOut</MenuItem>
            
              </Menu>:
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                 
                <MenuItem onClick={handlelogin} >SignIn</MenuItem>
                <MenuItem onClick={handleregister}>SignUp</MenuItem>
            
              </Menu>
}
            </div>
   
        </Toolbar>
      </AppBar>
  
    </Box>
  );
}