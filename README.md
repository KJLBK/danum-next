# danum

# 🗂️ Folder Architecture

-   GPT 기반으로 한 폴더 아키텍쳐 (이후 달라질 수 있음.)

```
my-next-app/
│
├── public/
│   └── assets/          # 정적 자산 (이미지, 폰트 등)
│
├── src/
│   ├── components/      # 재사용 가능한 React 컴포넌트
│   ├── pages/           # Next.js 페이지 컴포넌트
│   │   ├── api/         # API 라우트 (서버리스 함수)
│   │   ├── _app.js      # 앱 초기화 (전역 설정)
│   │   ├── _document.js # HTML 문서 구조 정의
│   │   └── index.js     # 홈 페이지
│   ├── styles/          # 전역 스타일, CSS 모듈
│   ├── utils/           # 유틸리티 함수 및 헬퍼
│   ├── hooks/           # 커스텀 훅
│   ├── contexts/        # React 컨텍스트 (전역 상태 관리)
│   └── types/           # TypeScript 타입 정의 (TS 사용 시)
│
├── .gitignore           # Git 무시 파일
├── package.json         # 패키지 관리
├── next.config.js       # Next.js 설정 파일
├── tsconfig.json        # TypeScript 설정 파일 (TS 사용 시)
└── README.md            # 프로젝트 설명서
```
# DANUM API Documentation (Table Format)

## Table of Contents
1. [VillageController](#villagecontroller)
2. [VillageCommentController](#villagecommentcontroller)
3. [QuestionController](#questioncontroller)
4. [QuestionCommentController](#questioncommentcontroller)
5. [ChatRoomController](#chatroomcontroller)
6. [OpenAiController](#openaicontroller)
7. [MemberController](#membercontroller)
8. [TestController](#testcontroller)

## VillageController

| Endpoint | HTTP Method | Function | Parameters | Returns |
|----------|-------------|----------|------------|---------|
| /board/village/show | GET | getVillageBoardList | None | ResponseEntity<?> |
| /board/village/like/{id} | POST | likeStatus | None | ResponseEntity<?> |
| /board/village/show/{id} | GET | getVillageBoardById | None | ResponseEntity<?> |
| /board/village/new | POST | createVillageBoard | RequestBody: VillageNewDto (email: String, title: String, content: String) | ResponseEntity<?> |

## VillageCommentController

| Endpoint | HTTP Method | Function | Parameters | Returns |
|----------|-------------|----------|------------|---------|
| /board/village/comment/update | PUT | updateVillageBoardComment | RequestBody: VillageCommentUpdateDto (id: Long, content: String) | ResponseEntity<?> |
| /board/village/comment/delete/{id} | DELETE | deleteVillageBoardComment | None | ResponseEntity<?> |
| /board/village/comment/show/{id} | GET | getVillageBoardForCommentList | None | ResponseEntity<?> |
| /board/village/comment/new | POST | createVillageBoardComment | RequestBody: VillageCommentNewDto (village_id: Long, member_email: String, content: String) | ResponseEntity<?> |

## QuestionController

| Endpoint | HTTP Method | Function | Parameters | Returns |
|----------|-------------|----------|------------|---------|
| /board/question/like/{id} | POST | likeStatus | None | ResponseEntity<?> |
| /board/question/show | GET | getQuestionBoardList | None | ResponseEntity<?> |
| /board/question/show/{id} | GET | getQuestionBoardById | None | ResponseEntity<?> |
| /board/question/new | POST | createQuestionBoard | RequestBody: QuestionNewDto (email: String, title: String, content: String, createId: Long) | ResponseEntity<?> |

## QuestionCommentController

| Endpoint | HTTP Method | Function | Parameters | Returns |
|----------|-------------|----------|------------|---------|
| /board/question/comment/new | POST | createQuestionBoardComment | RequestBody: QuestionCommentNewDto (question_id: Long, member_email: String, content: String) | ResponseEntity<?> |
| /board/question/comment/delete/{id} | DELETE | deleteQuestionBoardComment | None | ResponseEntity<?> |
| /board/question/comment/show/{id} | GET | getQuestionBoardForCommentList | None | ResponseEntity<?> |
| /board/question/comment/update | PUT | updateQuestionBoardComment | RequestBody: QuestionCommentUpdateDto (id: Long, content: String) | ResponseEntity<?> |

## ChatRoomController

| Endpoint | HTTP Method | Function | Parameters | Returns |
|----------|-------------|----------|------------|---------|
| /chat/room | GET | rooms | None | String |
| /chat/room | POST | createRoom | RequestBody: String | ChatRoom |
| /chat/room/{roomId} | GET | roomInfo | None | ChatRoom |
| /chat/rooms | GET | room | None | List<ChatRoom> |
| /chat/room/enter/{roomId} | GET | roomDetail | None | String |

## OpenAiController

| Endpoint | HTTP Method | Function | Parameters | Returns |
|----------|-------------|----------|------------|---------|
| /open-ai | POST | generate | RequestBody: OpenAiUserMessageDto (message: String) | ResponseEntity<OpenAiResponse> |
| /open-ai/progressing/message | GET | loadProgressingMessage | None | ResponseEntity<List<OpenAiMessage>> |
| /open-ai/progressing/conversation | GET | loadProgressingConversation | None | ResponseEntity<OpenAiConversation> |
| /open-ai/{id} | GET | loadMessage | None | ResponseEntity<List<OpenAiMessage>> |
| /open-ai/{id} | PATCH | close | None | ResponseEntity<Void> |

## MemberController

| Endpoint | HTTP Method | Function | Parameters | Returns |
|----------|-------------|----------|------------|---------|
| /member/delete | DELETE | delete | RequestBody: DeleteDto (email: String) | ResponseEntity<?> |
| /member/update | PUT | update | RequestBody: UpdateDto (email: String, password: String, phone: String, name: String) | ResponseEntity<?> |
| /member/login | POST | login | RequestBody: LoginDto (email: String, password: String) | ResponseEntity<?> |
| /member/join | POST | register | RequestBody: RegisterDto (email: String, password: String, phone: String, name: String) | ResponseEntity<?> |

## TestController

| Endpoint | HTTP Method | Function | Parameters | Returns |
|----------|-------------|----------|------------|---------|
| /test | GET | test | None | String |
