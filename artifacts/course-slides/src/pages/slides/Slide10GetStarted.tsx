export default function Slide10GetStarted() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 55%, #131f38 0%, #0d1117 65%)' }}
      />
      <div className="absolute top-[8vh] right-[7vw] w-[25vw] h-[25vw] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-[5vh] left-[5vw] w-[18vw] h-[18vw] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col justify-center h-full px-[10vw]">
        <p className="font-body text-[1.1vw] text-primary uppercase tracking-[0.28em] font-semibold mb-[2.5vh]">
          Get Started
        </p>
        <h2
          className="font-display text-[5.5vw] font-black text-text leading-tight tracking-tight mb-[2vh]"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          Start learning today
        </h2>
        <div className="w-[8vw] h-[0.45vh] bg-accent rounded-full mb-[5vh]" />

        <div className="grid grid-cols-2 gap-x-[6vw] gap-y-[2.8vh]">
          <div className="flex items-start gap-[1.5vw]">
            <div className="w-[0.45vw] h-[0.45vw] rounded-full bg-primary mt-[1vh] shrink-0" />
            <p className="font-body text-[2vw] text-text leading-relaxed">
              Sign in with Google — no account setup, no credit card
            </p>
          </div>
          <div className="flex items-start gap-[1.5vw]">
            <div className="w-[0.45vw] h-[0.45vw] rounded-full bg-primary mt-[1vh] shrink-0" />
            <p className="font-body text-[2vw] text-text leading-relaxed">
              Begin with a quick diagnostic to see where you are
            </p>
          </div>
          <div className="flex items-start gap-[1.5vw]">
            <div className="w-[0.45vw] h-[0.45vw] rounded-full bg-primary mt-[1vh] shrink-0" />
            <p className="font-body text-[2vw] text-text leading-relaxed">
              Pick up any lecture, any time, at any depth
            </p>
          </div>
          <div className="flex items-start gap-[1.5vw]">
            <div className="w-[0.45vw] h-[0.45vw] rounded-full bg-primary mt-[1vh] shrink-0" />
            <p className="font-body text-[2vw] text-text leading-relaxed">
              Your progress, practice history, and grades are all saved automatically
            </p>
          </div>
        </div>

        <p className="font-body text-[1.3vw] text-muted mt-[6vh] uppercase tracking-[0.2em]">
          Sociology 101
        </p>
      </div>
    </div>
  );
}
