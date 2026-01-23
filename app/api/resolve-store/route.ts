import { NextRequest, NextResponse } from "next/server";

/**
 * API Route: /api/resolve-store
 * Purpose: 배민 링크에서 가게명 추출
 * Method: POST
 * Input: { url: string }
 * Output: { storeName: string | null }
 */
export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { storeName: null, error: "URL이 필요해요" },
        { status: 400 }
      );
    }

    // 실제 배민 페이지 fetch (CORS/동적 렌더링 리스크 고려)
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      if (!response.ok) {
        return NextResponse.json({ storeName: null });
      }

      const html = await response.text();

      // og:title 추출
      const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
      if (ogTitleMatch && ogTitleMatch[1]) {
        // "A치킨 - 배달의민족" 형식에서 가게명만 추출
        const storeName = ogTitleMatch[1].split("-")[0].trim();
        return NextResponse.json({ storeName });
      }

      // title 태그 추출
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      if (titleMatch && titleMatch[1]) {
        const storeName = titleMatch[1].split("-")[0].trim();
        return NextResponse.json({ storeName });
      }

      // 추출 실패
      return NextResponse.json({ storeName: null });
    } catch (fetchError) {
      // Fetch 실패 (CORS, 네트워크 등)
      console.error("Fetch error:", fetchError);
      return NextResponse.json({ storeName: null });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { storeName: null, error: "서버 오류가 발생했어요" },
      { status: 500 }
    );
  }
}
