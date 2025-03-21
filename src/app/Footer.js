export default function Footer() {
  return (
    <footer className="bg-blue-500 text-cyan-100 p-4 mt-4 border-t-4 border-ridge border-cyan-300">
      <p className="text-center font-bold text-yellow-300" style={{ textShadow: '1px 1px 2px black' }}>
        Daniel Martin &copy; {new Date().getFullYear()} {/* Render the footer with the current year */}
      </p>
    </footer>
  );
}