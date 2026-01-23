// components/ui/QuickActionCard.tsx
'use client';

import { useRouter } from 'next/navigation';

export interface QuickAction {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}

interface QuickActionCardProps {
  action: QuickAction;
}

export function QuickActionCard({ action }: QuickActionCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      router.push(action.href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="
        w-full p-5
        bg-white rounded-2xl
        border border-gray-100
        hover:border-blue-200
        shadow-sm hover:shadow-md
        transition-all duration-200
        hover:-translate-y-0.5
        text-left
        group
      "
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="
          flex-shrink-0 w-12 h-12 rounded-xl
          bg-blue-50 group-hover:bg-blue-100
          flex items-center justify-center
          text-blue-500
          transition-colors duration-200
        ">
          {action.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-900 mb-1">
            {action.title}
          </h3>
          <p className="text-sm text-gray-600">
            {action.description}
          </p>
        </div>

        {/* Arrow */}
        <svg 
          className="
            flex-shrink-0 w-5 h-5 text-gray-400 
            group-hover:text-blue-500 group-hover:translate-x-1
            transition-all duration-200
          " 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </div>
    </button>
  );
}

// Pre-defined quick actions
export function QuickActionCards() {
  const quickActions: QuickAction[] = [
    {
      id: '3-min-summary',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '3분 요약 보기',
      description: '급한 것만 빠르게 보기',
      onClick: () => {
        const element = document.getElementById('stores-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
    {
      id: 'saved-stores',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: '저장된 가게',
      description: '가게를 선택하면 개선 포인트를 알려드려요',
      href: '/report/'
    },
    {
      id: 'about-service',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'RE:ACTION은 뭐예요?',
      description: '리뷰를 자동으로 분류하고, 바로 할 일을 추천해요',
      onClick: () => {
        const element = document.getElementById('service-intro');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  ];

  return (
    <section className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <QuickActionCard key={action.id} action={action} />
        ))}
      </div>
    </section>
  );
}
