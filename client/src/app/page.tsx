import Todo from '../components/Todo';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Todo />
      </div>
      <footer className="mt-12 py-6 border-t border-gray-800">
      </footer>
    </div>
  );
}
