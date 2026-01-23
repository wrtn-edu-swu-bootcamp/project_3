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
import type { WeeklyReport, ActionCard } from '../lib/types/report';
import type { Review } from '../lib/types/review';

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
        emoji: store.emoji,           // 타입 불일치 해결
        category: store.category,     // 타입 불일치 해결
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
