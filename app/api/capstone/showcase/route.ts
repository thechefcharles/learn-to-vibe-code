import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const sortBy = req.nextUrl.searchParams.get('sort') || 'recent';

  try {
    // Get approved capstone submissions with live URLs
    let query = supabase
      .from('capstone_submissions')
      .select(
        `
        id,
        user_id,
        live_url,
        repo_url,
        writeup,
        submitted_at,
        profiles:user_id(name),
        capstone_upvotes(count)
      `
      )
      .eq('result', 'pass')
      .not('live_url', 'is', null)
      .order(
        sortBy === 'popular' ? 'capstone_upvotes.count' : 'submitted_at',
        { ascending: false }
      )
      .limit(50);

    const { data: projects, error } = await query;

    if (error) {
      console.error('Error fetching showcase projects:', error);
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    // Format response
    const formatted = projects?.map((p: any) => ({
      id: p.id,
      studentName: p.profiles?.name || 'Anonymous',
      liveUrl: p.live_url,
      repoUrl: p.repo_url,
      description: p.writeup || 'Check out this capstone project!',
      upvotes: p.capstone_upvotes?.[0]?.count || 0,
      completedAt: p.submitted_at,
    })) || [];

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Showcase error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
