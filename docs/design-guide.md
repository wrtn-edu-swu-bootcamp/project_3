# 리액션(RE:ACTION) 서비스 디자인 시스템

> **버전**: 1.3  
> **최종 수정**: 2026-01-22  
> **대상**: 개발팀, 디자인팀, PM  
> **기준**: [wireframes.md](wireframes.md)  
> **목표**: WCAG 2.1 AA 준수 + 40-70대 접근성 최적화 + 반응형 대응

---

## 📋 수정 요약 (v1.2 → v1.3 반응형 개선)

1. **컨테이너/카드 폭 중복 제거**: `.container`가 padding 책임, `.card`는 `width: 100%`로 단순화. 이중 축소 방지
2. **Breakpoint 범위 명시**: 0-767 (모바일) / 768-1023 (태블릿) / 1024+ (데스크톱) 명확화. 375/414/430 줄바꿈 규칙 추가
3. **텍스트 정렬 left 기본**: Hero 포함 모든 텍스트 left-align (40-70대 가독성). center는 예외만 허용
4. **Store Card 클릭 패턴 확정**: CTA 버튼만 클릭 가능으로 고정 (패턴 B 채택). 카드 전체 클릭 제거
5. **Typography 토큰 일관화**: `--type-h1` 프리셋 토큰 도입. 컴포넌트 전체 사용 토큰 표기 수정
6. **데스크톱 2열 그리드 추가**: Screen 1 샘플 카드만 1024px+ 2열 허용. Screen 2는 1열 고정 (가독성)
7. **Esc 키 권장 표현**: 아코디언 Esc 접기를 "필수" → "권장 (데스크톱)" 로 완화. 모바일 버튼 토글 명시

---

## 목차

1. [디자인 원칙](#1-디자인-원칙)
2. [디자인 토큰](#2-디자인-토큰)
3. [컬러 시스템](#3-컬러-시스템)
4. [타이포그래피](#4-타이포그래피)
5. [레이아웃/그리드/여백](#5-레이아웃그리드여백)
6. [컴포넌트 라이브러리](#6-컴포넌트-라이브러리)
7. [아이콘/일러스트](#7-아이콘일러스트)
8. [모션/인터랙션](#8-모션인터랙션)
9. [카피라이팅](#9-카피라이팅)
10. [접근성](#10-접근성)
11. [화면별 적용 가이드](#11-화면별-적용-가이드)
12. [개발 체크리스트](#12-개발-체크리스트)

---

## 1. 디자인 원칙

### "리액션스럽다"의 정의

리액션은 **3분 내 우선순위를 명확히 파악하고 즉시 행동할 수 있는** 인터페이스를 제공합니다.

1. **우선순위가 시각적으로 명확하다**: 🚨긴급 문제는 최상단에 크게, ✅잘함은 아래에 작게
2. **한 눈에 들어온다**: 3분 내 핵심 문제와 해결책을 파악 가능
3. **손가락이 편하다**: 44px 이상 터치 영역, 넉넉한 여백, 실수 방지
4. **눈이 편하다**: 큰 글자(18px+), 높은 대비, 짧은 문장(20자 내외)
5. **친절하고 신뢰할 수 있다**: 전문용어 없이, 불안 조성 없이, 명확한 근거 제시

### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| 우선순위에 따라 크기/위치/강조 차별화 | 모든 정보를 동일한 크기/무게로 나열 |
| 색상 + 아이콘 + 텍스트 라벨 병행 | 색상만으로 정보 구분 |
| 터치 가능 요소만 44px 이상 확보 | 정적 요소에 불필요한 터치 영역 적용 |
| 문장 20자 내외, 줄바꿈으로 가독성 확보 | 긴 문장, 전문용어, 애매한 표현 |
| "{대상} 보기 ▾/접기 ▴" 템플릿 사용 | 아이콘만으로 펼침/접힘 표시 |
| 긴급 카드는 두꺼운 테두리(3px)/강조 배경 | 모든 카드 동일 디자인 |
| Empty State에 케이스별 메시지 | 빈 화면 방치 |
| 구체적 CTA ("샘플 리포트 보기") | 추상적 CTA ("더보기", "확인") |

### 정보 계층

| 계층 | 역할 | 예시 | 스타일 토큰 |
|---|---|---|---|
| **Display** | 브랜드 제목 (Hero만) | "리액션" | `--type-display-title` (32px, Bold) |
| **H1** | 페이지 제목 | "A치킨 주간 리포트" | `--type-h1` (24px, Bold) |
| **H2** | 섹션 제목 | "먼저 고칠 일" | `--type-h2` (20px, Bold) |
| **Large Body** | 핵심 액션 정보 | "배달 시간 지연" | `--type-large-body` (18px, Medium) |
| **Body** | 본문, 메타 정보 | "부정 60% • 40건" | `--type-body` (16px, Regular) |
| **Caption** | 보조 안내 | "일부 리뷰 누락 가능" | `--type-caption` (14px, Regular) |

**적용 규칙**:
- Display Title은 Hero 브랜드명에만 사용
- 페이지당 H1은 1개 (화면 제목)
- H2는 큰 섹션 구분 (먼저 고칠 일, 상세 분석)
- Large Body는 우선순위 높은 액션/이슈명에 사용

---

## 2. 디자인 토큰

### Color Tokens

```css
:root {
  /* Background */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F8F9FA;
  
  /* Surface */
  --color-surface-card: #FFFFFF;
  --color-surface-elevated: #FFFFFF; /* + shadow-card-elevated */
  
  /* Text */
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #5A5A5A;
  --color-text-tertiary: #909090;
  --color-text-disabled: #C4C4C4;
  --color-text-inverse: #FFFFFF;
  
  /* Border */
  --color-border-default: #E0E0E0;
  --color-border-focus: #4A90E2;
  --color-border-disabled: #F0F0F0;
  
  /* Priority States */
  --color-urgent: #E53E3E;
  --color-urgent-bg: #FFF5F5;
  --color-consider: #DD6B20;
  --color-consider-bg: #FFFAF0;
  --color-good: #38A169;
  --color-good-bg: #F0FFF4;
  
  /* Semantic */
  --color-info: #3182CE;
  --color-info-bg: #EBF8FF;
  --color-warning: #D69E2E;
  --color-warning-bg: #FEFCBF;
  --color-warning-text: #744210;
}
```

### Typography Tokens (프리셋 도입)

```css
:root {
  /* Font Family */
  --font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
  
  /* Typography Presets */
  --type-display-title: 700 32px/1.4 var(--font-family);
  --type-h1: 700 24px/1.4 var(--font-family);
  --type-h2: 700 20px/1.4 var(--font-family);
  --type-large-body: 500 18px/1.5 var(--font-family);
  --type-body: 400 16px/1.6 var(--font-family);
  --type-caption: 400 14px/1.5 var(--font-family);
  --type-small: 400 12px/1.4 var(--font-family);
  
  /* 개별 토큰 (세밀한 조정 시) */
  --font-size-display: 32px;
  --font-size-h1: 24px;
  --font-size-h2: 20px;
  --font-size-large-body: 18px;
  --font-size-body: 16px;
  --font-size-caption: 14px;
  --font-size-small: 12px;
  
  --font-weight-bold: 700;
  --font-weight-medium: 500;
  --font-weight-regular: 400;
  
  --line-height-tight: 1.4;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;
  
  --letter-spacing-tight: -0.02em;
  --letter-spacing-default: 0;
}

/* 사용 예시 */
h1 {
  font: var(--type-h1);
  letter-spacing: var(--letter-spacing-tight);
}
```

**적용 원칙**:
- 프리셋 토큰(`--type-*`)을 우선 사용 (일관성)
- 개별 토큰은 예외적 조정 시만 사용

### Spacing Tokens

```css
:root {
  --space-xs: 4px;
  --space-s: 8px;
  --space-m: 16px;
  --space-l: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;
  
  /* Component Specific */
  --space-card-padding: 20px;
  --space-container-padding: 20px;
  --space-section-gap: 32px;
  --space-card-gap: 16px;
}
```

### Radius Tokens

```css
:root {
  --radius-card: 12px;
  --radius-chip: 18px;
  --radius-chip-small: 14px;
  --radius-button: 24px;
  --radius-button-large: 28px;
}
```

### Shadow Tokens

```css
:root {
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.12);
  --shadow-card-pressed: 0 1px 4px rgba(0, 0, 0, 0.1);
  --shadow-focus: 0 0 0 4px rgba(74, 144, 226, 0.3);
}
```

### Breakpoint Tokens (범위 명시)

```css
:root {
  /* Breakpoint 범위 */
  --breakpoint-mobile-max: 767px;    /* 모바일: 0 ~ 767px */
  --breakpoint-tablet-min: 768px;    /* 태블릿: 768px ~ 1023px */
  --breakpoint-tablet-max: 1023px;
  --breakpoint-desktop-min: 1024px;  /* 데스크톱: 1024px+ */
  
  /* Container Max Width */
  --container-mobile-max: 100%;
  --container-tablet-max: 640px;
  --container-desktop-max: 768px;
}
```

**범위 정의**:
- **모바일**: 0-767px (360px, 375px, 414px, 430px 포함)
- **태블릿**: 768-1023px
- **데스크톱**: 1024px+

---

## 3. 컬러 시스템

### 철학

- **채도**: 중간 채도 (S 50-70%) - 눈에 부담 없음
- **명도**: 밝은 배경 + 어두운 텍스트 (높은 대비)
- **접근성**: WCAG AA (4.5:1) 최소 목표

### 색상 대비 검증 매트릭스

개발 완료 후 WebAIM Contrast Checker로 아래 13개 조합을 검증하세요.

| 조합 | 전경 | 배경 | 최소 대비 | 비고 |
|---|---|---|---|---|
| **Priority Chip 텍스트** | `#FFFFFF` | `#E53E3E` (Urgent) | 4.5:1 | 칩 내부 흰 텍스트 |
| | `#FFFFFF` | `#DD6B20` (Consider) | 4.5:1 | |
| | `#FFFFFF` | `#38A169` (Good) | 4.5:1 | |
| **Action Card 본문** | `#1A1A1A` | `#FFF5F5` (Urgent BG) | 4.5:1 | 카드 배경 위 본문 |
| | `#1A1A1A` | `#FFFAF0` (Consider BG) | 4.5:1 | |
| | `#1A1A1A` | `#F0FFF4` (Good BG) | 4.5:1 | |
| **카드 테두리** | `#E53E3E` | `#FFFFFF` | 3:1 | UI 요소 대비 |
| | `#DD6B20` | `#FFFFFF` | 3:1 | |
| | `#38A169` | `#FFFFFF` | 3:1 | |
| **일반 텍스트** | `#1A1A1A` | `#FFFFFF` | 4.5:1 | Primary Text |
| | `#5A5A5A` | `#FFFFFF` | 4.5:1 | Secondary Text |
| **경고 배지** | `#744210` | `#FEFCBF` (Warning BG) | 4.5:1 | Badge Chips |
| **Focus State** | `#4A90E2` | `#FFFFFF` | 3:1 | 포커스 아웃라인 |

**검증 실패 시 대응**:
1. 색상 조정: HEX 코드를 밝게/어둡게 변경
2. 폰트 굵기 증가: Regular → Medium → Bold
3. 테두리 두께 증가: 1px → 2px → 3px (UI 요소)

### 상태별 사용 규칙

| 상태 | 카드 테두리 | 카드 배경 | 칩 배경 | 아이콘 |
|---|---|---|---|---|
| **긴급** | 3px solid `--color-urgent` | `--color-urgent-bg` | `--color-urgent` + 흰 텍스트 | 🚨 + 텍스트 라벨 |
| **고려** | 2px solid `--color-consider` | `--color-consider-bg` | `--color-consider` + 흰 텍스트 | ⚠️ + 텍스트 라벨 |
| **잘함** | 1px solid `--color-good` | `--color-good-bg` | `--color-good` + 흰 텍스트 | ✅ + 텍스트 라벨 |

**원칙**:
- 색상만으로 구분 금지: 반드시 **테두리 두께 차이 + 이모지 + 텍스트**
- 카드 배경: 연한 배경으로 전체를 감싸되 텍스트 대비 4.5:1 유지
- 포커스: 모든 인터랙티브 요소에 `--color-border-focus` + `--shadow-focus`

---

## 4. 타이포그래피

### 폰트

**주 폰트**: Pretendard (가변폰트)  
**폰트 스택**: `--font-family` 토큰 사용

### 타입 스케일

| 스타일 | 프리셋 토큰 | 크기 | 굵기 | 줄간격 | 자간 | 용도 |
|---|---|---|---|---|---|---|
| **Display Title** | `--type-display-title` | 32px | Bold | 1.4 | -0.02em | Hero 브랜드명만 |
| **H1** | `--type-h1` | 24px | Bold | 1.4 | -0.02em | 페이지 제목 |
| **H2** | `--type-h2` | 20px | Bold | 1.4 | -0.01em | 섹션 제목 |
| **Large Body** | `--type-large-body` | 18px | Medium | 1.5 | 0 | 핵심 액션/이슈명 |
| **Body** | `--type-body` | 16px | Regular | 1.6 | 0 | 본문, 메타, 버튼 |
| **Caption** | `--type-caption` | 14px | Regular | 1.5 | 0 | 보조 안내, 칩 내부 |
| **Small** | `--type-small` | 12px | Regular | 1.4 | 0 | 극소 라벨 (필요 시만) |

### 가독성 규칙 (40-70대 + 반응형)

**기본 원칙**:
- 최소 폰트: Body(16px) 이상
- 줄간격: 1.5~1.6 (넉넉한 세로 공간)
- 문장 길이: 모바일 20자, 태블릿 30자, 데스크톱 40자 내외
- 최대 줄 수: 본문 3줄 이내 (긴 텍스트는 아코디언)

**줄바꿈 처리 (375/414/430 대응)**:
```css
/* 한글: 단어 단위 유지 */
body {
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* 영문/URL: 긴 단어 잘림 방지 */
a, code {
  word-break: break-word;
}
```

**긴 텍스트 처리**:
```css
/* 한 줄 말줄임 */
.ellipsis-single {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 2줄 말줄임 */
.ellipsis-multi {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 텍스트 정렬 기본 규칙

**40-70대 가독성을 위한 left-align 원칙**:
- 왼쪽 정렬이 시선 흐름에 자연스러움 (읽기 시작점 일정)
- center 정렬은 짧은 제목/강조 문구에만 제한적 사용
- 본문/메타/리스트는 항상 left-align

```css
/* 기본 정렬 */
body {
  text-align: left; /* 전역 기본 */
}

/* 예외: Hero 브랜드명만 center (강조) */
.hero-title {
  text-align: center; /* Display Title만 */
}

/* Hero 본문은 left */
.hero-subtitle,
.hero-support {
  text-align: left;
}
```

**왜 left-align이 기본인가**:
1. **예측 가능성**: 각 줄 시작점이 동일 (눈 피로 감소)
2. **가독성**: 긴 텍스트에서 center는 지그재그 시선 유발
3. **접근성**: 저시력자/난독증에게 left-align이 유리

### 표기 규칙

| 항목 | 표기법 | 예시 |
|---|---|---|
| **기간** | M/D~M/D | 1/12~1/18 |
| **메타 구분자** | 가운뎃점 `•` (앞뒤 띄어쓰기) | 1/12~1/18 • 리뷰 67 |
| **수치 구분자** | 중간점 `·` (앞뒤 띄어쓰기) | 긍정 85% · 부정 15% |
| **퍼센트** | 숫자% (띄어쓰기 없음) | 부정 60% |
| **건수** | 숫자건 (띄어쓰기 없음) | 40건 |
| **칩 내부** | 이모지 [띄어쓰기] 텍스트 [띄어쓰기] 숫자 | [🚨 긴급 1] |

**금지 규칙**:
- 구분자 혼용 (메타는 `•`, 수치는 `·` 고정)
- 띄어쓰기 불일치
- 구분자 앞뒤 띄어쓰기 생략

---

## 5. 레이아웃/그리드/여백

### 컨테이너 규칙 (중복 제거)

**설계 원칙**:
- `.container`가 폭과 패딩을 책임
- `.card`는 container 내부에서 `width: 100%`로 확장
- 이중으로 패딩/폭 제한하지 않음 (구현 단순화)

```css
.container {
  width: 100%;
  max-width: var(--container-mobile-max); /* 100% */
  padding: 0 var(--space-container-padding); /* 20px */
  margin: 0 auto;
}

@media (min-width: 768px) {
  .container {
    max-width: var(--container-tablet-max); /* 640px */
    padding: 0 var(--space-l); /* 24px */
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: var(--container-desktop-max); /* 768px */
    padding: 0 var(--space-xl); /* 32px */
  }
}
```

**컨테이너 폭 계산**:
- 모바일 360px: 360 - 40(패딩) = 320px (콘텐츠 폭)
- 태블릿 768px: 640px (중앙 정렬, 패딩 24px)
- 데스크톱 1024px+: 768px (중앙 정렬, 패딩 32px)

**왜 이렇게 하는가**:
- v1.2에서 `.card`에 `max-width: calc(100% - 40px)`를 적용하면, container padding과 이중으로 축소됨
- Container가 이미 패딩으로 콘텐츠 폭을 제한하므로, card는 `width: 100%`만 필요
- CSS 계산 단순화 + 반응형 대응 자동화

### 카드 폭 규칙 (단순화)

```css
.card {
  width: 100%;
  /* max-width 제거: container가 폭을 제한하므로 불필요 */
  margin: 0;
}
```

### Breakpoint 범위 (명확화)

| 범위 | 기기 | 화면 폭 예시 | 레이아웃 | 패딩 |
|---|---|---|---|---|
| **모바일** | 폰 | 360px, 375px, 414px, 430px | 1열 | 20px |
| **태블릿** | 태블릿 | 768px, 820px, 1024px | 1열 중앙 | 24px |
| **데스크톱** | 노트북/PC | 1280px, 1920px+ | 1열 중앙 (일부 2열) | 32px |

**미디어 쿼리 기준**:
```css
/* 모바일 (기본) */
@media (max-width: 767px) { /* 0 ~ 767px */ }

/* 태블릿 */
@media (min-width: 768px) and (max-width: 1023px) { }

/* 데스크톱 */
@media (min-width: 1024px) { }
```

### 데스크톱 그리드 옵션 (Screen 1만)

**Screen 1 샘플 카드**: 데스크톱에서 2열 그리드 허용

```css
.store-card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-card-gap); /* 16px */
}

@media (min-width: 1024px) {
  .store-card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-l); /* 24px */
  }
}
```

**그리드 규칙**:
- 카드 최소 폭: 300px (2열 유지 기준)
- 카드 최대 폭: 100% (1열 시)
- gap: 모바일 16px, 데스크톱 24px

**Screen 2/3**: 1열 고정 (리포트/설문은 가독성 최우선)

### 터치 타겟 규칙 (인터랙티브 전용)

| 요소 타입 | 최소 크기 | 적용 방법 |
|---|---|---|
| **버튼** (CTA) | 44×44px | 패딩으로 높이 확보 |
| **아코디언 트리거** | 48×48px | 패딩(14px 상하) |
| **라디오 버튼** | 44×44px | `<label>` 전체를 터치 영역으로 |
| **피드백 버튼** | 56px 높이 | 큰 CTA (16px 상하 패딩) |

**제외**: Priority Chip, Badge Chips (정적 정보, 클릭 불가)  
→ 터치 영역 대신 **가독성(14px Caption) + 간격(8px)** 기준 적용

### Spacing Scale 적용

| 토큰 | 값 | 사용처 |
|---|---|---|
| `--space-xs` | 4px | 아이콘-텍스트 간격 |
| `--space-s` | 8px | 칩 사이 간격 |
| `--space-m` | 16px | 카드 간격 |
| `--space-l` | 24px | 섹션 제목-콘텐츠 |
| `--space-xl` | 32px | 큰 섹션 간격 |
| `--space-xxl` | 48px | 화면 상하 여백 (필요 시) |

---

## 6. 컴포넌트 라이브러리

### 6.1 App Header

**Purpose**: 전역 네비게이션 (뒤로가기 + 브랜드)

**Anatomy**:
- Left: 뒤로 버튼 `←` (Screen 2, 3만)
- Center: "리액션" 로고
- Right: 비움 (MVP 단계)

**Variants**: 없음

**States**:
| State | Style |
|---|---|
| Default | 뒤로 버튼 opacity 1.0 |
| Pressed | 뒤로 버튼 opacity 0.6 |
| Focus | outline: 2px solid `--color-border-focus` |

**Specifications**:
- 높이: 56px
- 패딩: 0 16px
- 배경: `--color-surface-card`
- 하단 구분선: 1px solid `--color-border-default`
- 뒤로 버튼 터치 영역: 44×44px

**Typography**: `--type-h2` (로고)

**Accessibility**:
```html
<header role="banner">
  <button aria-label="뒤로가기">←</button>
  <h1 aria-label="리액션 홈">리액션</h1>
</header>
```

**Keyboard**:
- Tab: 뒤로 버튼 포커스
- Enter: 뒤로 이동

---

### 6.2 Hero (브랜드 영역)

**Purpose**: 서비스 가치 전달 (Screen 1만)

**Anatomy**:
1. Display Title: "리액션" (32px, Bold, **center**)
2. Subtitle: "사장님을 위한 리뷰 비서" (14px, **center**, Secondary)
3. Support: "이번 주 리포트를 3분 요약으로 보여드려요" (16px, Secondary, **left**)
4. Subtext: "RE:ACTION" (14px, Tertiary, **center**)

**Variants**: 없음

**States**: Static

**Specifications**:
- 높이: 240px (여백 포함)
- 패딩: 40px 20px
- 배경: `--color-bg-primary`
- 정렬: **Display Title + Subtitle + Subtext는 center, Support는 left**

**Typography**:
- Display Title: `--type-display-title`, center
- Subtitle: `--type-caption` + `--color-text-secondary`, center (리액션 바로 아래, 작은 글씨)
- Support: `--type-body` + `--color-text-secondary`, left
- Subtext: `--type-caption` + `--color-text-tertiary`, center

**Accessibility**:
```html
<header aria-label="리액션 서비스 소개" class="hero">
  <h1 style="text-align: center;">리액션</h1>
  <p style="text-align: center; font-size: 14px;">사장님을 위한 리뷰 비서</p>
  <p style="text-align: left;">이번 주 리포트를 3분 요약으로 보여드려요</p>
  <small style="text-align: center;" aria-label="영문명">RE:ACTION</small>
</header>
```

**정렬 규칙**:
- **center**: 브랜드명(리액션) + 부제(사장님을 위한 리뷰 비서) + 영문명(RE:ACTION) (강조)
- **left**: 본문/설명 (가독성)

---

### 6.3 Store Card

**Purpose**: 샘플 가게 정보와 우선순위 표시 (Screen 1)

**Anatomy**:
1. Header: 가게명 + 이모지 (🍗 A치킨)
2. Subheader: 업종 (🏪 치킨/튀김)
3. Meta: 기간 • 리뷰 수 (1/12~1/18 • 리뷰 67)
4. Chips: 우선순위 칩 (분리형)
5. CTA: "샘플 리포트 보기" 버튼

**Variants**: 없음 (칩 조합만 변경)

**States**:
| State | Style |
|---|---|
| Default | `--shadow-card` |
| Hover | `--shadow-card-hover` (데스크톱, 카드 전체 hover 효과) |
| Pressed | CTA 버튼만 `--shadow-card-pressed` + scale(0.98) |
| Focus | CTA 버튼에 outline + `--shadow-focus` |

**Specifications**:
- 폭: `width: 100%` (container 내부)
- 패딩: `--space-card-padding` (20px)
- 배경: `--color-surface-card`
- 테두리: 1px solid `--color-border-default`
- 모서리: `--radius-card` (12px)
- 그림자: `--shadow-card`
- 정렬: **left** (모든 텍스트)

**Spacing**:
- 가게명-업종: `--space-xs` (4px)
- 업종-메타: `--space-s` (8px)
- 메타-칩: `--space-m` (16px)
- 칩-CTA: `--space-m` (16px)

**Typography**:
- Header: `--type-large-body`
- Subheader/Meta: `--type-body`
- Chips: `--type-caption`
- CTA: `--type-body`

**Accessibility**:
```html
<article aria-labelledby="store-{uniqueId}">
  <h3 id="store-{uniqueId}">
    <span aria-hidden="true">🍗</span> A치킨
  </h3>
  <p><span aria-hidden="true">🏪</span> 치킨/튀김</p>
  <p>1/12~1/18 • 리뷰 67</p>
  <div aria-label="우선순위 요약">
    <span aria-label="긴급 1건">🚨 긴급 1</span>
    <span aria-label="고려 1건">⚠️ 고려 1</span>
  </div>
  <button>샘플 리포트 보기</button>
</article>
```

**Interaction (패턴 B: CTA 버튼만 클릭)**:
- ❌ 카드 전체 클릭: 불가 (혼란 방지)
- ✅ CTA 버튼만 클릭: Screen 2 이동
- Hover: 카드 전체에 시각적 피드백 (그림자 변화)
- Keyboard: Tab → CTA 포커스, Enter → 이동

**왜 CTA 버튼만 클릭하는가**:
1. **접근성**: 스크린리더가 명확한 버튼 인식
2. **터치 실수 방지**: 40-70대 사용자가 의도치 않은 클릭 방지
3. **포커스 명확성**: 키보드 사용자가 Tab으로 버튼만 포커스
4. **반응형 대응**: 작은 화면에서 카드 전체 클릭은 실수 유발

---

### 6.4 Priority Chips (정적 정보)

**Purpose**: 우선순위 상태 표시 (클릭 불가)

**Anatomy**:
- 이모지 + 텍스트 + 숫자 ([🚨 긴급 1])

**Variants**:
| Type | Background | Text Color |
|---|---|---|
| Urgent | `--color-urgent` | `--color-text-inverse` |
| Consider | `--color-consider` | `--color-text-inverse` |
| Good | `--color-good` | `--color-text-inverse` |

**States**: Static (정적 정보, 상호작용 없음)

**Specifications**:
- 높이: 36px (시각적)
- 패딩: 8px 16px
- 모서리: `--radius-chip` (18px)
- 폰트: `--type-caption`
- 칩 간 간격: `--space-s` (8px)

**터치 영역**: 불필요 (정적 정보)  
**가독성 기준**: Caption 14px + 8px 간격으로 충분

**Accessibility**:
```html
<!-- 정적 정보: role 없이 aria-label만 -->
<span aria-label="긴급 1건" style="background: var(--color-urgent)">
  <span aria-hidden="true">🚨</span> 긴급 1
</span>
```

**Content Rule**:
- 이모지 [띄어쓰기] 텍스트 [띄어쓰기] 숫자
- 순서: 긴급 → 고려 → 잘함 (좌→우)
- 0건인 경우 칩 미표시

---

### 6.5 Action Card

**Purpose**: 문제와 해결책 제시 (Screen 2)

**Anatomy**:
1. Header: 🚨 긴급 · [배달·서비스]
2. Issue: 배달 시간 지연
3. Metrics: 부정 60% • 40건
4. Action: 💡 피크타임 인력 추가
5. Tags: [비용:중] [시간:짧]
6. Accordion: [ 대안 보기 ▾ ]

**Variants**:
| Type | Border | Background |
|---|---|---|
| Urgent | 3px solid `--color-urgent` | `--color-urgent-bg` |
| Consider | 2px solid `--color-consider` | `--color-consider-bg` |
| Good | 1px solid `--color-good` | `--color-good-bg` |

**States**:
| State | Description |
|---|---|
| Collapsed | 아코디언 접힘 |
| Expanded | 아코디언 펼침 + 대안 리스트 표시 |

**Specifications**:
- 폭: `width: 100%` (container 내부)
- 패딩: `--space-card-padding` (20px)
- 모서리: `--radius-card` (12px)

**Action Tags (액션 칩) Variants**:
| Tag | Values | Style |
|---|---|---|
| 비용 | 낮/중/높 | 테두리 1px `--color-border-default`, 배경 `--color-surface-card` |
| 시간 | 짧/중/김 | 동일 |
| 난이도 | 하/중/상 | 동일 (대안 펼침 시만 표시) |

**Typography**:
- Header: `--type-large-body` + 상태 컬러
- Issue: `--type-large-body`
- Metrics/Action: `--type-body`
- Tags: `--type-caption`

**Accessibility**:
```html
<article aria-labelledby="action-{uniqueId}">
  <h3 id="action-{uniqueId}">
    <span aria-hidden="true">🚨</span> 긴급 · 배달·서비스
  </h3>
  <p>배달 시간 지연</p>
  <p>부정 60% • 40건</p>
  <p><span aria-hidden="true">💡</span> 피크타임 인력 추가</p>
  <div><span>비용:중</span> <span>시간:짧</span></div>
  <button 
    aria-expanded="false" 
    aria-controls="alternatives-{uniqueId}"
    aria-label="대안 보기"
  >
    대안 보기 ▾
  </button>
  <div id="alternatives-{uniqueId}" role="region" aria-labelledby="alternatives-heading-{uniqueId}" hidden>
    <h4 id="alternatives-heading-{uniqueId}">대안 목록</h4>
    <!-- 대안 1, 2, ... -->
  </div>
</article>
```

**Interaction**:
- 아코디언 클릭: `aria-expanded` 토글, 300ms ease-out 애니메이션
- Keyboard: Tab → 트리거 포커스, Enter/Space → 펼침/접힘

---

### 6.6 Empty State

**Purpose**: 긴급 문제 없음 안내

**Type 분리**:
| Type | 설명 | ARIA Role | 사용 케이스 |
|---|---|---|---|
| **Dynamic** | 로딩/필터 결과 | `role="status"` | 데이터 로딩 후 긴급 0건 |
| **Static** | 화면 상태 | role 불필요 | 초기 화면 (긴급 없음 고정) |

**Anatomy**:
- Icon: 🎉 (32px)
- Message: "이번 주는 긴급한 문제가 없어요"

**Variants**: 없음

**States**: Static

**Specifications**:
- 폭: `width: 100%` (container 내부)
- 높이: 160px
- 배경: `--color-bg-secondary`
- 테두리: 1px solid `--color-border-default`
- 모서리: `--radius-card`
- 패딩: 40px 20px
- 정렬: center

**Typography**: `--type-large-body`

**Accessibility**:
```html
<!-- Dynamic: 로딩 결과 -->
<div role="status" aria-live="polite" aria-label="긴급 문제 없음">
  <span aria-hidden="true">🎉</span>
  <p>이번 주는 긴급한 문제가 없어요</p>
</div>

<!-- Static: 초기 화면 -->
<div aria-label="긴급 문제 없음">
  <span aria-hidden="true">🎉</span>
  <p>이번 주는 긴급한 문제가 없어요</p>
</div>
```

---

### 6.7 Section Header

**Purpose**: 큰 섹션 구분

**Anatomy**:
- Title: H2 (예: "먼저 고칠 일")
- Support Text: 보조 문구 (선택)

**Variants**:
| Type | 배경 사용 조건 |
|---|---|
| Default | 배경 없음 (제목만) |
| With Background | 아코디언으로 접힌 섹션에만 사용 (예: "상세 분석") |

**Background Rule**:
- **사용**: 접힘 가능한 섹션 ("카테고리 상세 보기 ▾")
- **불사용**: 항상 표시되는 섹션 ("먼저 고칠 일")

**Specifications**:
- 폭: 100%
- 상단 여백: `--space-section-gap` (32px)
- 하단 여백: `--space-m` (16px)
- 배경 (사용 시): `--color-bg-secondary`
- 패딩 (배경 사용 시): 12px 20px

**Typography**:
- Title: `--type-h2`
- Support: `--type-body` + `--color-text-secondary`

**Accessibility**:
```html
<h2>먼저 고칠 일</h2>
<p>가장 급한 1가지만 먼저 볼게요</p>
```

---

### 6.8 Accordion Trigger

**Purpose**: 펼침/접힘 인터랙션

**Anatomy**:
- Text: "{대상} 보기" / "{대상} 접기"
- Icon: ▾ (아래) / ▴ (위)

**Label Template**:
| 대상 | Collapsed | Expanded |
|---|---|---|
| 대안 | 대안 보기 ▾ | 대안 접기 ▴ |
| 카테고리 상세 | 카테고리 상세 보기 ▾ | 카테고리 상세 접기 ▴ |
| 면책 | 면책 보기 ▾ | 면책 접기 ▴ |

**States**:
| State | Style |
|---|---|
| Default | Primary Text, 아이콘 ▾ |
| Hover | 배경 rgba(0,0,0,0.04) (데스크톱) |
| Pressed | 배경 rgba(0,0,0,0.08) |
| Focus | outline + `--shadow-focus` |
| Expanded | Primary Text, 아이콘 ▴ |

**Specifications**:
- 높이: 48px (터치 영역)
- 폭: 100%
- 패딩: 14px 20px
- 폰트: `--type-body`
- 아이콘-텍스트 간격: `--space-xs` (4px)

**Accessibility**:
```html
<button
  aria-expanded="false"
  aria-controls="content-{uniqueId}"
  aria-label="{대상} 보기"
>
  {대상} 보기 ▾
</button>
```

**Interaction**:
- Click/Enter/Space: `aria-expanded` 토글, 300ms ease-out
- **Keyboard (권장)**:
  - Tab: 포커스 이동
  - **Esc: 접기 (데스크톱 환경 권장)**
    - 모바일: 버튼 토글이 기본 (Esc 키 없음)
    - 데스크톱: Esc로 빠른 접기 지원 (선택 사항)

---

### 6.9 Badge Chips

**Purpose**: 주의/경고 정보 (정적)

**Anatomy**:
- Text: [확신 낮음] [표본 부족]

**Variants**: 없음 (Warning 고정)

**States**: Static

**Specifications**:
- 높이: 28px
- 패딩: 6px 12px
- 배경: `--color-warning-bg`
- 테두리: 1px solid `--color-warning`
- 모서리: `--radius-chip-small` (14px)
- 폰트: `--type-caption`
- 텍스트 색: `--color-warning-text`

**Accessibility**:
```html
<!-- 정적 정보: role 없음 -->
<span aria-label="확신 낮음 경고">[확신 낮음]</span>
<span aria-label="표본 부족 경고">[표본 부족]</span>
```

---

### 6.10 Feedback Buttons

**Purpose**: 리포트 피드백 수집

**Anatomy**:
- Question: "도움이 됐나요?"
- Buttons: [👍 도움돼요] [👎 아쉬워요]
- CTA: [💬 의견 남기기]

**Variants**:
| Button | Width | Height | Background | Border |
|---|---|---|---|---|
| 도움돼요 | 140px | 56px | `--color-good-bg` | 1px solid `--color-good` |
| 아쉬워요 | 140px | 56px | `--color-urgent-bg` | 1px solid `--color-urgent` |
| 의견 남기기 | 100% | 48px | `--color-surface-card` | 1px solid `--color-border-default` |

**States**:
| State | Style |
|---|---|
| Default | 기본 배경/테두리 |
| Hover | 배경 채도 +10% (데스크톱) |
| Pressed | 배경 채도 +20% |
| Selected | 배경 진하게, 테두리 2px |
| Focus | outline + `--shadow-focus` |

**Typography**: `--type-body`

**Accessibility**:
```html
<section aria-label="리포트 피드백">
  <p>도움이 됐나요?</p>
  <button aria-label="도움이 되었습니다">
    <span aria-hidden="true">👍</span> 도움돼요
  </button>
  <button aria-label="아쉬웠습니다">
    <span aria-hidden="true">👎</span> 아쉬워요
  </button>
  <button>
    <span aria-hidden="true">💬</span> 의견 남기기
  </button>
</section>
```

---

### 6.11 Survey

**Purpose**: MVP 검증 피드백 수집

**Flow**: 1화면 1질문 → [다음] → 다음 질문 → [제출] → 완료

**Anatomy**:
1. Progress: "진행 1/6" (동적)
2. Question: 질문 텍스트
3. Options: 라디오 버튼 5개
4. Button: [다음] / [제출]

**Variants**: 없음

**States**:
| State | Description |
|---|---|
| Unanswered | [다음] 비활성 (disabled) |
| Answered | [다음] 활성 |
| Radio Selected | 배경 `--color-info-bg`, 테두리 2px solid `--color-info` |

**Specifications**:
- 질문 카드 폭: `width: 100%` (container 내부)
- 질문 카드 패딩: 24px
- 질문 카드 배경: `--color-bg-secondary`
- 질문 카드 모서리: `--radius-card`
- 라디오 버튼 터치 영역: 44px (label 전체)
- [다음] 버튼: 폭 100%, 높이 56px

**Typography**:
- Progress: `--type-caption` + `--color-text-tertiary`
- Question: `--type-h2`
- Options: `--type-body`
- Button: `--type-body`

**Accessibility**:
```html
<form>
  <!-- 진행률: 동적 정보 -->
  <p aria-live="polite" aria-atomic="true">진행 1/6</p>
  
  <fieldset aria-labelledby="question-{questionId}">
    <legend id="question-{questionId}">3분 내 문제/할 일을 파악할 수 있었나요?</legend>
    <label>
      <input type="radio" name="q{questionId}" value="5" required>
      매우 쉬웠다
    </label>
    <!-- ... -->
  </fieldset>
  
  <button type="submit" disabled aria-describedby="helper-{questionId}">다음</button>
  <p id="helper-{questionId}" class="sr-only">옵션을 선택하면 다음 질문으로 이동합니다</p>
</form>
```

**Helper Text Pattern**:
- `aria-describedby`로 비활성 이유 연결
- `aria-live` 남용 방지 (진행률만 사용)
- 시각적 helper text는 버튼 하단 배치

**Interaction**:
- 라디오 선택: [다음] 활성화
- [다음] 클릭: 다음 질문 화면 전환
- Keyboard: Tab → 라디오 이동, Space → 선택, Enter → 제출

---

## 7. 아이콘/일러스트

### 아이콘 스타일

| 속성 | 값 |
|---|---|
| 선 두께 | 2px |
| 모서리 | stroke-linecap: round |
| 채움 | outline 위주 |
| 크기 | 20-24px (본문), 32px (큰 아이콘) |
| 컬러 | `--color-text-primary` 또는 상태 컬러 |

### 이모지 접근성 규칙

| 용도 | 처리 방법 | 예시 |
|---|---|---|
| **장식용** | `aria-hidden="true"` | `<span aria-hidden="true">🎉</span>` + 텍스트 라벨 |
| **의미 전달** | 텍스트 라벨 우선 + 이모지 보조 | "긴급" 텍스트 + 🚨 이모지 |
| **단독 사용** | 금지 | 이모지만 표시 불가 |

**권장 이모지**:
| 이모지 | 의미 | 사용처 |
|---|---|---|
| 🚨 | 긴급 | Priority Chip, Action Card |
| ⚠️ | 고려 | Priority Chip, Action Card |
| ✅ | 잘함 | Priority Chip, Action Card |
| 💡 | 제안 | 추천 액션 |
| 🎉 | 축하 | Empty State (긴급 없음) |
| 📌 | 요약 | 한 줄 요약 |
| 👍/👎 | 피드백 | Feedback Buttons |
| 💬 | 의견 | 의견 남기기 |
| ⚖️ | 면책 | 면책 보기 |
| ⏱️ | 시간 | [3분 요약] 배지 |

---

## 8. 모션/인터랙션

### 애니메이션 원칙

| 속성 | 값 | 용도 |
|---|---|---|
| Duration | 200-300ms | 빠른 피드백 |
| Easing | ease-out | 자연스러운 감속 |
| 최소화 | 필요한 곳만 | 과도한 애니메이션 금지 |

### 아코디언

**권장 구현** (max-height 임시값 리스크 회피):
```css
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms ease-out;
  overflow: hidden;
}

.accordion-content.open {
  grid-template-rows: 1fr;
}

.accordion-content > div {
  min-height: 0;
}
```

**리스크**: `max-height: 1000px` 같은 임시값은 콘텐츠 길이 초과 시 잘림  
**해결**: CSS Grid `grid-template-rows` 사용

### 버튼 Pressed

```css
button {
  transition: background-color 150ms ease-out, transform 100ms ease-out;
}

button:active {
  transform: scale(0.98);
}
```

### Focus State (전역)

```css
:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  box-shadow: var(--shadow-focus);
}
```

### Motion Reduction

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. 카피라이팅

### 원칙

1. 존댓말 사용
2. 20자 내외
3. 능동적 표현 ("~해요", "~할게요")
4. 불안 조성 금지
5. 전문용어 최소화

### 아코디언 라벨 템플릿

**패턴**: `{대상} 보기 ▾` / `{대상} 접기 ▴`

| 대상 | Collapsed | Expanded |
|---|---|---|
| 대안 | 대안 보기 ▾ | 대안 접기 ▴ |
| 카테고리 상세 | 카테고리 상세 보기 ▾ | 카테고리 상세 접기 ▴ |
| 면책 | 면책 보기 ▾ | 면책 접기 ▴ |

**금지**: "더보기", "접기" (대상 생략 불가)

### 버튼 라벨

| 상황 | 라벨 |
|---|---|
| Store Card CTA | 샘플 리포트 보기 |
| Survey 진행 | 다음 |
| Survey 완료 | 제출 |
| Feedback | 👍 도움돼요 / 👎 아쉬워요 |
| 의견 수집 | 💬 의견 남기기 |

### 금지 표현

| 금지 | 이유 | 대안 |
|---|---|---|
| "지금 바로 개선하세요" | 강압적 | "개선을 추천해요" |
| "위험합니다" | 불안 조성 | "긴급해요" |
| "클릭" | 터치 기기 부적절 | "선택" / "보기" |
| "더보기" | 애매함 | "{대상} 보기" |
| "확인" | 무의미 | "다음" / "제출" |

---

## 10. 접근성

### WCAG 2.1 AA 체크리스트

#### 1. 색상 의존 금지

- ✅ 테두리 두께 차별화 (긴급 3px, 고려 2px, 잘함 1px)
- ✅ 이모지 + 텍스트 라벨 병행
- ✅ 그레이스케일 테스트

#### 2. 텍스트 대비

- ✅ Primary Text on White: 4.5:1 이상
- ✅ Priority Chip 흰 텍스트 on 상태색: 4.5:1 이상
- ✅ Action Card 본문 on 연한 배경: 4.5:1 이상
- WebAIM Contrast Checker로 13개 조합 검증 (섹션 3 참조)

#### 3. 터치 영역

- ✅ 버튼: 44×44px 이상
- ✅ 라디오: `<label>` 전체 44px
- ✅ 아코디언 트리거: 48×48px
- ⚠️ Priority Chip: 터치 불가 (정적 정보)

#### 4. 포커스 표시

- ✅ 모든 인터랙티브 요소: `--color-border-focus` + `--shadow-focus`
- ✅ :focus-visible 사용 (마우스 클릭 시 미표시)

#### 5. 스크린리더

**ARIA role 사용 기준**:
| 요소 타입 | Role | 예시 |
|---|---|---|
| 정적 정보 | role 불필요, `aria-label`만 | Priority Chip, Badge Chips |
| 동적 정보 | `role="status"` 또는 `aria-live="polite"` | Empty State (로딩 결과), 진행률 |
| 인터랙티브 | `aria-expanded`, `aria-controls`, `role="region"` | 아코디언 |

**이모지 처리**:
- 장식용: `<span aria-hidden="true">🚨</span>` + 텍스트 라벨
- 의미 전달: 텍스트 우선, 이모지는 보조

**ID 유니크 규칙**:
```html
<!-- 나쁜 예: ID 중복 -->
<button aria-controls="alternatives-1">...</button>
<button aria-controls="alternatives-1">...</button>

<!-- 좋은 예: uniqueId 패턴 -->
<button aria-controls="alternatives-{cardId}">...</button>
<div id="alternatives-{cardId}">...</div>
```

#### 6. 키보드 내비게이션

| 키 | 동작 | 환경 |
|---|---|---|
| Tab | 다음 요소 포커스 | 필수 (전 환경) |
| Shift+Tab | 이전 요소 포커스 | 필수 (전 환경) |
| Enter/Space | 버튼 활성화, 라디오 선택 | 필수 (전 환경) |
| **Esc** | **아코디언 접기 (펼침 상태)** | **권장 (데스크톱만)** |

**Esc 키 사용 원칙**:
- **데스크톱**: 아코디언 빠른 접기 편의 기능 (권장)
- **모바일**: 소프트웨어 키보드에 Esc 없음, 버튼 토글이 기본
- 구현: Esc 지원은 선택 사항, 필수 아님

**포커스 순서**:
1. 헤더 (뒤로 버튼)
2. 콘텐츠 (상단 → 하단)
3. 버튼/링크 (우선순위 순서)

#### 7. 폼 접근성

```html
<fieldset>
  <legend>질문 텍스트</legend>
  <label>
    <input type="radio" name="q1" value="5" required>
    매우 쉬웠다
  </label>
  <!-- ... -->
</fieldset>

<button type="submit" disabled aria-describedby="helper-1">다음</button>
<p id="helper-1" class="sr-only">옵션을 선택하면 다음 질문으로 이동합니다</p>
```

---

## 11. 화면별 적용 가이드

### Screen 1: 데모 랜딩

**컴포넌트 사용**:
- Hero (6.2): Display Title (32px)
- Store Card (6.3): 3-5개 (데스크톱 2열)
- Priority Chips (6.4): 분리형

**첫 화면 (Fold) 3개**:
1. "리액션" Display Title (32px, Bold)
2. "사장님을 위한 리뷰 비서" (14px, Regular, Secondary - 리액션 바로 아래)
3. "이번 주 리포트를 3분 요약으로 보여드려요" (16px, Regular, Secondary)

**정보 계층**:
```
Display: 리액션 (32px, Bold)
Caption: 사장님을 위한 리뷰 비서 (14px, Regular, Secondary)
Body: 이번 주 리포트를 3분 요약으로 보여드려요 (16px, Regular, Secondary)
Caption: RE:ACTION (14px, Tertiary)
```

---

### Screen 2: 주간 리포트

**컴포넌트 사용**:
- App Header (6.1): 뒤로 버튼
- Action Card (6.5): 긴급/고려/잘함
- Empty State (6.6): 긴급 없을 때
- Section Header (6.7): 배경 있음 (아코디언 섹션)
- Accordion Trigger (6.8): 대안/카테고리/면책

**첫 화면 (Fold) 3개**:
1. 📌 "배달 시간 지연이 심각해요" (한 줄 요약)
2. 🚨 긴급 카드 전체 (3px 빨강 테두리)
3. "먼저 고칠 일" H2 제목

**정보 계층**:
```
H1: A치킨 주간 리포트 (24px, Bold)
Body: 1/12~1/18 • 리뷰 67 (16px, Secondary)
H2: 먼저 고칠 일 (20px, Bold)
Body: 가장 급한 1가지만 먼저 볼게요 (16px, Secondary)

[긴급 카드]
Large Body: 🚨 긴급 · [배달·서비스] (18px, Medium, Urgent)
Large Body: 배달 시간 지연 (18px, Medium)
Body: 부정 60% • 40건 (16px, Secondary)
```

**Empty State 타입**:
- Dynamic: 로딩 후 긴급 0건 → `role="status"`
- Static: 초기 화면 긴급 없음 → role 불필요

---

### Screen 3: 피드백 설문

**컴포넌트 사용**:
- App Header (6.1)
- Survey (6.11): 1화면 1질문

**첫 화면 (Fold) 3개**:
1. "리포트가 도움이 됐나요?" (H2, 20px)
2. "진행 1/6" (Caption, 14px, Tertiary)
3. 질문 카드 (회색 배경)

**정보 계층**:
```
H2: 리포트가 도움이 됐나요? (20px, Bold)
Body: 짧게 1분만 알려주세요 (16px, Secondary)
Caption: 진행 1/6 (14px, Tertiary)

[질문 카드]
Large Body: 3분 내 문제/할 일을 파악할 수 있었나요? (18px, Medium)
Body: 매우 쉬웠다 / 쉬웠다 / ... (16px, Regular)
```

---

## 12. 개발 체크리스트

### 1단계: 토큰 설정

- [ ] CSS 변수 정의 (`:root`, 섹션 2 참조)
- [ ] Pretendard 폰트 로드
- [ ] `font-variant-numeric: tabular-nums` 적용

### 2단계: 레이아웃

- [ ] 컨테이너 규칙 (섹션 5)
- [ ] 카드 폭: `width: 100%` (container 내부)
- [ ] Breakpoint: 768px, 1024px
- [ ] 데스크톱 2열 그리드 (Screen 1만)

### 3단계: 컴포넌트

- [ ] App Header (6.1)
- [ ] Hero (6.2) - Display Title 32px, left-align
- [ ] Store Card (6.3) - CTA 버튼만 클릭
- [ ] Priority Chips (6.4) - 터치 영역 불필요
- [ ] Action Card (6.5) - Variants (긴급/고려/잘함)
- [ ] Empty State (6.6) - Type 분리 (Dynamic/Static)
- [ ] Section Header (6.7) - 배경 규칙
- [ ] Accordion Trigger (6.8) - 라벨 템플릿, Esc 권장
- [ ] Badge Chips (6.9)
- [ ] Feedback Buttons (6.10)
- [ ] Survey (6.11) - Helper text pattern

### 4단계: 인터랙션

- [ ] 아코디언: CSS Grid 방식 (섹션 8)
- [ ] 버튼 pressed: scale(0.98)
- [ ] Focus: `:focus-visible` + `--shadow-focus`
- [ ] Motion reduction: `prefers-reduced-motion`

### 5단계: 접근성

- [ ] 색상 대비: 13개 조합 검증 (섹션 3)
- [ ] 터치 영역: 인터랙티브만 44px+
- [ ] ARIA role: 정적/동적 구분 (섹션 10)
- [ ] ID 유니크: `{uniqueId}` 패턴
- [ ] 이모지: `aria-hidden` vs 텍스트 라벨
- [ ] 키보드: Tab, Enter, Space, Esc (권장)

### 6단계: 콘텐츠

- [ ] 카피: 20자 내외
- [ ] 아코디언 라벨: "{대상} 보기/접기" 템플릿
- [ ] 구분자: 메타 `•`, 수치 `·`
- [ ] 금지 표현 제거 (섹션 9)
- [ ] 텍스트 정렬: left 기본

### 7단계: 반응형 QA

- [ ] 모바일 (360-430px): 1열, padding 20px
- [ ] 태블릿 (768-1023px): 1열 중앙, padding 24px
- [ ] 데스크톱 (1024px+): Screen 1 2열, padding 32px
- [ ] 줄바꿈 안정성: 375/414/430
- [ ] 색맹 시뮬레이터: Deuteranopia, Protanopia
- [ ] 스크린리더: VoiceOver, TalkBack
- [ ] 키보드 전용 내비게이션
- [ ] 그레이스케일 변환 (Priority Chip 구분 확인)

---

## 변경 로그

| 버전 | 날짜 | 주요 변경 사항 |
|---|---|---|
| **1.3** | 2026-01-22 | ✅ 반응형 최적화<br>• 컨테이너/카드 폭 중복 제거 (container 책임 명확화)<br>• Breakpoint 범위 명시 (0-767/768-1023/1024+)<br>• 텍스트 정렬 left 기본 (40-70대 가독성)<br>• Store Card 클릭 패턴 확정 (CTA만)<br>• Typography 토큰 프리셋 도입 (--type-*)<br>• 데스크톱 2열 그리드 추가 (Screen 1)<br>• Esc 키 권장 표현 (모바일 버튼 토글 명시)<br>• 줄바꿈 처리 규칙 추가 (375/414/430 대응) |
| **1.2** | 2026-01-22 | 시스템 문서 업그레이드 (토큰/컴포넌트 구조 강화) |
| **1.1** | 2026-01-22 | 와이어프레임 정합성 검증 |
| **1.0** | 2026-01-22 | 최초 작성 |

---

## 개발 체크용 CSS 변수 (v1.3)

```css
:root {
  /* Typography Presets */
  --type-display-title: 700 32px/1.4 var(--font-family);
  --type-h1: 700 24px/1.4 var(--font-family);
  --type-h2: 700 20px/1.4 var(--font-family);
  --type-large-body: 500 18px/1.5 var(--font-family);
  --type-body: 400 16px/1.6 var(--font-family);
  --type-caption: 400 14px/1.5 var(--font-family);
  
  /* Breakpoints */
  --breakpoint-mobile-max: 767px;
  --breakpoint-tablet-min: 768px;
  --breakpoint-tablet-max: 1023px;
  --breakpoint-desktop-min: 1024px;
  
  /* Container */
  --container-mobile-max: 100%;
  --container-tablet-max: 640px;
  --container-desktop-max: 768px;
  
  /* Spacing */
  --space-container-padding: 20px;
  --space-card-padding: 20px;
  --space-card-gap: 16px;
  --space-l: 24px;
  --space-xl: 32px;
  
  /* Shadows */
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.12);
  --shadow-focus: 0 0 0 4px rgba(74, 144, 226, 0.3);
}
```

---

## 개발 체크용 컴포넌트 Props

### Priority Chip

```typescript
interface PriorityChipProps {
  type: 'urgent' | 'consider' | 'good';
  count: number;
  'aria-label': string; // 예: "긴급 1건"
}
```

### Action Card

```typescript
interface ActionCardProps {
  type: 'urgent' | 'consider' | 'good';
  category: string; // 예: "배달·서비스"
  issue: string;
  metric: {
    sentiment: '부정' | '긍정';
    percentage: number;
    count: number;
  };
  action: {
    text: string;
    cost: '낮' | '중' | '높';
    time: '짧' | '중' | '김';
  };
  alternatives?: Array<{
    id: string;
    text: string;
    cost: '낮' | '중' | '높';
    time: '짧' | '중' | '김';
    difficulty: '하' | '중' | '상';
  }>;
  uniqueId: string; // ARIA ID 유니크
}
```

### Accordion Trigger

```typescript
interface AccordionTriggerProps {
  target: string; // 예: "대안", "카테고리 상세", "면책"
  isExpanded: boolean;
  onToggle: () => void;
  controlsId: string; // aria-controls ID (uniqueId 패턴)
}
```

### Survey Question

```typescript
interface SurveyQuestionProps {
  questionId: string; // uniqueId
  questionText: string;
  options: Array<{
    value: number;
    label: string;
  }>;
  currentStep: number; // 1-6
  totalSteps: number; // 6
  onAnswer: (value: number) => void;
  isLastQuestion: boolean; // true일 때 [제출] 표시
}
```

---

## 참고 문서

- [wireframes.md](wireframes.md) - 와이어프레임 (본 가이드의 기준)
- [plan.md](plan.md) - 기획안
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Pretendard Font](https://github.com/orioncactus/pretendard)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**문의**: 디자인 가이드 관련 질문은 개발팀 채널로 문의해주세요.
