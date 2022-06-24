import React, { useState } from 'react'
import swal from 'sweetalert';
import {TextField,Button, Box} from '@mui/material'
import { addaddress } from '../config/MyService'
export default function AddAddress() {
  const [address1,setAddress1]=useState();
  const [address2,setAddress2]=useState();
  const [State,setState]=useState();
  const [Country,setCountry]=useState();
  const [pincode,setPincode]=useState();
  const handleupdate=()=>{
    let a=JSON.parse(localStorage.getItem('user'));
    let data={address1:address1,address2:address2,State:State,Country:Country,pincode:pincode};
    addaddress(data,a.email)
    .then(res=>{
      if(res.data.err){
        swal(res.data.msg)
      }else{
        swal(res.data.msg)
      }
    })
  }
  return (
    <div>
      
      <h1>Added  address</h1>
      <Box
  component="form"
  sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
      m: 5,
      mb: 20,
      p: 4,
      border: '2px solid black',
      color: 'white'
  }}
  noValidate
  autoComplete="off"
  >
      <div>
                <TextField
                    required
                    id="address1"
                    label="Address line 1"
                    placeholder='Enter Address line 1'
                    onChange={e=>setAddress1(e.target.value)}
                />
                <TextField
                    required
                    id="address2"
                    label="Address line 2"
                    placeholder='Enter Address Line 2'
                    onChange={e=>setAddress2(e.target.value)}
                />
                <TextField
                    required
                    id="pincode"
                    label="Pincode"
                    name="pincode"
                    placeholder='Enter Pincode'
                    onChange={e=>setPincode(e.target.value)}
                />
            </div>
            <div>
                <TextField
                required
                type="text"
                label="State"
                name="State"
                onChange={e=>setState(e.target.value)}
                />
                  <TextField
                  required
                type="text"
                label="Country"
                name="Country"
                onChange={e=>setCountry(e.target.value)}
                />
            </div>
      <Button variant="contained" onClick={handleupdate}>Add address</Button>
      </Box>
    </div>
  )
}
