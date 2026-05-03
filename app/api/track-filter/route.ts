import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

const VALID_KEYS = new Set([
  'lang=spanish', 'lang=vietnamese', 'lang=chinese',
  'ins=medicaid',
  'svc=dementia', 'svc=hospice',
]);

export async function POST(req: NextRequest) {
  try {
    const { filter_key, city } = await req.json();

    if (!VALID_KEYS.has(filter_key) || typeof city !== 'string' || city.length > 100) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const sb = createServerClient();
    await sb.from('filter_clicks').insert({ filter_key, city });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
