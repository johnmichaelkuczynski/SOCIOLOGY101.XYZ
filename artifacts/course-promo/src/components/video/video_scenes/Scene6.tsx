import { motion } from 'framer-motion';

export const Scene6 = () => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-light)] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
    >
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, var(--color-primary) 0%, transparent 50%)'
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [1, 1.5, 1.2], opacity: [0, 0.15, 0.1] }}
        transition={{ duration: 7, ease: 'easeInOut' }}
      />
      
      {/* Virtue 5 Content */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[var(--color-chart-teal)] font-mono text-xl mb-6 uppercase tracking-widest font-semibold"
        >
          05. Verified Mastery
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="text-6xl md:text-7xl font-display font-bold text-[var(--color-primary)] text-center leading-tight max-w-[70vw]"
        >
          Standards Never <span className="text-[var(--color-text-secondary)] italic">Diluted</span>.<br/>
          Mastery <span className="text-[var(--color-chart-teal)]">Confirmed</span>.
        </motion.h2>
        
        {/* Academic Verification Seal */}
        <motion.div 
          className="mt-16 w-32 h-32 rounded-full bg-white border-4 border-[var(--color-chart-teal)] shadow-xl flex items-center justify-center relative"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.5, type: 'spring', bounce: 0.4, duration: 1.5 }}
        >
          {/* Inner ring */}
          <div className="absolute inset-2 rounded-full border border-[var(--color-chart-teal)] opacity-50" />
          
          <motion.svg 
            viewBox="0 0 24 24" 
            className="w-16 h-16 text-[var(--color-chart-teal)]" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <motion.polyline 
              points="20 6 9 17 4 12" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 2.2, duration: 0.8, ease: 'easeOut' }}
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
