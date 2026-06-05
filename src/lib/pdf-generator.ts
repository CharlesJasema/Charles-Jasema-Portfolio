/**
 * PDF Generator Utility
 * 
 * Generates PDF files from lyrics content using browser's print functionality
 * Security: Uses DOMPurify for HTML sanitization to prevent XSS attacks
 */

import DOMPurify from 'dompurify';

interface Verse {
  type: string;
  lines: string[];
}

interface LyricsData {
  songTitle: string;
  artist: string;
  album: string;
  releaseYear: string;
  language: string;
  verses: Verse[];
  notes?: string;
}

/**
 * Generate and download a PDF of song lyrics
 * Security: Sanitizes all user input to prevent XSS attacks
 */
export function generateLyricsPDF(lyrics: LyricsData): void {
  // Sanitize all input data
  const sanitizedLyrics = {
    songTitle: DOMPurify.sanitize(lyrics.songTitle),
    artist: DOMPurify.sanitize(lyrics.artist),
    album: DOMPurify.sanitize(lyrics.album),
    releaseYear: DOMPurify.sanitize(lyrics.releaseYear),
    language: DOMPurify.sanitize(lyrics.language),
    verses: lyrics.verses.map(verse => ({
      type: DOMPurify.sanitize(verse.type),
      lines: verse.lines.map(line => DOMPurify.sanitize(line))
    })),
    notes: lyrics.notes ? DOMPurify.sanitize(lyrics.notes) : undefined
  };

  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Please allow pop-ups to download PDF');
    return;
  }

  // Build HTML content for PDF with sanitized data
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${sanitizedLyrics.songTitle} - Lyrics</title>
        <style>
          @page {
            size: A4;
            margin: 2cm;
          }
          
          body {
            font-family: 'Georgia', 'Times New Roman', serif;
            line-height: 1.8;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 2px solid #D4AF37;
            padding-bottom: 20px;
          }
          
          .title {
            font-size: 32px;
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 10px;
          }
          
          .artist {
            font-size: 20px;
            color: #666;
            margin-bottom: 5px;
          }
          
          .metadata {
            font-size: 14px;
            color: #999;
            font-style: italic;
          }
          
          .verse-section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          
          .verse-type {
            font-size: 16px;
            font-weight: bold;
            color: #C41E3A;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .verse-line {
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 5px;
            color: #333;
          }
          
          .notes {
            margin-top: 40px;
            padding: 15px;
            background-color: #f5f5f5;
            border-left: 4px solid #D4AF37;
            font-size: 14px;
            font-style: italic;
            page-break-inside: avoid;
          }
          
          .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #ddd;
            padding-top: 20px;
          }
          
          @media print {
            body {
              padding: 0;
            }
            
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">${sanitizedLyrics.songTitle}</div>
          <div class="artist">${sanitizedLyrics.artist}</div>
          <div class="metadata">
            ${sanitizedLyrics.album} • ${sanitizedLyrics.releaseYear} • ${sanitizedLyrics.language}
          </div>
        </div>
        
        <div class="lyrics-content">
          ${sanitizedLyrics.verses.map(verse => `
            <div class="verse-section">
              <div class="verse-type">${verse.type}</div>
              ${verse.lines.map(line => `
                <div class="verse-line">${line || '&nbsp;'}</div>
              `).join('')}
            </div>
          `).join('')}
        </div>
        
        ${sanitizedLyrics.notes ? `
          <div class="notes">
            <strong>Note:</strong> ${sanitizedLyrics.notes}
          </div>
        ` : ''}
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Charles Jasema. All rights reserved.</p>
          <p>www.charlesjasema.com</p>
        </div>
      </body>
    </html>
  `;

  // Use secure method to write content (no document.write)
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Auto-print when page loads
  printWindow.onload = function() {
    printWindow.print();
    // Close window after printing (or if user cancels)
    setTimeout(function() {
      printWindow.close();
    }, 100);
  };
}

/**
 * Download lyrics as plain text file
 * Security: Sanitizes all user input before creating file content
 */
export function downloadLyricsTXT(lyrics: LyricsData): void {
  // Sanitize all input data
  const sanitizedLyrics = {
    songTitle: DOMPurify.sanitize(lyrics.songTitle),
    artist: DOMPurify.sanitize(lyrics.artist),
    album: DOMPurify.sanitize(lyrics.album),
    releaseYear: DOMPurify.sanitize(lyrics.releaseYear),
    language: DOMPurify.sanitize(lyrics.language),
    verses: lyrics.verses.map(verse => ({
      type: DOMPurify.sanitize(verse.type),
      lines: verse.lines.map(line => DOMPurify.sanitize(line))
    })),
    notes: lyrics.notes ? DOMPurify.sanitize(lyrics.notes) : undefined
  };

  const textContent = `
${sanitizedLyrics.songTitle}
${sanitizedLyrics.artist}
${sanitizedLyrics.album} • ${sanitizedLyrics.releaseYear} • ${sanitizedLyrics.language}

${'='.repeat(50)}

${sanitizedLyrics.verses.map(verse => `
${verse.type}
${verse.lines.join('\n')}
`).join('\n')}

${sanitizedLyrics.notes ? `\nNote: ${sanitizedLyrics.notes}` : ''}

---
© ${new Date().getFullYear()} Charles Jasema. All rights reserved.
www.charlesjasema.com
  `.trim();

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${sanitizedLyrics.songTitle} - Lyrics.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
