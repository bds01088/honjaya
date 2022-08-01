// import React, { useState } from "react"
// import styled from "styled-components"
// import TempImg from '../../assets/character.png'


// const Container= styled.div`
//     display: flex;
//     justify-content: center;
//     width: 100%;
//     text-align: center;
//     margin: 0 auto;
// `

// const Mode = styled.img`
//     height: 90%;
//     width: 90%;
// `



// // 모드 종류
// const ModeListItem = ({i}) => {
    
//     const [x, setX] = useState([]);

//     const handleClickRadioButton2 = (e) => {
//         setX(e.target.value)
//     }
    
//     return (
//         <Container>
//             <div className="RadioButtonBox"> 
                
//                 <Mode src={data[i].src}></Mode>
//                 <p>{data[i].text}</p>
             
    
//             </div>
//         </Container>
        
//     ) 
// }

// const data = [
//     {
//         id: 1,
//         src: `${TempImg}`,
//         text: '싱글로 참여해서~',

//     },
//     {
//         id: 2,
//         src: `${TempImg}`,
//         text: '지시자로 참여해서~',

//     },
//     {
//         id: 3,
//         src: `${TempImg}`,
//         text: '아바타로 참여해서~',

//     },
//     {
//         id: 4,
//         src: `${TempImg}`,
//         text: '랜덤으로 참여해서~',

//     },
// ]
// export default ModeListItem

import React, { useState } from "react"
import styled from "styled-components"
import TempImg from '../../assets/character.png'


const Container= styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
    margin: 0 auto;
`

const Mode = styled.img`
    height: 90%;
    width: 90%;
    :checked {
        border: 5rem solid ;
    }
`

const Label = styled.label`
    
`

const Input = styled.input`
    visibility: hidden;
    :checked + img {
        border: 0.5rem solid #FFC9D0;
    }

`



// 모드 종류
const ModeListItem = () => {
    const [x, setX] = useState('Solo');
    const handleClickRadioButton = (e) => {
        setX(e.target.value)
        
    }
    

    console.log(x)
    
    
    return (
        
        <Container>
           
                <Label>
                    <Input
                        type="radio"
                        value='Solo'
                        checked={x === 'Solo'}
                        onChange={handleClickRadioButton}/>
                        <Mode src={TempImg}></Mode>
                        
                </Label>

                <Label>
                    <Input
                        type="radio"
                        value='Commander'
                        checked={x === 'Commander'}
                        onChange={handleClickRadioButton}/>
                        <Mode src={TempImg}></Mode>
                        
                </Label>
            
            
                <Label>
                    <Input
                        type="radio"
                        value='Avatar'
                        checked={x === 'Avatar'}
                        onChange={handleClickRadioButton}/>
                        <Mode src={TempImg}></Mode>
                        
                </Label>
            
            
                <Label>
                    <Input
                        type="radio"
                        value='Random'
                        checked={x === 'Random'}
                        onChange={handleClickRadioButton}/>
                        <Mode src={TempImg}></Mode>
                        
                </Label>
            
            
        </Container>
        
    ) 
}

const data = [
    {
        id: 0,
        src: `${TempImg}`,
        text: '싱글로 참여해서~',

    },
    {
        id: 1,
        src: `${TempImg}`,
        text: '지시자로 참여해서~',

    },
    {
        id: 2,
        src: `${TempImg}`,
        text: '아바타로 참여해서~',

    },
    {
        id: 3,
        src: `${TempImg}`,
        text: '랜덤으로 참여해서~',

    },
]
export default ModeListItem

