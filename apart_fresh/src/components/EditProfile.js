import React,{useState,useEffect} from 'react'
import { TextField,Container,Box, Button } from '@mui/material'
import swal from 'sweetalert';
import { getUser,updateprofile } from '../config/MyService';
import { useNavigate } from 'react-router-dom';


export default function EditProfile() {
    const navigate=useNavigate();
    const [firstname, setFname] = useState('');
    const [lastname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(null);
    const [address1, setAddress1] = useState(null);
    const [address2, setAddress2] = useState(null);
    const [pincode, setPincode] = useState(null);
  
  
    useEffect(()=>{
        const a=JSON.parse(localStorage.getItem('user'))
        getUser(a.email)
        .then((res)=>{
            console.log(res.data.user[0].email)
            setFname(res.data.user[0].firstname)
            setLname(res.data.user[0].lastname)
            setEmail(res.data.user[0].email)
            setPhone(res.data.user[0].phone)
            setAddress1(res.data.user[0].address[0].address1)
            setAddress2(res.data.user[0].address[0].address2)
            setPincode(res.data.user[0].address[0].pincode)
        })
    },[])
   const handlesubmit=()=>{
    const a=JSON.parse(localStorage.getItem('user'))
       let data={firstname,lastname,email,phone,pincode,address1,address2};
       updateprofile(data,a.email)
       .then((res)=>{
           if(res.data.err){
               swal(res.data.msg)
           }else{
            swal(res.data.msg)
            navigate('/myprofile')
           }
       })
   }
  return (
    <Container>
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
              value={firstname}
              placeholder='Enter First name'
              onChange={e=>setFname(e.target.value)}
           
          />
          <TextField
              required
              id="lname"
              name="lname"
              value={lastname}
              placeholder='Enter Last name'
              onChange={e=>setLname(e.target.value)}
            
          />

      </div>
      <div>
          <TextField
              type='email'
              required
              name='email'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              
          />
          <TextField
              required
              type='tel'
              id="phone"
              value={phone}
              name="phone"
              placeholder='Enter Phone number'
              onChange={e=>setPhone(e.target.value)}
           
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
             
          />
          <TextField
              required
              id="address2"
              name="address2"
              placeholder='Enter Address Line 2'
              value={address2}
              onChange={e=>setAddress2(e.target.value)}
          />
          <TextField
              required
              id="pincode"
              name="pincode"
              value={pincode}
              placeholder='Enter Pincode'
              onChange={e=>setPincode(e.target.value)}
          />
      </div>
      <div>
          <Button variant='contained' onClick={handlesubmit}>Edit Profile</Button>
      </div>

          </Box>
          </Container>
  )
}
