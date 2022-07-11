import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { URL } from '../config/url'
import { Rating } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactImageMagnify from "react-image-magnify";
import {addToCart,addtorate} from '../config/MyService'
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import swal from 'sweetalert';
import {  getItem1 } from '../config/MyService';
export default function Productreview(props) {
  
    const [Item,setItem]=useState()
    const { state }=useLocation();
    const [im,setIm]=useState();
    const [pname,setPname]=useState();
    const [rate,setRate]=useState();
    const [cost,setCost]=useState();
    const navigate=useNavigate();
    const [change,setChange]=useState(false);
    useEffect(()=>{
      getItem1(state.id)
      .then(res=>{
        if(res.data.err){
          swal(res.data.err)
        }else{
          console.log(res.data.Item[0])
        setItem(res.data.Item[0]);
        setIm(res.data.Item[0].product_image);
        setCost(res.data.Item[0].price);
        setPname(res.data.Item[0].product_name);
        setRate(res.data.Item[0].rating)
        console.log(res.data.Item[0].rating)
        }
      })
    },[state.id])
    const rateproduct=()=>{
      setChange(true)
    }
  const addrate=()=>{
    let data={rate:rate};
    addtorate(data,state.id)
    .then(res=>{
      if(res.data.err){
        swal(res.data.err)
      }else{
        swal(res.data.msg)
        setChange(false)
      }
    })
  }
  const addtocart=(id)=>{
    let user = JSON.parse(localStorage.getItem('user'))
    if(user){
      let body = {email:user.email, id:id};
     addToCart(body)
     .then(res=>{
       if(res.data.err){
         swal(res.data.err);
       }
       else{
         swal(res.data.msg);
         navigate('/cart')
       }
     })
    }
    else{
       swal("Please Login before buying the products")
       navigate('/login');
    }
  }
  console.log(rate)
  return (
    <div>
      <Grid container direction='row'>
        <Grid item md={6}sx={{mt:2}} >
        <ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: `${URL}user/${im}`,
        sizes: '(max-width: 480px) 100vw, (max-width: 1200px)  360px'
    },
    largeImage: {
        src: `${URL}user/${im}`,
        width: 1100,
        height: 1800,
    },
    isHintEnabled: true,
    shouldHideHintAfterFirstActivation: false
}} />        
        </Grid>
        <Grid item md={6} xs={12}>
          <h1>{pname}</h1> 
          <Rating
                value={parseInt(rate)}
                precision={0.5}
                name="rate"
              />
              <h1>
                      Price:
                        <span className="text-danger">
                          {" "}
                          $ {cost}
                        </span>
                   
                     
                    </h1>
                    <h1>Share</h1>
                    <Grid container direction='row' sx={{ml:20,mr:20}}>
                    
                      <Grid md={3}>
                      <FacebookShareButton
                            url="https://www.amazon.in/"
                            title={"Checkout " + pname}
                            hashtag="#react"
                          >
                            <FacebookIcon
                              logofillColor="white"
                              round={true}
                            ></FacebookIcon>
                          </FacebookShareButton>
                        </Grid>
                        <Grid md={3}>
                        <WhatsappShareButton
                            url="https://www.amazon.in/"
                            title={"Checkout " + pname}
                            hashtag="#react"
                          >
                            <WhatsappIcon
                              logofillColor="white"
                              round={true}
                            ></WhatsappIcon>
                          </WhatsappShareButton>
                        </Grid>
                        <Grid md={3}>
                        <TwitterShareButton
                            url="https://www.amazon.in/"
                            title={"Checkout " + pname}
                            hashtag="#react"
                          >
                            <TwitterIcon
                              logofillColor="white"
                              round={true}
                            ></TwitterIcon>
                          </TwitterShareButton>
                        </Grid>
                    </Grid>    

                    <Button variant='contained'sx={{mt:5,ml:5}} onClick={()=>addtocart(state.id)}>Add cart</Button>     
                    <Button variant='contained'sx={{mt:5,ml:6}} onClick={rateproduct}>Rate product</Button>  
        {change&&<form>
       <TextField name="rate" type="number" sx={{mt:3}} onChange={(e)=>setRate(e.target.value)}/><br/>
        <Button variant='contained' sx={{mt:3}} onClick={addrate}>Add rate</Button></form>}
        </Grid>
      </Grid>

      </div>
  )
}

