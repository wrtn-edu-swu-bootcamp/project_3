// components/ui/MainHeader.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Notification {
  id: string;
  storeId: string;
  title: string;
  storeName?: string;
  time: string;
  type: 'info' | 'urgent';
}

interface MainHeaderProps {
  notifications?: Notification[];
}

export function MainHeader({ notifications = [] }: MainHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const hasUnreadNotifications = notifications.length > 0;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link 
          href="/demo/" 
          className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          RE:ACTION
        </Link>

        {/* 우측 아이콘들 */}
        <div className="flex items-center gap-3">
          {/* 알림 아이콘 */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="알림"
            >
              <svg 
                className="w-6 h-6 text-gray-700" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                />
              </svg>
              {hasUnreadNotifications && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {/* 알림 드롭다운 */}
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 p-2">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900">알림</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto p-1">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <p className="text-sm">알림이 없어요</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <Link
                          key={notif.id}
                          href={`/report/${notif.storeId}/`}
                          onClick={() => setShowNotifications(false)}
                          className={`block m-2 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                            notif.type === 'urgent'
                              ? 'bg-red-50 border-red-200 hover:bg-red-100'
                              : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                          }`}
                        >
                          <div className="p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-bold mb-1 ${
                                  notif.type === 'urgent' ? 'text-red-900' : 'text-blue-900'
                                }`}>
                                  {notif.title}
                                </p>
                                {notif.storeName && (
                                  <p className="text-xs text-gray-600 mb-1">
                                    {notif.storeName}
                                  </p>
                                )}
                                <p className="text-xs text-gray-500">
                                  {notif.time}
                                </p>
                              </div>
                              <div className={`flex items-center gap-1 text-sm font-medium ${
                                notif.type === 'urgent' ? 'text-red-600' : 'text-blue-600'
                              }`}>
                                <span>확인</span>
                                <svg 
                                  className="w-4 h-4" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M9 5l7 7-7 7" 
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 설정 아이콘 */}
          <button
            onClick={() => alert('설정 기능은 데모에서 준비중입니다')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="설정"
          >
            <svg 
              className="w-6 h-6 text-gray-700" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
