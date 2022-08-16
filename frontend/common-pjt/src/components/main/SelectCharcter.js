import React from 'react'
import styled from 'styled-components'
import Cat from '../../assets/profile/001.png'
import Dog from '../../assets/profile/002.png'
import Panda from '../../assets/profile/003.png'
import Rabbit from '../../assets/profile/004.png'
import Tiger from '../../assets/profile/005.png'
import { useState } from 'react'
import { MdOutlineCancel, MdCheckCircleOutline } from 'react-icons/md'

export const ModalBackdrop = styled.div`
  position: absolute;
  left: -1rem;
  display: flex;
  align-items: center;
  width: 120%;
  margin-top: 1rem;
`

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  text-decoration: none;
  border-radius: 30px;
  width: 100%;
  background-color: #fffdde;
  outline: 3px solid #aca65b;
  padding: 0.5rem;
`

const Label = styled.label``

const ImgList = styled.img`
  width: 20%;
  height: 15%;
  cursor: pointer;
`

const RadioBtn = styled.input`
  display: none;

  :checked + img {
    outline: 0.2rem solid #ffc9d0;
    border-radius: 50%;
  }
`
const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
`

const CancelBtn = styled(MdOutlineCancel)`
  font-size: 2rem;
  color: #db1d49;
  cursor: pointer;
`

const CheckBtn = styled(MdCheckCircleOutline)`
  font-size: 2rem;
  color: #00c3a9;
  cursor: pointer;
`

const SelectCharcter = ({ handleProfileChange, closeModalProfile }) => {
  const handleClickRadioButton = (e) => {
    setNum(e.target.value)
  }

  const [num, setNum] = useState('')

  return (
    <ModalBackdrop>
      <ModalView>
        <Label>
          <RadioBtn
            className="1"
            type="radio"
            value="1"
            checked={num === '1'}
            onChange={handleClickRadioButton}
          ></RadioBtn>
          <ImgList src={Cat} />
        </Label>

        <Label>
          <RadioBtn
            type="radio"
            value="2"
            checked={num === '2'}
            onChange={handleClickRadioButton}
          ></RadioBtn>
          <ImgList src={Dog} />
        </Label>

        <Label>
          <RadioBtn
            type="radio"
            value="3"
            checked={num === '3'}
            onChange={handleClickRadioButton}
          ></RadioBtn>
          <ImgList src={Panda} />
        </Label>

        <Label>
          <RadioBtn
            type="radio"
            value="4"
            checked={num === '4'}
            onChange={handleClickRadioButton}
          ></RadioBtn>
          <ImgList src={Rabbit} />
        </Label>

        <Label>
          <RadioBtn
            type="radio"
            value="5"
            checked={num === '5'}
            onChange={handleClickRadioButton}
          ></RadioBtn>
          <ImgList src={Tiger} />
        </Label>
        <BtnDiv>
          <CheckBtn onClick={() => handleProfileChange(num)}>저장</CheckBtn>
          <CancelBtn onClick={closeModalProfile}>취소</CancelBtn>
        </BtnDiv>
      </ModalView>
    </ModalBackdrop>
  )
}

export default SelectCharcter
