import React, { useState } from "react"
import styled from "styled-components"

const ModalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    position: absolute;
`


export const ModalBackdrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: row wrap;
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
    color: #4000c7;
`



const MainHelper = ({openModalHelper}) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModalProfile = () => {
        openModalHelper(isOpen)
        setIsOpen(false)
    }

    return (
        <ModalContainer>
                <ModalBackdrop onClick={closeModalProfile}>
                    <ModalView>
                        <div>Hello world</div>
                    </ModalView>    
                </ModalBackdrop>
        </ModalContainer>
    )
}

export default MainHelper