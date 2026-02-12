
import React, { useState } from 'react';
import { Page } from '../types';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  userName: string;
  isDarkMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, userName, isDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mapeamento: Branco -> Preto | Azul Escuro -> Vermelho
  const brandBg = isDarkMode ? 'bg-red-600' : 'bg-[#4A69A2]';
  const brandText = isDarkMode ? 'text-red-600' : 'text-[#4A69A2]';
  const activeItemBg = isDarkMode ? 'bg-black' : 'bg-white';

  const menuItems: { id: Page; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'Study', 
      label: 'Study', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> 
    },
    { 
      id: 'Tarefas', 
      label: 'Tarefas', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M8 12l3 3 5-5" />
        </svg>
      )
    },
    { 
      id: 'Rotina', 
      label: 'Rotina', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> 
    },
    { 
      id: 'Hábitos', 
      label: 'Hábitos', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22a10 10 0 100-20 10 10 0 000 20z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18a6 6 0 100-12 6 6 0 000 12z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14a2 2 0 100-4 2 2 0 000 4z" /></svg> 
    },
    { 
      id: 'Minhas estatísticas', 
      label: 'Estatísticas', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> 
    },
    { 
      id: 'Outros', 
      label: 'Outros', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h.01M12 12h.01M19 12h.01" /></svg> 
    },
    { 
      id: 'Configurações', 
      label: 'Ajustes', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> 
    },
  ];

  return (
    <nav className={`${isCollapsed ? 'w-16 sm:w-20' : 'w-20 sm:w-72'} ${brandBg} flex flex-col h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-20`}>
      
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`${isDarkMode ? 'bg-black text-white border-slate-800' : 'bg-white text-slate-900 border-slate-200'} absolute -right-3 top-10 rounded-full p-1 shadow-lg hover:scale-110 transition-all z-30 flex items-center justify-center w-7 h-7 border hidden sm:flex`}
      >
        <span className={`text-[10px] transition-transform duration-500 ${isCollapsed ? 'rotate-180' : ''}`}>
          ◀
        </span>
      </button>

      <div className={`pt-8 sm:pt-10 pb-6 sm:pb-8 ${isCollapsed ? 'px-4' : 'px-4 sm:px-8'}`}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl sm:rounded-2xl ring-1 ring-white/30 shadow-xl flex shrink-0">
             <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
          </div>
          {!isCollapsed && (
            <span className="text-white text-xl sm:text-2xl font-black tracking-tight whitespace-nowrap lowercase hidden sm:block">
              produtivity
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 px-3 sm:px-4 space-y-1 sm:space-y-2 overflow-y-auto pt-4 sm:pt-6">
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={isCollapsed ? item.label : ''}
              className={`w-full flex items-center gap-4 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all duration-300 text-sm font-semibold group ${
                isActive
                  ? `${activeItemBg} ${brandText} shadow-xl shadow-black/5`
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              } ${isCollapsed ? 'justify-center' : 'justify-center sm:justify-start'}`}
            >
              <span className={`transition-all duration-300 shrink-0 ${isActive ? brandText + ' scale-110' : 'text-white opacity-40 group-hover:opacity-100 group-hover:scale-110'}`}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className={`whitespace-nowrap transition-opacity duration-300 truncate hidden sm:block ${isActive ? brandText : 'text-inherit'}`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className={`p-4 sm:p-6 mt-auto border-t border-white/10 flex justify-center sm:justify-start`}>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-[10px] sm:text-xs">
              {userName.substring(0, 2).toUpperCase()}
            </span>
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden hidden sm:block">
              <p className="text-white font-bold text-sm truncate">{userName}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300"></span>
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Ativo</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
