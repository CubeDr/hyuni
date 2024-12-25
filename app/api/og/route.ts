import { OgObject } from '@/app/posts/[id]/OpenGraphBlock';
import ogs from 'open-graph-scraper';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  try {
    const { result } = await ogs({ url: url as string });
    return Response.json({
      ogTitle: result.ogTitle,
      ogUrl: result.ogUrl,
      ogImage: (result.ogImage ?? [])[0]?.url,
      ogDescription: result.ogDescription,
    } as OgObject);
  } catch (error) {
    return new Response('Failed to fetch Open Graph data', {
      status: 500,
    });
  }
}
