export default function Slide06Practice() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg flex flex-col px-[7vw] pt-[5vh] pb-[5vh]">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 85% 90%, #101e30 0%, #0d1117 65%)' }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <p className="font-body text-[1.1vw] text-primary uppercase tracking-[0.28em] font-semibold mb-[1vh]">
          Adaptive Practice
        </p>
        <h2 className="font-display text-[3.5vw] font-black text-text leading-tight tracking-tight mb-[3.5vh]">
          Adaptive practice that responds to you
        </h2>

        <div className="flex gap-[5vw] flex-1">
          <div className="flex flex-col gap-[2.5vh] w-[45%]">
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                Problems get harder on a streak, easier after a miss
              </p>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                Every question presents a concrete sociological scenario — no trivia, no dry definitions
              </p>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                Focus on weak topics automatically, or pick your own
              </p>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                Instant feedback with a model answer after every problem
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="bg-surface rounded-[1vw] w-full max-w-[40vw] border border-white/8">
              <div className="px-[2vw] py-[1.5vh] border-b border-white/8 flex items-center justify-between">
                <p className="font-body text-[1.3vw] font-semibold text-text">Practice · Socialization</p>
                <div className="flex items-center gap-[0.4vw]">
                  <span className="text-[1.2vw] text-primary">●</span>
                  <span className="text-[1.2vw] text-primary">●</span>
                  <span className="text-[1.2vw] text-primary">●</span>
                  <span className="text-[1.2vw] text-white/20">●</span>
                  <span className="text-[1.2vw] text-white/20">●</span>
                  <span className="font-body text-[1.2vw] text-muted ml-[0.4vw]">Medium</span>
                </div>
              </div>

              <div className="px-[2vw] pt-[1.5vh] pb-[1.5vh]">
                <div className="bg-[#0a0f1a] rounded-[0.5vw] px-[1.5vw] py-[1.3vh] mb-[1.5vh] border border-white/5">
                  <p className="font-body text-[1.55vw] text-muted italic leading-relaxed">A child learns to say "please" at home.</p>
                  <p className="font-body text-[1.55vw] text-muted italic leading-relaxed">At school, they learn to raise their hand to speak.</p>
                </div>
                <p className="font-body text-[1.6vw] text-text leading-snug">
                  What does this transition represent, and why doesn't primary socialization alone prepare children for formal institutions?
                </p>
              </div>

              <div className="px-[2vw] py-[1.2vh] border-t border-white/8">
                <div className="h-[0.5vh] bg-white/8 rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-primary rounded-full" />
                </div>
                <p className="font-body text-[1.2vw] text-muted mt-[0.5vh]">Problem 3 of 10 · Session in progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
