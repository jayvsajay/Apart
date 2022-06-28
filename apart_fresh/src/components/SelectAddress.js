import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../config/MyService';
import { Button, Card, FormControl, FormControlLabel,Radio, RadioGroup,} from '@mui/material'
// import swal from 'sweetalert';
// import StripeCheckout from "react-stripe-checkout";


export default function SelectAddress() {
  let [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();
    let [addr, setAddr] = useState('');
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem('user'));
        if(user!==null){
        getUser(user.email)
        .then(res=>{
            if(res.data.user){
              console.log(res.data.user[0].address)
                setAddresses(res.data.user[0].address)
            }
        })
    }
        else{
            alert("Login required")
        }
    },[]);
   
    const handleAddress = () =>{
    //  let token=JSON.parse(localStorage.getItem('token'))
       localStorage.setItem('address',JSON.stringify(addr));
       navigate('/checkout')
      //  console.log({token,product})
      //     checkout(token,product)
      //     .then(res=>{
      //       if(res.data.status===200){
      //         swal("Success! Check email for details",);
      //         navigate('/order')
      //       } else {
      //         swal("Something went wrong");
      //       }
      //       })
    }
    
   
    
   
  return (
    <div>
        <h1>SelectAddress</h1>

    
         
          {addresses.length>0 ? addresses.map((adr,ind)=>{
                    return(

                             <Card>
                               <FormControl>
                               <RadioGroup>
                            <FormControlLabel value={JSON.stringify(adr)} control={<Radio/>}
                             onChange={(e)=>setAddr(JSON.parse(e.target.value))}
                             label={`${adr.address1}  ${adr.address2}-${adr.pincode}  ${adr.State}  ${adr.Country}`}
                             />
                          </RadioGroup>

                        </FormControl>
                        </Card>
                       )
                                }):<p>No Addresses found<br/>
                                <Button variant='contained' href='/addaddress'>Add address</Button></p>}
          
          
    
        <Button variant='contained'  onClick={()=>handleAddress()}>Next</Button>


        {/* <StripeCheckout
            className="center"
            stripeKey="pk_test_51KWgHaSFtA7TiCtRFJeTPlFXOYDs0StwStpoVeIh40UCM8g7BXqaTdi9uttSoayNsua5FWH6XwoTyvQX1khjloq300nu0ZS3JD"
            token={handleAddress}
            amount={product.price * 100}
            name="Sample Book"
            billingAddress
            shippingAddress
          /> */}
        <Button variant='contained'sx={{m:4}} href='/addaddress'>AddAddress</Button>
    </div>
  )
}
