import  React, { useEffect, useRef, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getproducts, search_by_Products } from '../../config/MyService';
import { Grid, Input, Rating } from '@mui/material';
import { URL } from '../../config/url'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'
import Carousel from 'react-material-ui-carousel'
export default function Dashboard() {
  const [product,setProduct]=useState();
  const [product_data,setProduct_data]=useState([]);
  const [filtered,setFiltered]=useState([])
  const timeout=useRef();
  const navigate=useNavigate();
  // const throttling = useRef(false)

  useEffect(()=>{
      getproducts()
      .then(resp=>{
        setProduct_data(resp.data.products)
      })
  },[])
  // const handleInput=(e)=>{
  //   setShow(true)
  //   const value = e.target.value;
  //     setProduct(e.target.value);
  //     const filteredData = product_data.filter(element =>
  //       element.product_name.toLowerCase().includes(value.toLowerCase()));
  //     console.log(filteredData)
  //     setFiltered(filteredData);
  // }

  const handleDebounceSearch = (e) => {
    //Clear the previous timeout.
    clearTimeout(timeout.current)

    // If there is no search term, do not make API call
    if (!e.target.value.trim()) {
      setFiltered([])
      return
    }
    timeout.current = setTimeout(() => {
      let key=e.target.value;
          search_by_Products(key)
        .then(res => {
          if (res.data.err) {
            swal("Something went wrong!")
          } else {
            console.log(res.data.product)
            setFiltered(res.data.product)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }, 1000)
  }

//  const handleDebounceSearch = (e) => {
//    if (throttling.current) {
  //   return
//    }

//     // If there is no search term, do not make API call
//     if (!e.target.value.trim()) {
//       setFiltered([])
//       return
//     }
//     throttling.current = true;
//      setTimeout(() => {
//        throttling.current=false;
//       let key=e.target.value;
//           searchP(key)
//         .then(res => {
//           if (res.data.err) {
//             swal("Something went wrong!")
//           } else {
//             console.log(res.data.product)
//             setFiltered(res.data.product)
//           }
//         })
//         .catch(err => {
//           console.error(err)
//         })
//     }, 600)
//   }
  const addcart=(id)=>{
  console.log(id)
    navigate('/productreview',{state:{id:id}})
  }
  return (
    <div>
      <Carousel sx={{mt:5}}>
        {product_data.map((pdr)=>{
          return(
            <img src={`${URL}user/${pdr.product_image}`} alt='imag1'  width="100%" height="200px"/>
          )
        })}
      </Carousel>
      <Grid container direction='row'>
        <Grid md={10} xs={12}>
        <Input typ="text" placeholder='search products' sx={{ml:'15%',mt:"2%"}} value={product} onChange={(e)=>handleDebounceSearch(e)}/>
        {filtered.length > 0 && filtered.map(pd=>
                  <Card key={pd._id} >
                  <CardContent onClick={()=>addcart(pd._id)}>{pd.product_name}</CardContent>
                </Card>)
                  }
      
      <Grid container direction='row' >
    {product_data.map((pro) => 
        <Grid item md={4} xs={12}>
        
       <Card  sx={{m:"15%"}}>
      <CardMedia
        component="img"
        alt="Vegtables picture"
        height="150px"
        image ={`${URL}user/${pro.product_image}`}
        onClick={()=>addcart(pro._id)} 
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pro.product_name}
        </Typography>
      <Rating 
      value={pro.rating}
      precision={0.5}
      />
      </CardContent>
      <CardActions>
        <Button variant='contained' sx={{width:"100%"}} size="large" 
        onClick={()=>addcart(pro._id)} 
        >
          Add cart</Button>
      
      </CardActions>
    </Card>
    </Grid>
)} 
  </Grid>
  </Grid>
      </Grid>
    </div>
  )
}
