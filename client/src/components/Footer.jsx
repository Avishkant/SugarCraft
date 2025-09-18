
export default function Footer() {
  return (
    <footer className="bg-[#795548] text-[#F5F5DC] py-6 mt-12 shadow-inner animate-fadeIn border-t-4 border-[#A5D6A7]">
      <div className="container mx-auto text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} SugarCraft Sweet Shop. All rights reserved.</p>
        <div className="flex justify-center gap-4">
          <a href="#" className="hover:text-[#FFB74D] transition">Instagram</a>
          <a href="#" className="hover:text-[#FFB74D] transition">Facebook</a>
          <a href="#" className="hover:text-[#FFB74D] transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
