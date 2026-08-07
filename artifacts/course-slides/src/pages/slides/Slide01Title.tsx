const base = import.meta.env.BASE_URL;

export default function Slide01Title() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src={`${base}hero.jpg`}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        alt=""
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(120deg, rgba(13,17,23,0.97) 0%, rgba(13,17,23,0.85) 55%, rgba(13,17,23,0.45) 100%)' }}
      />
      <div className="absolute inset-0 flex flex-col justify-center px-[8vw]">
        <p className="font-body text-[1.1vw] text-accent uppercase tracking-[0.32em] font-semibold mb-[2.5vh]">
          Course Overview
        </p>
        <h1
          className="font-display text-[4.8vw] font-black text-text leading-[1.06] tracking-tight mb-[3vh] max-w-[62vw]"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          Sociology 101
        </h1>
        <div className="w-[7vw] h-[0.45vh] bg-accent rounded-full mb-[3.5vh]" />
        <p className="font-body text-[2vw] text-muted max-w-[50vw] leading-relaxed">
          A complete, self-paced course that teaches, tutors, drills, and grades you — from foundational sociological perspectives to contemporary social change.
        </p>
      </div>
    </div>
  );
}
