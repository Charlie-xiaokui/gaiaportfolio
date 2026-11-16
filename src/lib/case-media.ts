export function casePreview(source: string) {
  const [path, query] = source.split('?');
  return `/case-previews${path}.webp${query ? '?' + query : ''}`;
}

export function videoPoster(source: string) {
  return source.replace(/\.mp4$/, '-poster.jpg');
}
