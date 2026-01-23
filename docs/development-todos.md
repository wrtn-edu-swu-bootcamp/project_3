# RE:ACTION 개발 상세 TODO 리스트 (v2.0 - 실행 가능 버전)

> **작성일**: 2026-01-22  
> **버전**: 2.0 (실행 가능성 최우선)  
> **대상**: 개발자 (비개발자도 이해 가능하도록 상세 작성)  
> **기반 문서**: architecture.md, design-guide.md, plan.md, wireframes.md

---

## 📋 전체 개요

**현재 상태**: 기본 구조만 있음 (Next.js 14, 컴포넌트 7개, 페이지 3개)  
**목표**: 완전히 작동하는 MVP 데모 사이트 완성  
**예상 작업량**: Phase 0~9, 총 160개+ 세부 작업

**v2.0 주요 개선사항**:
- ✅ 버전 가정 제거 (최신 stable 기준)
- ✅ Next.js 15 async params 반영
- ✅ 타입/데이터 모델 불일치 해결
- ✅ Static Export + fs 사용 경계 명시
- ✅ 각 Phase 완료 검증 방법 추가
- ✅ 실전 에러 중심으로 막히기 쉬운 포인트 재작성

---

## Phase 0: 프로젝트 업그레이드 및 초기 설정

**목적**: 최신 기술 스택으로 업그레이드 및 기본 환경 구축

**참고 문서**: 
- `docs/architecture.md` - 섹션 1, 2
- Next.js 공식 마이그레이션 가이드

**Phase 완료 검증 방법**:
- `npm run dev` 실행 시 에러 없이 개발 서버 시작
- `npm run build` 실행 시 타입 에러 없음
- Tailwind 클래스가 정상 적용되는지 브라우저 확인

### 0.1 Next.js 업그레이드 (현재 v14 → 최신 stable)

**⚠️ 중요**: Next.js 15부터 **params와 searchParams가 Promise로 변경**되었습니다. 이 변경사항을 고려하여 업그레이드해야 합니다.

- [ ] **Next.js 최신 stable 버전 확인 및 업그레이드**
  - 명령어: `npm info next version` (최신 버전 확인)
  - 설명: 2026년 1월 현재 Next.js 15.x가 stable이며, 16.x는 canary/experimental
  - 업그레이드 방법:
    ```bash
    # @next/codemod CLI를 사용한 안전한 업그레이드 (권장)
    npx @next/codemod@canary upgrade latest
    
    # 또는 수동 업그레이드
    npm install next@latest react@latest react-dom@latest
    ```
  - 확인: `package.json`에서 next 버전이 15.x 이상인지 확인
  - 참고: https://nextjs.org/docs/app/building-your-application/upgrading

- [ ] **Next.js 15 breaking changes 대응**
  - **params/searchParams가 Promise로 변경** (가장 중요!)
  - 기존 코드 (Next.js 14):
    ```tsx
    export default function Page({ params, searchParams }: PageProps) {
      const { storeId } = params;  // ❌ Next.js 15에서 에러
    }
    ```
  - 수정된 코드 (Next.js 15):
    ```tsx
    export default async function Page({ params }: PageProps) {
      const { storeId } = await params;  // ✅ Promise를 await
    }
    
    // 타입 정의도 변경
    interface PageProps {
      params: Promise<{ storeId: string }>;  // Promise로 래핑
      searchParams: Promise<{ [key: string]: string | undefined }>;
    }
    ```
  - **중요**: 이 변경사항은 Phase 7 (페이지 구현)의 모든 코드에 적용됩니다.

### 0.2 React 업그레이드

- [ ] **React 최신 stable 버전 확인 및 업그레이드**
  - 명령어: `npm info react version` (최신 버전 확인)
  - 설명: React 19.x가 stable이나, **React Compiler는 여전히 experimental**
  - 명령어: `npm install react@latest react-dom@latest`
  - 확인: `package.json`에서 react 버전 확인
  - **주의**: "React Compiler 자동 내장" 같은 표현은 과장입니다.
    - React Compiler는 **opt-in experimental 기능**입니다.
    - MVP에서는 사용하지 않으므로 별도 설정 불필요
  - 참고: https://react.dev/blog

### 0.3 TypeScript 업그레이드

- [ ] **TypeScript 최신 안정 버전 확인 및 업그레이드**
  - 명령어: `npm info typescript version`
  - 명령어: `npm install -D typescript@latest`
  - 확인: `package.json`에서 버전 확인
  - 참고: TypeScript 5.x 안정 버전 권장

### 0.4 Tailwind CSS v4 전환 (⚠️ 주의 필요)

**설명**: Tailwind v4는 **CSS-first 설정 방식으로 완전히 재설계**되었습니다. 단순 업그레이드가 아니라 **전환 과정**입니다.

- [ ] **Tailwind v4 설치**
  - 명령어: `npm install tailwindcss@next`
  - 참고: 2026년 1월 기준 v4는 `@next` 태그
  - 주의: `tailwind.config.js` 파일은 v4에서도 여전히 사용 가능하지만 CSS config가 권장됨

- [ ] **Tailwind v4 설정 전환 (CSS-first 방식)**
  - 기존 방식 (v3): `tailwind.config.ts`에서 모든 설정
  - 새 방식 (v4): `globals.css`에서 `@theme` 지시어로 설정
  - Phase 1.1에서 상세 구현

- [ ] **Tailwind v4 전환 검증 (필수!)**
  - 검증 1: `npm run dev` 실행 시 Tailwind 빌드 에러 없음
  - 검증 2: 브라우저에서 기본 Tailwind 클래스 적용 확인
    - 테스트 코드: `<div className="bg-red-500 p-4">Test</div>` → 빨간 배경 확인
  - 검증 3: CSS 변수 인식 확인
    - 테스트: `className="text-[var(--color-urgent)]"` → 색상 적용 확인
  - **막히면**: Tailwind v3로 롤백 후 v4 마이그레이션 가이드 재확인
  - 참고: https://tailwindcss.com/docs/upgrade-guide

### 0.5 필수 패키지 설치

- [ ] **xlsx 라이브러리 설치** (엑셀 파일 파싱용)
  - 명령어: `npm install xlsx`
  - 용도: scripts/generate-reports.ts에서 사용
  - 버전: 최신 stable (0.18.x+)

- [ ] **tsx 설치** (TypeScript 스크립트 실행용)
  - 명령어: `npm install -D tsx`
  - 용도: `npm run prebuild` 실행 시 사용

- [ ] **serve 설치** (정적 사이트 미리보기용)
  - 명령어: `npm install -D serve`
  - 용도: `npm run preview` 실행

- [ ] **타입 정의 패키지 업데이트**
  - 명령어: `npm install -D @types/node@latest @types/react@latest @types/react-dom@latest`

### 0.6 Next.js 설정 파일 수정

- [ ] **next.config.js를 next.config.ts로 변경**
  - 위치: 프로젝트 루트/next.config.ts
  - 이유: TypeScript로 타입 안전성 확보

- [ ] **Static Export 설정 추가**
  ```typescript
  // next.config.ts
  import type { NextConfig } from 'next';

  const nextConfig: NextConfig = {
    output: 'export',  // 정적 HTML 생성
    trailingSlash: true,  // URL 끝에 / 추가 (중요!)
    images: {
      unoptimized: true  // Static Export 제약
    }
  };

  export default nextConfig;
  ```
  - **trailingSlash: true 이유**: 
    - Static Export는 `/report/store-1` 대신 `/report/store-1/index.html` 생성
    - trailingSlash: true로 URL 일관성 유지
  - 참고: architecture.md 143-177줄

### 0.7 package.json 스크립트 수정

- [ ] **prebuild, build, preview 스크립트 추가**
  ```json
  {
    "scripts": {
      "prebuild": "tsx scripts/generate-reports.ts",
      "build": "npm run prebuild && next build",
      "dev": "npm run prebuild && next dev",
      "preview": "npm run build && npx serve out",
      "lint": "next lint",
      "type-check": "tsc --noEmit"
    }
  }
  ```
  - **중요**: `dev` 스크립트에도 prebuild 포함 (generated/ 폴더 자동 생성)
  - 참고: architecture.md 196-213줄

### 0.8 .gitignore 업데이트

- [ ] **generated/ 폴더 무시 추가**
  ```
  # Generated files
  /generated/
  /out/
  /node_modules/
  /.next/
  ```

---

## Phase 1: 디자인 시스템 구축

**목적**: CSS 변수, Tailwind 설정, 폰트 등 기본 스타일링 완성

**참고 문서**:
- `docs/design-guide.md` - 섹션 2 (디자인 토큰)
- `docs/architecture.md` - 섹션 7 (반응형 아키텍처)

**Phase 완료 검증 방법**:
- 브라우저에서 `--color-urgent` 같은 CSS 변수가 적용되는지 확인
- Pretendard 폰트가 로드되는지 DevTools > Network 탭 확인
- Container 컴포넌트가 반응형으로 작동하는지 확인 (360px, 768px, 1024px)

### 1.1 globals.css 재작성 (Tailwind v4 방식)

- [ ] **app/globals.css 전체 재작성**
  - 위치: `app/globals.css`
  - 내용: design-guide.md 896-985줄 전체 복사
  - **Tailwind v4 필수 순서**: @tailwind base → @tailwind components → @tailwind utilities
  - 주요 내용:
    ```css
    /* 1. Tailwind 엔트리 (v4 표준) */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    /* 2. 디자인 토큰 정의 */
    @layer base {
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
        
        /* Colors */
        --color-urgent: #E53E3E;
        --color-urgent-bg: #FFF5F5;
        --color-consider: #DD6B20;
        --color-consider-bg: #FFFAF0;
        --color-good: #38A169;
        --color-good-bg: #F0FFF4;
        
        --color-text-primary: #1A1A1A;
        --color-text-secondary: #5A5A5A;
        --color-text-tertiary: #909090;
        --color-text-inverse: #FFFFFF;
        
        --color-border-default: #E0E0E0;
        --color-border-focus: #4A90E2;
        
        --color-bg-primary: #FFFFFF;
        --color-bg-secondary: #F8F9FA;
        --color-surface-card: #FFFFFF;
        
        --color-info: #3182CE;
        --color-info-bg: #EBF8FF;
        --color-warning: #D69E2E;
        --color-warning-bg: #FEFCBF;
        --color-warning-text: #744210;
        
        /* Spacing */
        --space-xs: 4px;
        --space-s: 8px;
        --space-m: 16px;
        --space-l: 24px;
        --space-xl: 32px;
        --space-card-padding: 20px;
        --space-container-padding: 20px;
        --space-section-gap: 32px;
        
        /* Container */
        --container-mobile-max: 100%;
        --container-tablet-max: 640px;
        --container-desktop-max: 768px;
        
        /* Radius */
        --radius-card: 12px;
        --radius-chip: 18px;
        --radius-chip-small: 14px;
        --radius-button: 24px;
        
        /* Shadow */
        --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.08);
        --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.12);
        --shadow-focus: 0 0 0 4px rgba(74, 144, 226, 0.3);
      }
      
      /* Base Styles */
      body {
        @apply text-[var(--color-text-primary)] antialiased;
        word-break: keep-all;
        overflow-wrap: break-word;
      }
      
      h1 { font: var(--type-h1); }
      h2 { font: var(--type-h2); }
    }

    /* 3. 컴포넌트 스타일 */
    @layer components {
      .card {
        @apply bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-card)];
        @apply p-5 border border-[var(--color-border-default)];
      }
    }
    ```
  - 참고: design-guide.md 896-985줄

### 1.2 Tailwind 설정 파일 수정 (선택)

- [ ] **tailwind.config.ts 수정 (Tailwind v4에서는 선택 사항)**
  - 위치: `tailwind.config.ts`
  - 설명: Tailwind v4에서는 CSS에서 대부분 설정 가능하지만, content 경로는 여전히 필요
  - 주요 내용:
    ```typescript
    import type { Config } from 'tailwindcss';

    const config: Config = {
      content: [
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}'
      ],
      theme: {
        extend: {
          colors: {
            urgent: 'var(--color-urgent)',
            'urgent-bg': 'var(--color-urgent-bg)',
            consider: 'var(--color-consider)',
            'consider-bg': 'var(--color-consider-bg)',
            good: 'var(--color-good)',
            'good-bg': 'var(--color-good-bg)'
          }
        }
      }
    };

    export default config;
    ```
  - 참고: architecture.md 988-1020줄

### 1.3 폰트 설정

- [ ] **public/fonts/ 폴더 생성**
  - 위치: `public/fonts/Pretendard/`
  - 다운로드: https://github.com/orioncactus/pretendard/releases
  - 필요 파일:
    - Pretendard-Regular.woff2
    - Pretendard-Medium.woff2
    - Pretendard-Bold.woff2
  - **주의**: woff2 파일만 다운로드 (woff, ttf는 불필요)

- [ ] **lib/fonts.ts 생성 (폰트 로더)**
  ```typescript
  // lib/fonts.ts
  import localFont from 'next/font/local';

  export const Pretendard = localFont({
    src: [
      {
        path: '../public/fonts/Pretendard/Pretendard-Regular.woff2',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../public/fonts/Pretendard/Pretendard-Medium.woff2',
        weight: '500',
        style: 'normal',
      },
      {
        path: '../public/fonts/Pretendard/Pretendard-Bold.woff2',
        weight: '700',
        style: 'normal',
      },
    ],
    variable: '--font-pretendard',
  });
  ```
  - 참고: architecture.md 862줄

### 1.4 Container 컴포넌트 생성

- [ ] **components/ui/ 폴더 생성**
  - 명령어: `mkdir -p components/ui`

- [ ] **components/ui/Container.tsx 생성**
  ```typescript
  // components/ui/Container.tsx
  import { ReactNode } from 'react';

  interface ContainerProps {
    children: ReactNode;
    className?: string;
  }

  export function Container({ children, className = '' }: ContainerProps) {
    return (
      <div className={`
        w-full mx-auto
        px-[var(--space-container-padding)]
        max-w-[var(--container-mobile-max)]
        md:px-[var(--space-l)]
        md:max-w-[var(--container-tablet-max)]
        lg:px-[var(--space-xl)]
        lg:max-w-[var(--container-desktop-max)]
        ${className}
      `}>
        {children}
      </div>
    );
  }
  ```
  - 참고: architecture.md 814-840줄

### 1.5 전역 레이아웃에 폰트 및 Container 적용

- [ ] **app/layout.tsx 수정**
  ```tsx
  // app/layout.tsx
  import { Container } from '@/components/ui/Container';
  import { Pretendard } from '@/lib/fonts';
  import './globals.css';
  import type { ReactNode } from 'react';

  export default function RootLayout({ children }: { children: ReactNode }) {
    return (
      <html lang="ko" className={Pretendard.variable}>
        <body>
          <Container>
            {children}
          </Container>
        </body>
      </html>
    );
  }
  ```
  - 참고: architecture.md 857-880줄

---

## Phase 2: 타입 정의 (TypeScript)

**목적**: 데이터 구조를 명확히 정의하여 타입 안전성 확보

**참고 문서**:
- `docs/architecture.md` - 섹션 3.2
- `docs/plan.md` - 섹션 3

**Phase 완료 검증 방법**:
- `npm run type-check` 실행 시 에러 없음
- VS Code에서 타입 자동완성 작동 확인 (WeeklyReport. 입력 시 emoji, category 필드 표시)
- WeeklyReport 타입에 emoji, category 필드 포함 확인
- CATEGORY_DISPLAY 상수에서 타입 추론 작동 확인

### 2.1 lib/types/ 폴더 생성

- [ ] **lib/types/ 폴더 생성**
  - 명령어: `mkdir -p lib/types`

### 2.2 review.ts 타입 정의

- [ ] **lib/types/review.ts 생성**
  ```typescript
  // lib/types/review.ts
  
  /** 엑셀에서 읽은 원본 리뷰 */
  export interface RawReview {
    content: string;      // 리뷰 내용
    rating: number;       // 별점 1-5
    date: string;         // 작성 날짜
  }

  /** 카테고리 (5가지 고정) */
  export type Category = 
    | 'food'        // 음식 품질
    | 'delivery'    // 배달·서비스
    | 'packaging'   // 포장
    | 'price'       // 가격
    | 'etc';        // 기타

  /** 감성 분석 결과 */
  export type Sentiment = 'positive' | 'negative' | 'neutral';

  /** 분석 완료된 리뷰 */
  export interface Review extends RawReview {
    category: Category;
    sentiment: Sentiment;
  }
  ```

### 2.3 report.ts 타입 정의 (⚠️ 타입 불일치 해결)

**설계 결정**: emoji, category 필드를 **WeeklyReport 타입에 포함**하는 방식 선택
- 이유: StoreCard 컴포넌트에서 필요한 필드이므로 JSON에 포함하는 것이 단순
- 대안: STORE_CONFIG를 매칭하는 방식은 UI 레이어에서 복잡도 증가

- [ ] **lib/types/report.ts 생성**
  ```typescript
  // lib/types/report.ts
  import { Review, Category } from './review';

  /** 우선순위 레벨 */
  export type Priority = 'urgent' | 'consider' | 'good';

  /** 액션 제안 아이템 */
  export interface ActionItem {
    text: string;
    cost: '낮' | '중' | '높';
    time: '짧' | '중' | '김';
    difficulty?: '하' | '중' | '상';
  }

  /** 액션 카드 */
  export interface ActionCard {
    priority: Priority;
    category: string;                       // 카테고리 표시명
    issue: string;                          // 이슈명
    metric: {
      sentiment: '부정' | '긍정';
      percentage: number;
      count: number;
    };
    action: ActionItem;
    alternatives?: ActionItem[];
  }

  /** 카테고리 상세 */
  export interface CategoryDetail {
    category: Category;
    displayName: string;
    positivePercent: number;
    negativePercent: number;
    keywords: string[];
    negativeExamples: string[];
    hasDeliveryNote?: boolean;
  }

  /** 배지 타입 */
  export type BadgeType = 
    | 'sample_small'
    | 'low_confidence'
    | 'event_possible';

  /** 주간 리포트 */
  export interface WeeklyReport {
    storeId: string;                        // store-1, store-2, store-3
    storeName: string;                      // 달떡볶이 공릉점
    emoji: string;                          // 🍜 (타입 불일치 해결: 추가)
    category: string;                       // 분식 (타입 불일치 해결: 추가)
    period: {
      start: string;                        // 2026-01-12
      end: string;                          // 2026-01-18
    };
    totalReviews: number;
    summary: string;
    priorities: {
      urgent: ActionCard[];
      consider: ActionCard[];
      good: ActionCard[];
    };
    categoryDetails: CategoryDetail[];
    badges: BadgeType[];
  }
  ```
  - **중요**: emoji, category 필드 추가로 타입 불일치 해결
  - 참고: plan.md 70-103줄

### 2.4 action.ts 타입 정의

- [ ] **lib/types/action.ts 생성**
  ```typescript
  // lib/types/action.ts
  import { ActionItem } from './report';
  
  /** 액션 뱅크 아이템 */
  export interface ActionBankItem {
    issue: string;
    recommended: ActionItem;
    alternatives: ActionItem[];
  }

  /** 액션 뱅크 */
  export type ActionBank = Record<string, ActionBankItem>;
  ```

### 2.5 constants.ts 생성

- [ ] **lib/utils/ 폴더 생성**
  - 명령어: `mkdir -p lib/utils`

- [ ] **lib/utils/constants.ts 생성**
  ```typescript
  // lib/utils/constants.ts
  import type { Category } from '@/lib/types/review';
  
  /** 가게 ID 목록 (단일 소스) */
  export const STORE_IDS = ['store-1', 'store-2', 'store-3'] as const;
  export type StoreId = typeof STORE_IDS[number];

  /** 가게 설정 */
  export const STORE_CONFIG = [
    { 
      id: 'store-1', 
      name: '달떡볶이 공릉점', 
      file: '배달의민족_리뷰_수집_달떡볶이 공릉점.xlsx',
      emoji: '🍜',
      category: '분식'
    },
    { 
      id: 'store-2', 
      name: '처갓집양념치킨 공릉점', 
      file: '배달의민족_리뷰_수집_처갓집양념치킨 공릉점.xlsx',
      emoji: '🍗',
      category: '치킨/튀김'
    },
    { 
      id: 'store-3', 
      name: '춘리마라탕 묵동점', 
      file: '배달의민족_리뷰_수집_춘리마라탕 묵동점.xlsx',
      emoji: '🌶️',
      category: '중식'
    }
  ] as const;

  /** 카테고리 표시명 매핑 */
  export const CATEGORY_DISPLAY: Record<Category, string> = {
    food: '🍴 음식 품질',
    delivery: '🚗 배달·서비스',
    packaging: '📦 포장',
    price: '💰 가격',
    etc: '📝 기타'
  };
  ```

---

## Phase 3: Data Layer (데이터 입출력)

**목적**: 엑셀 파일 읽기 및 JSON 파일 쓰기/읽기 구현

**⚠️ 중요**: fs 모듈은 **서버 사이드/빌드 타임 전용**입니다. 클라이언트 컴포넌트에서 사용 불가!

**Phase 완료 검증 방법**:
- 테스트 스크립트로 parseExcel 함수 단독 실행 (console.log로 결과 확인)
- loadReport 함수가 실제 JSON 파일 로드하는지 확인
- 'use client' 파일에서 loader.ts import 하지 않는지 전체 검색
- 명령어: `grep -r "from '@/lib/data/loader'" --include="*.tsx"` → 결과에 'use client' 파일 없어야 함

### 3.1 엑셀 파서 구현

- [ ] **lib/data/ 폴더 생성**
  - 명령어: `mkdir -p lib/data`

- [ ] **lib/data/parser.ts 생성 (서버 전용)**
  ```typescript
  // lib/data/parser.ts
  // ⚠️ 이 파일은 서버/빌드 타임 전용입니다. 클라이언트에서 import 금지!
  
  import * as XLSX from 'xlsx';
  import * as fs from 'fs';
  import type { RawReview } from '@/lib/types/review';

  /**
   * 엑셀 파일을 읽어서 RawReview[] 반환
   * @param filePath - 엑셀 파일 경로
   * @returns RawReview[]
   */
  export function parseExcel(filePath: string): RawReview[] {
    // 1. 파일 존재 확인
    if (!fs.existsSync(filePath)) {
      throw new Error(`❌ 파일을 찾을 수 없습니다: ${filePath}`);
    }

    // 2. 엑셀 파일 읽기
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // 3. JSON으로 변환
    const data = XLSX.utils.sheet_to_json(sheet);

    // 4. RawReview 형식으로 변환
    const reviews: RawReview[] = data.map((row: any) => ({
      content: row['리뷰내용'] || row['content'] || '',
      rating: Number(row['별점'] || row['rating'] || 0),
      date: row['작성일'] || row['date'] || ''
    }));

    // 5. 유효성 검사
    const validReviews = reviews.filter(
      (review) => review.content && review.rating >= 1 && review.rating <= 5
    );

    console.log(`✅ ${filePath}: ${validReviews.length}개 리뷰 파싱 완료`);
    return validReviews;
  }
  ```
  - **중요**: 파일 최상단에 서버 전용 주석 추가
  - 참고: architecture.md 300-305줄

### 3.2 JSON 로더 구현

- [ ] **lib/data/loader.ts 생성 (서버 전용)**
  ```typescript
  // lib/data/loader.ts
  // ⚠️ 이 파일은 서버/빌드 타임 전용입니다. 클라이언트에서 import 금지!
  // ✅ 사용 가능: Server Components, generateStaticParams, prebuild 스크립트
  // ❌ 사용 불가: 'use client' 컴포넌트
  
  import * as fs from 'fs';
  import * as path from 'path';
  import type { WeeklyReport } from '@/lib/types/report';

  /**
   * generated/reports/*.json 파일 읽기
   * @param storeId - 가게 ID
   * @returns WeeklyReport
   */
  export function loadReport(storeId: string): WeeklyReport {
    const filePath = path.join(
      process.cwd(),
      'generated',
      'reports',
      `${storeId}.json`
    );

    // 파일 미존재 시 명확한 에러 메시지
    if (!fs.existsSync(filePath)) {
      throw new Error(
        `❌ 리포트 파일을 찾을 수 없습니다: ${storeId}.json\n` +
        `💡 해결 방법: npm run prebuild를 먼저 실행하세요.`
      );
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as WeeklyReport;
  }

  /**
   * 모든 가게의 리포트 목록 반환
   * @returns WeeklyReport[]
   */
  export function loadAllReports(): WeeklyReport[] {
    const reportsDir = path.join(process.cwd(), 'generated', 'reports');
    
    if (!fs.existsSync(reportsDir)) {
      throw new Error(
        `❌ generated/reports/ 폴더를 찾을 수 없습니다.\n` +
        `💡 해결 방법: npm run prebuild를 먼저 실행하세요.`
      );
    }

    const files = fs.readdirSync(reportsDir).filter((file) => file.endsWith('.json'));
    return files.map((file) => {
      const storeId = file.replace('.json', '');
      return loadReport(storeId);
    });
  }
  ```
  - **중요**: 에러 메시지에 해결 방법 명시
  - 참고: architecture.md 342-356줄

### 3.3 Static Export + fs 사용 규칙 (⚠️ 필수 숙지)

- [ ] **fs 모듈 사용 가능 위치 확인**
  - ✅ **사용 가능**:
    - Server Components (async function 컴포넌트)
    - generateStaticParams() 함수
    - prebuild 스크립트 (scripts/*.ts)
    - API Routes (단, Static Export에서는 사용 불가)
  - ❌ **사용 불가**:
    - 'use client' 컴포넌트
    - 브라우저에서 실행되는 모든 코드
  - **검증 방법**: 빌드 시 `Module not found: Can't resolve 'fs'` 에러 확인

- [ ] **코드 리뷰 체크리스트**
  - loader.ts를 import하는 파일이 Server Component인지 확인
  - 'use client' 파일에서 loader.ts import 금지
  - props로 데이터 전달: Server Component → Client Component

---

## Phase 4: Domain Layer (비즈니스 로직)

**목적**: 카테고리 분류, 감성 분석, 우선순위 계산 등 핵심 로직 구현

**Phase 완료 검증 방법**:
- 테스트 코드로 각 함수 단독 실행 및 결과 확인
  - classifyCategory("배달이 늦어요") → 'delivery' 반환 확인
  - analyzeSentiment("맛있어요", 5) → 'positive' 반환 확인
  - scorePriority 결과가 urgent → consider → good 순서로 정렬되었는지 확인
- extractKeywords 함수가 실제 리뷰 데이터에서 키워드 추출하는지 확인 (console.log)
- matchActions 함수가 모든 이슈명에 대해 액션 반환하는지 확인

### 4.1 카테고리 분류 구현

- [ ] **lib/domain/ 폴더 생성**
  - 명령어: `mkdir -p lib/domain`

- [ ] **lib/domain/classifier.ts 생성**
  ```typescript
  // lib/domain/classifier.ts
  import type { Category } from '@/lib/types/review';

  /**
   * 리뷰 내용을 분석하여 카테고리 분류
   */
  export function classifyCategory(content: string): Category {
    const keywords = {
      food: ['맛', '신선', '양', '재료', '소스', '튀김', '치킨', '국물', '맵', '짜', '달', '식'],
      delivery: ['배달', '시간', '늦', '빠르', '느리', '도착', '지연', '취소'],
      packaging: ['포장', '용기', '파손', '새', '국물', '찌그러', '엎어짐'],
      price: ['가격', '비싸', '저렴', '비용', '할인', '쿠폰', '양에 비해'],
      etc: []
    };

    // 우선순위: food > delivery > packaging > price > etc
    for (const [category, terms] of Object.entries(keywords)) {
      if (category === 'etc') continue;
      if (terms.some(term => content.includes(term))) {
        return category as Category;
      }
    }

    return 'etc';
  }
  ```

### 4.2 감성 분석 구현

- [ ] **lib/domain/sentiment.ts 생성**
  ```typescript
  // lib/domain/sentiment.ts
  import type { Sentiment } from '@/lib/types/review';

  /**
   * 별점 + 키워드 기반 감성 분석
   */
  export function analyzeSentiment(content: string, rating: number): Sentiment {
    // 1-2점: 부정, 4-5점: 긍정
    if (rating <= 2) return 'negative';
    if (rating >= 4) return 'positive';

    // 3점 리뷰는 내용으로 판단
    const positiveKeywords = ['맛있', '좋', '친절', '빠르', '신선', '만족', '추천'];
    const negativeKeywords = ['별로', '늦', '식', '파손', '짜', '맵', '비싸', '실망'];

    const positiveCount = positiveKeywords.filter(k => content.includes(k)).length;
    const negativeCount = negativeKeywords.filter(k => content.includes(k)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }
  ```

### 4.3 우선순위 계산 구현 (⚠️ 정렬 규칙 추가)

- [ ] **lib/domain/priority.ts 생성**
  ```typescript
  // lib/domain/priority.ts
  import type { Review, Category } from '@/lib/types/review';
  import type { Priority, ActionCard } from '@/lib/types/report';
  import { CATEGORY_DISPLAY } from '@/lib/utils/constants';

  /**
   * 카테고리별로 리뷰 그룹화
   */
  function groupByCategory(reviews: Review[]): Record<Category, Review[]> {
    const grouped: Record<Category, Review[]> = {
      food: [],
      delivery: [],
      packaging: [],
      price: [],
      etc: []
    };

    reviews.forEach(review => {
      grouped[review.category].push(review);
    });

    return grouped;
  }

  /**
   * 이슈명 생성 (MVP용 간단 구현)
   */
  function generateIssueName(category: Category, items: Review[]): string {
    const issueMap: Record<Category, string> = {
      food: '맛/신선도 불만',
      delivery: '배달 시간 지연',
      packaging: '포장 파손',
      price: '가격 불만',
      etc: '기타 불만'
    };

    // MVP: 미리 정의된 이슈명 반환
    // TODO (Phase 2+): 키워드 빈도 분석으로 개선
    return issueMap[category];
  }

  /**
   * 우선순위 점수 계산
   * @param reviews - 분석 완료된 리뷰 배열
   * @returns ActionCard[] (action, alternatives 제외) - ⚠️ 정렬되지 않음
   */
  export function scorePriority(reviews: Review[]): Omit<ActionCard, 'action' | 'alternatives'>[] {
    const grouped = groupByCategory(reviews);

    const result: Omit<ActionCard, 'action' | 'alternatives'>[] = [];

    Object.entries(grouped).forEach(([cat, items]) => {
      const category = cat as Category;
      if (items.length === 0) return;

      const total = items.length;
      const negative = items.filter(r => r.sentiment === 'negative').length;
      const positive = items.filter(r => r.sentiment === 'positive').length;
      const percentage = Math.round((negative / total) * 100);
      const positivePercentage = Math.round((positive / total) * 100);

      // 우선순위 판단
      let priority: Priority;
      let sentiment: '부정' | '긍정';
      let finalPercentage: number;
      let count: number;

      if (percentage >= 30) {
        priority = 'urgent';
        sentiment = '부정';
        finalPercentage = percentage;
        count = negative;
      } else if (percentage >= 15) {
        priority = 'consider';
        sentiment = '부정';
        finalPercentage = percentage;
        count = negative;
      } else if (positivePercentage >= 70) {
        priority = 'good';
        sentiment = '긍정';
        finalPercentage = positivePercentage;
        count = positive;
      } else {
        return;  // 기준 미달: 제외
      }

      result.push({
        priority,
        category: CATEGORY_DISPLAY[category],
        issue: generateIssueName(category, items),
        metric: {
          sentiment,
          percentage: finalPercentage,
          count
        }
      });
    });

    // ⚠️ 정렬 규칙 (중요!): 우선순위 > 비율 내림차순
    // 1. urgent 카드: 부정 비율 높은 순
    // 2. consider 카드: 부정 비율 높은 순
    // 3. good 카드: 긍정 비율 높은 순
    result.sort((a, b) => {
      // 1차: 우선순위 (urgent > consider > good)
      const priorityOrder = { urgent: 0, consider: 1, good: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      
      // 2차: 비율 내림차순 (같은 우선순위 내에서)
      return b.metric.percentage - a.metric.percentage;
    });

    return result;
  }
  ```
  - **중요**: 정렬 로직 추가로 UI에서 일관된 순서 보장
  - 참고: architecture.md 606-764줄

### 4.4 액션 매칭 구현

- [ ] **lib/domain/actions.ts 생성**
  ```typescript
  // lib/domain/actions.ts
  import type { ActionBankItem } from '@/lib/types/action';

  /**
   * 액션 뱅크 (이슈별 해결책 데이터베이스)
   */
  const ACTION_BANK: Record<string, ActionBankItem> = {
    '배달 시간 지연': {
      issue: '배달 시간 지연',
      recommended: {
        text: '피크타임 인력 추가',
        cost: '중',
        time: '짧'
      },
      alternatives: [
        { text: '배달 대행 추가', cost: '낮', time: '중', difficulty: '하' },
        { text: '피크타임 주문 중단', cost: '낮', time: '짧', difficulty: '하' }
      ]
    },
    '맛/신선도 불만': {
      issue: '맛/신선도 불만',
      recommended: {
        text: '재료 신선도 체크 강화',
        cost: '낮',
        time: '짧'
      },
      alternatives: [
        { text: '레시피 재검토', cost: '낮', time: '중', difficulty: '중' },
        { text: '소스/양념 조정', cost: '낮', time: '중', difficulty: '하' }
      ]
    },
    '포장 파손': {
      issue: '포장 파손',
      recommended: {
        text: '이중 포장 적용',
        cost: '낮',
        time: '짧'
      },
      alternatives: [
        { text: '완충재 추가', cost: '낮', time: '짧', difficulty: '하' },
        { text: '용기 업그레이드', cost: '중', time: '중', difficulty: '하' }
      ]
    },
    '가격 불만': {
      issue: '가격 불만',
      recommended: {
        text: '할인 쿠폰 제공',
        cost: '중',
        time: '짧'
      },
      alternatives: [
        { text: '세트 가격 조정', cost: '낮', time: '중', difficulty: '중' },
        { text: '리뷰 작성 사은품', cost: '낮', time: '짧', difficulty: '하' }
      ]
    },
    '기타 불만': {
      issue: '기타 불만',
      recommended: {
        text: '리뷰 분석 후 개선',
        cost: '낮',
        time: '중'
      },
      alternatives: [
        { text: '직접 응답 작성', cost: '낮', time: '짧', difficulty: '하' },
        { text: '고객 의견 수렴', cost: '낮', time: '중', difficulty: '하' }
      ]
    }
  };

  /**
   * 이슈에 맞는 액션 제안 반환
   */
  export function matchActions(issue: string): ActionBankItem {
    return ACTION_BANK[issue] || ACTION_BANK['기타 불만'];
  }
  ```

### 4.5 요약 생성 구현

- [ ] **lib/domain/summary.ts 생성**
  ```typescript
  // lib/domain/summary.ts
  import type { ActionCard } from '@/lib/types/report';

  /**
   * 한 줄 요약 생성 (긴급 문제 기준)
   */
  export function generateSummary(priorities: ActionCard[]): string {
    const urgent = priorities.find(p => p.priority === 'urgent');
    
    if (urgent) {
      return `${urgent.issue} 문제가 심각해요`;
    }

    const consider = priorities.find(p => p.priority === 'consider');
    if (consider) {
      return `${consider.issue}에 주의가 필요해요`;
    }

    return '전반적으로 좋은 평가를 받고 있어요';
  }
  ```

### 4.6 카테고리 상세 생성 구현 (⚠️ 키워드 추출 주의)

- [ ] **lib/domain/category.ts 생성**
  ```typescript
  // lib/domain/category.ts
  import type { Review, Category } from '@/lib/types/review';
  import type { CategoryDetail } from '@/lib/types/report';
  import { CATEGORY_DISPLAY } from '@/lib/utils/constants';

  /**
   * 카테고리 상세 생성
   */
  export function generateCategoryDetails(reviews: Review[]): CategoryDetail[] {
    // 카테고리별 그룹화
    const grouped: Record<Category, Review[]> = {
      food: [],
      delivery: [],
      packaging: [],
      price: [],
      etc: []
    };

    reviews.forEach(review => {
      grouped[review.category].push(review);
    });

    // 각 카테고리 처리
    return Object.entries(grouped)
      .filter(([_, items]) => items.length > 0)
      .map(([cat, items]) => {
        const category = cat as Category;
        const total = items.length;
        const positive = items.filter(r => r.sentiment === 'positive').length;
        const negative = items.filter(r => r.sentiment === 'negative').length;

        // ⚠️ 키워드 추출 (MVP용 최소 구현)
        // [실전 데이터]: 실제 리뷰에서 빈도 높은 단어 추출
        // [더미 데이터]: 아래 기본값 사용
        const keywords = extractKeywords(items);

        // 부정 예시 (최대 3개)
        const negativeExamples = items
          .filter(r => r.sentiment === 'negative')
          .slice(0, 3)
          .map(r => r.content);

        // 배달 경험 언급 체크
        const hasDeliveryNote = category === 'delivery' && 
          items.some(r => r.content.includes('알뜰배달') || r.content.includes('한집배달'));

        return {
          category,
          displayName: CATEGORY_DISPLAY[category],
          positivePercent: Math.round((positive / total) * 100),
          negativePercent: Math.round((negative / total) * 100),
          keywords,
          negativeExamples,
          hasDeliveryNote
        };
      });
  }

  /**
   * 키워드 추출 (MVP용 단순 빈도 분석)
   * [형태소 분석 없이 단순 구현]
   */
  function extractKeywords(reviews: Review[]): string[] {
    // MVP: 긍정 리뷰에서 자주 나오는 단어 찾기 (형태소 분석 없음)
    const positiveReviews = reviews.filter(r => r.sentiment === 'positive');
    const wordCount: Record<string, number> = {};

    // 2-4글자 단어만 추출 (조사, 어미 제외)
    positiveReviews.forEach(review => {
      const words = review.content.match(/[가-힣]{2,4}/g) || [];
      words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });
    });

    // 빈도 높은 상위 3개 단어 + "요" 붙이기
    const sorted = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([word]) => `${word}요`);

    // 최소 2개 보장
    return sorted.length >= 2 ? sorted : ['맛있어요', '좋아요'];
  }
  ```
  - **중요**: 키워드 추출은 MVP용 최소 구현 (형태소 분석 없음)
  - **TODO (Phase 2+)**: 한국어 형태소 분석 라이브러리 (mecab-ko 등) 사용
  - 참고: wireframes.md 262-333줄

### 4.7 배지 생성 구현

- [ ] **lib/domain/badges.ts 생성**
  ```typescript
  // lib/domain/badges.ts
  import type { Review } from '@/lib/types/review';
  import type { BadgeType } from '@/lib/types/report';

  /**
   * 배지 생성 (신뢰도 안내)
   */
  export function generateBadges(reviews: Review[]): BadgeType[] {
    const badges: BadgeType[] = [];

    // 표본 부족: 총 리뷰 < 10개
    if (reviews.length < 10) {
      badges.push('sample_small');
    }

    // 확신 낮음: 총 리뷰 < 20개
    if (reviews.length < 20) {
      badges.push('low_confidence');
    }

    // 이벤트 가능성: TODO (날짜 분석 로직 필요)

    return badges;
  }
  ```

---

## Phase 5: Prebuild 스크립트 (Excel → JSON)

**목적**: 빌드 전에 엑셀 파일을 읽어서 JSON 리포트 생성

**참고 문서**:
- `docs/architecture.md` - 섹션 4 (빌드 파이프라인)
- `docs/architecture.md` - 섹션 4.2 (prebuild 스크립트)

**Phase 완료 검증 방법**:
- `npm run prebuild` 실행 시 에러 없이 완료
- generated/reports/ 폴더에 store-1.json, store-2.json, store-3.json 생성
- JSON 파일 열어서 구조 확인:
  - storeId, storeName, emoji, category 필드 존재
  - priorities.urgent, priorities.consider, priorities.good 배열 존재
  - categoryDetails 배열 존재
  - badges 배열 존재
- 콘솔 출력에서 각 가게별 리뷰 수, 긴급/고려/잘함 개수 확인

### 5.1 scripts/ 폴더 생성

- [ ] **scripts/ 폴더 생성**
  - 명령어: `mkdir -p scripts`

### 5.2 scripts/generate-reports.ts 생성

- [ ] **scripts/generate-reports.ts 생성**
  ```typescript
  // scripts/generate-reports.ts
  import * as fs from 'fs';
  import * as path from 'path';
  import { STORE_CONFIG } from '../lib/utils/constants';
  import { parseExcel } from '../lib/data/parser';
  import { classifyCategory } from '../lib/domain/classifier';
  import { analyzeSentiment } from '../lib/domain/sentiment';
  import { scorePriority } from '../lib/domain/priority';
  import { matchActions } from '../lib/domain/actions';
  import { generateSummary } from '../lib/domain/summary';
  import { generateCategoryDetails } from '../lib/domain/category';
  import { generateBadges } from '../lib/domain/badges';
  import type { WeeklyReport, Review, ActionCard } from '../lib/types/report';

  async function generateReports() {
    console.log('🚀 리포트 생성 시작...\n');

    // 1. 출력 디렉토리 생성
    const outputDir = path.join(process.cwd(), 'generated', 'reports');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log('📁 generated/reports/ 폴더 생성\n');
    }

    // 2. 각 가게별 리포트 생성
    for (const store of STORE_CONFIG) {
      console.log(`📊 ${store.name} 처리 중...`);
      
      const filePath = path.join(process.cwd(), 'data', store.file);
      
      try {
        // 2.1 Excel 파싱
        const rawReviews = parseExcel(filePath);
        
        // 2.2 Domain 로직 실행
        const reviews: Review[] = rawReviews.map(raw => ({
          ...raw,
          category: classifyCategory(raw.content),
          sentiment: analyzeSentiment(raw.content, raw.rating)
        }));
        
        // 2.3 우선순위 계산 (이미 정렬됨)
        const priorityScores = scorePriority(reviews);
        
        // 2.4 액션 매칭
        const actionCards: ActionCard[] = priorityScores.map(score => {
          const actions = matchActions(score.issue);
          return {
            ...score,
            action: actions.recommended,
            alternatives: actions.alternatives
          };
        });
        
        // 2.5 우선순위별 분류 (정렬 순서 유지)
        const priorities = {
          urgent: actionCards.filter(c => c.priority === 'urgent'),
          consider: actionCards.filter(c => c.priority === 'consider'),
          good: actionCards.filter(c => c.priority === 'good')
        };
        
        // 2.6 리포트 조합
        const report: WeeklyReport = {
          storeId: store.id,
          storeName: store.name,
          emoji: store.emoji,           // ⚠️ 타입 불일치 해결: 추가
          category: store.category,     // ⚠️ 타입 불일치 해결: 추가
          period: { 
            start: '2026-01-12', 
            end: '2026-01-18' 
          },
          totalReviews: reviews.length,
          summary: generateSummary(actionCards),
          priorities,
          categoryDetails: generateCategoryDetails(reviews),
          badges: generateBadges(reviews)
        };
        
        // 2.7 JSON 저장
        const outputPath = path.join(outputDir, `${store.id}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');
        console.log(`✅ ${outputPath} 생성 완료`);
        console.log(`   - 총 리뷰: ${reviews.length}개`);
        console.log(`   - 긴급: ${priorities.urgent.length}개`);
        console.log(`   - 고려: ${priorities.consider.length}개`);
        console.log(`   - 잘함: ${priorities.good.length}개\n`);
        
      } catch (error) {
        console.error(`❌ ${store.name} 처리 실패:`, error);
        process.exit(1);
      }
    }

    console.log('🎉 모든 리포트 생성 완료!');
  }

  // 실행
  generateReports().catch((error) => {
    console.error('❌ 치명적 에러:', error);
    process.exit(1);
  });
  ```
  - **중요**: emoji, category 필드를 WeeklyReport에 추가
  - 참고: architecture.md 396-462줄

### 5.3 prebuild 스크립트 테스트

- [ ] **prebuild 스크립트 실행**
  - 명령어: `npm run prebuild`
  - 예상 결과:
    - `generated/reports/` 폴더 생성
    - store-1.json, store-2.json, store-3.json 생성
    - 각 파일에 emoji, category 필드 포함
  - 검증: JSON 파일 열어서 구조 확인

---

## Phase 6: UI 컴포넌트 구현

**목적**: 디자인 시스템대로 재사용 가능한 컴포넌트 완성

**참고 문서**:
- `docs/design-guide.md` - 섹션 6 (컴포넌트 라이브러리)
- `docs/architecture.md` - 섹션 8 (컴포넌트 설계 규칙)

**Phase 완료 검증 방법**:
- 각 컴포넌트를 임시 페이지에서 렌더링 테스트 (props 전달)
- 브라우저에서 시각적 확인: 색상, 크기, 간격이 design-guide.md와 일치하는지
- TypeScript 타입 에러 없음 (`npm run type-check`)
- 'use client' 컴포넌트가 상태 관리 (useState) 정상 작동하는지 확인
- Server Component에서 Client Component import 가능한지 확인

### 6.1 기존 컴포넌트 파일 위치 변경

- [ ] **components/*.tsx → components/ui/*.tsx 이동**
  - 명령어: `mkdir -p components/ui && mv components/*.tsx components/ui/` (Linux/Mac)
  - Windows: 수동으로 파일 이동
  - 이유: 디자인 시스템 컴포넌트와 도메인 컴포넌트 분리

### 6.2 AppHeader 컴포넌트 수정

- [ ] **components/ui/AppHeader.tsx 수정**
  ```tsx
  // components/ui/AppHeader.tsx
  'use client';

  import { useRouter } from 'next/navigation';

  interface AppHeaderProps {
    showBack?: boolean;
  }

  export function AppHeader({ showBack = false }: AppHeaderProps) {
    const router = useRouter();

    return (
      <header 
        role="banner" 
        className="h-14 px-4 flex items-center justify-between border-b border-[var(--color-border-default)] bg-[var(--color-surface-card)]"
      >
        {showBack ? (
          <button
            onClick={() => router.back()}
            aria-label="뒤로가기"
            className="w-11 h-11 flex items-center justify-center hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)]"
          >
            ←
          </button>
        ) : (
          <div className="w-11" />
        )}

        <h1 
          className="font-[var(--type-h2)] text-[var(--color-text-primary)]"
          aria-label="리액션 홈"
        >
          리액션
        </h1>

        <div className="w-11" />
      </header>
    );
  }
  ```

### 6.3 Hero 컴포넌트 수정

- [ ] **components/ui/Hero.tsx 수정**
  ```tsx
  // components/ui/Hero.tsx
  export function Hero() {
    return (
      <header 
        aria-label="리액션 서비스 소개" 
        className="py-10 px-5 space-y-4"
      >
        <h1 
          className="font-[var(--type-display-title)] text-center text-[var(--color-text-primary)]"
        >
          리액션
        </h1>
        
        <p className="font-[var(--type-caption)] text-center text-[var(--color-text-secondary)]">
          사장님을 위한 리뷰 비서
        </p>

        <p className="font-[var(--type-body)] text-left text-[var(--color-text-secondary)]">
          이번 주 리포트를 3분 요약으로 보여드려요
        </p>

        <small 
          className="font-[var(--type-caption)] text-center block text-[var(--color-text-tertiary)]"
          aria-label="영문명"
        >
          RE:ACTION
        </small>

        <div className="flex gap-2 justify-center pt-4">
          <span className="px-3 py-1 bg-[var(--color-info-bg)] text-[var(--color-info)] rounded-full text-sm">
            ⏱️ 3분 요약
          </span>
          <span className="px-3 py-1 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded-full text-sm">
            ℹ️ 로그인 없이 체험
          </span>
        </div>
      </header>
    );
  }
  ```

### 6.4 PriorityChip 컴포넌트 수정

- [ ] **components/ui/PriorityChip.tsx 수정**
  ```tsx
  // components/ui/PriorityChip.tsx
  interface PriorityChipProps {
    type: 'urgent' | 'consider' | 'good';
    count: number;
  }

  export function PriorityChip({ type, count }: PriorityChipProps) {
    const config = {
      urgent: {
        emoji: '🚨',
        label: '긴급',
        bg: 'var(--color-urgent)',
        text: 'var(--color-text-inverse)'
      },
      consider: {
        emoji: '⚠️',
        label: '고려',
        bg: 'var(--color-consider)',
        text: 'var(--color-text-inverse)'
      },
      good: {
        emoji: '✅',
        label: '잘함',
        bg: 'var(--color-good)',
        text: 'var(--color-text-inverse)'
      }
    };

    const { emoji, label, bg, text } = config[type];

    if (count === 0) return null;

    return (
      <span
        aria-label={`${label} ${count}건`}
        className="inline-flex items-center gap-1 px-4 py-2 rounded-[var(--radius-chip)] font-[var(--type-caption)]"
        style={{ 
          backgroundColor: bg,
          color: text
        }}
      >
        <span aria-hidden="true">{emoji}</span>
        {label} {count}
      </span>
    );
  }
  ```

### 6.5 StoreCard 컴포넌트 수정

- [ ] **components/ui/StoreCard.tsx 수정**
  ```tsx
  // components/ui/StoreCard.tsx
  import Link from 'next/link';
  import { PriorityChip } from './PriorityChip';

  interface StoreCardProps {
    id: string;
    name: string;
    emoji: string;
    category: string;
    period: { start: string; end: string };
    reviewCount: number;
    priorities: {
      urgent: number;
      consider: number;
      good: number;
    };
  }

  export function StoreCard({ 
    id, name, emoji, category, period, reviewCount, priorities 
  }: StoreCardProps) {
    const formatDate = (date: string) => {
      const [, month, day] = date.split('-');
      return `${parseInt(month)}/${parseInt(day)}`;
    };

    return (
      <article
        aria-labelledby={`store-${id}`}
        className="card bg-[var(--color-surface-card)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] p-[var(--space-card-padding)] border border-[var(--color-border-default)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
      >
        <h3 
          id={`store-${id}`}
          className="font-[var(--type-large-body)] text-[var(--color-text-primary)]"
        >
          <span aria-hidden="true">{emoji}</span> {name}
        </h3>

        <p className="font-[var(--type-body)] text-[var(--color-text-secondary)] mt-1">
          <span aria-hidden="true">🏪</span> {category}
        </p>

        <p className="font-[var(--type-body)] text-[var(--color-text-secondary)] mt-2">
          {formatDate(period.start)}~{formatDate(period.end)} • 리뷰 {reviewCount}
        </p>

        <div 
          className="flex flex-wrap gap-2 mt-4" 
          aria-label="우선순위 요약"
        >
          <PriorityChip type="urgent" count={priorities.urgent} />
          <PriorityChip type="consider" count={priorities.consider} />
          <PriorityChip type="good" count={priorities.good} />
        </div>

        <Link
          href={`/report/${id}/`}
          className="block w-full mt-4 py-3 px-6 bg-[var(--color-urgent)] text-white text-center rounded-[var(--radius-button)] font-[var(--type-body)] hover:bg-[#C53030] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:shadow-[var(--shadow-focus)]"
        >
          샘플 리포트 보기
        </Link>
      </article>
    );
  }
  ```

### 6.6 ActionCard 컴포넌트 수정

- [ ] **components/ui/ActionCard.tsx 수정**
  ```tsx
  // components/ui/ActionCard.tsx
  'use client';

  import { useState, useId } from 'react';
  import type { ActionCard as ActionCardType } from '@/lib/types/report';

  export function ActionCard({ 
    priority, category, issue, metric, action, alternatives 
  }: ActionCardType) {
    const [isExpanded, setIsExpanded] = useState(false);
    const accordionId = useId();

    const config = {
      urgent: {
        emoji: '🚨',
        label: '긴급',
        borderWidth: '3px',
        borderColor: 'var(--color-urgent)',
        bgColor: 'var(--color-urgent-bg)'
      },
      consider: {
        emoji: '⚠️',
        label: '고려',
        borderWidth: '2px',
        borderColor: 'var(--color-consider)',
        bgColor: 'var(--color-consider-bg)'
      },
      good: {
        emoji: '✅',
        label: '잘함',
        borderWidth: '1px',
        borderColor: 'var(--color-good)',
        bgColor: 'var(--color-good-bg)'
      }
    };

    const { emoji, label, borderWidth, borderColor, bgColor } = config[priority];

    return (
      <article
        aria-labelledby={`action-${accordionId}`}
        className="rounded-[var(--radius-card)] p-[var(--space-card-padding)] space-y-3"
        style={{
          borderWidth,
          borderStyle: 'solid',
          borderColor,
          backgroundColor: bgColor
        }}
      >
        <h3 
          id={`action-${accordionId}`}
          className="font-[var(--type-large-body)]"
          style={{ color: borderColor }}
        >
          <span aria-hidden="true">{emoji}</span> {label} · [{category}]
        </h3>

        <p className="font-[var(--type-large-body)] text-[var(--color-text-primary)]">
          {issue}
        </p>

        <p className="font-[var(--type-body)] text-[var(--color-text-secondary)]">
          {metric.sentiment} {metric.percentage}% • {metric.count}건
        </p>

        <p className="font-[var(--type-body)] text-[var(--color-text-primary)]">
          <span aria-hidden="true">💡</span> {action.text}
        </p>

        <div className="flex gap-2">
          <span className="px-3 py-1 border border-[var(--color-border-default)] rounded-full font-[var(--type-caption)]">
            비용:{action.cost}
          </span>
          <span className="px-3 py-1 border border-[var(--color-border-default)] rounded-full font-[var(--type-caption)]">
            시간:{action.time}
          </span>
        </div>

        {alternatives && alternatives.length > 0 && (
          <>
            <button
              aria-expanded={isExpanded}
              aria-controls={`alternatives-${accordionId}`}
              aria-label="대안 보기"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full py-3 px-5 hover:bg-black/5 transition-colors rounded font-[var(--type-body)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)]"
            >
              대안 {isExpanded ? '접기 ▴' : '보기 ▾'}
            </button>

            <div
              id={`alternatives-${accordionId}`}
              role="region"
              aria-labelledby={`alternatives-heading-${accordionId}`}
              hidden={!isExpanded}
              className="space-y-3"
            >
              <h4 id={`alternatives-heading-${accordionId}`} className="sr-only">
                대안 목록
              </h4>

              {alternatives.map((alt, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/50 rounded-lg border border-[var(--color-border-default)]"
                >
                  <p className="font-[var(--type-body)] mb-2">
                    📝 대안 {index + 1}
                  </p>
                  <p className="font-[var(--type-body)] text-[var(--color-text-primary)] mb-2">
                    {alt.text}
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 border border-[var(--color-border-default)] rounded-full text-xs">
                      비용:{alt.cost}
                    </span>
                    <span className="px-2 py-1 border border-[var(--color-border-default)] rounded-full text-xs">
                      시간:{alt.time}
                    </span>
                    {alt.difficulty && (
                      <span className="px-2 py-1 border border-[var(--color-border-default)] rounded-full text-xs">
                        난이도:{alt.difficulty}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </article>
    );
  }
  ```

### 6.7 EmptyState 컴포넌트 생성

- [ ] **components/ui/EmptyState.tsx 생성**
  ```tsx
  // components/ui/EmptyState.tsx
  interface EmptyStateProps {
    type?: 'dynamic' | 'static';
  }

  export function EmptyState({ type = 'static' }: EmptyStateProps) {
    const dynamicProps = type === 'dynamic' ? {
      role: 'status' as const,
      'aria-live': 'polite' as const
    } : {};

    return (
      <div
        {...dynamicProps}
        aria-label="긴급 문제 없음"
        className="w-full h-40 flex flex-col items-center justify-center bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] rounded-[var(--radius-card)] p-10"
      >
        <span aria-hidden="true" className="text-3xl mb-2">
          🎉
        </span>
        <p className="font-[var(--type-large-body)] text-[var(--color-text-primary)]">
          이번 주는 긴급한 문제가 없어요
        </p>
      </div>
    );
  }
  ```

### 6.8 FeedbackButtons 컴포넌트 생성

- [ ] **components/ui/FeedbackButtons.tsx 생성**
  ```tsx
  // components/ui/FeedbackButtons.tsx
  'use client';

  import { useState } from 'react';
  import Link from 'next/link';

  interface FeedbackButtonsProps {
    storeId: string;
  }

  export function FeedbackButtons({ storeId }: FeedbackButtonsProps) {
    const [selected, setSelected] = useState<'helpful' | 'disappointing' | null>(null);

    return (
      <section aria-label="리포트 피드백" className="space-y-4">
        <p className="font-[var(--type-body)] text-[var(--color-text-primary)]">
          도움이 됐나요?
        </p>

        <div className="flex gap-3">
          <button
            aria-label="도움이 되었습니다"
            onClick={() => setSelected('helpful')}
            className="w-36 h-14 flex items-center justify-center gap-2 bg-[var(--color-good-bg)] border border-[var(--color-good)] rounded-lg font-[var(--type-body)] hover:bg-[var(--color-good)]/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)]"
            style={selected === 'helpful' ? { borderWidth: '2px' } : {}}
          >
            <span aria-hidden="true">👍</span> 도움돼요
          </button>

          <button
            aria-label="아쉬웠습니다"
            onClick={() => setSelected('disappointing')}
            className="w-36 h-14 flex items-center justify-center gap-2 bg-[var(--color-urgent-bg)] border border-[var(--color-urgent)] rounded-lg font-[var(--type-body)] hover:bg-[var(--color-urgent)]/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)]"
            style={selected === 'disappointing' ? { borderWidth: '2px' } : {}}
          >
            <span aria-hidden="true">👎</span> 아쉬워요
          </button>
        </div>

        <Link
          href={`/survey?from=${storeId}`}
          className="block w-full h-12 flex items-center justify-center gap-2 bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-lg font-[var(--type-body)] hover:bg-[var(--color-bg-secondary)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)]"
        >
          <span aria-hidden="true">💬</span> 의견 남기기
        </Link>
      </section>
    );
  }
  ```

### 6.9 SectionHeader 컴포넌트 생성

- [ ] **components/ui/SectionHeader.tsx 생성**
  ```tsx
  // components/ui/SectionHeader.tsx
  interface SectionHeaderProps {
    title: string;
    support?: string;
    withBackground?: boolean;
  }

  export function SectionHeader({ title, support, withBackground = false }: SectionHeaderProps) {
    return (
      <div 
        className={`
          w-full mt-[var(--space-section-gap)] mb-[var(--space-m)]
          ${withBackground ? 'bg-[var(--color-bg-secondary)] p-3 rounded' : ''}
        `}
      >
        <h2 className="font-[var(--type-h2)] text-[var(--color-text-primary)]">
          {title}
        </h2>
        {support && (
          <p className="font-[var(--type-body)] text-[var(--color-text-secondary)] mt-1">
            {support}
          </p>
        )}
      </div>
    );
  }
  ```

### 6.10 BadgeChips 컴포넌트 생성

- [ ] **components/ui/BadgeChips.tsx 생성**
  ```tsx
  // components/ui/BadgeChips.tsx
  import type { BadgeType } from '@/lib/types/report';

  interface BadgeChipsProps {
    badges: BadgeType[];
  }

  const BADGE_LABELS: Record<BadgeType, string> = {
    sample_small: '표본 부족',
    low_confidence: '확신 낮음',
    event_possible: '이벤트 가능성'
  };

  export function BadgeChips({ badges }: BadgeChipsProps) {
    if (badges.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            aria-label={`${BADGE_LABELS[badge]} 경고`}
            className="px-3 py-1 bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border border-[var(--color-warning)] rounded-[var(--radius-chip-small)] font-[var(--type-caption)]"
          >
            [{BADGE_LABELS[badge]}]
          </span>
        ))}
      </div>
    );
  }
  ```

### 6.11 CategoryDetailCard 컴포넌트 생성 (⚠️ 누락 컴포넌트)

- [ ] **components/ui/CategoryDetailCard.tsx 생성**
  ```tsx
  // components/ui/CategoryDetailCard.tsx
  import type { CategoryDetail } from '@/lib/types/report';

  export function CategoryDetailCard({
    displayName,
    positivePercent,
    negativePercent,
    keywords,
    negativeExamples,
    hasDeliveryNote
  }: CategoryDetail) {
    return (
      <div className="bg-[var(--color-bg-secondary)] rounded-lg p-5 space-y-3">
        <h3 className="font-[var(--type-large-body)] text-[var(--color-text-primary)]">
          {displayName}
        </h3>

        <p className="font-[var(--type-body)] text-[var(--color-text-secondary)]">
          긍정 {positivePercent}% · 부정 {negativePercent}%
        </p>

        {keywords.length > 0 && (
          <div>
            <p className="font-[var(--type-body)] text-[var(--color-text-primary)] mb-1">
              자주 나온 말:
            </p>
            <p className="font-[var(--type-body)] text-[var(--color-text-secondary)]">
              {keywords.map((kw, idx) => (
                <span key={idx}>
                  "{kw}"{idx < keywords.length - 1 && ', '}
                </span>
              ))}
            </p>
          </div>
        )}

        {negativeExamples.length > 0 && (
          <div>
            <p className="font-[var(--type-body)] text-[var(--color-text-primary)] mb-1">
              부정 예시:
            </p>
            <ul className="list-disc list-inside space-y-1">
              {negativeExamples.map((example, idx) => (
                <li key={idx} className="font-[var(--type-body)] text-[var(--color-text-secondary)]">
                  {example}
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasDeliveryNote && (
          <div className="p-3 bg-[var(--color-info-bg)] rounded">
            <p className="font-[var(--type-caption)] text-[var(--color-info)]">
              📋 알뜰배달/한집배달 언급 많음
            </p>
          </div>
        )}
      </div>
    );
  }
  ```
  - **설명**: 카테고리 상세 정보를 표시하는 카드
  - 참고: wireframes.md 268-332줄

### 6.12 DisclaimerAccordion 컴포넌트 생성 (⚠️ 누락 컴포넌트)

- [ ] **components/ui/DisclaimerAccordion.tsx 생성**
  ```tsx
  // components/ui/DisclaimerAccordion.tsx
  'use client';

  import { useState, useId } from 'react';

  export function DisclaimerAccordion() {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentId = useId();

    return (
      <div>
        <button
          aria-expanded={isExpanded}
          aria-controls={contentId}
          aria-label="면책 보기"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 px-5 hover:bg-black/5 transition-colors rounded font-[var(--type-body)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)]"
        >
          <span aria-hidden="true">⚖️</span> 면책 {isExpanded ? '접기 ▴' : '보기 ▾'}
        </button>

        {!isExpanded ? null : (
          <div
            id={contentId}
            role="region"
            className="p-4 bg-[var(--color-bg-secondary)] rounded mt-2"
          >
            <p className="font-[var(--type-body)] text-[var(--color-text-secondary)]">
              최종 결정은 사장님께 있습니다. 가게 상황을 고려해 조정해주세요.
            </p>
          </div>
        )}
      </div>
    );
  }
  ```
  - **설명**: 면책 사항을 접기/펼치기로 표시
  - 참고: wireframes.md 251-259줄

---

## Phase 7: 페이지 구현

**목적**: 3개 화면 완성 (데모 랜딩 / 리포트 / 설문)

**⚠️ 중요**: Next.js 15부터 params가 Promise로 변경됨

**참고 문서**:
- `docs/wireframes.md` - 전체 화면 와이어프레임
- `docs/architecture.md` - 섹션 6 (라우팅 & 렌더링)

**Phase 완료 검증 방법**:
- `npm run dev` 실행 시 3개 페이지 모두 에러 없이 렌더링
- 브라우저 네비게이션 플로우 테스트:
  - `/demo/` → StoreCard 클릭 → `/report/store-1/` 이동 확인
  - `/report/store-1/` → 뒤로가기 → `/demo/` 복귀 확인
  - `/report/store-1/` → 의견 남기기 → `/survey?from=store-1` 이동 확인
- trailingSlash URL이 정상 작동하는지 확인 (`/report/store-1/` vs `/report/store-1`)
- TypeScript 타입 에러 없음 (`npm run type-check`)
- 각 페이지의 데이터가 정상 표시되는지 확인 (emoji, category, priorities 등)

### 7.1 Screen 1: 데모 랜딩 페이지 수정

- [ ] **app/demo/page.tsx 수정**
  ```tsx
  // app/demo/page.tsx
  // ⚠️ 이 파일은 Server Component입니다. 'use client' 금지!
  
  import { Hero } from '@/components/ui/Hero';
  import { StoreCard } from '@/components/ui/StoreCard';
  import { loadAllReports } from '@/lib/data/loader';

  export default function DemoPage() {
    // ⚠️ loadAllReports는 Server Component에서만 사용 가능 (fs 사용)
    const reports = loadAllReports();

    return (
      <main className="space-y-8 pb-10">
        <Hero />

        <section aria-label="샘플 가게 리스트">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reports.map((report) => (
              <StoreCard
                key={report.storeId}
                id={report.storeId}
                name={report.storeName}
                emoji={report.emoji}            // ⚠️ 타입 불일치 해결: WeeklyReport에 포함됨
                category={report.category}       // ⚠️ 타입 불일치 해결: WeeklyReport에 포함됨
                period={report.period}
                reviewCount={report.totalReviews}
                priorities={{
                  urgent: report.priorities.urgent.length,
                  consider: report.priorities.consider.length,
                  good: report.priorities.good.length
                }}
              />
            ))}
          </div>
        </section>
      </main>
    );
  }
  ```
  - **중요**: emoji, category 필드가 WeeklyReport에 포함되어 있어서 타입 에러 없음

### 7.2 Screen 2: 주간 리포트 페이지 생성 (⚠️ Next.js 15 async params)

- [ ] **app/report/[storeId]/page.tsx 생성**
  ```tsx
  // app/report/[storeId]/page.tsx
  // ⚠️ 이 파일은 Server Component입니다. 'use client' 금지!
  
  import { notFound } from 'next/navigation';
  import { AppHeader } from '@/components/ui/AppHeader';
  import { SectionHeader } from '@/components/ui/SectionHeader';
  import { ActionCard } from '@/components/ui/ActionCard';
  import { EmptyState } from '@/components/ui/EmptyState';
  import { BadgeChips } from '@/components/ui/BadgeChips';
  import { FeedbackButtons } from '@/components/ui/FeedbackButtons';
  import { CategoryDetailCard } from '@/components/ui/CategoryDetailCard';
  import { DisclaimerAccordion } from '@/components/ui/DisclaimerAccordion';
  import { loadReport } from '@/lib/data/loader';
  import { STORE_IDS } from '@/lib/utils/constants';

  // Static Export용 경로 생성
  export async function generateStaticParams() {
    return STORE_IDS.map(storeId => ({ storeId }));
  }

  // ⚠️ Next.js 15: params가 Promise로 변경
  interface ReportPageProps {
    params: Promise<{ storeId: string }>;
  }

  // ⚠️ Next.js 15: async function으로 변경
  export default async function ReportPage({ params }: ReportPageProps) {
    const { storeId } = await params;  // ⚠️ Promise를 await

    // storeId 유효성 검증
    if (!STORE_IDS.includes(storeId as any)) {
      notFound();
    }

    // JSON 로드 (Server Component에서만 가능)
    const report = loadReport(storeId);

    const formatDate = (date: string) => {
      const [, month, day] = date.split('-');
      return `${parseInt(month)}/${parseInt(day)}`;
    };

    return (
      <>
        <AppHeader showBack />

        <main className="space-y-6 pb-10">
          {/* 상단 정보 */}
          <section className="space-y-2">
            <h1 className="font-[var(--type-h1)] text-[var(--color-text-primary)]">
              {report.storeName} 주간 리포트
            </h1>
            <p className="font-[var(--type-body)] text-[var(--color-text-secondary)]">
              {formatDate(report.period.start)}~{formatDate(report.period.end)} • 리뷰 {report.totalReviews}
            </p>
          </section>

          {/* 한 줄 요약 */}
          <div className="p-4 bg-[var(--color-info-bg)] rounded-lg">
            <p className="font-[var(--type-body)] text-[var(--color-text-primary)]">
              📌 {report.summary}
            </p>
          </div>

          {/* 먼저 고칠 일 */}
          <section>
            <SectionHeader 
              title="먼저 고칠 일"
              support={
                report.priorities.urgent.length > 0 
                  ? "가장 급한 1가지만 먼저 볼게요"
                  : "급한 건 없어요. 개선 후보를 볼게요"
              }
            />

            <div className="space-y-4">
              {report.priorities.urgent.length > 0 ? (
                report.priorities.urgent.map((card, index) => (
                  <ActionCard key={index} {...card} />
                ))
              ) : (
                <EmptyState type="static" />
              )}

              {report.priorities.consider.map((card, index) => (
                <ActionCard key={index} {...card} />
              ))}

              {report.priorities.good.map((card, index) => (
                <ActionCard key={index} {...card} />
              ))}
            </div>
          </section>

          {/* 상세 분석 */}
          <section>
            <SectionHeader title="상세 분석" withBackground />
            <div className="space-y-4">
              {report.categoryDetails.map((detail, index) => (
                <CategoryDetailCard key={index} {...detail} />
              ))}
            </div>
          </section>

          {/* 참고하세요 */}
          <section className="space-y-3">
            <BadgeChips badges={report.badges} />
            <p className="text-sm text-[var(--color-text-secondary)]">
              ℹ️ 일부 리뷰 누락 가능
            </p>
            <DisclaimerAccordion />
          </section>

          {/* 피드백 */}
          <FeedbackButtons storeId={storeId} />
        </main>
      </>
    );
  }
  ```
  - **중요**: Next.js 15의 async params 패턴 적용
  - 참고: wireframes.md 127-373줄

### 7.3 Screen 3: 설문 페이지 수정

- [ ] **app/survey/page.tsx 수정**
  (이전 버전과 동일 - 코드 생략)

### 7.4 루트 페이지 수정

- [ ] **app/page.tsx 수정**
  ```tsx
  // app/page.tsx
  import { redirect } from 'next/navigation';

  export default function HomePage() {
    redirect('/demo/');  // ⚠️ trailingSlash: true이므로 / 포함
  }
  ```

---

## Phase 8: 접근성 및 QA

**목적**: WCAG 2.1 AA 준수 확인 및 반응형 테스트

**참고 문서**:
- `docs/design-guide.md` - 섹션 10 (접근성)
- `docs/design-guide.md` - 섹션 12 (개발 체크리스트)

**Phase 완료 검증 방법**:
- WebAIM Contrast Checker로 색상 대비 4.5:1 이상 확인
- 키보드 Tab 키로 모든 인터랙티브 요소 접근 가능
- 모바일 (360px), 태블릿 (768px), 데스크톱 (1024px) 모두 정상
- trailingSlash URL 라우팅 정상 작동 확인

### 8.1 색상 대비 검증

- [ ] **WebAIM Contrast Checker로 13개 조합 검증**
  - 사이트: https://webaim.org/resources/contrastchecker/
  - 검증 목록:
    - Primary Text (#1A1A1A) on White (#FFFFFF): 4.5:1 이상
    - Urgent Chip White on #E53E3E: 4.5:1 이상
    - Consider Chip White on #DD6B20: 4.5:1 이상
    - Good Chip White on #38A169: 4.5:1 이상
    - Action Card Text on Urgent BG (#FFF5F5): 4.5:1 이상
    - Action Card Text on Consider BG (#FFFAF0): 4.5:1 이상
    - Action Card Text on Good BG (#F0FFF4): 4.5:1 이상
  - 실패 시: 색상 HEX 코드 조정 또는 폰트 굵기 증가
  - 참고: design-guide.md 250-268줄

### 8.2 터치 영역 확인

- [ ] **인터랙티브 요소만 44px+ 확인**
  - CTA 버튼: 48px+ (샘플 리포트 보기)
  - 아코디언 트리거: 48px (대안 보기/접기)
  - 라디오 버튼: `<label>` 전체 44px+
  - 피드백 버튼: 56px (도움돼요/아쉬워요)
  - **제외**: Priority Chip (정적 정보)

### 8.3 키보드 내비게이션 테스트

- [ ] **Tab 키로 순차 이동 확인**
  - 헤더 뒤로 버튼 → 콘텐츠 → CTA 버튼 순서
  - 모든 인터랙티브 요소 포커스 가능
  - 포커스 표시 (outline + shadow-focus)

- [ ] **Enter/Space 키로 활성화 확인**
  - 버튼 클릭
  - 라디오 선택
  - 아코디언 토글

### 8.4 반응형 테스트

- [ ] **모바일 (360px, 375px, 414px, 430px)**
  - Chrome DevTools → Device Toolbar
  - 확인:
    - 1열 레이아웃
    - 패딩 20px
    - 텍스트 줄바꿈 정상 (word-break: keep-all)
    - 가로 스크롤 없음

- [ ] **태블릿 (768px, 820px, 1024px)**
  - 확인:
    - 1열 중앙 정렬
    - 최대 너비 640px
    - 패딩 24px
    - 양쪽 여백 균등

- [ ] **데스크톱 (1280px, 1920px)**
  - 확인:
    - Screen 1: 2열 그리드
    - Screen 2/3: 1열 고정
    - 최대 너비 768px
    - 패딩 32px

### 8.5 trailingSlash 라우팅 검증 (⚠️ Static Export 필수 체크)

- [ ] **out/ 폴더 구조 확인**
  - 빌드 후 확인:
    - `out/demo/index.html` 존재
    - `out/report/store-1/index.html` 존재
    - `out/report/store-2/index.html` 존재
    - `out/report/store-3/index.html` 존재
    - `out/survey/index.html` 존재

- [ ] **URL 라우팅 테스트**
  - 테스트 케이스:
    - ✅ `/demo/` → 정상
    - ⚠️ `/demo` → 리다이렉트 또는 404
    - ✅ `/report/store-1/` → 정상
    - ⚠️ `/report/store-1` → 리다이렉트 또는 404
  - **중요**: 모든 Link 컴포넌트 href에 trailing slash (/) 포함 확인
  - 참고: architecture.md 168-177줄

- [ ] **네비게이션 플로우 테스트**
  - 플로우 1: /demo/ → Store Card 클릭 → /report/store-1/ 이동
  - 플로우 2: /report/store-1/ → 뒤로가기 → /demo/ 복귀
  - 플로우 3: /report/store-1/ → 의견 남기기 → /survey/ 이동
  - 플로우 4: /survey/ → 제출 → 다른 리포트 보기 → /demo/ 이동

### 8.6 색맹 시뮬레이션

- [ ] **Chrome DevTools Rendering 탭**
  - Emulate vision deficiencies
  - Deuteranopia (적록색맹)
  - Protanopia (적색맹)
  - 확인: Priority Chip이 테두리 두께로 구분 가능한지

### 8.7 그레이스케일 변환

- [ ] **Chrome DevTools CSS Filter**
  - 명령어: DevTools > Elements > html 태그에 `style="filter: grayscale(100%)"` 추가
  - 확인: 긴급(3px)/고려(2px)/잘함(1px) 테두리 두께로 구분 가능

---

## Phase 9: 최종 빌드 및 배포

**목적**: 프로덕션 빌드 및 Vercel 배포

**Phase 완료 검증 방법**:
- `npm run build` 성공 및 out/ 폴더 생성 확인
- `npm run preview` 로 로컬에서 정상 작동 확인
- trailingSlash URL (/report/store-1/)이 정상 라우팅되는지 확인
- Vercel 배포 후 실제 URL 접속 테스트

### 9.1 로컬 빌드 테스트

- [ ] **빌드 실행**
  - 명령어: `npm run build`
  - 예상 결과:
    - prebuild 자동 실행 (generated/reports/*.json 생성)
    - Next.js 빌드 성공
    - out/ 폴더 생성
  - 확인:
    - `out/demo/index.html` 존재
    - `out/report/store-1/index.html` 존재 (trailingSlash)
    - `out/report/store-2/index.html` 존재
    - `out/report/store-3/index.html` 존재

- [ ] **프리뷰 실행**
  - 명령어: `npm run preview`
  - 확인:
    - http://localhost:3000/demo/ 접속
    - http://localhost:3000/report/store-1/ 접속 (⚠️ 끝에 / 포함)
    - 네비게이션 정상 작동

### 9.2 trailingSlash 라우팅 검증 (⚠️ 필수!)

- [ ] **trailingSlash URL 테스트**
  - 테스트 1: http://localhost:3000/report/store-1/ (O - 정상)
  - 테스트 2: http://localhost:3000/report/store-1 (X - 리다이렉트 또는 404)
  - 확인: out/ 폴더 구조가 `/report/store-1/index.html` 형태인지 확인
  - 참고: architecture.md 158-177줄

### 9.3 Lighthouse 점수 확인

- [ ] **Chrome DevTools Lighthouse 실행**
  - 테스트 URL: `http://localhost:3000/demo/` (preview 모드)
  - 모드: Desktop 또는 Mobile
  - 목표 점수:
    - Performance: 90+ (Static Export로 자동 최적화)
    - Accessibility: 90+ (WCAG 2.1 AA 준수)
    - Best Practices: 90+
    - SEO: 90+
  - 실행 방법:
    1. Chrome DevTools 열기 (F12)
    2. Lighthouse 탭 선택
    3. Mode: Desktop, Categories: All 선택
    4. Analyze page load 클릭
  - **점수가 낮으면**:
    - Performance < 90: 큰 이미지 최적화, JavaScript 번들 크기 확인
    - Accessibility < 90: Phase 8.1 (색상 대비) 재검증, ARIA 속성 누락 확인
    - Best Practices < 90: console.log 제거, 보안 헤더 추가
    - SEO < 90: meta 태그 추가 (title, description)
  - 참고: architecture.md 1321-1330줄

### 9.4 Vercel 배포

- [ ] **Vercel 프로젝트 생성**
  1. https://vercel.com 접속 및 로그인
  2. New Project 클릭
  3. GitHub 저장소 연결
  4. Framework Preset: Next.js 선택
  5. Build Command: `npm run build`
  6. Output Directory: `out`
  7. Install Command: `npm install`
  8. Deploy 클릭

- [ ] **Vercel Preview 배포 확인**
  - Vercel Dashboard에서 Preview 링크 클릭
  - 3개 화면 모두 테스트
  - trailingSlash URL 작동 확인
  - 모바일 기기에서도 테스트 (실제 폰)

- [ ] **Vercel Production 배포**
  - main 브랜치에 병합
  - Vercel 자동 배포 확인 (GitHub webhook)
  - Production URL 접속 및 최종 테스트

### 9.5 배포 최종 체크리스트

- [ ] **로컬 빌드 성공** (`npm run build`)
- [ ] **generated/reports/*.json 파일 생성** (3개 파일)
- [ ] **out/ 디렉토리에 HTML 생성** (demo/, report/, survey/)
- [ ] **Lighthouse 점수** (모든 지표 90+)
- [ ] **반응형 테스트** (360px, 768px, 1024px)
- [ ] **접근성 검증** (WebAIM, 키보드, 스크린리더)
- [ ] **크로스 브라우저 테스트** (Chrome, Safari, Firefox)
- [ ] **Vercel Preview 배포 확인**
- [ ] **Vercel Production 배포 확인**
- [ ] **실제 URL 공유 및 피드백 수집**

---

## 🚨 막히기 쉬운 포인트 및 해결 방법 (실전 에러 중심)

### 빌드/실행 단계별 에러

| 문제 | 에러 메시지 | 원인 | 해결 방법 |
|---|---|---|---|
| **1. Next.js 15 params 타입 에러** | `Type 'string' is not assignable to type 'Promise<...>'` | Next.js 15에서 params가 Promise로 변경 | Phase 7.2의 `params: Promise<{ storeId: string }>` 패턴 사용, `await params` 추가 |
| **2. Tailwind v4 클래스 미적용** | 브라우저에서 스타일 없음 | @tailwind 지시어 순서 오류 또는 content 경로 누락 | Phase 1.1: globals.css에서 `@tailwind base → components → utilities` 순서, Phase 1.2: tailwind.config.ts의 content 경로 확인 |
| **3. Tailwind CSS 변수 미인식** | `className="text-[var(--color-urgent)]"` 스타일 없음 | CSS 변수 정의 누락 | Phase 1.1: globals.css에서 `:root { --color-urgent: #E53E3E; }` 정의 확인 |
| **4. fs 모듈 클라이언트 에러** | `Module not found: Can't resolve 'fs'` | 'use client' 컴포넌트에서 loader.ts import | Phase 3.3: loader.ts는 Server Component에서만 import |
| **5. generated/ 폴더 없음** | `Error: Cannot find module 'generated/reports/store-1.json'` | prebuild 미실행 | Phase 5.3: `npm run prebuild` 실행 → JSON 생성 확인 |
| **6. emoji/category 타입 에러** | `Property 'emoji' does not exist on type 'WeeklyReport'` | WeeklyReport 타입에 필드 누락 | Phase 2.3: WeeklyReport 타입에 emoji, category 필드 추가 확인 |
| **7. trailingSlash 404** | 404 Page Not Found at `/report/store-1` | URL 끝에 / 없음 | Phase 0.6: next.config.ts에서 `trailingSlash: true` 확인, Link href에 `/` 포함 (`/report/store-1/`) |
| **8. 엑셀 컬럼명 불일치** | parseExcel 결과가 빈 배열 | 엑셀 파일의 실제 컬럼명이 다름 | Phase 3.1: 실제 엑셀 파일 열어서 컬럼명 확인 (리뷰내용, 별점, 작성일), parser.ts 수정 |
| **9. JSON 필드 누락** | `TypeError: Cannot read property 'urgent' of undefined` | generate-reports.ts에서 필드 누락 | Phase 5.2: WeeklyReport 타입의 모든 필드 포함 확인 (emoji, category, priorities.urgent 등) |
| **10. prebuild 스크립트 실행 안 됨** | `Command not found: tsx` | tsx 패키지 미설치 | Phase 0.5: `npm install -D tsx` 실행 |
| **11. Pretendard 폰트 미로드** | 브라우저에서 시스템 폰트 사용 | 폰트 파일 경로 오류 | Phase 1.3: public/fonts/Pretendard/*.woff2 파일 존재 확인, lib/fonts.ts의 path 확인 (`../public/fonts/...`) |
| **12. generateStaticParams 누락** | 빌드 시 동적 경로 생성 안 됨 | [storeId] 페이지에 함수 누락 | Phase 7.2: `export async function generateStaticParams()` 추가 확인 |
| **13. ActionCard alternatives 미표시** | 대안 보기 버튼 없음 | alternatives 배열이 undefined | Phase 5.2: matchActions에서 alternatives 필드 포함 확인 |
| **14. 아코디언 열림/닫힘 안 됨** | 클릭해도 반응 없음 | useState 또는 'use client' 누락 | Phase 6.6: ActionCard 최상단에 `'use client'` 지시어 확인 |
| **15. React Compiler 에러** | 빌드 시 experimental 경고 | React Compiler는 opt-in 기능 | 무시 (MVP에서는 사용 안 함) 또는 next.config.ts에서 experimental 옵션 제거 |

### 타입 불일치 체크리스트

- [ ] **WeeklyReport 타입 필드 완전성**
  - Phase 2.3: emoji, category 필드 추가 확인
  - Phase 5.2: generate-reports.ts에서 모든 필드 포함 확인
  - Phase 7.1: DemoPage에서 report.emoji, report.category 접근 확인

- [ ] **ActionCard 타입 필드 완전성**
  - Phase 4.4: matchActions가 recommended, alternatives 반환 확인
  - Phase 5.2: actionCards 배열에 action, alternatives 포함 확인
  - Phase 6.6: ActionCard 컴포넌트가 모든 필드 사용 확인

### Static Export 제약 체크리스트

- [ ] **fs 모듈 사용 위치 확인**
  - ✅ Server Components (app/demo/page.tsx, app/report/[storeId]/page.tsx)
  - ✅ prebuild 스크립트 (scripts/generate-reports.ts)
  - ❌ 'use client' 컴포넌트 (전체 검색으로 확인)

- [ ] **빌드 출력 구조 확인**
  - out/demo/index.html
  - out/report/store-1/index.html (트레일링 슬래시)
  - out/survey/index.html

### 데이터 파이프라인 체크리스트

- [ ] **엑셀 → JSON 변환 흐름 확인**
  - 1단계: parseExcel (엑셀 → RawReview[])
  - 2단계: classifyCategory, analyzeSentiment (RawReview → Review)
  - 3단계: scorePriority (Review[] → ActionCard[])
  - 4단계: matchActions (ActionCard + actions)
  - 5단계: WeeklyReport 조합 (emoji, category 포함)
  - 6단계: JSON.stringify (파일 저장)

- [ ] **JSON → UI 렌더링 흐름 확인**
  - 1단계: loadReport (JSON → WeeklyReport)
  - 2단계: Server Component에서 사용
  - 3단계: Client Component로 props 전달 (fs 사용 금지)
  - 4단계: 브라우저 렌더링

---

## 📊 전체 진행 상황 요약

### Phase별 작업 수 및 난이도

| Phase | 작업 내용 | 주요 작업 수 | 난이도 | 예상 소요 |
|---|---|---|---|---|
| **Phase 0** | 프로젝트 업그레이드 및 초기 설정 | 8개 | 중간 | 1-2시간 |
| **Phase 1** | 디자인 시스템 구축 | 5개 | 중간 | 2-3시간 |
| **Phase 2** | 타입 정의 | 5개 | 낮음 | 1시간 |
| **Phase 3** | Data Layer | 3개 | 중간 | 1-2시간 |
| **Phase 4** | Domain Layer | 5개 | 높음 | 3-4시간 |
| **Phase 5** | Prebuild 스크립트 | 3개 | 높음 | 2-3시간 |
| **Phase 6** | UI 컴포넌트 구현 | 12개 | 중간 | 4-6시간 |
| **Phase 7** | 페이지 구현 | 4개 | 중간 | 2-3시간 |
| **Phase 8** | 접근성 및 QA | 7개 | 낮음 | 2-3시간 |
| **Phase 9** | 최종 빌드 및 배포 | 5개 | 낮음 | 1-2시간 |
| **합계** | | **57개** | | **19-29시간** |

**참고**: 예상 소요 시간은 개발 경험에 따라 2-3배 차이 날 수 있습니다.

### 우선순위 높은 Phase (순서대로 진행)

1. **Phase 0** (필수): 최신 버전 업그레이드, 패키지 설치 → 환경 구축
2. **Phase 1** (필수): 디자인 시스템 없이는 UI 작업 불가
3. **Phase 2** (필수): 타입 정의 없이는 나머지 작업 불가
4. **Phase 3** (필수): Data Layer (엑셀/JSON 입출력)
5. **Phase 4** (핵심): Domain Layer (비즈니스 로직)
6. **Phase 5** (핵심): Prebuild 스크립트 (데이터 파이프라인)
7. **Phase 6** (핵심): UI 컴포넌트 (사용자가 보는 요소)
8. **Phase 7** (핵심): 페이지 (화면 완성)
9. **Phase 8** (마무리): 접근성 및 QA
10. **Phase 9** (마무리): 빌드 및 배포

### 각 Phase 사이 의존 관계

```
Phase 0 (환경) → Phase 1 (디자인)
                      ↓
Phase 2 (타입) → Phase 3 (Data) → Phase 4 (Domain) → Phase 5 (Prebuild)
                                                              ↓
                                                     Phase 6 (컴포넌트) → Phase 7 (페이지)
                                                                                    ↓
                                                                           Phase 8 (QA) → Phase 9 (배포)
```

### 병렬 작업 가능 구간

- Phase 1-2: 디자인 시스템과 타입 정의는 병렬 가능
- Phase 6 내: 각 컴포넌트는 병렬 구현 가능
- Phase 8 내: 각 QA 항목은 병렬 테스트 가능

---

## 🎯 완료 후 결과물

이 TODO 리스트를 완료하면:

1. ✅ **완전히 작동하는 MVP 데모 사이트**
   - 3개 화면 (데모 랜딩 / 주간 리포트 / 설문)
   - Excel → JSON → UI 전체 파이프라인

2. ✅ **3개 가게 샘플 리포트**
   - 달떡볶이 공릉점
   - 처갓집양념치킨 공릉점
   - 춘리마라탕 묵동점

3. ✅ **WCAG 2.1 AA 준수**
   - 색상 대비 4.5:1 이상
   - 키보드 내비게이션
   - 스크린리더 지원

4. ✅ **반응형 디자인**
   - 모바일 (360-430px)
   - 태블릿 (768-1023px)
   - 데스크톱 (1024px+)

5. ✅ **Vercel 배포 완료**
   - Static Export (CDN 최적화)
   - 실시간 URL 공유 가능

### 이후 개선 사항 (Phase 2+ 서비스화)

**기능 확장**:
- 실제 사용자 가게 등록 기능
- 매주 자동 리포트 생성
- 알림 기능 (카톡/문자)
- 리뷰 응답 템플릿

**기술 개선**:
- 한국어 형태소 분석 (키워드 추출 고도화)
- AI 기반 감성 분석 (GPT/Claude API)
- 백엔드 API 구축 (데이터베이스 연동)
- 사용자 인증 (로그인/회원가입)

---

**작성자**: AI Assistant  
**버전**: 2.0 (실행 가능 버전)  
**마지막 업데이트**: 2026-01-22
