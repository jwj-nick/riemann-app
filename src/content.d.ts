declare module '*.md' {
  const segments: ({ html: string } | { graphic: string })[];
  export default segments;
}
