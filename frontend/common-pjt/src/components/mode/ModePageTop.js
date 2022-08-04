import { display } from '@mui/system'
import React, { useState } from 'react'
import styled from 'styled-components'
import TempImg from '../../assets/character.png'


const ModeSelectBox = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  outline: 0.2rem solid #333333;
  width: 90%;
  height: 80%;
  border-radius: 2rem;
  padding: 1rem 0;
`

const RoleSelectTitle = styled.div`
  position: absolute;
  top: -2rem;
  z-index: 1;
  padding: 0 2rem;
  font-size: 3em;
  background-color: #fffdde;
  font-family: 'Jua';
`
const ModeTitle = styled.div`
  z-index: 2;
  display: flex;
  justify-content: center;
  font-size: 2.5vh;
  font-family: "Jua";
  width: 80%;
  /* outline: 1px solid; */
  background-color: #FFC9D0;
  border-radius: 2rem;
  padding: 0.5rem;
`
const Mode = styled.img`
  width: 100%;
  cursor: pointer;
`

const LabelDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  height: 90%;
  /* outline: 2px solid red; */
  /* margin:0; */
`
const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 80%;
  height: 100%;
  /* outline: 2px solid blue; */
`

const Input = styled.input`
  visibility: hidden;
  
  :checked + img {
    outline: 0.2rem solid #ffc9d0;
    border-radius: 2rem;
  }
`

const Explain = styled.div`
  text-align: center;
  font-family: 'Jua';
  font-size: 1.5rem;
  color: #333333;
  cursor: pointer;
  /* outline: 2px solid; */
`

const ModeChoice = () => {

  const [Role, setRole] = useState('Solo')
  const handleClickRadioButton = (e) => {
    setRole(e.target.value)
  }

  console.log(Role)
  return (
    <ModeSelectBox className="box">
      <RoleSelectTitle>역할선택</RoleSelectTitle>

      <LabelDiv>
        <ModeTitle>"어, 싱글이야"로 참여하기</ModeTitle>
        <Label>
          <Input
            type="radio"
            value="Solo"
            checked={Role === 'Solo'}
            onChange={handleClickRadioButton}
          />
          <Mode src={TempImg}></Mode>
          <Explain>
            싱글로 참여해서
          </Explain>
          <Explain>
          역할 없는 일반 모드를 즐겨보세요.
          </Explain>
        </Label>
      </LabelDiv>

      <LabelDiv>
        <ModeTitle>지시자로 참여하기</ModeTitle>
        <Label>
          <Input
            type="radio"
            value="Commander"
            checked={Role === 'Commander'}
            onChange={handleClickRadioButton}
          />
          <Mode src={TempImg}></Mode>
          <Explain>
            지시자로 참여해서
          </Explain>
          <Explain>
          아바타에게 지시를 내려보세요. 
          </Explain>

        </Label>
      </LabelDiv>
      
      <LabelDiv>
        <ModeTitle>아바타로 참여하기</ModeTitle>
        <Label>
          <Input
            type="radio"
            value="Avatar"
            checked={Role === 'Avatar'}
            onChange={handleClickRadioButton}
          />
          <Mode src={TempImg}></Mode>
          <Explain>
            아바타로 참여해서 
          </Explain>
          <Explain>
          색다른 경험을 해보세요. 
          </Explain>


        </Label>
      </LabelDiv>

      <LabelDiv>
       <ModeTitle>랜덤 역할로 참여하기</ModeTitle>
        <Label>
          <Input
            type="radio"
            value="Random"
            checked={Role === 'Random'}
            onChange={handleClickRadioButton}
          />
          <Mode src={TempImg}></Mode>
          <Explain>
            싱글, 아바타, 지시자 중 랜덤으로 역할이 부여됩니다.
          </Explain>
        </Label>
      </LabelDiv>
    </ModeSelectBox>
  )
}

export default ModeChoice
