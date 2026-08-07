export default function Slide07Assignments() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, #0f1825 0%, #0d1117 70%)' }}
      />
      <div className="relative z-10 flex h-full px-[7vw] pt-[5vh] pb-[5vh] gap-[6vw]">
        <div className="flex flex-col justify-center w-[38%]">
          <p className="font-body text-[1.1vw] text-primary uppercase tracking-[0.28em] font-semibold mb-[3vh]">
            Assignments
          </p>
          <div className="font-display text-[11vw] font-black leading-none text-text mb-[1.5vh]">13</div>
          <p className="font-display text-[2vw] font-semibold text-muted mb-[3vh]">graded assignments</p>
          <div className="w-[5vw] h-[0.4vh] bg-accent rounded-full mb-[3vh]" />
          <div className="bg-surface rounded-[0.6vw] px-[1.5vw] py-[1.3vh] border border-white/8">
            <p className="font-body text-[1.4vw] text-muted leading-relaxed">
              2 HW + 1 Unit Test<br />
              per week × 4 weeks<br />
              + 1 cumulative final
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center flex-1 gap-[2.8vh]">
          <h2
            className="font-display text-[3vw] font-black text-text leading-tight tracking-tight mb-[1vh]"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            13 graded assignments — homework, tests, and a final
          </h2>

          <div className="flex items-start gap-[1.5vw]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[0.9vh] shrink-0" />
            <p className="font-body text-[1.85vw] text-text leading-relaxed">
              Written answers graded by AI against model answers, with paragraph-level feedback
            </p>
          </div>
          <div className="flex items-start gap-[1.5vw]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[0.9vh] shrink-0" />
            <p className="font-body text-[1.85vw] text-text leading-relaxed">
              A practice version of every assignment lets you rehearse first
            </p>
          </div>
          <div className="flex items-start gap-[1.5vw]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[0.9vh] shrink-0" />
            <p className="font-body text-[1.85vw] text-text leading-relaxed">
              Two-layer AI-authorship detection on every submission
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
