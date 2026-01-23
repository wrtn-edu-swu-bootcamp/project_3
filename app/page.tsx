// app/page.tsx
import { AppHeader } from '@/components/ui/AppHeader';
import { Hero } from '@/components/ui/Hero';
import { InlineUrgentAlert } from '@/components/ui/InlineUrgentAlert';
import { SearchSection } from '@/components/ui/SearchSection';
import { QuickActionCards } from '@/components/ui/QuickActionCard';
import { BeforeMidnightSection } from '@/components/ui/BeforeMidnightSection';
import { loadAllReports } from '@/lib/data/loader';
import type { NotificationItem } from '@/components/ui/NotificationBell';

export default function HomePage() {
  // Load all reports
  const reports = loadAllReports();

  // Extract notifications from urgent issues (top 3)
  const notifications: NotificationItem[] = reports
    .filter(report => report.priorities.urgent.length > 0)
    .slice(0, 3)
    .map((report, index) => ({
      id: `notif-${report.storeId}-${index}`,
      storeId: report.storeId,
      storeName: report.storeName,
      emoji: report.emoji,
      issue: report.priorities.urgent[0]?.issue || '긴급 확인 필요',
      timestamp: index === 0 ? '방금 전' : index === 1 ? '1시간 전' : '2시간 전'
    }));

  // Get first urgent alert for inline display
  const firstUrgentAlert = reports
    .filter(report => report.priorities.urgent.length > 0)
    .map(report => ({
      storeId: report.storeId,
      storeName: report.storeName,
      issue: report.priorities.urgent[0]?.issue || '포장 파손 불만이 늘었어요'
    }))[0];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header with notification bell and settings */}
      <AppHeader notifications={notifications} showActions={true} />

      {/* Hero Section */}
      <Hero />

      {/* Inline Urgent Alert (if exists) */}
      {firstUrgentAlert && <InlineUrgentAlert alert={firstUrgentAlert} />}

      {/* Search Section */}
      <SearchSection />

      {/* Quick Action Cards */}
      <QuickActionCards />

      {/* Before Midnight Section (자정전 가게) */}
      <BeforeMidnightSection stores={reports} />

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12 mt-16">
        <div className="container text-center">
          <p className="text-gray-600 mb-2">
            RE:ACTION은 사장님의 소중한 시간을 아껴드립니다
          </p>
          <p className="text-sm text-gray-500">
            © 2024 RE:ACTION. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
