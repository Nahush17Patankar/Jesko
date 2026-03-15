"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-background px-8 py-12 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase opacity-50 z-10 relative">
      <span>© {new Date().getFullYear()} Jesko Aviation. All rights reserved.</span>
      <div className="flex gap-4 mt-4 md:mt-0">
        <span className="cursor-pointer hover:opacity-100 transition-opacity">Privacy</span>
        <span className="cursor-pointer hover:opacity-100 transition-opacity">Terms</span>
      </div>
    </footer>
  );
}
