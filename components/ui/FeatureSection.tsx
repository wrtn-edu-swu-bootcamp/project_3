// components/ui/FeatureSection.tsx

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'AI 리뷰 분석',
    description: '수백 개의 리뷰를 3분만에 읽고, 핵심만 추려서 알려드려요'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: '우선순위 액션 제안',
    description: '가장 급한 것부터 차근차근, 실행 가능한 개선 방법을 제시해요'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    title: '주간 트렌드 파악',
    description: '이번 주 고객들의 반응을 한눈에 보고, 다음 주를 준비하세요'
  }
];

export function FeatureSection() {
  return (
    <section id="service-intro" className="container py-16 bg-gradient-to-b from-white to-gray-50 scroll-mt-20" aria-label="서비스 소개">
      {/* 섹션 헤더 */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          왜 RE:ACTION인가요?
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          바쁜 사장님을 위한 똑똑한 리뷰 비서
        </p>
        
        {/* RE:ACTION 의미 설명 */}
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="px-4 py-2 bg-white rounded-xl shadow-sm">
              <span className="text-lg font-bold text-blue-600">Review</span>
            </div>
            <span className="text-2xl text-gray-400">+</span>
            <div className="px-4 py-2 bg-white rounded-xl shadow-sm">
              <span className="text-lg font-bold text-indigo-600">Action</span>
            </div>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            <span className="font-semibold text-blue-700">리뷰(Review)</span>를 읽는 데서 끝나지 않고,<br />
            <span className="font-semibold text-indigo-700">실행(Action)</span>까지 도와드리는 서비스입니다.
          </p>
        </div>
      </div>

      {/* 기능 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <article
            key={index}
            className="
              bg-white rounded-2xl p-6
              border border-gray-100
              shadow-sm hover:shadow-md
              transition-all duration-200
              hover:-translate-y-1
              group
            "
          >
            {/* 아이콘 */}
            <div className="
              w-16 h-16 rounded-xl
              bg-gradient-to-br from-blue-50 to-blue-100
              flex items-center justify-center
              text-blue-600
              mb-4
              group-hover:scale-110
              transition-transform duration-200
            ">
              {feature.icon}
            </div>

            {/* 제목 */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>

            {/* 설명 */}
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
