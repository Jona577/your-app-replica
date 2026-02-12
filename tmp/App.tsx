
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Study from './views/Study';
import Tasks from './views/Tasks';
import Routine from './views/Routine';
import Habits from './views/Habits';
import Stats from './views/Stats';
import Others from './views/Others';
import Settings from './views/Settings';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Study');
  const [userName, setUserName] = useState<string>('Usuário');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [fullScreenItem, setFullScreenItem] = useState<any | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    const storedName = localStorage.getItem('produtivity_user_name');
    if (storedName) setUserName(storedName);

    const storedTheme = localStorage.getItem('produtivity_dark_mode');
    if (storedTheme) setIsDarkMode(JSON.parse(storedTheme));
  }, []);

  const handleUpdateName = (name: string) => {
    setUserName(name);
    localStorage.setItem('produtivity_user_name', name);
  };

  const toggleDarkMode = () => {
    const newVal = !isDarkMode;
    setIsDarkMode(newVal);
    localStorage.setItem('produtivity_dark_mode', JSON.stringify(newVal));
  };

  const handleCloseDetail = () => {
    setIsClosing(true);
    // Tempo da animação de saída alinhado com o CSS (400ms)
    setTimeout(() => {
      setFullScreenItem(null);
      setIsClosing(false);
    }, 400);
  };

  const renderPage = () => {
    const commonProps = { isDarkMode };
    switch (currentPage) {
      case 'Study': return <Study {...commonProps} onOpenDetail={setFullScreenItem} />;
      case 'Tarefas': return <Tasks {...commonProps} />;
      case 'Rotina': return <Routine {...commonProps} />;
      case 'Hábitos': return <Habits {...commonProps} />;
      case 'Minhas estatísticas': return <Stats {...commonProps} />;
      case 'Outros': return <Others {...commonProps} />;
      case 'Configurações': return (
        <Settings 
          userName={userName} 
          onUpdateName={handleUpdateName} 
          isDarkMode={isDarkMode} 
          onToggleDarkMode={toggleDarkMode} 
        />
      );
      default: return <Study {...commonProps} onOpenDetail={setFullScreenItem} />;
    }
  };

  const renderFullScreenDetail = () => {
    if (!fullScreenItem) return null;

    const detailColor = fullScreenItem.categoryId === "Meus PDF's" 
      ? fullScreenItem.color 
      : (fullScreenItem.relevance === 'Alta' ? '#ef4444' : fullScreenItem.relevance === 'Média' ? '#eab308' : fullScreenItem.relevance === 'Baixa' ? '#22c55e' : fullScreenItem.relevance === 'Baixíssima' ? '#6b7280' : fullScreenItem.color);
    
    const isBlackBg = detailColor === '#000000';
    const infoTextColor = isBlackBg ? 'text-white' : 'text-black';
    const bulletColor = isBlackBg ? 'bg-white' : 'bg-black';

    const renderInfoItem = (label: string, value: string | number | undefined) => (
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1.5">
           <div className={`w-2 h-2 rounded-full shrink-0 ${bulletColor}`}></div>
           <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] opacity-50 ${infoTextColor}`}>{label}</span>
        </div>
        <p className={`text-xl sm:text-2xl font-black ml-4 ${infoTextColor}`}>{value || '-'}</p>
      </div>
    );

    return (
      <div 
        className={`fixed inset-0 z-[1000] flex flex-col transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isClosing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100 animate-detailIn'}`} 
        style={{ backgroundColor: detailColor }}
      >
        <div className="max-w-6xl mx-auto w-full p-6 sm:p-12 md:p-20 flex-1 overflow-y-auto custom-scrollbar">
          <header className="flex flex-col-reverse sm:flex-row justify-between items-start gap-8 sm:gap-4 mb-12 sm:mb-20">
            <div>
              <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none break-words ${infoTextColor}`}>
                {fullScreenItem.name}
              </h2>
              <div className={`h-1.5 sm:h-2 w-16 sm:w-24 mt-4 sm:mt-6 rounded-full ${bulletColor} opacity-20`}></div>
              <span className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] opacity-40 mt-4 sm:mt-6 block ${infoTextColor}`}>
                {fullScreenItem.categoryId}
              </span>
            </div>
            <button 
              onClick={handleCloseDetail}
              className={`px-6 py-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 font-black uppercase text-[10px] sm:text-xs tracking-widest self-end sm:self-start ${isBlackBg ? 'border-white/20 text-white hover:bg-white/10' : 'border-black/10 text-black hover:bg-black/5'}`}
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Voltar
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 sm:gap-x-16 sm:gap-y-16">
            {fullScreenItem.categoryId === 'Meus livros' && (
              <>
                {renderInfoItem('Tipo', fullScreenItem.type)}
                {renderInfoItem('Tempo estimado de Término', `${fullScreenItem.estimateDays} dias`)}
                {renderInfoItem('Total de páginas', fullScreenItem.totalPages)}
                {renderInfoItem('Páginas Lidas', fullScreenItem.readPages)}
                {renderInfoItem('Data de Adição', new Date(fullScreenItem.dateAdded).toLocaleDateString('pt-BR'))}
              </>
            )}
            {fullScreenItem.categoryId === "Meus PDF's" && (
              <>
                {renderInfoItem('Tipo de Material', fullScreenItem.type)}
                {renderInfoItem('Grau de relevância', fullScreenItem.relevance)}
                {renderInfoItem('Páginas Totais', fullScreenItem.totalPages)}
                {renderInfoItem('Páginas Lidas', fullScreenItem.readPages)}
                {renderInfoItem('Data de Adição', new Date(fullScreenItem.dateAdded).toLocaleDateString('pt-BR'))}
              </>
            )}
            {fullScreenItem.categoryId === 'Minhas vídeo aulas' && (
              <>
                {renderInfoItem('Finalidade', fullScreenItem.videoFinality)}
                {renderInfoItem('De onde é (Fonte)', fullScreenItem.videoSource)}
                {renderInfoItem('Tempo estimado de término', fullScreenItem.videoCompletionTime)}
                {renderInfoItem('Duração da aula', fullScreenItem.videoDuration)}
                {renderInfoItem('Grau de relevância', fullScreenItem.relevance)}
                {renderInfoItem('Estudo para', fullScreenItem.videoStudyType === 'ensino_medio' ? 'Ensino Médio' : 'Faculdade')}
              </>
            )}
            {fullScreenItem.categoryId === 'Minhas revisões' && (
              <>
                {renderInfoItem('Tipo de Revisão', fullScreenItem.reviewMethod)}
                {renderInfoItem('Quantidade de Repetições', fullScreenItem.reviewRepetitions)}
                {renderInfoItem('Duração da Revisão', fullScreenItem.reviewDuration)}
                {renderInfoItem('Grau de Relevância', fullScreenItem.relevance)}
                {renderInfoItem('Matéria', fullScreenItem.videoMatter)}
              </>
            )}
            {fullScreenItem.categoryId === 'Minhas questões' && (
              <>
                {renderInfoItem('Fonte das Questões', fullScreenItem.questionSource)}
                {renderInfoItem('Quantidade de Questões', fullScreenItem.questionQuantity)}
                {renderInfoItem('Duração estimada', fullScreenItem.questionDuration)}
                {renderInfoItem('Grau de Relevância', fullScreenItem.relevance)}
                {renderInfoItem('Tópico', fullScreenItem.videoTopic)}
              </>
            )}
            {fullScreenItem.categoryId === 'Meus simulados' && (
              <>
                {renderInfoItem('Origem', fullScreenItem.simuladoOrigin)}
                {renderInfoItem('Ano da Prova', fullScreenItem.simuladoYear)}
                {renderInfoItem('Área de Conhecimento', fullScreenItem.simuladoArea)}
                {renderInfoItem('Tipo de Aplicação', fullScreenItem.simuladoTestType)}
                {renderInfoItem('Qtd. de Questões', fullScreenItem.questionQuantity)}
                {renderInfoItem('Tempo de Prova', fullScreenItem.questionDuration)}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
      <style>{`
        @keyframes detailIn {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-detailIn {
          animation: detailIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Container Principal do App */}
      <div className={`flex flex-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${(fullScreenItem && !isClosing) ? 'scale-95 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}>
        <Sidebar activePage={currentPage} onNavigate={setCurrentPage} userName={userName} isDarkMode={isDarkMode} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 lg:p-16">
          <div className="max-w-5xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>

      {/* Renderização condicional dos detalhes em sobreposição */}
      {renderFullScreenDetail()}
    </div>
  );
};

export default App;
