import React from "react"
import styled from "styled-components"


export const ModalBackdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`

const ModalView = styled.div.attrs(props => ({
    role: 'dialog'
}))`
    text-align: center;
    text-decoration: none;
    padding: 30px 90px;
    background-color: white;
    border-radius: 30px;
    color: #333333;
`


const MainHelper = ({openModalHelper}) => {

    const closeModalProfile = () => {
        openModalHelper(false)
    }

    return (
        <ModalBackdrop onClick={closeModalProfile}>
            <ModalView>
                <div>Hello world</div>
            </ModalView>    
        </ModalBackdrop>
    )
}

export default MainHelper