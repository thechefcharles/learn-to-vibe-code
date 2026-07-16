import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { id } = params;

  try {
    // Check if user already upvoted
    const { data: existing } = await supabase
      .from('capstone_upvotes')
      .select('id')
      .eq('capstone_id', id)
      .eq('user_id', user.id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Already upvoted' },
        { status: 400 }
      );
    }

    // Add upvote
    const { error } = await supabase
      .from('capstone_upvotes')
      .insert({
        capstone_id: id,
        user_id: user.id,
      });

    if (error) {
      console.error('Error upvoting:', error);
      return NextResponse.json(
        { error: 'Failed to upvote' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Upvote error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
