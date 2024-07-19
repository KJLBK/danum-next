This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# danum

### 🗂️ Folder Architecture

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
