import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import backImg from '../../assets/base.PNG'
import { Link } from 'react-router-dom'
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from 'react-icons/md'

const Background = styled.div`
  background-image: url(${backImg});
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Form = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: Minseo;
  height: 80%;
  width: 35%;

  @media screen and (max-width: 1295px) {
    width: 454px;
    height: 700px;
  }
`

const PledgeTemplate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
  height: 110%;
  width: 100%;
  border-radius: 3%;
  background-color: #ccf3ee;
  position: relative;
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  height: 15%;
  padding: 1rem;
`

const Logo = styled.img`
  height: 100%;

  @media screen and (max-width: 1500px) {
    height: 90%;
  }
`

const Phrase = styled.p`
  font-family: Minseo;
  font-size: 2.5rem;
  padding-top: 0.2rem;
  color: #333333;

  @media screen and (max-width: 1500px) {
    font-size: 1.6rem;
    padding-top: 3rem;
  }
`

const TextBox = styled.div`
  height: 62%;
  width: 80%;
  border-radius: 3%;
  padding: 1.5rem;
  background-color: #ffffff;
`

const PledegeContent = styled.div`
  height: 100%;
  display: flex;
  overflow-y: auto;
  /* overflow-x: auto; */

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    height: 15%;
    background-color: #92ded5;
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #ffecec;
    border-radius: 2rem;
  }
`
const PledgeOl = styled.ol``

const PledgeLi = styled.li`
  font-size: 1.8em;
  font-family: Minseo;
  margin-bottom: 2rem;
`

const PledgeDetail = styled.li`
  font-size: 1.5rem;
`

const Agree = styled.div`
  width: 80%;
  margin: 1rem 0 0 0;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* outline: 1px solid; */
  height: 10%;
  padding-bottom: 4.5rem;
`
const NotChecked = styled(MdOutlineCheckBoxOutlineBlank)`
  /* margin: 0 0.2rem; */
`

const Checked = styled(MdOutlineCheckBox)`
  /* margin: 0 0.2rem; */
`

const Button = styled.button`
  border: none;
  border-radius: 0.2rem;
  color: white;
  font-family: Minseo;
  font-size: 1.5rem;
  padding: 0.5rem 2rem;
  margin: 1rem 0;
  background: #ff728e;
  cursor: pointer;

  &:hover {
    cursor: pointer;
    background: #ff728e;
    font-size: 1.6rem;
  }

  &&:disabled {
    background: #8a3849;
    color: #c2c2c2;
    cursor: not-allowed;
    font-size: 1.5rem;
  }


`

const Div = styled.div`
  margin-top: 1rem;
  display: flex;
  font-size: 1.2rem;
  position: absolute;
  bottom: 1rem;
`

const Pledge = () => {
  // 동의 체크 여부 판별
  const [check, setCheck] = useState(false)

  const clickEvent = () => {
    setCheck(!check)
  }

  return (
    <Background>
      <Form>
        <PledgeTemplate>
          <Title>
            <Logo src={logo} />
            <Phrase>이용을 위한 서약서</Phrase>
          </Title>

          <TextBox>
            <PledegeContent>
              <PledgeOl>
                <PledgeLi>
                  타인의 발언을 존중합시다
                  <ul>
                    <PledgeDetail>
                      발언하고 있는 사람의 말에 집중 해주세요
                    </PledgeDetail>
                  </ul>
                  <ul>
                    <PledgeDetail>
                      발언 순서에 있어서 서로가 배려와 양보로 진행 해주세요
                    </PledgeDetail>
                  </ul>
                </PledgeLi>
                <br />

                <PledgeLi>
                  과도한 요구 및 채팅을 금지합니다
                  <ul>
                    <PledgeDetail>
                      아바타 역할을 수행 중인 파트너에게 무리한 요구를 강요하지
                      마세요
                    </PledgeDetail>
                  </ul>
                  <ul>
                    <PledgeDetail>
                      과도한 도배성 채팅을 자제 해주세요
                    </PledgeDetail>
                  </ul>
                  <ul>
                    <PledgeDetail>
                      욕설 및 비속어 사용을 금지합니다
                    </PledgeDetail>
                  </ul>
                </PledgeLi>
                <br />

                <PledgeLi>
                  각자의 역할에 알맞는 행동을 최대한 이행하는 걸 권장합니다
                  <ul>
                    <PledgeDetail>
                      재미있는 '혼자야' 플레이를 위해 몰입 해주세요
                    </PledgeDetail>
                  </ul>
                </PledgeLi>
                <br />

                <PledgeLi>
                  선정적이거나 불쾌한 컨텐츠 및 행위를 금지합니다
                  <ul>
                    <PledgeDetail>
                      성기, 음모, 유두 등의 부분 노출을 포함하여 성적인 의도를
                      가진 행위를 금지합니다
                    </PledgeDetail>
                  </ul>
                  <ul>
                    <PledgeDetail>
                      다수의 타인이 불쾌하다고 느끼는 모든 행위를 금지합니다
                    </PledgeDetail>
                  </ul>
                </PledgeLi>
              </PledgeOl>
            </PledegeContent>
          </TextBox>

          <Agree>
            서비스 이용에 관한 모든 책임은
            이용자에게 있음을 동의 하십니까?
          </Agree>

          <Div onClick={clickEvent}>{check ? <Checked /> : <NotChecked />}동의</Div>
        </PledgeTemplate>

        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <Button disabled={!check}>다음</Button>
        </Link>
      </Form>
    </Background>
  )
}

export default Pledge
