import React ,{useState,useEffect}from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Avatar, ButtonGroup} from '@mui/material';
import {getUser} from '../config/MyService';
import swal from 'sweetalert';
import axios from 'axios';
import { URL } from '../config/url';
// import { updatepic } from '../config/MyService';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RoomIcon from '@mui/icons-material/Room';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';


const Input = styled('input')({
  display: 'none',
});

export default function MyAccoun() {
  const [pic,setPic]=useState()
  const navigate=useNavigate();

  useEffect(()=>{
    let a=JSON.parse(localStorage.getItem('user'))
  getUser(a.email)
  .then(res=>{
    setPic(res.data.user[0].profile)
    console.log(res.data.user[0].profile)
  })
  },[])
  const handleupload=()=>{
    let a=JSON.parse(localStorage.getItem('user'))
    let formData = new FormData();
    formData.append("file", pic);
    console.log(pic)
    axios.post(`${URL}user/uploadlogo/${a.email}`,formData,{
      headers:{
      'Content-Type': 'multipart/form-data'}})
   
    .then(res=>{
      if(res.data.err){
        swal(res.data.err)
      }else{
        swal(res.data.msg)
      }
    })
  }
  const handleprofile=()=>{
    navigate('/myprofile')

  }
  const handleAddress=()=>{
    navigate('/addaddress')
  }
  const handleChange=()=>{
    navigate('/changepassword')
  }
  const handleEdit=()=>{
    navigate('/editprofile')

  }
  return (
    <div>
      <h1 sx={{mt:20,ml:5}}>My Account</h1>
      <Avatar
        alt="Remy Sharp"
        src={pic?`${URL}user/${pic}`:''}
        sx={{ width: "156px", height: "100px" ,ml:"30%"}}
      >
        <form method="post"  encType="multipart/form-data">
        <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file"  name="myfile" 
        onChange={(e)=>setPic(e.target.files[0])} />
        <Button variant="text" component="span"  onClick={handleupload}>
           <PhotoCamera/>
          </Button>
      </label>
      </form>
      </Avatar>

       <ButtonGroup orientation='vertical'>
      <Button variant='text'  sx={{justifyContent:"left",textAlign:"justify"}}onClick={handleprofile}><AccountCircleIcon/>My Profile</Button>
      <Button variant='text' sx={{justifyContent:"left",textAlign:"justify"}} onClick={handleEdit}><EditIcon/>Edit Profile</Button>
      <Button variant='text'  sx={{justifyContent:"left",textAlign:"justify"}} onClick={handleChange}><RoomIcon/>Change password</Button>
      <Button variant='text'  sx={{justifyContent:"left",textAlign:"justify"}} onClick={handleAddress}><AddCircleIcon/>Add Adress</Button>
      <Button variant='text'  sx={{justifyContent:"left",textAlign:"justify"}} href='/order'><AddCircleIcon/>My Order</Button>
      
      </ButtonGroup>

    </div>
  )
}
