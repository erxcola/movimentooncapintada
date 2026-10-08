import React from 'react';

export function renderAccent(text: string): React.ReactNode {
  const pattern = /\*\*(.+?)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <mark
        key={parts.length}
        style={{
          background: 'var(--color-yellow)',
          color: 'var(--color-ink)',
        }}
      >
        {match[1]}
      </mark>
    );

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  const result = parts.length > 0 ? parts : text;

  if (Array.isArray(result)) {
    return result.map((part, index) =>
      typeof part === 'string' ? (
        <React.Fragment key={index}>{part.replace(/\*\*/g, '')}</React.Fragment>
      ) : (
        part
      )
    );
  }

  return typeof result === 'string' ? result.replace(/\*\*/g, '') : result;
}
