export default function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="absolute top-0 left-0 bg-primary-gold text-white px-4 py-2 z-50 focus:relative focus:z-auto"
      >
        Skip to main content
      </a>
    </div>
  );
}