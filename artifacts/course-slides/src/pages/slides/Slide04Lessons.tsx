export default function Slide04Lessons() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg flex flex-col px-[7vw] pt-[5vh] pb-[5vh]">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 90% 10%, #12192b 0%, #0d1117 65%)' }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <p className="font-body text-[1.1vw] text-primary uppercase tracking-[0.28em] font-semibold mb-[1vh]">
          Lessons
        </p>
        <h2 className="font-display text-[3.5vw] font-black text-text leading-tight tracking-tight mb-[3.5vh]">
          Lessons at three depths — read at your pace
        </h2>

        <div className="flex gap-[5vw] flex-1">
          <div className="flex flex-col gap-[2.5vh] w-[48%]">
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                Every topic ships as Short, Medium, and Long
              </p>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                Same ideas, same examples, just as much detail as you want right now
              </p>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                Switch depth any time without losing your place
              </p>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                An AI-powered rewrite tool lets you request your own custom version
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="bg-surface rounded-[1vw] w-full max-w-[38vw] border border-white/8 overflow-hidden">
              <div className="px-[2vw] py-[1.5vh] border-b border-white/8">
                <p className="font-body text-[1.3vw] text-muted">1.1 The Sociological Imagination</p>
              </div>
              <div className="px-[2vw] pt-[1.5vh] pb-[1vh]">
                <div className="flex gap-[0.8vw] mb-[2vh]">
                  <div className="px-[1.3vw] py-[0.6vh] rounded-[0.4vw] bg-primary text-bg font-body font-semibold text-[1.4vw]">Short</div>
                  <div className="px-[1.3vw] py-[0.6vh] rounded-[0.4vw] border border-white/15 text-muted font-body text-[1.4vw]">Medium</div>
                  <div className="px-[1.3vw] py-[0.6vh] rounded-[0.4vw] border border-white/15 text-muted font-body text-[1.4vw]">Long</div>
                </div>
                <p className="font-body text-[1.5vw] text-text leading-relaxed mb-[1vh]">
                  The sociological imagination enables us to grasp history and biography and the relations between the two within society. It is the core lens of the discipline.
                </p>
                <p className="font-body text-[1.4vw] text-muted leading-relaxed mb-[2vh]">
                  Instead of asking why a single individual is unemployed, sociology examines what structural economic shifts produce widespread unemployment.
                </p>
              </div>
              <div className="px-[2vw] py-[1.2vh] border-t border-white/8 flex items-center gap-[0.8vw]">
                <div className="w-[1.2vw] h-[1.2vw] rounded-full bg-accent/20 flex items-center justify-center">
                  <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-accent" />
                </div>
                <p className="font-body text-[1.3vw] text-muted">Custom rewrite — ask for your own version</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
