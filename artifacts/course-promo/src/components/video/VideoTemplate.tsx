import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';
import { Scene7 } from './video_scenes/Scene7';

export const SCENE_DURATIONS = {
  intro: 6000,
  tutors: 8000,
  cheatproof: 7000,
  industry: 7000,
  adaptive: 8000,
  mastery: 8000,
  cta: 16000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  intro: Scene1,
  tutors: Scene2,
  cheatproof: Scene3,
  industry: Scene4,
  adaptive: Scene5,
  mastery: Scene6,
  cta: Scene7,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, ms] of Object.entries(SCENE_DURATIONS)) {
    out[key] = cumulativeMs / 1000;
    cumulativeMs += ms;
  }
  return out;
})();

const AUDIO_SEEK_EPSILON_SEC = 0.18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey, currentScene } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
    if (Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) {
      audio.currentTime = targetTime;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, muted]);

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-bg-light)' }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] bg-[var(--color-secondary)] opacity-50"
          animate={{ 
            x: currentScene % 2 === 0 ? '-10vw' : '40vw', 
            y: currentScene % 2 === 0 ? '10vh' : '40vh',
            scale: currentScene % 2 === 0 ? 1 : 1.1
          }}
          transition={{ duration: 8, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute w-[60vw] h-[60vw] rounded-full blur-[100px] bg-[var(--color-accent)] opacity-40"
          animate={{ 
            x: currentScene % 2 === 0 ? '50vw' : '10vw', 
            y: currentScene % 2 === 0 ? '50vh' : '10vh',
            scale: currentScene % 2 === 0 ? 1.1 : 1
          }}
          transition={{ duration: 9, ease: 'easeInOut' }}
        />
      </div>

      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/promo_voiceover.mp3`}
        preload="auto"
        autoPlay
        muted={muted}
      />
    </div>
  );
}