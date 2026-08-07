export default function Slide09Analytics() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg flex flex-col px-[7vw] pt-[5vh] pb-[5vh]">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 80% 20%, #0f1d30 0%, #0d1117 65%)' }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <p className="font-body text-[1.1vw] text-primary uppercase tracking-[0.28em] font-semibold mb-[1vh]">
          Analytics
        </p>
        <h2 className="font-display text-[3.5vw] font-black text-text leading-tight tracking-tight mb-[3.5vh]">
          See exactly where to focus next
        </h2>

        <div className="flex gap-[6vw] flex-1">
          <div className="w-[52%] flex flex-col justify-center">
            <p className="font-body text-[1.2vw] text-muted uppercase tracking-[0.2em] mb-[2vh]">Practice accuracy by topic</p>

            <div className="mb-[1.4vh]">
              <div className="flex justify-between mb-[0.4vh]">
                <span className="font-body text-[1.5vw] text-text">Sociological Perspectives</span>
                <span className="font-body text-[1.5vw] text-muted">92%</span>
              </div>
              <div className="h-[0.65vh] bg-white/8 rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-primary rounded-full" />
              </div>
            </div>

            <div className="mb-[1.4vh]">
              <div className="flex justify-between mb-[0.4vh]">
                <span className="font-body text-[1.5vw] text-text">Culture &amp; Norms</span>
                <span className="font-body text-[1.5vw] text-muted">88%</span>
              </div>
              <div className="h-[0.65vh] bg-white/8 rounded-full overflow-hidden">
                <div className="h-full w-[88%] bg-primary rounded-full" />
              </div>
            </div>

            <div className="mb-[1.4vh]">
              <div className="flex justify-between mb-[0.4vh]">
                <span className="font-body text-[1.5vw] text-text">Socialization</span>
                <span className="font-body text-[1.5vw] text-muted">83%</span>
              </div>
              <div className="h-[0.65vh] bg-white/8 rounded-full overflow-hidden">
                <div className="h-full w-[83%] bg-primary rounded-full" />
              </div>
            </div>

            <div className="mb-[1.4vh]">
              <div className="flex justify-between mb-[0.4vh]">
                <span className="font-body text-[1.5vw] text-text">Social Institutions</span>
                <span className="font-body text-[1.5vw] text-muted">79%</span>
              </div>
              <div className="h-[0.65vh] bg-white/8 rounded-full overflow-hidden">
                <div className="h-full w-[79%] bg-primary rounded-full" />
              </div>
            </div>

            <div className="mb-[1.4vh]">
              <div className="flex justify-between mb-[0.4vh]">
                <span className="font-body text-[1.5vw] text-text">Deviance &amp; Control</span>
                <span className="font-body text-[1.5vw] text-accent">74%</span>
              </div>
              <div className="h-[0.65vh] bg-white/8 rounded-full overflow-hidden">
                <div className="h-full w-[74%] bg-accent rounded-full" />
              </div>
            </div>

            <div className="mb-[1.4vh]">
              <div className="flex justify-between mb-[0.4vh]">
                <span className="font-body text-[1.5vw] text-text">Social Stratification</span>
                <span className="font-body text-[1.5vw] text-accent">71%</span>
              </div>
              <div className="h-[0.65vh] bg-white/8 rounded-full overflow-hidden">
                <div className="h-full w-[71%] bg-accent rounded-full" />
              </div>
            </div>

            <div className="mb-[1.4vh]">
              <div className="flex justify-between mb-[0.4vh]">
                <span className="font-body text-[1.5vw] text-text">Race &amp; Ethnicity</span>
                <span className="font-body text-[1.5vw] text-accent">68%</span>
              </div>
              <div className="h-[0.65vh] bg-white/8 rounded-full overflow-hidden">
                <div className="h-full w-[68%] bg-accent rounded-full" />
              </div>
            </div>

            <div className="mb-[0.5vh]">
              <div className="flex justify-between mb-[0.4vh]">
                <span className="font-body text-[1.5vw] text-text">Social Change</span>
                <span className="font-body text-[1.5vw] text-accent">65%</span>
              </div>
              <div className="h-[0.65vh] bg-white/8 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-accent rounded-full" />
              </div>
            </div>

            <div className="flex items-center gap-[2vw] mt-[1.5vh]">
              <div className="flex items-center gap-[0.6vw]">
                <div className="w-[1vw] h-[0.5vh] bg-primary rounded-full" />
                <span className="font-body text-[1.3vw] text-muted">Strong</span>
              </div>
              <div className="flex items-center gap-[0.6vw]">
                <div className="w-[1vw] h-[0.5vh] bg-accent rounded-full" />
                <span className="font-body text-[1.3vw] text-muted">Focus here</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-[2.5vh] justify-center">
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                Per-topic accuracy across all practice attempts
              </p>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                Strongest and weakest topics surfaced automatically
              </p>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                Official assignment average alongside practice trends
              </p>
            </div>
            <div className="flex items-start gap-[1.5vw]">
              <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent mt-[1vh] shrink-0" />
              <p className="font-body text-[2vw] text-text leading-relaxed">
                AI-generated narrative report with three concrete next-step recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
