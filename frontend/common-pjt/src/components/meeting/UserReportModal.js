import styled from 'styled-components'
import React, { useState } from 'react'
import { MdClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import logoImg from '../../assets/logo.png'
import axios from '../../api/http'
import { useEffect } from 'react'
import { userReport } from './evaluate-slice'
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts'

const ModalBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  font-family: Minseo;
`

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  text-align: center;
  text-decoration: none;
  padding: 3.5rem 4rem;
  background-color: #fff3f8;
  border-radius: 30px;
  color: #333333;
  position: relative;
`

const BackIcon = styled(MdClear)`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;
  color: #88866f;
`

const LogoImg = styled.img`
  height: 7rem;
`

const ReportInputsBlock = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`
const CheckDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  /* margin-bottom: 1rem; */
  font-size: 2.1rem;
`

const Text = styled.span`
  width: 100%;
  text-align: start;
  color: #4a4a4a;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`

const StyledInput = styled.input`
  background-color: white;
  border: 1.5px solid #333333;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  padding: 1rem 0.5rem;
  width: 100%;
  height: 1rem;
  font-family: Minseo;

  & + & {
    margin-top: 1rem;
  }

  &.email {
    width: 75%;
  }

  &.nickname {
    width: 75%;
  }

  &.birth {
    width: 75%;
    cursor: pointer;
  }
`
const StyledBtn = styled.button`
  background-color: #ff728e;
  color: white;
  border-radius: 0.5rem;
  border: 0;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-family: Minseo;
  margin-top: 2rem;

  &:hover {
    background-color: #e0637c;
    color: #e0e0e0;
  }
`



const UserReportModal = ({
  openUserReportModal,
  oppositeUserNo,
  myUserNo,
  setIsDuplicated,
}) => {
  const dispatch = useDispatch()

  const sendToBack = (e) => {
    openUserReportModal()
  }

  //신고 타입
  const [reportTo, setReportTo] = useState(1)
  const [reportType, setReportType] = useState('')
  const [reportMessage, setReportMessage] = useState('')

  const changeReportType = (e) => {
    setReportType(e.target.value)
  }

  useEffect(() => {
    setReportTo(oppositeUserNo)
  }, [])

  function handleSubmit(e) {
    console.log('어디서막히냐')
    e.preventDefault()
    const data = {
      reportTo,
      reportType,
      reportMessage,
    }

    axios.get(`/honjaya/reports/${oppositeUserNo}`).then((res) => {
      console.log(res)
      if (res.data.trueOrFalse) {
        ToastsStore.info('중복 신고는 할 수 없어요❗')
        setIsDuplicated(true)
      } else {
        dispatch(userReport(data))
          .unwrap()
          .then((res) => {
            console.log('신고성공', res.data)
            setIsDuplicated(true)
          })
          .catch((err) => {
            console.log('신고에러', err)
          })
      }
    })
  }

  return (
    <ModalBackdrop>
      <ModalView>
        <BackIcon onClick={sendToBack} />

        <div>
          <LogoImg src={logoImg} />
        </div>

        <ReportInputsBlock onSubmit={(e) => handleSubmit(e)}>
          <CheckDiv>
            <label>
              <input
                name="reportType"
                type="radio"
                value="1"
                checked={reportType === '1'}
                onChange={changeReportType}
              />{' '}
              부적절한 메시지
            </label>
          </CheckDiv>
          <Text>차별, 욕설, 놀림, 언어폭력, 협박, 광고 등</Text>

          <CheckDiv>
            <label>
              <input
                name="reportType"
                type="radio"
                value="2"
                checked={reportType === '2'}
                onChange={changeReportType}
              />{' '}
              불쾌한 노출
            </label>
          </CheckDiv>
          <Text>상반신 또는 하반신 노출, 누드 사진 또는 영상 등</Text>

          <CheckDiv>
            <StyledInput
              name="reportContent"
              placeholder="신고사유를 입력하세요(선택)"
              onChange={(e) => setReportMessage(e.target.value)}
              value={reportMessage}
            />
          </CheckDiv>
          <StyledBtn>신고</StyledBtn>
        </ReportInputsBlock>
      </ModalView>
    </ModalBackdrop>
  )
}

export default UserReportModal
