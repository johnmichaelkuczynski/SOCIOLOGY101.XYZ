import { motion } from 'framer-motion';

export const Scene2 = () => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-between px-[10vw] bg-[var(--color-bg-light)]"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50, filter: 'blur(5px)' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left Text */}
      <div className="z-10 max-w-[35vw]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-[var(--color-chart-teal)] font-mono text-xl mb-4 tracking-wider uppercase"
        >
          01. ON-DEMAND INSTRUCTION
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-6xl font-display font-bold text-[var(--color-primary)] mb-6 leading-tight"
        >
          24/7 Built-in <span className="text-[var(--color-text-primary)]">Tutors</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-2xl text-[var(--color-text-secondary)] font-body leading-relaxed"
        >
          Personalized guidance that eliminates the access gap. Never get stuck again.
        </motion.p>
      </div>

      {/* Right Visual: Academic Chat UI Mockup */}
      <motion.div
        className="relative z-10 w-[40vw] h-[60vh] bg-white border border-[var(--color-secondary)] rounded-2xl p-8 shadow-xl flex flex-col gap-6"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, type: 'spring', bounce: 0.3 }}
      >
        {/* User Message */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="self-end bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] p-5 rounded-xl rounded-tr-none max-w-[80%] font-mono text-sm border border-[var(--color-secondary)]"
        >
          I don't get the difference between Marx and Weber's view on stratification.
        </motion.div>

        {/* AI Tutor Message */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="self-start bg-[var(--color-primary)] text-white p-5 rounded-xl rounded-tl-none max-w-[90%] font-body shadow-md"
        >
          <div className="flex items-center gap-2 mb-3 text-[var(--color-chart-amber)] font-bold text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[var(--color-chart-amber)] animate-pulse" /> AI Tutor
          </div>
          <p className="leading-relaxed opacity-95">
            Marx focused on economic class—who owns the means of production. Weber agreed economics matters, but added that social prestige and political power also shape inequality.
          </p>
        </motion.div>

        {/* AI typing indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: 4, repeat: Infinity }}
          className="self-start text-[var(--color-text-muted)] font-mono text-xs mt-auto italic"
        >
          Tutor is typing...
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
