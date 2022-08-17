import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { MdClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import logoImg from '../../../assets/logo.png'
import { opponentUserProfile } from '../profile/profile-slice'
import { IoIosFemale, IoIosMale } from 'react-icons/io'
import { RiAlarmWarningFill } from 'react-icons/ri'
import Rating from '@mui/material/Rating'
import UserReportModal from './UserReportModal'

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: #efedff;
  border-radius: 30px;
  color: #333333;
  position: relative;
`

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

const RateBox = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
`

const MannerRate = styled(Rating)`
  && {
    color: #f5d835;
    margin: 1rem;
  }
`

const LogoImg = styled.img`
  height: 5rem;
`

const ProfileImg = styled.img`
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  border: 2px solid #f8ee60;
  background-color: white;
`

const BackIcon = styled(MdClear)`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;
  color: #88866f;
  cursor: pointer;
`

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const RiAlarmWarning = styled(RiAlarmWarningFill)`
  cursor: pointer;
  color: #e64848;
  font-size: 2rem;
  margin-left: 0.5rem;

  &:hover {
    font-size: 2.1rem;
  }
`
const Nickname = styled.div`
  width: 100%;
  font-size: 2.5rem;
  font-family: 'Minseo';
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`

const HashList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Hashtag = styled.span`
  font-family: Minseo;
  font-size: 1.8rem;
`

const FemaleIcon = styled(IoIosFemale)`
  color: #ff728e;
  font-size: 2rem;
`
const MaleIcon = styled(IoIosMale)`
  color: #009c87;
  font-size: 2rem;
`

const UserProfileModal = ({
  oppositeUserNo,
  openUserProfileModal,
  userReport,
  myUserNo,
  userProfilePicUrl
}) => {
  const dispatch = useDispatch()
  const [isDuplicated, setIsDuplicated] = useState(false)
  const [showIcons, setShowIcons] = useState(false)

  const [isOpen, setIsOpen] = useState(false)
  const openUserReportModal = () => {
    setIsOpen(!isOpen)
  }

  const { userNickname, rateScore, userGender, hashtags } =
    useSelector((state) => state.profile)

  const closeUserProfileModal = () => {
    openUserProfileModal(false)
  }

  
  useEffect(() => {
    if (oppositeUserNo === myUserNo) {
      setShowIcons(true)
    }

    dispatch(opponentUserProfile(oppositeUserNo))
      .unwrap()
      .then((res) => {
        console.log('상대유저정보', res.data)
      })
      .catch((err) => {
        console.log('채팅목록로드에러', err)
      })
  }, [])

  console.log("프로필 주소가 있니?", userProfilePicUrl)
  return (
    <ModalBackdrop>
      <ModalView>
        <BackIcon onClick={closeUserProfileModal} />
        <ProfileBox>
          <div>
            <LogoImg src={logoImg} />
          </div>
          <div>
            {userProfilePicUrl !== undefined ? 
            <ProfileImg
              src={require(`./../../../assets/profile_img${userProfilePicUrl}`)}
            />
            : null }
          </div>

          <Nickname>
            {userNickname}
            {!showIcons && !isDuplicated ? (
              <RiAlarmWarning
                onClick={() => {
                  openUserReportModal()
                }}
              />
            ) : null}
            {isOpen ? (
              <UserReportModal
                openUserReportModal={openUserReportModal}
                oppositeUserNo={oppositeUserNo}
                myUserNo={myUserNo}
                setIsDuplicated={setIsDuplicated}
              />
            ) : null}
          </Nickname>

          {userGender === 'f' ? (
            <FemaleIcon></FemaleIcon>
          ) : (
            <MaleIcon></MaleIcon>
          )}

          <HashList>
            {hashtags &&
              hashtags.map((item, idx) => <Hashtag># {item} </Hashtag>)}
          </HashList>

          <RateBox>

            <MannerRate
              size="large"
              value={rateScore}
              precision={0.5}
              readOnly
            />
            {rateScore}
          </RateBox>
        </ProfileBox>
      </ModalView>
    </ModalBackdrop>
  )
}

export default UserProfileModal
