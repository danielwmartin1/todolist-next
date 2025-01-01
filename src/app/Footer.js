export default function Footer() {
  return (
    <footer className="bg-blue-500 text-cyan-100 p-4 mt-4 border-t-4 border-ridge border-cyan-300">
      <p className="text-center">Daniel Martin &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}