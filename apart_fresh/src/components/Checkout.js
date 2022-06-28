import { Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { checkout_order } from '../config/MyService';

export default function Checkout() {
    const navigate=useNavigate();
    const [cnumber,setcnumber]=useState(0);
    const carttotal=JSON.parse(localStorage.getItem('cart_total'))
    const checkout=()=>{
      if(cnumber.toString().length!==16){
        swal("Enter credit card number correctly")
     }
     else{
         let email = JSON.parse(localStorage.getItem('user')).email;
         let address = JSON.parse(localStorage.getItem('address'));
         let data = {email:email, address:address};
     checkout_order(data)
     .then(res=>{
         if(res.data.err){
             alert(res.data.err);
         }
         else{
         alert(res.data.msg);
         localStorage.removeItem('address');                 
         navigate('/dashboard');
         window.location.reload();
         }
     })
    }
    }
  return (
    <div>
        <Stack sx={{mt:20,ml:12,mr:10,textAlign:"justify"}}>
            <h2 >Checkout</h2>
            <TextField
            error={cnumber<=16}
            type="number"
            name="cnumber"
            required
            placeholder="Enter credit card number"
            onChange={(e)=>setcnumber(e.target.value)}/>
            <p>Order Total: ${carttotal}</p>
            <Button variant='contained' sx={{width:"120px"}} onClick={checkout}>Checkout</Button>
        </Stack>
    </div>
  )
}
