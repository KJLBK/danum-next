# 기본 이미지를 Node.js 18 또는 20 버전으로 업그레이드
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 파일만 먼저 복사
COPY package.json package-lock.json ./

# 종속성 설치 (clean install)
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 프로덕션 이미지
FROM node:20-alpine AS runner

WORKDIR /app

# 환경 변수 설정
ENV NODE_ENV=production

# 필요한 파일만 복사
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 사용자 권한 설정 (보안 강화)
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]