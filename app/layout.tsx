"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  FileImage,
  BarChart2,
  Settings,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import "@/app/globals.css";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Minhas Tarefas", href: "/tarefas", icon: CheckSquare },
  { name: "Cadastros", href: "/cadastros", icon: Users },
  { name: "Materiais", href: "/materiais", icon: FileImage },
  { name: "Relatórios", href: "/relatorios", icon: BarChart2 },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
];

function AnimatedGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
      {children}
    </span>
  );
}

function SidebarLink({
  item,
  pathname,
  open,
  onClick,
}: {
  item: any;
  pathname: string;
  open: boolean;
  onClick?: () => void;
}) {
  const isActive = pathname === item.href;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group relative ${
        isActive
          ? "text-white bg-white/10"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-r-full bg-blue-400 transition-all duration-300 ${
          isActive
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-50"
        }`}
      />
      <item.icon
        className={`w-5 h-5 transition-colors mr-3 ${
          isActive ? "text-blue-300" : "text-gray-500 group-hover:text-white"
        }`}
      />
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

function SidebarContent({
  pathname,
  onClose,
  isMobile = false,
}: {
  pathname: string;
  onClose?: () => void;
  isMobile?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className={`flex flex-col h-full bg-black/30 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ${
        open && !isMobile ? "w-64" : isMobile ? "w-64" : "w-[80px]"
      }`}
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
      animate={{ width: open || isMobile ? 256 : 80 }}
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between px-4 h-20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <AnimatePresence>
            {(open || isMobile) && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-lg font-bold text-white"
              >
                Menu
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {isMobile && (
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {navItems.map((item) => (
          <SidebarLink
            key={item.name}
            item={item}
            pathname={pathname}
            onClick={isMobile ? onClose : undefined}
            open={open || isMobile}
          />
        ))}
      </nav>

      {/* Rodapé */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="p-3 rounded-lg bg-black/20">
          <p className="text-xs text-gray-400">Versão 2.0</p>
          <AnimatedGradientText>Designer Workflow</AnimatedGradientText>
        </div>
      </div>
    </motion.div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="pt-BR">
      <body className="min-h-screen w-full flex dark main-bg text-gray-100">
        <style>{`
          :root {
            --color-blue: #00d4ff;
            --color-purple: #b794f6;
            --color-green: #68d391;
            --color-pink: #f687b3;
          }
          body {
            background-color: #000000;
          }
          .main-bg {
            background-color: #000;
            background-image: 
              radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0),
              radial-gradient(circle at 15% 15%, rgba(0, 212, 255, 0.15), transparent 35%),
              radial-gradient(circle at 80% 70%, rgba(183, 148, 246, 0.15), transparent 40%);
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 5s ease infinite;
          }
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .input-glass, .select-glass, .textarea-glass {
              background: rgba(255, 255, 255, 0.05) !important;
              border-color: rgba(255, 255, 255, 0.1) !important;
              backdrop-filter: blur(5px);
              border-radius: 1rem !important;
          }
          .button-glow {
              box-shadow: 0 0 10px 0 rgba(0, 212, 255, 0.3);
              transition: all 0.3s ease;
              border-radius: 1rem;
          }
          .button-glow:hover {
              box-shadow: 0 0 20px 0 rgba(0, 212, 255, 0.6);
          }
          .rounded-xl { border-radius: 1.5rem !important; }
          .rounded-lg { border-radius: 1rem !important; }
          .rounded-md { border-radius: 0.75rem !important; }
        `}</style>

        {/* Sidebar Desktop */}
        <aside className="hidden lg:block fixed h-full z-20">
          <SidebarContent pathname={pathname} />
        </aside>

        {/* Sidebar Mobile */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-70 z-30 transition-opacity lg:hidden ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <div
          className={`fixed inset-y-0 left-0 w-64 z-40 transform transition-transform lg:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent
            pathname={pathname}
            isMobile
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 flex flex-col lg:pl-[80px]">
          <header className="flex items-center justify-between p-6 h-20">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-400"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">
              <AnimatedGradientText>Designer Workflow</AnimatedGradientText>
            </h1>
            <div className="w-6" />
          </header>

          <main className="flex-1 p-6 pt-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
