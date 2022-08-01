// import React from "react"
// import styled from 'styled-components'
import SingleModeImg from '../../assets/character.png'
// import SingleModeImg2 from '../../assets/character.png'


// const ModeSelectBox=styled.div`
//     /* position: absolute; */
//     margin: 0 auto;
//     /* margin-top: 2rem; */
//     border: 5px solid #000;
//     width: 90%;
//     height: 55%;
//     border-radius: 2rem;
// ` 

// const ModeSelectButton= 

// const SingleMode = styled.img`
//     width: 25%;
//     /* height: 10%; */
// `

// const ModeChoice = () =>{
//     return(
//         <ModeSelectBox>
//             <SingleMode src={SingleModeImg}></SingleMode>
//             <SingleMode src={SingleModeImg}></SingleMode>
//             <SingleMode src={SingleModeImg}></SingleMode>
//             <SingleMode src={SingleModeImg}></SingleMode>
//         </ModeSelectBox>
//     )
// }


// export default ModeChoice;

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import MoreVertIcon from '@mui/icons-material/MoreVert';



const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            S
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="어 싱글이야로 참여하기"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="300"
        image={SingleModeImg}
        alt="Paella dish"
      />
      <CardContent>
      </CardContent>
      
      
    </Card>
  );
}
