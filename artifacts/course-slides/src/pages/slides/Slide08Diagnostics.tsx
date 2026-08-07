export default function Slide08Diagnostics() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg flex flex-col px-[7vw] pt-[5vh] pb-[5vh]">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 10% 90%, #101e30 0%, #0d1117 65%)' }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <p className="font-body text-[1.1vw] text-primary uppercase tracking-[0.28em] font-semibold mb-[1vh]">
          Diagnostics
        </p>
        <h2 className="font-display text-[3.5vw] font-black text-text leading-tight tracking-tight mb-[3vh]">
          Know where you stand before and after
        </h2>

        <div className="flex gap-[2.5vw] mb-[3vh]">
          <div className="flex-1 bg-surface rounded-[0.8vw] px-[2vw] py-[2vh] border border-white/8 flex items-start gap-[1.5vw]">
            <div className="w-[3vw] h-[3vw] rounded-[0.5vw] bg-primary/15 flex items-center justify-center shrink-0 mt-[0.3vh]">
              <div className="w-[1.5vw] h-[1.5vw] rounded-full border-[0.2vw] border-primary" />
            </div>
            <div>
              <p className="font-display text-[1.7vw] font-bold text-text mb-[0.5vh]">Sociological Analysis</p>
              <p className="font-body text-[1.4vw] text-muted leading-snug">
                Realistic social scenarios at your current point in the course
              </p>
            </div>
          </div>
          <div className="flex-1 bg-surface rounded-[0.8vw] px-[2vw] py-[2vh] border border-white/8 flex items-start gap-[1.5vw]">
            <div className="w-[3vw] h-[3vw] rounded-[0.5vw] bg-accent/15 flex items-center justify-center shrink-0 mt-[0.3vh]">
              <div className="w-[1.5vw] h-[1.5vw] rounded-full border-[0.2vw] border-accent" />
            </div>
            <div>
              <p className="font-display text-[1.7vw] font-bold text-text mb-[0.5vh]">General Reasoning</p>
              <p className="font-body text-[1.4vw] text-muted leading-snug">
                Analysis, inference, evaluation, deduction, and induction
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[0] mb-[3vh]">
          <div className="flex items-center gap-[1vw] flex-1">
            <div className="w-[1.2vw] h-[1.2vw] rounded-full bg-primary shrink-0" />
            <p className="font-body text-[1.5vw] text-text font-medium">Before the course</p>
          </div>
          <div className="h-[0.15vh] flex-1 bg-white/10" />
          <div className="flex items-center gap-[1vw] flex-1 justify-center">
            <div className="w-[1.2vw] h-[1.2vw] rounded-full bg-primary/50 shrink-0" />
            <p className="font-body text-[1.5vw] text-muted">One-third through</p>
          </div>
          <div className="h-[0.15vh] flex-1 bg-white/10" />
          <div className="flex items-center gap-[1vw] flex-1 justify-center">
            <div className="w-[1.2vw] h-[1.2vw] rounded-full bg-primary/50 shrink-0" />
            <p className="font-body text-[1.5vw] text-muted">Two-thirds through</p>
          </div>
          <div className="h-[0.15vh] flex-1 bg-white/10" />
          <div className="flex items-center gap-[1vw] flex-1 justify-end">
            <div className="w-[1.2vw] h-[1.2vw] rounded-full bg-primary/50 shrink-0" />
            <p className="font-body text-[1.5vw] text-muted">After the course</p>
          </div>
        </div>

        <div className="flex flex-col gap-[2vh]">
          <div className="flex items-start gap-[1.5vw]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[0.9vh] shrink-0" />
            <p className="font-body text-[2vw] text-text leading-relaxed">
              Both available before, one-third through, two-thirds through, and after
            </p>
          </div>
          <div className="flex items-start gap-[1.5vw]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[0.9vh] shrink-0" />
            <p className="font-body text-[2vw] text-text leading-relaxed">
              Ungraded, retakeable anytime — questions are different every attempt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
