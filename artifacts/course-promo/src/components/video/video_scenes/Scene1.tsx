import { motion } from 'framer-motion';

export const Scene1 = () => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-text-primary)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
      transition={{ duration: 1 }}
    >
      <div className="relative z-10 text-center max-w-[80vw]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl font-mono text-[var(--color-primary)] mb-6 tracking-widest uppercase"
        >
          A Self-Paced, AI-Powered Course
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-display font-bold leading-tight tracking-tight mb-8 text-[var(--color-primary)]"
        >
          Sociology 101<br/>
          <span className="text-[var(--color-text-primary)] font-medium">
            AI-Powered Course
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5, type: 'spring', stiffness: 100, damping: 20 }}
          className="w-32 h-1 bg-[var(--color-chart-teal)] mx-auto rounded-full"
        />
      </div>
    </motion.div>
  );
};
