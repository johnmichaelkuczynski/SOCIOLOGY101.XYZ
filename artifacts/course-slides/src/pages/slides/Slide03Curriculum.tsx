export default function Slide03Curriculum() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg flex flex-col px-[6vw] pt-[4vh] pb-[4vh]">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 20% 80%, #101a30 0%, #0d1117 60%)' }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <p className="font-body text-[1.1vw] text-primary uppercase tracking-[0.28em] font-semibold mb-[1vh]">
          Curriculum
        </p>
        <h2 className="font-display text-[3.6vw] font-black text-text leading-tight tracking-tight mb-[3vh]">
          Four weeks. 28 topics. One new perspective.
        </h2>

        <div className="grid grid-cols-2 gap-[2vw] flex-1">
          <div className="bg-surface rounded-[0.7vw] px-[2.2vw] py-[2.2vh] flex flex-col border border-white/5">
            <div className="flex items-center gap-[1.2vw] mb-[1.5vh]">
              <span className="font-display text-[2.2vw] font-black text-accent">01</span>
              <div>
                <p className="font-display text-[1.5vw] font-bold text-text leading-tight">The Sociological Perspective</p>
                <p className="font-body text-[1.3vw] text-muted">Week 1 · 7 topics</p>
              </div>
            </div>
            <div className="flex flex-col gap-[0.7vh] border-t border-white/8 pt-[1.5vh]">
              <p className="font-body text-[1.5vw] text-muted leading-snug">The sociological imagination</p>
              <p className="font-body text-[1.5vw] text-muted leading-snug">Durkheim, Marx, and Weber</p>
              <p className="font-body text-[1.5vw] text-muted leading-snug">Functionalism, conflict, interactionism</p>
              <p className="font-body text-[1.5vw] text-muted leading-snug">Research process, methods, and ethics</p>
            </div>
          </div>

          <div className="bg-surface rounded-[0.7vw] px-[2.2vw] py-[2.2vh] flex flex-col border border-white/5">
            <div className="flex items-center gap-[1.2vw] mb-[1.5vh]">
              <span className="font-display text-[2.2vw] font-black text-accent">02</span>
              <div>
                <p className="font-display text-[1.5vw] font-bold text-text leading-tight">Culture, Self, and Society</p>
                <p className="font-body text-[1.3vw] text-muted">Week 2 · 7 topics</p>
              </div>
            </div>
            <div className="flex flex-col gap-[0.7vh] border-t border-white/8 pt-[1.5vh]">
              <p className="font-body text-[1.5vw] text-muted leading-snug">Norms, values, symbols, and language</p>
              <p className="font-body text-[1.5vw] text-muted leading-snug">Socialization and its agents</p>
              <p className="font-body text-[1.5vw] text-muted leading-snug">Social construction of the self</p>
              <p className="font-body text-[1.5vw] text-muted leading-snug">Groups, networks, and bureaucracy</p>
            </div>
          </div>

          <div className="bg-surface rounded-[0.7vw] px-[2.2vw] py-[2.2vh] flex flex-col border border-white/5">
            <div className="flex items-center gap-[1.2vw] mb-[1.5vh]">
              <span className="font-display text-[2.2vw] font-black text-accent">03</span>
              <div>
                <p className="font-display text-[1.5vw] font-bold text-text leading-tight">Inequality and Social Difference</p>
                <p className="font-body text-[1.3vw] text-muted">Week 3 · 7 topics</p>
              </div>
            </div>
            <div className="flex flex-col gap-[0.7vh] border-t border-white/8 pt-[1.5vh]">
              <p className="font-body text-[1.5vw] text-muted leading-snug">Stratification, class, and mobility</p>
              <p className="font-body text-[1.5vw] text-muted leading-snug">Race, ethnicity, and systemic racism</p>
              <p className="font-body text-[1.5vw] text-muted leading-snug">Sex, gender, and structural inequality</p>
              <p className="font-body text-[1.5vw] text-muted leading-snug">Deviance and social control mechanisms</p>
            </div>
          </div>

          <div className="bg-surface rounded-[0.7vw] px-[2.2vw] py-[2.2vh] flex flex-col border border-white/5">
            <div className="flex items-center gap-[1.2vw] mb-[1.5vh]">
              <span className="font-display text-[2.2vw] font-black text-accent">04</span>
              <div>
                <p className="font-display text-[1.5vw] font-bold text-text leading-tight">Social Institutions and Change</p>
                <p className="font-body text-[1.3vw] text-muted">Week 4 · 7 topics</p>
              </div>
            </div>
            <div className="flex flex-col gap-[0.7vh] border-t border-white/8 pt-[1.5vh]">
              <p className="font-body text-[1.5vw] text-muted leading-snug">Family, education, and religion</p>
              <p className="font-body text-[1.5vw] text-muted leading-snug">Economy, work, power, and the state</p>
              <p className="font-body text-[1.5vw] text-muted leading-snug">Population, urbanization, and environment</p>
              <p className="font-body text-[1.5vw] text-muted leading-snug">Social movements and structural change</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
