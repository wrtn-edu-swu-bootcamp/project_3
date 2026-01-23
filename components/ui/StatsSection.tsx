// components/ui/StatsSection.tsx

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
    value: '10,000+',
    label: '분석한 리뷰',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    value: '45분',
    label: '평균 시간 절약',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    value: '3분',
    label: '리포트 생성 시간',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    value: '98%',
    label: '사장님 만족도',
    color: 'from-purple-500 to-purple-600'
  }
];

export function StatsSection() {
  return (
    <section className="container py-16" aria-label="서비스 통계">
      {/* 배경 */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-lg">
        {/* 섹션 헤더 */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            검증된 서비스
          </h2>
          <p className="text-gray-600">
            이미 많은 사장님들이 RE:ACTION과 함께하고 있어요
          </p>
        </div>

        {/* 통계 그리드 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                text-center p-6
                bg-white rounded-2xl
                border border-gray-100
                shadow-sm hover:shadow-md
                transition-all duration-200
                hover:-translate-y-1
                group
              "
            >
              {/* 아이콘 */}
              <div className={`
                w-12 h-12 mx-auto mb-4
                rounded-xl
                bg-gradient-to-br ${stat.color}
                flex items-center justify-center
                text-white
                group-hover:scale-110
                transition-transform duration-200
              `}>
                {stat.icon}
              </div>

              {/* 숫자 */}
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>

              {/* 라벨 */}
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 메시지 */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            * 2024년 1월 기준 누적 통계
          </p>
        </div>
      </div>
    </section>
  );
}
