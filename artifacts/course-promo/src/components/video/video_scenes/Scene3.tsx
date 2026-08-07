import { motion } from 'framer-motion';

export const Scene3 = () => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-light)]"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="z-10 text-center max-w-[60vw]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring', bounce: 0.4 }}
          className="w-24 h-24 mx-auto mb-10 relative flex justify-center items-center"
        >
          {/* Elegant Lock icon construction */}
          <div className="absolute w-16 h-12 bg-[var(--color-primary)] rounded-md mt-8 shadow-lg" />
          <motion.div 
            className="absolute w-10 h-16 border-4 border-[var(--color-primary)] rounded-t-full mb-8"
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, type: 'spring' }}
          />
          <div className="absolute w-2 h-2 bg-[var(--color-chart-amber)] rounded-full mt-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[var(--color-chart-amber)] font-mono text-xl mb-4 uppercase tracking-widest"
        >
          02. Cheat-Proof By Design
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-5xl md:text-6xl font-display font-bold text-[var(--color-primary)] mb-8 leading-tight"
        >
          Completion Actually Certifies <span className="text-[var(--color-text-primary)]">Competence</span>.
        </motion.h2>

        {/* Essay validation UI - Academic style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 bg-white border border-[var(--color-secondary)] shadow-sm rounded-xl p-6 flex flex-col gap-4 font-mono text-sm max-w-[45vw] mx-auto text-left"
        >
          <div className="flex justify-between items-center border-b border-[var(--color-secondary)] pb-3 text-[var(--color-text-muted)]">
            <span className="font-semibold uppercase tracking-wider text-xs">Assessment: Final Project</span>
            <span className="text-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 rounded-full text-xs">Secure Environment</span>
          </div>
          <div className="text-[var(--color-text-primary)] pt-2">
            <span className="text-[var(--color-chart-teal)]">&gt;</span> Running logical reasoning checks... <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5}} className="text-[var(--color-primary)] font-bold">PASS</motion.span>
          </div>
          <div className="text-[var(--color-text-primary)]">
            <span className="text-[var(--color-chart-teal)]">&gt;</span> Verifying source citations... <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.0}} className="text-[var(--color-primary)] font-bold">PASS</motion.span>
          </div>
          <div className="text-[var(--color-text-primary)]">
            <span className="text-[var(--color-chart-teal)]">&gt;</span> Two-layer AI-authorship detection... <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.5}} className="text-[var(--color-primary)] font-bold">PASS</motion.span>
          </div>
        </motion.div>
      </div>
      
      {/* Background ripples */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] rounded-full border border-[var(--color-primary)] opacity-[0.03] pointer-events-none"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 6, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
      />
    </motion.div>
  );
};
