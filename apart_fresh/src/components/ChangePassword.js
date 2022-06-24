import { Button, TextField} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { updatepassword } from '../config/MyService';
import swal from 'sweetalert';

export default function ChangePassword() {
  const [oldpassword,setPassword]=useState();
  const [newpassword,setNewpassword]=useState();
  const [confirmpassword,setCpassword]=useState();
  let a=JSON.parse(localStorage.getItem('user'))
  const handlechange=()=>{
    let data={password:newpassword,email:a.email,oldpassword:oldpassword};
    if(newpassword===confirmpassword){
      updatepassword(data)
      .then(res=>{
        if(res.data.err){
          swal(res.data.msg)
        }else{
          swal(res.data.msg)
        }
      })
    }else{
      swal("Password doesn't match")
    }
  }
  return (
    <div>
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
     <h1 style={{color:'black'}}>ChangePassword</h1>
      <div>
      
        <TextField 
        type="text"
        name="oldpassword"
        label="Old password"
        onChange={e=>setPassword(e.target.value)}
        />
      </div>
      <div>
        <TextField 
        type="text"
        name="newpassword"
        label="New password"
        onChange={e=>setNewpassword(e.target.value)}

        />
      </div>
      <div>
        <TextField 
        type="text"
        name="confirmpassword"
        label="Confirm password"
        onChange={e=>setCpassword(e.target.value)}
        
        />
      </div>
      <Button variant="contained" onClick={handlechange}>ChangePassword</Button>

      </Box>
    </div>
  )
}
