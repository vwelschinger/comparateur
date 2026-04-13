export default function Logo({ className = '' }: { className?: string }) {
  return <img src="/logo.svg" alt="Deluxe Conseil" className={className} />;
}
