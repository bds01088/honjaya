# 혼자야 ? (비대면 아바타 미팅 서비스)

📆 **프로젝트 진행기간 : 2022/07/11 ~ 2022/08/19**

🤠 **FE: 김누리, 김효근, 배송윤, 이승현** 

😼 **BE: 배상현**

📽 **[UCC 유튜브 링크]()**

![logo](README.assets/logo-16608005227942.png)



## 👭 소개

#### 	"**혼자야?**"는 랜덤 미팅 서비스와 게이미피케이션을 접목시켜 사용자들의 접근성을 높이고, 

#### **랜덤 대화 주체 추천**, **매칭 필터링** 등의 유저 친화적 컨텐츠를 제공하는 스낵 서비스 입니다.



## 🔎 혼자야? 서비스 화면

### 프로필 변경 및 해시태그 생성

![해시태그및프로필변경](README.assets/해시태그및프로필변경.gif)



---

### 모드선택 및 대기화면

![모드선택화면](README.assets/모드선택화면.gif)



#### - 대기시간(30초) 초과시 재매칭 

![재매칭화면](README.assets/재매칭화면-166080341363310.gif)



---

### 미팅진행화면

![미팅진행화면](README.assets/미팅진행화면.gif)



---

### 투표진행화면

![투표화면](README.assets/투표화면.gif)



---

### 투표종료화면 (지시자, 득점 순위 공개)

![투표종료화면](README.assets/투표종료화면.gif)



---

### 1:1 채팅

![DM시연](README.assets/DM시연.gif)



---

### 회원가입 및 이메일 인증

![회원가입및로그인](README.assets/회원가입및로그인.gif)



---

### 회원정보수정

![회원정보수정](README.assets/회원정보수정.gif)





## 🔬주요 기능 

- Openvidu (webRTC)를 통한 비대면 아바타 미팅 서비스
- 4가지(솔로, 아바타, 지시자, 랜덤) 역할, 미팅 정원 선택을 통한  랜덤 매칭 시스템
- 지시를 받고 있는 아바타가 누구인지 맞히는 투표 시스템 
- 상호 동의에 의한 1:1 채팅방 개설
- 구글을 활용한 smtp 이메일 인증 회원가입 서비스



## 🧰개발 환경

### ⌨ Backend 

- SpringBoot 2.7.1
- Java 1.8
- Type: Gradle
- Packiging: jar
- STS 3.9.13 e4.16.0 (IDE)
- MySQL Workbench: 8.0.28
- 그 외 버전 및 설정: `/backend/build.gradle`  파일 참조



### 🖥 Frontend

- VSCode (IDE)
- React 17.0.2
- redux 4.2.0
- redux-toolkit 1.8.3
- Node.js 16.16.0 
- styled-components 5.3.5
- yarn 1.22.19
- VSCode Extension
  - Prettier - Code formatter (Ver 9.5)
  - ES Lint (Ver 2.2.6)
  - Reactjs code snippets (Ver 2.4.0)
  
  

### :video_camera: Web RTC

- openvidu 2.22.0



### 🔗CI/CD

- Amazon EC2 - Ubuntu 20.04
- Nginx - 1.18.0
- docker - 20.10.17



## 🧩서비스 아키텍처

![image-20220818164041803](README.assets/image-20220818164041803.png)



## 🌈기술 특이점

- **랜덤으로 매칭을 시켜주는 로직**은 전체 유저들을 관리해야 하므로 백엔드 서버의 웹 소켓 통신을 사용했으며, **미팅 안에서 진행되는 로직**은 각 개별 미팅 안에서 이뤄지므**로 Openvidu를 활용하여 프론트에서 소켓통신을** 해결하였습니다.

- 저장할 필요가 없는 미팅 안의 채팅은 openVidu의 기능을 활용한 반면에, 채팅 메시지들을 저장해야 하는 1:1 DM 기능은 STOMP 방식을 통해 백엔드 서버에서 처리하도록 구성하였습니다.

  

## 🤝🏻협업 툴

- Gitlab
- Jira
- Notion
- Figma
- Webex
- Google Sheet



## 📋요구사항 정의서

![요구사항정의서](README.assets/요구사항정의서.JPG)





## 💡와이프레임 및 스토리보드

![와이어프레임](README.assets/와이어프레임.png)



## ⚙컨벤션

### - Git 컨벤션

---

```
* Code 관련
    - Add : 코드나 문자 추가
    - Test : 테스트 코드 삽입
    - Update : Fix와 달리 원래 정상적으로 동작한 기능의 보완 개념
    - Fix : 버그 수정
    - Remove : 코드 삭제
    - Refactor : 결과의 변경 없이 코드 구조 재조정
    - Move : 코드나 파일의 이동
    - Correct : 문법 오류, 타입 및 변수 이름 변경 등 수정 사항에 사용
    
* 기능 관련
    - Feat : 새로운 기능 추가
    - Chore : 기타 작업, 빌드 작업, 패키지 관리자 구성 등 업데이트, Production Code 변경 없음
    - Test : git 관련 테스트 혹은 코드 관련 테스트 진행
    
* 파일, 폴더 관련
    - Docs : 문서 변경 (문서 추가, 이름 변경 등)
    - Move : 코드나 파일의 이동
    - Rename : 이름 변경
    - Create : 파일이나 폴더 추가
```

```
* 커밋 작성
	- Form 
		[Position: Jira issue number] Type: message

	- Example
		Type 첫 글자는 대문자
		message는 50자 내로 작성
		[FE: S07P12E104-12] Feat: 로그인 기능 구현
```



### - Code 컨벤션

---

- 변수 Naming Convention
  - Front-End
    - HTML, CSS
      - 변수, 함수, 인스턴스 : kebab-case
      - Indent : 2칸 스페이스바가 원칙 
    - JavaScript
      - 변수, 함수, 인스턴스 : camelCase
      - Indent : 2칸 스페이스바가 원칙
      - 상수는 대문자 SNAKE_CASE를 사용



### - Jira 컨벤션

---

일정, 업무 관리 등 효율적인 협업을 위해 Jira를 활용하였습니다. 
매주 월요일, 데일리 스크럼을 통해 한 주 동안 진행 해야 할 업무를 분류하고, 일주일 단위의 스프린트를 진행 하였습니다. 

- Epic : 최상위 기능을 대제목과 소제목을 분류하여 Epic 작성
- Story : Epic의 하위 기능에 FE, BE 별로 구분하여 Story 작성
- Subtask : 각 기능을 구현하기 위한 개발 내역은 Subtask에 작성



## ✍Notion 

- 공유: 개발을 하며 참고할 수 있는 레퍼런스, 사이트 링크 등을 모아 팀원들과 공유
- 협업: 협업개발에 필요한 컨벤션, 프로젝트 일정 등 정리 
- 기록: 회의록, 팀미팅 피드백 등을 기록하며 프로젝트를 진행 



## 🖇ERD

![image-20220818175310749](README.assets/image-20220818175310749.png)



## 🚀배포 및 EC2 설정 관련

[[FE] 배포 및 openVidu ReadMe](참고자료/[FE] 배포 및 openVidu)

[[FE] 빌드 후 배포](참고자료/[FE] 빌드 후 배포.md)

[[FE] nginx 수동 배포(프로젝트 진행 당시)](참고자료/[FE] nginx 수동 배포.md)

[[FE] OpenVidu (프로젝트 진행 당시)](참고자료/OpenVidu 관련 내용)

[[BE] EC2 MySql 연결](참고자료/[BE] EC2 mySQL 연결.md)

[[BE] 배포](참고자료/[BE] 배포.md)

