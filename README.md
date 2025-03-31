![image](https://github.com/user-attachments/assets/f3a992d8-6fb9-4ecd-82c4-0a829e9320b4)


## 🚪 다눔(Danum) 프로젝트 개요
**AI와 이웃이 함께하는 실시간 Q&A 지식 커뮤니티 플랫폼**  
동양미래대학교 컴퓨터 소프트웨어학과 2024년 졸업작품 - NOMAD  
**프로젝트 기간: 2024/04 ~ 2024/11/22**

<br>

> **기존 Q&A 플랫폼(동네이웃, 지식iN 등)에서 경험하는**  
> 1) **기존 Q&A 플랫폼(동네이웃, 지식iN 등)에서 응답 대기 시간이 길다.**  
> 2) **다양한 사용자들이 답변하지만, 신뢰도가 들쑥날쑥하다.**  
> 3) **지역 특화 정보(동네 소식, 가게 후기 등)를 빠르게 얻기 어려운 한계가 존재한다.**  
> 와 같은 문제를 해소하고, **빠른 응답**과 **실시간 소통**을 구현하고자 기획했습니다.

<br>

## 🚀 핵심 기능 - 지역 기반 Q&A
> 다눔은 “내 주변 이웃과 소통”이라는 목표 아래 **빠른 피드백**을 받을 수 있는 지역 특화 Q&A 서비스를 제공합니다

- **동네 게시판**: 위치 정보(동네)에 따라 게시판이 구분되어, 가까운 이웃들과 질문 및 답변 교류  
- **실시간 질문 등록**: 질문을 올리면 지역 이웃·AI가 빠르게 답변  
- **카테고리 / 태그**: 지역 소식, 맛집, 생활 팁 등으로 분류하여 쉽게 검색 가능

<br>

## ✨ 문제 해결 - 지역 기반 Q&A
> **“질문해도 오래 걸려서 답을 못 얻는다”**, “이웃들의 실제 경험이 궁금하다” 라는 요구를 충족하고자 아래와 같은 솔루션을 마련했습니다.

### [1️⃣ 위치 정보 활용으로 맞춤형 정보 제공](#)
**카카오 지도 등 지오로케이션 API**를 통해 사용자의 현재 동네를 설정하고, 해당 지역 이웃들과만 Q&A가 이뤄지도록 했습니다.  
이를 통해 **신뢰도 높은 지역 정보**를 빠르게 획득 가능하게 했습니다.

### [2️⃣ AI + 사용자 경험 결합](#)
**ChatGPT** 등 AI 모델을 연동하여 **즉각적인 답변**을 받을 수 있게 하는 동시에, **실제 이웃들의 경험**도 함께 확인할 수 있어, **빠른 응답** + **현실성 있는 정보**라는 두 마리 토끼를 잡았습니다.

<br>

## 🚀 핵심 기능 - 1:1 채팅
> 다눔에서는 **1:1 채팅**을 통해 **필요한 정보를 직접** 주고받을 수 있습니다

- **1:1 채팅방**: 특정 사용자와 **실시간**으로 대화 가능  
- **채팅방 목록 / 최근 기록 조회**: 대화를 놓치지 않고 관리  
- **알림 기능**: 새 메시지가 오면 알림 수신  

<br>

## ✨ 문제 해결 - 실시간 소통
### [1️⃣ WebSocket 기반 실시간 통신](#)
**WebSocket/STOMP**를 활용한 양방향 통신으로, **1:1 채팅** 시 딜레이 없이 메시지 주고받기 가능.  
낮은 지연 시간을 유지해 **원활한 사용자 경험(UX)** 을 보장했습니다.

### [2️⃣ 알림 최적화](#)
새로운 메시지나 댓글 등이 등록되면, **알림**으로 알려줌으로써 **실시간 소통**을 강화했습니다.

<br>

## 🌐 서비스 흐름도
![image01](https://github.com/user-attachments/assets/c4a05ccf-ce99-4907-a512-8738a61ac543)

1. 사용자가 회원가입/로그인 → **JWT** 발급  
2. **위치정보** 설정 후, 동네 기반 **Q&A** 게시판 열람 & 질문 등록  
3. **AI**가 초기에 답변 제공, 동시에 **이웃**들이 댓글·답변 작성  
4. 실시간 **채팅**에서 1:1 or 그룹 대화/파일 전송 등 소통  
5. 필요 시 **알림**(댓글, 좋아요 등) 실시간 수신  

<br>

## 🧩 프로젝트 아키텍처
![danum 아키텍쳐](https://github.com/user-attachments/assets/62665c36-df87-45b2-b516-af820a33e40d)

<br>

## 🚀 기술 스택

<markdown-accessiblity-table data-catalyst=""><table>
  <tbody>
    <tr>
      <td align="center" width="160px">Server</td>
      <td align="center" width="560px">
        <img src="https://img.shields.io/badge/AWS EC2-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/tomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=white" height="24px"/>
      </td>
    </tr>
    <tr>
      <td align="center" width="160px">DB / Cache</td>
      <td align="center" width="560px">
        <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/Redis-FF4438?style=for-the-badge&logo=redis&logoColor=white" height="24px"/>
      </td>
    </tr>
    <tr>
      <td align="center" width="160px">Object Storage</td>
      <td align="center" width="560px">
        <img src="https://img.shields.io/badge/AWS S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/CloudFront-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" height="24px"/>
      </td>
    </tr>
    <tr>
      <td align="center" width="160px">FrontEnd</td>
      <td align="center" width="560px">
        <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/zustand-443f39?style=for-the-badge&logo=zustand&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/Quill.js-43853D?style=for-the-badge&logo=Quora&logoColor=white" height="24px"/>
      </td>
    </tr>
    <tr>
      <td align="center" width="160px">BackEnd</td>
      <td align="center" width="560px">
        <img src="https://img.shields.io/badge/Java 17-007396?style=for-the-badge&logo=java&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/Spring Data JPA-59666C?style=for-the-badge&logo=spring&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/websocket-010101?style=for-the-badge&logo=websocket&logoColor=white" height="24px"/>
      </td>
    </tr>
    <tr>
      <td align="center" width="160px">Collaboration</td>
      <td align="center" width="560px">
        <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" height="24px"/>
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" height="24px"/>
      </td>
    </tr>
  </tbody>
</table></markdown-accessiblity-table>

<br>

## 👨‍👨‍👧‍👦 팀원 구성

| 이름   | 역할       | GitHub                                       |
| ------ | ---------- | -------------------------------------------- |
| 이영훈 | FrontEnd   | [GitHub](https://github.com/kr-younghoon)    |
| 김경빈 | FrontEnd   | [GitHub](https://github.com/kyeongb-bin)     |
| 주성준 | BackEnd    | [GitHub](https://github.com/rdyjun)          |
| 백승민 | BackEnd    | [GitHub](https://github.com/alpin87)         |
| 김우빈 | BackEnd    | [GitHub](https://github.com/KROOKIMWOOBIN)    |

<br>

## 🧩 역할 분담

| 이름   | 역할                                            |
| ------ | ----------------------------------------------- |
| 이영훈 | 프론트엔드 전체(서버 인프라부터 UI/UX까지) 설계·구현 전담           |
| 김경빈 | UI 설계 및 구현                       |
| 주성준 | Security 설정, AI 답변 구현, Rest API 개발  |
| 백승민 | 인프라 구축, 채팅 개발, Rest API 개발       |
| 김우빈 | Rest API 개발                          |

<br>

## 📌 주요 기능
1. **회원 기능**  
   - 회원 가입 / 로그인 / 로그아웃  
   - 회원 정보 수정 / 프로필 사진 업로드

2. **Q&A/마을 게시판**  
   - 게시글 생성 / 삭제 / 수정 / 조회  
   - 댓글 생성 / 삭제 / 수정 / 조회 / 채택 / 채택 취소

3. **AI 답변**  
   - 위치 정보 기반 맞춤형 답변 생성 (ChatGPT 등 사용)  
   - 생성된 답변을 사용자에게 전달 후, 종료까지 관리

4. **채팅**  
   - 1:1 채팅방 생성 / 삭제  
   - 채팅방 목록 / 최근 기록 / 이전 메시지 불러오기

<br>

## 🗂 테이블 설계 (ERD)

![danum-erd](https://github.com/user-attachments/assets/57da7a21-9e55-4279-8a56-e1d88a595c4d)

> 회원, 게시글, 댓글, 채팅, AI 로그 등 주요 테이블 간의 관계를 나타냅니다.

<br> 
