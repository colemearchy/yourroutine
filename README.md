# 알파 루틴

운동과 금융에 특화된 루틴 관리 앱

## 주요 기능

### 1. ToDoList
- 할 일 추가, 완료, 삭제
- 알림 시간 설정
- 매일 반복 기능
- 자동 저장 (Zustand persist)

### 2. 다이어리
- 날짜별 일기 작성
- 자동 저장 (1초 디바운스)
- 캘린더 인터페이스

### 3. 운동 루틴 시각화
- 운동 부위별 기록 (하체, 가슴, 등, 팔)
- 주간 운동 기록 시각화
- 운동 목록 및 메모 기능
- 이모지로 직관적인 표현

### 4. 금융/주식 투자 기록
- 주식 매수/매도 기록
- 종목별 포트폴리오 요약
- 날짜별 거래 내역
- 평균 단가 자동 계산

## 기술 스택

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand (with persist middleware)
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **PWA**: Web App Manifest

## 디자인

- **메인 컬러**: 밝은 오렌지 (#f97316)
- **레이아웃**: 모바일 우선 반응형 디자인
- **네비게이션**: 하단 탭 바

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 프로젝트 구조

```
src/
├── components/        # React 컴포넌트
│   ├── Layout.tsx    # 메인 레이아웃
│   ├── Home.tsx      # 홈 페이지
│   ├── TodoList.tsx  # 할 일 목록
│   ├── Diary.tsx     # 다이어리
│   ├── Workout.tsx   # 운동 기록
│   └── Finance.tsx   # 금융 기록
├── store/            # 상태 관리
│   └── useStore.ts   # Zustand 스토어
├── types/            # TypeScript 타입 정의
│   └── index.ts
├── utils/            # 유틸리티 함수
│   ├── date.ts       # 날짜 관련 함수
│   └── notifications.ts  # 알림 관련 함수
├── App.tsx           # 메인 앱 컴포넌트
└── main.tsx          # 엔트리 포인트
```

## 데이터 저장

- **로컬 스토리지**: Zustand persist 미들웨어를 통해 브라우저의 localStorage에 자동 저장
- **키**: `routine-storage`

## 향후 개발 계획

- [ ] 주식 실시간 가격 API 연동
- [ ] 운동 수익률/성과 분석
- [ ] 금융 수익률 계산 및 차트
- [ ] 푸시 알림 (Service Worker)
- [ ] 데이터 내보내기/가져오기
- [ ] 다크 모드
- [ ] 소셜 공유 기능

## 라이선스

MIT
