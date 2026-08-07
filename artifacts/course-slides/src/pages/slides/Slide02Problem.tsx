export default function Slide02Problem() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 75% 25%, #111827 0%, #0d1117 65%)' }}
      />
      <div className="relative z-10 flex flex-col justify-center h-full px-[8vw]">
        <h2
          className="font-display text-[4vw] font-black text-text leading-[1.1] tracking-tight mb-[1.5vh] max-w-[72vw]"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          Most intro courses are passive.{' '}
          <span className="text-accent">This one isn't.</span>
        </h2>
        <div className="w-[5vw] h-[0.4vh] bg-primary rounded-full mb-[4.5vh]" />

        <div className="flex flex-col gap-[3vh]">
          <div className="flex items-start gap-[2vw]">
            <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-muted mt-[0.9vh] shrink-0" />
            <p className="font-body text-[2.1vw] text-muted leading-snug">
              Typical courses: watch, read, maybe quiz.
            </p>
          </div>

          <div className="flex items-start gap-[2vw]">
            <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-primary mt-[0.9vh] shrink-0" />
            <p className="font-body text-[2.1vw] text-text leading-snug max-w-[70vw]">
              This course: reads to you at your pace, tutors you on the passage you're reading, adapts practice to where you're struggling, grades your work with written feedback.
            </p>
          </div>

          <div className="flex items-start gap-[2vw]">
            <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-accent mt-[0.9vh] shrink-0" />
            <p className="font-body text-[2.1vw] text-accent leading-snug font-medium">
              Everything in one room — no juggling five tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
