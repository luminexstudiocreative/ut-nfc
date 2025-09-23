import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const cataloguesDir = path.join(process.cwd(), 'public', 'catalogues');
    
    // Check if the catalogues directory exists
    if (!fs.existsSync(cataloguesDir)) {
      return NextResponse.json([]);
    }

    // Read all files in the catalogues directory
    const files = fs.readdirSync(cataloguesDir);
    
    // Filter for PDF files and get their stats
    const catalogueFiles = files
      .filter(file => file.toLowerCase().endsWith('.pdf'))
      .map(file => {
        const filePath = path.join(cataloguesDir, file);
        const stats = fs.statSync(filePath);
        
        // Create a display name by removing extension and formatting
        const displayName = file
          .replace('.pdf', '')
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return {
          name: file,
          path: `/catalogues/${file}`,
          size: stats.size,
          displayName: displayName
        };
      })
      .sort((a, b) => a.displayName.localeCompare(b.displayName));

    return NextResponse.json(catalogueFiles);
  } catch (error) {
    console.error('Error reading catalogues directory:', error);
    return NextResponse.json({ error: 'Failed to load catalogues' }, { status: 500 });
  }
}
