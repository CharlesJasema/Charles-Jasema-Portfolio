import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock recruiter portfolio data
    const mockPortfolio = {
      success: true,
      data: {
        experience: [],
        projects: [],
        skills: [],
        education: [],
        certifications: []
      }
    };
    
    return NextResponse.json(mockPortfolio);
  } catch (error) {
    console.error('Recruiter portfolio error:', error);
    return NextResponse.json(
      { success: false, error: 'Portfolio data unavailable' },
      { status: 500 }
    );
  }
}