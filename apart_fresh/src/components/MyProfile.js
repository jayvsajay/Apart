import React,{useState,useEffect} from 'react'
import { TextField,Container,Box, Button, Grid } from '@mui/material'
import swal from 'sweetalert';
import {  getUser } from '../config/MyService';
import MyAccoun from './MyAccoun';

export default function MyProfile() {
    const [firstname, setFname] = useState('');
    const [lastname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(null);
    const [address1, setAddress1] = useState(null);
    const [address2, setAddress2] = useState(null);
    const [pincode, setPincode] = useState(null);
    const [Profile,setProfile]=useState([])
  
  
    useEffect(()=>{
        const a=JSON.parse(localStorage.getItem('user'))
        getUser(a.email)
        .then((res)=>{
            console.log(res.data.user[0])
            setProfile(res.data.user[0])
            setAddress1(res.data.user[0].address[0].address1)
            setAddress2(res.data.user[0].address[0].address2)
            setPincode(res.data.user[0].address[0].pincode)
        })
    },[])
   
  return (
    <Container>
        <Grid container direction="row">
            <Grid item md={4} xs={12}>
                <MyAccoun/>
            </Grid>
            <Grid item md={8}>
    <h1 style={{fontSize: '35px'}}>My Profile</h1>
  <Box
  component="form"
  sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
      m: 5,
      mb: 20,
      p: 4,
      border: '2px solid black',
      backgroundColor: 'lightgrey',
      color: 'white'
  }}
  noValidate
  autoComplete="off"
  >
      <div>
          <TextField
              required
              id="fname"
              name="fname"
              value={Profile.firstname}
              placeholder='Enter First name'
              onChange={e=>setFname(e.target.value)}
              disabled
          />
          <TextField
              required
              id="lname"
              name="lname"
              value={Profile.lastname}
              placeholder='Enter Last name'
              onChange={e=>setLname(e.target.value)}
              disabled
          />

      </div>
      <div>
          <TextField
              type='email'
              required
              value={Profile.email}
              disabled
          />
          <TextField
              required
              type='tel'
              id="phone"
              value={Profile.phone}
              name="phone"
              placeholder='Enter Phone number'
              onChange={e=>setPhone(e.target.value)}
              disabled
          />
      </div>

      <div>
          <TextField
              required
              id="address1"
              name="adress1"
              value={address1}
              placeholder='Enter Address line 1'
              onChange={e=>setAddress1(e.target.value)}
              disabled
          />
          <TextField
              required
              id="address2"
              value={address2}
              name="address2"
              placeholder='Enter Address Line 2'
              onChange={e=>setAddress2(e.target.value)}
              disabled
          />
          <TextField
              required
              id="pincode"
              name="pincode"
              value={pincode}
              placeholder='Enter Pincode'
              onChange={e=>setPincode(e.target.value)}
              disabled
          />
      </div>
      <div>
          <Button variant='contained' href='/editprofile'>Edit Profile</Button>
      </div>

          </Box>
          </Grid>
        </Grid>
          </Container>
  )
}
