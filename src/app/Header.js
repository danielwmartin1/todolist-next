export default function Header() {
  return (
    <header className="bg-blue-500 text-cyan-100 p-4 flex text-center justify-center items-center border-b-4 border-cyan-300">
      <h1 className="text-4xl font-bold text-yellow-300" style={{ textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000' }}>Next.JS To-Do List</h1>
    </header>
  );
}