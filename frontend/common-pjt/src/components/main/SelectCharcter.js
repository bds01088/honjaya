import React from 'react'
import styled from 'styled-components'
import Cat from '../../assets/profile/001.png'
import Dog from '../../assets/profile/002.png'
import Panda from '../../assets/profile/003.png'
import Rabbit from '../../assets/profile/004.png'
import Tiger from '../../assets/profile/005.png'

export const ModalBackdrop = styled.div`
  /* position: absolute; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* overflow: auto; */
  outline: 2px solid;
`

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  text-decoration: none;
  /* padding: 30px 90px; */
  /* border-radius: 30px; */
  color: #5d5d5d;
  background-color: #fffdde;
  /* font-size: 1.4rem; */
  /* font-family: Jua; */
  /* width: 120%; */
  /* height: 200%; */
  /* outline: 2px solid blue; */
`

const ImgList = styled.img`
  width: 20%;
  height: 20%;
`

const RadioBtn = styled.input`
  display: none ;

  :checked + img {
    outline: 0.2rem solid #ffc9d0;
    border-radius: 50%;
  }
`

const Label = styled.label``

const SelectCharcter = ({ openModalHelper, num, setNum }) => {
  // const closeModalProfile = () => {
  //     openModalHelper(false)
  // }

  const handleClickRadioButton = (e) => {
    setNum(e.target.value)
  }

  return (
    // <ModalBackdrop onClick={closeModalProfile}>
    <ModalBackdrop>
      <ModalView>
        <Label>
          <RadioBtn
            type="radio"
            value="1"
            checked={num === '1'}
            onChange={handleClickRadioButton}
          ></RadioBtn>
          <ImgList src={Cat}></ImgList>
        </Label>

        <Label>
          <RadioBtn
            type="radio"
            value="2"
            checked={num === '2'}
            onChange={handleClickRadioButton}
          ></RadioBtn>
          <ImgList src={Dog}></ImgList>
        </Label>

        <Label>
          <RadioBtn
            type="radio"
            value="3"
            checked={num === '3'}
            onChange={handleClickRadioButton}
          ></RadioBtn>
          <ImgList src={Panda}></ImgList>
        </Label>

        <Label>
          <RadioBtn
            type="radio"
            value="4"
            checked={num === '4'}
            onChange={handleClickRadioButton}
          ></RadioBtn>
          <ImgList src={Rabbit}></ImgList>
        </Label>

        <Label>
          <RadioBtn
            type="radio"
            value="5"
            checked={num === '5'}
            onChange={handleClickRadioButton}
          ></RadioBtn>
          <ImgList src={Tiger}></ImgList>
        </Label>
      </ModalView>
    </ModalBackdrop>
  )
}

export default SelectCharcter
