import styled from 'styled-components'
import React, { useState } from 'react'
import { MdClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'


export const ModalBackdrop = styled.div`
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
  font-family: Jua;
`

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: white;
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

const UserReportModal = ({openUserReportModal, }) => {
  const dispatch = useDispatch()
  const closeUserReportModal = () => {
      openUserReportModal(false)   
  }
  
  //신고 타입
  const [reportType, setReportType] = useState('')    
  const [extraReport, setExtraReport] = useState('') 


  
  return (
    <div>
      <ModalBackdrop onClick={() => {
        closeUserReportModal()

      }}>
        <ModalView> 
          <BackIcon onClick={() => {
            closeUserReportModal()

          }}/>
            <ReportInputsBlock>
              <button>{"신고"}</button>
            </ReportInputsBlock>
          </ModalView>
        </ModalBackdrop>
    </div>
  );
};

export default UserReportModal;

