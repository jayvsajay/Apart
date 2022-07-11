import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../config/MyService';
import axios from 'axios';
import { Button, Card, FormControl, FormControlLabel,Radio, RadioGroup,} from '@mui/material';
import swal from 'sweetalert';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'
export default function SelectAddress() {
  let [addresses, setAddresses] = useState([]);
  const [name,setName]=useState()
    const navigate = useNavigate();
    let [addr, setAddr] = useState(null);
    const [phone,setPhone]=useState();
    let email=JSON.parse(localStorage.getItem('user')).email;
    let carttotal=JSON.parse(localStorage.getItem('cart_total'))
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem('user'));
        if(user!==null){
        getUser(user.email)
        .then(res=>{
            if(res.data.user){
              console.log(res.data.user[0].address)
                setAddresses(res.data.user[0].address)
                setName(res.data.user[0].firstname)
                setPhone(res.data.user[0].phone)
            }
        })
    }
        else{
            alert("Login required")
        }
    },[]);

    async function displayRazorpay() {
      localStorage.setItem('address',JSON.stringify(addr));
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
  
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
      }
      if(addr===null){
        swal("Please select the address")
      }
      else{
      let details={email,addresses}
      const data = await axios.post(`http://localhost:3031/user/razorpay/${carttotal}`,details);
      console.log(details)
      const options = {
        key: __DEV__ ? 'rzp_test_UPbQhy9R6bG5of' : 'PRODUCTION_KEY',
        currency: data.data.currency,
        amount: data.data.amount,
        order_id: data.data.id,
        name: 'Donation',
        description: 'Thank you for Purchasing',
        handler: function (response) {
          swal(response.razorpay_payment_id)
          swal(response.razorpay_order_id)
          swal(response.razorpay_signature)
        },
        prefill: {
          name,
          email: email,
          phone_number: phone
        }
      }
      const paymentObject = new window.Razorpay(options)
      paymentObject.open();
     
    }}
   
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
        <Button variant='contained'  onClick={displayRazorpay}>Next</Button>
        <Button variant='contained'sx={{m:4}} href='/addaddress'>AddAddress</Button>
    </div>
  )
}
