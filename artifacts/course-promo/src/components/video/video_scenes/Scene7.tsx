import { motion } from 'framer-motion';

export const Scene7 = () => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-primary)] text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Rich Academic Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <motion.div 
        className="z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-[var(--color-chart-amber)] font-mono text-xl mb-6 uppercase tracking-widest font-semibold"
        >
          Enroll Today
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1, type: 'spring', bounce: 0.3 }}
          className="text-6xl md:text-8xl font-display font-bold text-white text-center leading-tight mb-12 drop-shadow-lg"
        >
          SOCIOLOGY101.XYZ
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="px-10 py-5 bg-[var(--color-chart-amber)] text-[var(--color-primary)] font-display font-bold text-3xl rounded-md shadow-2xl hover:scale-105 transition-transform"
        >
          Enroll Now
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
