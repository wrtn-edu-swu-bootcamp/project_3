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
