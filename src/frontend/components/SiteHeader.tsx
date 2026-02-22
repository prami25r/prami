 "use client";
 
 import Link from "next/link";
 import { useState } from "react";
 
 export default function SiteHeader() {
   const [open, setOpen] = useState(false);
 
   function toggle() {
     setOpen((v) => !v);
   }
   function close() {
     setOpen(false);
   }
 
   return (
     <header className="sticky top-0 z-50">
       <div className="accent-border">
         <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between glass bg-[var(--bg)]/70 backdrop-blur-md">
           <Link href="/" className="font-extrabold text-lg md:text-xl leading-tight" onClick={close} aria-label="Go to home">
             Pramithi
           </Link>
 
           <button
             type="button"
             className="inline-flex md:hidden items-center justify-center rounded-[12px] border border-[var(--border)] px-3 py-2 hover:bg-[#f5f5f5] transition"
             aria-expanded={open}
             aria-controls="site-nav"
             aria-label="Toggle navigation menu"
             onClick={toggle}
           >
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
               <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
             </svg>
           </button>
 
           <div className="hidden md:flex items-center gap-5 text-sm">
             <a href="#about" onClick={close} className="subtle hover:text-black transition-colors px-2 py-2">
               About
             </a>
             <a href="#skills" onClick={close} className="subtle hover:text-black transition-colors px-2 py-2">
               Skills
             </a>
             <a href="#projects" onClick={close} className="subtle hover:text-black transition-colors px-2 py-2">
               Projects
             </a>
             <a href="#resume" onClick={close} className="subtle hover:text-black transition-colors px-2 py-2">
               Resume
             </a>
             <a href="#contact" onClick={close} className="subtle hover:text-black transition-colors px-2 py-2">
               Contact
             </a>
           </div>
         </nav>
 
         {/* Mobile menu */}
         <div
           id="site-nav"
           className={`md:hidden transition-[max-height] duration-300 ease-in-out overflow-hidden ${open ? "max-h-96" : "max-h-0"}`}
         >
           <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-3">
             <div className="glass rounded-[14px] p-3 flex flex-col">
               <a href="#about" onClick={close} className="subtle hover:text-black transition-colors px-3 py-3 rounded-[12px]">
                 About
               </a>
               <a href="#skills" onClick={close} className="subtle hover:text-black transition-colors px-3 py-3 rounded-[12px]">
                 Skills
               </a>
               <a href="#projects" onClick={close} className="subtle hover:text-black transition-colors px-3 py-3 rounded-[12px]">
                 Projects
               </a>
               <a href="#resume" onClick={close} className="subtle hover:text-black transition-colors px-3 py-3 rounded-[12px]">
                 Resume
               </a>
               <a href="#contact" onClick={close} className="subtle hover:text-black transition-colors px-3 py-3 rounded-[12px]">
                 Contact
               </a>
             </div>
           </div>
         </div>
       </div>
     </header>
   );
 }
 
