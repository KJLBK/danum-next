# 빌드 단계
FROM node:20-alpine AS builder

WORKDIR /app

# 패키지 파일 복사
COPY package.json package-lock.json ./

# 환경 변수 설정
ENV HUSKY=0

# 모든 의존성 설치
RUN npm ci --ignore-scripts

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 프로덕션 이미지
FROM node:20-alpine AS runner

WORKDIR /app

# 환경 변수 설정
ENV NODE_ENV=production
ENV HUSKY=0

# 패키지 파일 복사
COPY package.json package-lock.json ./

# 프로덕션 의존성 설치
RUN npm ci --only=production --ignore-scripts

# 필요한 파일만 복사
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# 사용자 권한 설정 (보안 강화)
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]