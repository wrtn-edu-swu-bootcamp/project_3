// components/ui/NotificationBell.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface NotificationItem {
  id: string;
  storeId: string;
  storeName: string;
  emoji: string;
  issue: string;
  timestamp: string; // relative time like "방금 전", "1시간 전"
}

interface NotificationBellProps {
  notifications: NotificationItem[];
}

export function NotificationBell({ notifications }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.length;

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`알림 ${unreadCount}개`}
        className="
          relative w-10 h-10 rounded-full
          flex items-center justify-center
          text-gray-600 hover:text-gray-900
          hover:bg-gray-100
          transition-colors duration-200
        "
      >
        {/* Bell Icon */}
        <svg 
          className="w-6 h-6" 
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

        {/* Badge */}
        {unreadCount > 0 && (
          <span className="
            absolute -top-1 -right-1
            w-5 h-5 rounded-full
            bg-red-500 text-white
            text-xs font-bold
            flex items-center justify-center
            shadow-sm
          ">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="
            fixed md:absolute
            inset-x-0 top-14 md:inset-x-auto md:top-full md:right-0
            md:mt-2 md:w-96
            bg-white rounded-b-2xl md:rounded-2xl
            shadow-xl border border-gray-100
            z-50
            animate-slideUp
            max-h-[80vh] md:max-h-[500px]
            overflow-hidden
            flex flex-col
          ">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">알림</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="md:hidden text-gray-400 hover:text-gray-600"
                aria-label="닫기"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <p className="text-sm">알림이 없어요</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <Link
                      key={notification.id}
                      href={`/report/${notification.storeId}/`}
                      onClick={() => setIsOpen(false)}
                      className="
                        block p-4 hover:bg-gray-50
                        transition-colors duration-200
                      "
                    >
                      <div className="flex items-start gap-3">
                        {/* Store Emoji */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-xl">
                          {notification.emoji}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {notification.storeName}
                            </p>
                            <span className="text-xs text-gray-400 flex-shrink-0">
                              {notification.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            긴급: {notification.issue}
                          </p>
                          <span className="text-xs text-blue-500 font-medium mt-1 inline-block">
                            확인하기 →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-100">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  모두 읽음으로 표시
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
