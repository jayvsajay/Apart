import { Grid} from '@mui/material'
import React from 'react'

export default function Home() {
  return (
    <div>
       
            <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <h1 style={{fontStyle:"italic",marginTop:"45%"}}>Apart Fresh</h1>
                </Grid>
                <Grid item md={8} >
                    <img src='./image1.gif' width="100%" height="80%" />
                </Grid>
                </Grid>
     
    </div>
  )
}
