
import React, { useState, useEffect } from 'react';

interface SettingsProps {
  userName: string;
  onUpdateName: (name: string) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ userName, onUpdateName, isDarkMode, onToggleDarkMode }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Erro ao tentar habilitar modo tela cheia: ${e.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const exportData = () => {
    const data = { ...localStorage };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `produtivity-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const cardBg = isDarkMode ? 'bg-black' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-slate-800';
  const brandBg = isDarkMode ? 'bg-red-600' : 'bg-indigo-600';
  const brandRing = isDarkMode ? 'ring-red-600/10' : 'ring-indigo-500/10';
  const borderColor = isDarkMode ? 'border-slate-800' : 'border-slate-200';

  return (
    <div className="animate-fadeIn">
      <header className="mb-12">
        <h2 className={`text-5xl font-black ${textColor} tracking-tight`}>Configurações</h2>
        <p className="text-slate-500 mt-3 font-medium text-lg">Molde sua ferramenta de trabalho.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className={`${cardBg} p-12 rounded-[3.5rem] border ${borderColor} shadow-sm w-full transition-colors`}>
          <div className="mb-12">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Nome de Exibição</label>
            <div className="relative">
              <input 
                type="text" 
                value={userName}
                onChange={(e) => onUpdateName(e.target.value)}
                className={`w-full px-8 py-5 rounded-3xl border-2 border-transparent outline-none transition-all font-bold text-xl shadow-inner ${isDarkMode ? 'bg-slate-900 text-white focus:border-red-600' : 'bg-slate-50 text-slate-800 focus:border-indigo-500'}`}
              />
            </div>
          </div>

          <div className="mb-12">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Preferências da App</label>
            <div className="space-y-6">
              
              <div className="flex items-center justify-between p-2">
                 <div>
                    <h4 className={`font-bold ${textColor} text-lg`}>Notificações</h4>
                    <p className="text-sm text-slate-400">Alertas para tarefas e rotinas.</p>
                 </div>
                 <div className={`w-14 h-7 ${brandBg} rounded-full relative cursor-pointer ring-4 ${brandRing}`}>
                    <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-md"></div>
                 </div>
              </div>
              
              <div className={`h-px ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
              
              <div className="flex items-center justify-between p-2">
                 <div>
                    <h4 className={`font-bold ${textColor} text-lg`}>Tela Cheia</h4>
                    <p className="text-sm text-slate-400">Habilita o modo de imersão total.</p>
                 </div>
                 <div 
                  onClick={toggleFullscreen}
                  className={`w-14 h-7 rounded-full relative cursor-pointer transition-colors duration-300 ${isFullscreen ? brandBg + ' ring-4 ' + brandRing : 'bg-slate-200'}`}
                 >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${isFullscreen ? 'right-1' : 'left-1'}`}></div>
                 </div>
              </div>
            </div>
          </div>

          <button className={`w-full py-6 rounded-[2rem] font-black text-lg transition-all shadow-xl active:scale-95 ${isDarkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-slate-900 text-white hover:bg-black'}`}>
            Salvar Alterações
          </button>
        </div>

        <div className="space-y-10">
          <div className={`${cardBg} p-12 rounded-[3.5rem] border ${borderColor} shadow-sm w-full transition-colors`}>
            <h3 className={`text-2xl font-black ${textColor} mb-8 flex items-center gap-4`}>
              <span className={`p-3 rounded-2xl ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>📦</span> Gestão de Dados
            </h3>
            
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">
              Sua privacidade é prioridade. Todos os dados permanecem no seu dispositivo. Use backups para migrar informações.
            </p>

            <div className="space-y-4">
              <button 
                onClick={exportData}
                // FIXED: Added missing opening quote to the ternary true branch.
                className={`w-full flex items-center justify-between p-8 rounded-3xl border-2 transition-all group ${isDarkMode ? 'border-slate-800 hover:border-red-600 hover:bg-red-600/10' : 'border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/30'}`}
              >
                <div className="text-left">
                  <span className={`block font-black ${textColor} text-lg`}>Exportar Tudo</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Backup Completo .JSON</span>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-12 ${isDarkMode ? 'bg-slate-900 text-slate-400 group-hover:bg-red-600 group-hover:text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white'}`}>
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                   </svg>
                </div>
              </button>
            </div>

            <div className={`mt-12 p-8 rounded-[2rem] border ${isDarkMode ? 'bg-red-950/20 border-red-900/50' : 'bg-rose-50 border-rose-100'}`}>
               <h4 className="text-red-600 font-black text-sm mb-2 uppercase tracking-widest">Zona Crítica</h4>
               <p className={`${isDarkMode ? 'text-red-400' : 'text-rose-400'} text-sm font-medium mb-6`}>Esta ação apagará permanentemente todos os registros salvos neste navegador.</p>
               <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors shadow-lg">
                 Resetar Aplicação
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;