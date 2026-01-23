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
  // 엑셀 컬럼명: CONTENT, RATING, DATE, NAME, MENU
  const reviews: RawReview[] = data.map((row: any) => ({
    content: row['CONTENT'] || row['리뷰내용'] || row['content'] || '',
    rating: Number(row['RATING'] || row['별점'] || row['rating'] || 0),
    date: row['DATE'] || row['작성일'] || row['date'] || ''
  }));

  // 5. 유효성 검사
  const validReviews = reviews.filter(
    (review) => review.content && review.rating >= 1 && review.rating <= 5
  );

  console.log(`✅ ${filePath}: ${validReviews.length}개 리뷰 파싱 완료`);
  return validReviews;
}
