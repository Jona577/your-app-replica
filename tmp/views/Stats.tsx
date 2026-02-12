import React from 'react';

interface StatsProps {
  isDarkMode?: boolean;
}

const Stats: React.FC<StatsProps> = ({ isDarkMode }) => {
  const cardBg = isDarkMode ? 'bg-black' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-slate-800';
  const borderColor = isDarkMode ? 'border-slate-800' : 'border-slate-200';

  return (
    <div className="animate-fadeIn">
      <header className="mb-12">
        <h2 className={`text-5xl font-black ${textColor} tracking-tight`}>Minhas estatísticas</h2>
        <p className="text-slate-500 mt-3 font-medium text-lg">Dados transformados em insights.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
         <div className={`${cardBg} p-10 rounded-[3rem] border ${borderColor} shadow-sm transition-colors`}>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Tempo Total</p>
            <h3 className={`text-5xl font-black ${textColor}`}>32.2<span className="text-2xl text-slate-300 ml-1">h</span></h3>
         </div>
         <div className={`${cardBg} p-10 rounded-[3rem] border ${borderColor} shadow-sm transition-colors`}>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Power Score</p>
            <h3 className={`text-5xl font-black ${textColor}`}>85%</h3>
         </div>
      </div>
    </div>
  );
};

export default Stats;