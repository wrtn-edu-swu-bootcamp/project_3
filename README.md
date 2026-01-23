# RE:ACTION - 사장님을 위한 리뷰 비서

> 이번 주 리포트를 3분 요약으로 보여드려요

B2B SaaS 모바일 앱 (40-70대 소상공인 대상)  
WCAG 2.1 AA 준수 + 반응형 디자인

---

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 빌드

```bash
npm run build
npm start
```

---

## 📱 화면 구조

### Screen 0: 내 가게 등록 (`/`)
- 배민 링크 입력
- 유효성 검사 (빈 값, URL 형식, 배민 링크)
- API로 가게명 추출 또는 직접 입력
- "샘플로 먼저 보기" → Screen 1

### Screen 1: 데모 랜딩 (`/demo`)
- Hero (브랜드 소개)
- Store Card 3개 (샘플 가게)
- Priority Chips (긴급/고려/잘함)
- 데스크톱 2열 그리드

### Screen 2: 주간 리포트 (`/report`)
- 가게명 주간 리포트
- 한 줄 요약
- Action Card (긴급/고려/잘함)
- 아코디언 (대안 보기/접기)
- Empty State (긴급 0건 토글 데모)
- Feedback Buttons
- "설문으로 넘어가기" → Screen 3

### Screen 3: 설문 (`/survey`)
- 1화면 1질문 (6개 질문)
- 진행률 표시 (aria-live)
- 라디오 버튼 (44px 터치 영역)
- [다음] / [제출] 버튼

---

## 🔌 API

### POST `/api/resolve-store`

배민 링크에서 가게명 추출

**Request:**
```json
{
  "url": "https://baemin.com/..."
}
```

**Response:**
```json
{
  "storeName": "A치킨" // 또는 null
}
```

**처리 로직:**
1. fetch로 HTML 가져오기
2. og:title / title 태그 파싱
3. 실패 시 storeName=null 반환 → 프론트에서 직접 입력

---

## 🎨 디자인 시스템

### 토큰 (CSS Variables)

- **Color**: `--color-bg-primary`, `--color-urgent`, `--color-good`, etc.
- **Typography**: `--type-h1`, `--type-body`, `--type-caption`
- **Spacing**: `--space-m`, `--space-l`, `--space-card-padding`
- **Radius**: `--radius-card`, `--radius-chip`, `--radius-button`
- **Shadow**: `--shadow-card`, `--shadow-focus`
- **Breakpoint**: `768px` (tablet), `1024px` (desktop)

### 주요 규칙

1. **모바일 우선**: 360px 기준, 768/1024 breakpoint
2. **터치 영역**: 인터랙티브 요소만 44px+
3. **텍스트 정렬**: left 기본 (Hero 브랜드명만 center)
4. **포커스**: `:focus-visible` + `--shadow-focus`
5. **아코디언**: CSS Grid `grid-template-rows` (300ms ease-out)
6. **Motion Reduction**: `prefers-reduced-motion` 지원
7. **카피**: 20자 내외, 존댓말, 불안 조성 금지

### 컴포넌트

- `AppHeader`: 뒤로가기 + 로고
- `Hero`: 브랜드 소개 (Screen 1만)
- `PriorityChip`: 정적 칩 (긴급/고려/잘함)
- `StoreCard`: CTA 버튼만 클릭 (카드 전체 클릭 X)
- `ActionCard`: 아코디언 (대안 보기/접기, Esc 권장)
- `EmptyState`: Dynamic (role="status") vs Static
- `FeedbackButtons`: 도움돼요/아쉬워요 + 의견 남기기

---

## ♿ 접근성

### WCAG 2.1 AA 준수

- ✅ 색상 대비: 4.5:1 이상 (WebAIM 검증)
- ✅ 터치 영역: 버튼/라디오 44px+
- ✅ 포커스: 모든 인터랙티브 요소
- ✅ 스크린리더: ARIA (label, role, live, expanded, controls)
- ✅ 키보드: Tab, Enter, Space, Esc (권장)
- ✅ 이모지: 장식용 `aria-hidden`, 의미는 텍스트 우선

### ID 유니크 규칙

- `useId()` 훅 사용
- `aria-controls`, `aria-labelledby`에 `{uniqueId}` 패턴 적용

---

## 📦 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Font**: Pretendard (CDN)
- **Icons**: Emoji 우선

---

## 📝 TODO (향후 개선)

- [ ] 실제 배민 크롤링 API 구축 (현재는 간단한 HTML 파싱)
- [ ] 가게명 직접 입력 UI를 인라인 or 모달로 개선
- [ ] 리포트 데이터 백엔드 연동 (현재 하드코딩)
- [ ] 설문 결과 저장 (현재 alert만)
- [ ] 피드백 버튼 클릭 시 서버 전송
- [ ] 로딩 skeleton UI
- [ ] 에러 페이지 (404, 500)
- [ ] PWA 지원 (manifest, service worker)
- [ ] 다크모드 (선택)

---

## 📚 참고 문서

- [Design System v1.3](./docs/design-guide.md)
- [Wireframes](./docs/wireframes.md)
- [Plan](./docs/plan.md)

---

**문의**: 개발팀 채널로 문의해주세요.
