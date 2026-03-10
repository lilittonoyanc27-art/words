import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  RotateCcw, 
  ArrowRight,
  Sparkles,
  Star,
  Volume2,
  Gamepad2,
  Info,
  BookOpen,
  LayoutGrid
} from 'lucide-react';

// --- Types ---

interface GreetingQuestion {
  id: number;
  wordArm: string;
  correctSp: string;
  options: string[];
  imageUrl: string;
}

// --- Data ---

const GREETINGS_DATA: GreetingQuestion[] = [
  { 
    id: 1, 
    wordArm: "Ողջույն", 
    correctSp: "Hola", 
    options: ["Hola", "Adiós", "Gracias", "Perdón"],
    imageUrl: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=800&q=80" // Cartoon girl waving
  },
  { 
    id: 2, 
    wordArm: "Բարի լույս", 
    correctSp: "Buenos días", 
    options: ["Buenas noches", "Buenos días", "Buenas tardes", "Hola"],
    imageUrl: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=800&q=80" // Cartoon sun/morning
  },
  { 
    id: 3, 
    wordArm: "Բարի օր", 
    correctSp: "Buenas tardes", 
    options: ["Buenos días", "Buenas noches", "Buenas tardes", "Adiós"],
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80" // Cartoon afternoon
  },
  { 
    id: 4, 
    wordArm: "Բարի գիշեր", 
    correctSp: "Buenas noches", 
    options: ["Buenas noches", "Buenos días", "Buenas tardes", "Hasta luego"],
    imageUrl: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?auto=format&fit=crop&w=800&q=80" // Cartoon night/moon
  },
  { 
    id: 5, 
    wordArm: "Ինչպե՞ս ես", 
    correctSp: "¿Cómo estás?", 
    options: ["¿Cómo te llamas?", "¿Cómo estás?", "¿Qué tal?", "Mucho gusto"],
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80" // Cartoon friends
  },
  { 
    id: 6, 
    wordArm: "Ցտեսություն", 
    correctSp: "Adiós", 
    options: ["Hola", "Adiós", "Bienvenido", "Por favor"],
    imageUrl: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&q=80" // Cartoon character waving bye
  },
  { 
    id: 7, 
    wordArm: "Հաճելի է", 
    correctSp: "Mucho gusto", 
    options: ["De nada", "Mucho gusto", "Lo siento", "Hola"],
    imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80" // Cartoon handshake/meeting
  },
  { 
    id: 8, 
    wordArm: "Մինչ նոր հանդիպում", 
    correctSp: "Hasta luego", 
    options: ["Hasta luego", "Hola", "Buenos días", "Bienvenido"],
    imageUrl: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&w=800&q=80" // Cartoon characters waving
  },
  { 
    id: 9, 
    wordArm: "Բարի գալուստ", 
    correctSp: "Bienvenido", 
    options: ["Adiós", "Bienvenido", "Gracias", "Hola"],
    imageUrl: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80" // Cartoon welcome sign
  },
  { 
    id: 10, 
    wordArm: "Ի՞նչ կա չկա", 
    correctSp: "¿Qué tal?", 
    options: ["¿Cómo estás?", "¿Qué tal?", "¿De đâu eres?", "Mucho gusto"],
    imageUrl: "https://images.unsplash.com/photo-1516533075015-a3838414c3cb?auto=format&fit=crop&w=800&q=80" // Cartoon characters chatting
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'learn' | 'test'>('learn');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = GREETINGS_DATA[currentIdx];
  const progress = ((currentIdx + 1) / GREETINGS_DATA.length) * 100;

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(option);
    const correct = option === currentQuestion.correctSp;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIdx < GREETINGS_DATA.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setImageLoaded(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowResults(false);
    setImageLoaded(false);
  };

  return (
    <div className="min-h-screen bg-[#1e40af] bg-gradient-to-b from-[#1e40af] to-[#3b82f6] flex flex-col font-sans text-white overflow-hidden">
      {/* Header */}
      <header className="p-6 flex flex-col gap-4 max-w-2xl mx-auto w-full z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Gamepad2 className="w-6 h-6 text-blue-200" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">Իսպաներենի Դասեր</h1>
          </div>
          {activeTab === 'test' && !showResults && (
            <div className="text-sm font-bold bg-white/20 px-4 py-2 rounded-full border border-white/30 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              {score}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex bg-white/10 p-1 rounded-2xl backdrop-blur-md border border-white/20">
          <button
            onClick={() => setActiveTab('learn')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'learn' ? 'bg-white text-[#1e40af] shadow-lg' : 'text-white/60 hover:text-white'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Սովորել
          </button>
          <button
            onClick={() => {
              setActiveTab('test');
              resetQuiz();
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'test' ? 'bg-white text-[#1e40af] shadow-lg' : 'text-white/60 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            Թեստ
          </button>
        </div>
        
        {activeTab === 'test' && !showResults && (
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-300 to-white shadow-[0_0_15px_rgba(255,255,255,0.6)]"
            />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 py-4 max-w-2xl mx-auto w-full overflow-y-auto custom-scrollbar relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full -z-10" />

        <AnimatePresence mode="wait">
          {activeTab === 'learn' ? (
            <motion.div
              key="learn-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full space-y-6 pb-12"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <Sparkles className="text-yellow-300" />
                  Բառապաշար
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {GREETINGS_DATA.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 hover:bg-white/10 p-4 rounded-3xl border border-white/10 flex items-center gap-4 transition-all"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shrink-0">
                        <img src={item.imageUrl} alt={item.correctSp} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">{item.wordArm}</p>
                        <p className="text-2xl font-black text-white">{item.correctSp}</p>
                      </div>
                      <Volume2 className="w-6 h-6 text-white/40 hover:text-white cursor-pointer" />
                    </motion.div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setActiveTab('test');
                    resetQuiz();
                  }}
                  className="w-full mt-8 py-5 bg-white text-[#1e40af] rounded-2xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Սկսել թեստը
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          ) : !showResults ? (
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-6 sm:p-8 border border-white/20 shadow-2xl flex flex-col gap-6">
                
                {/* Image Container */}
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden border-4 border-white/20 shadow-inner bg-black/20">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                  <img 
                    src={currentQuestion.imageUrl} 
                    alt="Greeting" 
                    referrerPolicy="no-referrer"
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
                    <p className="text-xl sm:text-2xl font-black tracking-wide text-white">
                      {currentQuestion.wordArm}
                    </p>
                  </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {currentQuestion.options.map((option, i) => {
                    const isSelected = selectedOption === option;
                    const isCorrectOption = option === currentQuestion.correctSp;
                    
                    let btnClass = "bg-white/10 hover:bg-white/20 border-white/10 text-white";
                    if (selectedOption !== null) {
                      if (isCorrectOption) {
                        btnClass = "bg-green-500/40 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]";
                      } else if (isSelected) {
                        btnClass = "bg-red-500/40 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]";
                      } else {
                        btnClass = "bg-white/5 border-white/5 opacity-30 text-white/50";
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(option)}
                        disabled={selectedOption !== null}
                        className={`p-4 sm:p-6 rounded-2xl border-2 font-black text-lg sm:text-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${btnClass}`}
                      >
                        {option}
                        {selectedOption !== null && isCorrectOption && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                        {selectedOption !== null && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Area */}
                <AnimatePresence>
                  {isCorrect !== null && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="flex flex-col gap-4"
                    >
                      <div className={`p-4 rounded-2xl flex items-center justify-between ${
                        isCorrect ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                            {isCorrect ? <Sparkles className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-black text-lg">{isCorrect ? 'Գերազանց է!' : 'Ոչինչ, փորձիր նորից:'}</p>
                            {!isCorrect && <p className="text-xs font-bold opacity-80">Ճիշտը՝ {currentQuestion.correctSp}</p>}
                          </div>
                        </div>
                        <Volume2 className="w-6 h-6 opacity-40 cursor-pointer hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <button
                        onClick={nextQuestion}
                        className="w-full py-5 bg-white text-[#1e40af] rounded-2xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        {currentIdx === GREETINGS_DATA.length - 1 ? 'Արդյունքներ' : 'Հաջորդը'}
                        <ArrowRight className="w-6 h-6" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-[40px] p-12 border border-white/20 shadow-2xl text-center w-full"
            >
              <div className="relative inline-block mb-8">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#1e40af] shadow-2xl">
                  <Trophy className="w-12 h-12" />
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 border-2 border-dashed border-white/30 rounded-full"
                />
              </div>

              <h2 className="text-4xl font-black mb-4">Խաղն ավարտվեց:</h2>
              <div className="flex items-center justify-center gap-2 mb-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-8 h-8 ${i < Math.round((score/10)*5) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                ))}
              </div>

              <p className="text-xl text-blue-100 mb-10">
                Դուք հավաքեցիք <span className="text-white font-black text-4xl">{score}</span> միավոր {GREETINGS_DATA.length}-ից:
              </p>
              
              <div className="flex flex-col gap-4">
                <button
                  onClick={resetQuiz}
                  className="w-full py-5 bg-white text-[#1e40af] rounded-[24px] font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-6 h-6" />
                  Նորից խաղալ
                </button>
                <button
                  onClick={() => setActiveTab('learn')}
                  className="w-full py-4 bg-white/10 text-white rounded-[24px] font-bold border border-white/20 hover:bg-white/20 transition-all"
                >
                  Վերադառնալ ուսուցմանը
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-white/40 text-[10px] font-bold tracking-widest uppercase">
        Իսպաներենի Ուսուցում • Saludos y Despedidas
      </footer>
    </div>
  );
}
