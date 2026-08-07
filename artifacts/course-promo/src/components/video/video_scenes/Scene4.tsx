import { motion } from 'framer-motion';

export const Scene4 = () => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-between px-[10vw] bg-[var(--color-bg-light)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50, filter: 'blur(5px)' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left Visual: Progress Graph Academic Style */}
      <div className="relative z-10 w-[45vw] h-[60vh] bg-white border border-[var(--color-secondary)] shadow-lg rounded-2xl p-10 flex flex-col justify-end overflow-hidden">
        <div className="absolute top-8 left-10 text-[var(--color-text-muted)] font-mono text-sm uppercase tracking-widest font-semibold">
          Academic Benchmarks
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pt-24 pb-12 px-10 pointer-events-none opacity-50">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="w-full h-px bg-[var(--color-secondary)]" />
          ))}
        </div>

        {/* Bars */}
        <div className="relative z-10 flex items-end justify-between w-full h-[75%] gap-6 pb-2">
          {[
            { label: 'Theory', val: 40, delay: 0.5 },
            { label: 'Methods', val: 60, delay: 0.7 },
            { label: 'Analysis', val: 75, delay: 0.9 },
            { label: 'Writing', val: 90, delay: 1.1 },
            { label: 'Mastery', val: 100, delay: 1.3, highlight: true },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-4 flex-1">
              <div className="w-full relative flex justify-center items-end h-[320px]">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${bar.val}%` }}
                  transition={{ duration: 1.2, delay: bar.delay, type: 'spring', bounce: 0.2 }}
                  className={`w-full rounded-t-md opacity-90 ${bar.highlight ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-bg-muted)] border border-[var(--color-secondary)] border-b-0'}`}
                />
                {bar.highlight && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: bar.delay + 0.8 }}
                    className="absolute -top-10 text-[var(--color-primary)] font-mono font-bold text-xs whitespace-nowrap bg-white px-3 py-1.5 rounded-md shadow-sm border border-[var(--color-secondary)] uppercase tracking-wider"
                  >
                    Research Ready
                  </motion.div>
                )}
              </div>
              <span className="text-[var(--color-text-secondary)] font-mono text-xs uppercase font-medium">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Text */}
      <div className="z-10 max-w-[35vw]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-[var(--color-chart-teal)] font-mono text-xl mb-4 uppercase tracking-widest"
        >
          03. Academic Rigor
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-5xl md:text-6xl font-display font-bold text-[var(--color-primary)] mb-6 leading-tight"
        >
          A Credential Academia <span className="text-[var(--color-text-primary)]">Trusts</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl text-[var(--color-text-secondary)] font-body leading-relaxed"
        >
          Advancement is strictly benchmarked to university-level social science standards, not arbitrary grades.
        </motion.p>
      </div>
    </motion.div>
  );
};
