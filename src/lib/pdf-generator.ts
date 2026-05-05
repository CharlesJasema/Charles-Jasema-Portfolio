/**
 * PDF Generator Utility
 * 
 * Generates PDF files from lyrics content using browser's print functionality
 */

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
 */
export function generateLyricsPDF(lyrics: LyricsData): void {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Please allow pop-ups to download PDF');
    return;
  }

  // Build HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${lyrics.songTitle} - Lyrics</title>
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
          <div class="title">${lyrics.songTitle}</div>
          <div class="artist">${lyrics.artist}</div>
          <div class="metadata">
            ${lyrics.album} • ${lyrics.releaseYear} • ${lyrics.language}
          </div>
        </div>
        
        <div class="lyrics-content">
          ${lyrics.verses.map(verse => `
            <div class="verse-section">
              <div class="verse-type">${verse.type}</div>
              ${verse.lines.map(line => `
                <div class="verse-line">${line || '&nbsp;'}</div>
              `).join('')}
            </div>
          `).join('')}
        </div>
        
        ${lyrics.notes ? `
          <div class="notes">
            <strong>Note:</strong> ${lyrics.notes}
          </div>
        ` : ''}
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Charles Jasema. All rights reserved.</p>
          <p>www.charlesjasema.com</p>
        </div>
        
        <script>
          // Auto-print when page loads
          window.onload = function() {
            window.print();
            // Close window after printing (or if user cancels)
            setTimeout(function() {
              window.close();
            }, 100);
          };
        </script>
      </body>
    </html>
  `;

  // Write content to new window
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

/**
 * Download lyrics as plain text file
 */
export function downloadLyricsTXT(lyrics: LyricsData): void {
  const textContent = `
${lyrics.songTitle}
${lyrics.artist}
${lyrics.album} • ${lyrics.releaseYear} • ${lyrics.language}

${'='.repeat(50)}

${lyrics.verses.map(verse => `
${verse.type}
${verse.lines.join('\n')}
`).join('\n')}

${lyrics.notes ? `\nNote: ${lyrics.notes}` : ''}

---
© ${new Date().getFullYear()} Charles Jasema. All rights reserved.
www.charlesjasema.com
  `.trim();

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${lyrics.songTitle} - Lyrics.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
