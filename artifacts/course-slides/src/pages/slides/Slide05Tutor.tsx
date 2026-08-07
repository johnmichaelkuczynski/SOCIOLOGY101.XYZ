export default function Slide05Tutor() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg flex flex-col px-[7vw] pt-[5vh] pb-[5vh]">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 15% 85%, #0f1d33 0%, #0d1117 65%)' }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <p className="font-body text-[1.1vw] text-primary uppercase tracking-[0.28em] font-semibold mb-[1vh]">
          AI Tutor
        </p>
        <h2 className="font-display text-[3.5vw] font-black text-text leading-tight tracking-tight mb-[3.5vh] max-w-[75vw]">
          Ask the AI tutor about exactly what you're reading
        </h2>

        <div className="flex gap-[5vw] flex-1">
          <div className="flex flex-col gap-[2.5vh] w-[45%]">
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                The tutor is scoped to the passage you're on — no hallucinated answers about other topics
              </p>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                Six concrete starter questions generated from the lecture to get you going
              </p>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                Ask follow-ups in plain English; get step-by-step guidance back
              </p>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                Tutor never just gives the answer — it guides you to it
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-[1.5vh] justify-center">
            <p className="font-body text-[1.2vw] text-muted uppercase tracking-[0.25em] mb-[0.5vh]">Starter Questions</p>
            <div className="bg-surface rounded-[0.6vw] px-[1.8vw] py-[1.3vh] border-l-[0.3vw] border-primary">
              <p className="font-body text-[1.6vw] text-text leading-snug">
                If the sociological imagination links personal troubles to public issues, how would it explain a sudden rise in college dropout rates?
              </p>
            </div>
            <div className="bg-surface rounded-[0.6vw] px-[1.8vw] py-[1.3vh] border-l-[0.3vw] border-primary">
              <p className="font-body text-[1.6vw] text-text leading-snug">
                Walk through the difference between a functionalist and a conflict perspective when analyzing the education system.
              </p>
            </div>
            <div className="bg-surface rounded-[0.6vw] px-[1.8vw] py-[1.3vh] border-l-[0.3vw] border-primary">
              <p className="font-body text-[1.6vw] text-text leading-snug">
                If Durkheim saw social facts as external forces, why might he argue that suicide rates are a sociological phenomenon rather than a psychological one?
              </p>
            </div>
            <p className="font-body text-[1.3vw] text-muted mt-[0.5vh]">Generated fresh from the lecture — different every visit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
