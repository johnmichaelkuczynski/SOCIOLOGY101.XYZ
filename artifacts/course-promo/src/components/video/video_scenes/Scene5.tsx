import { motion } from 'framer-motion';

export const Scene5 = () => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-text-primary)] bg-[var(--color-bg-light)]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: 50, filter: 'blur(5px)' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="z-10 text-center mb-16 mt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[var(--color-chart-amber)] font-mono text-xl mb-4 uppercase tracking-widest font-semibold"
        >
          04. Locked Rigor, Flexible Learning
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-6xl font-display font-bold text-[var(--color-primary)] leading-tight"
        >
          Fixed Assessments.<br/>
          <span className="text-[var(--color-text-primary)]">Adaptive Lectures.</span>
        </motion.h2>
      </div>

      {/* Split Comparison - Academic styling */}
      <div className="flex gap-12 w-full max-w-[75vw] z-10">
        
        {/* Left: Fixed Assessments */}
        <motion.div 
          className="flex-1 bg-white border border-[var(--color-secondary)] shadow-sm rounded-2xl p-10 flex flex-col items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <h3 className="text-2xl font-display font-bold text-[var(--color-primary)] mb-10 uppercase tracking-wide">Homework & Tests</h3>
          <div className="flex gap-3 mb-10">
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                className="w-20 h-20 bg-[var(--color-bg-muted)] border border-[var(--color-secondary)] rounded-md flex items-center justify-center shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.15, type: 'spring', bounce: 0.4 }}
              >
                <div className="w-6 h-6 bg-[var(--color-primary)] rounded-sm opacity-80" />
              </motion.div>
            ))}
          </div>
          <p className="text-[var(--color-text-secondary)] font-mono text-sm text-center font-medium">Standardized. Immutable. Rigorous.</p>
        </motion.div>

        {/* Right: Adaptive Lectures */}
        <motion.div 
          className="flex-1 bg-[var(--color-bg-muted)] border border-[var(--color-secondary)] shadow-inner rounded-2xl p-10 flex flex-col items-center relative overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h3 className="text-2xl font-display font-bold text-[var(--color-primary)] mb-10 uppercase tracking-wide">AI Lectures</h3>
          <div className="flex flex-col gap-4 mb-10 w-full px-6 relative z-10">
            {/* Morphing lecture blocks */}
            <motion.div 
              className="h-8 bg-[var(--color-chart-amber)] rounded-md opacity-90 shadow-sm"
              initial={{ width: '30%' }}
              animate={{ width: ['30%', '85%', '50%'] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
            <motion.div 
              className="h-8 bg-[var(--color-chart-amber)] rounded-md opacity-70 shadow-sm"
              initial={{ width: '50%' }}
              animate={{ width: ['50%', '40%', '95%'] }}
              transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.5 }}
            />
            <motion.div 
              className="h-8 bg-[var(--color-chart-amber)] rounded-md opacity-50 shadow-sm"
              initial={{ width: '70%' }}
              animate={{ width: ['70%', '100%', '60%'] }}
              transition={{ duration: 5.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 }}
            />
          </div>
          <p className="text-[var(--color-text-secondary)] font-mono text-sm text-center z-10 font-medium">Flexes in depth and style for you.</p>
        </motion.div>

      </div>
    </motion.div>
  );
};
