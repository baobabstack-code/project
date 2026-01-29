import { MousePointer2, ArrowRight } from 'lucide-react';

export default function DemoPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pointer-events-none px-4">
        <div className="max-w-4xl w-full text-center space-y-8">
          <div className="inline-block animate-fade-in-up">
            <span className="py-1 px-3 border border-white/20 rounded-full text-xs font-mono text-white/60 tracking-widest uppercase bg-white/5 backdrop-blur-sm">
              Experimental Interaction
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter mix-blend-difference">
            Zero<br/>Gravity
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-light leading-relaxed">
            Experience the fluidity of data. A WebGL-inspired particle simulation running entirely on 2D Canvas for maximum compatibility and performance.
          </p>

          <div className="pt-8 pointer-events-auto">
            <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold tracking-wide overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10">Start Experience</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out opacity-10"></div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-pulse pointer-events-none z-10">
         <span className="text-[10px] uppercase tracking-[0.2em]">Interact</span>
         <MousePointer2 size={16} />
      </div>
    </div>
  );
}
