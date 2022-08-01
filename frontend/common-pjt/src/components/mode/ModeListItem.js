import React from "react"
import styled from "styled-components"
// import TempImg from '../../assets/character.png'
// import TempImg1 from '../../assets/carrot.png'
// import TempImg2 from '../../assets/logo.png'
import TempImg3 from '../../assets/shadow.png'


// const ModeListItems = styled.div`
//     border: 3px solid ;
//     display: inline-block;
// `

const Container= styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
`

const Mode = styled.img`
    height: 100%;
    width: 100%;
`

// 모드 종류
const ModeListItem = ({i}) => {
    const data = [
        {
            id: 1,
            src: `${TempImg3}`,
            text: '싱글로 참여해서~',

        },
        {
            id: 2,
            src: `${TempImg3}`,
            text: '지시자로 참여해서~',

        },
        {
            id: 3,
            src: `${TempImg3}`,
            text: '아바타로 참여해서~',

        },
        {
            id: 4,
            src: `${TempImg3}`,
            text: '랜덤으로 참여해서~',

        },
    ]

    return (
        <Container>
            <div> 
                <Mode src={data[i].src}></Mode>
                <p>{data[i].text}</p>
            </div>
        </Container>
        
    ) 
}

export default ModeListItem

