import { profile } from "../content/profile";
import { experience } from "../content/experience";
import { skillGroups } from "../content/skills";
import { projects } from "../content/projects";
import { useContactForm } from "../hooks/useContactForm";
import SocialLinks from "./SocialLinks";
import { useLanguage, pickLang } from "../i18n/LanguageContext";

const sectionLabelStyle = { fontSize: 11, letterSpacing: 2, marginBottom: 20 };
const fieldStyle = {
  background: "#0b0e1a",
  border: "2px solid #3a4a3a",
  color: "#eef1e8",
  padding: "10px 12px",
  fontSize: 13,
  width: "100%",
};

export default function ResumeView({ onPlay }) {
  const { dict, lang, toggleLang } = useLanguage();
  const { role, summary, education } = pickLang(profile, lang);
  const { form, loading, status, handleChange, submit } = useContactForm();

  return (
    <div className="min-h-screen w-full" style={{ background: "#0b0e1a" }}>
      {/* Same chrome language as the game's HUD — dark bar, green accent
          border — but carrying only what a recruiter actually needs here. */}
      <header
        className="sticky top-0 z-10 flex items-center justify-between gap-3 px-4 sm:px-8"
        style={{
          minHeight: 56,
          paddingTop: "env(safe-area-inset-top)",
          background: "rgba(11,14,26,0.92)",
          borderBottom: "2px solid #39ff88",
        }}
      >
        <div className="pixel-font truncate" style={{ fontSize: 11, color: "#39ff88" }}>
          {profile.name.toUpperCase()}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="pixel-font"
            style={{ fontSize: 9, color: "#9aa39a", background: "none", border: "2px solid #3a4a3a", padding: "8px 6px", minHeight: 36, cursor: "pointer" }}
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={onPlay}
            className="mono-font"
            style={{ fontSize: 11, color: "#9aa39a", background: "none", border: "none", padding: "8px 4px", minHeight: 36, cursor: "pointer" }}
          >
            {dict.resume.backToGame}
          </button>
          <a
            href="/Giancarlo_Poemape_CV.pdf"
            download
            className="pixel-font"
            style={{
              fontSize: 9,
              color: "#0b0e1a",
              background: "#39ff88",
              padding: "10px 12px",
              minHeight: 36,
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {dict.finale.downloadCv}
          </a>
        </div>
      </header>

      <main className="mx-auto w-full" style={{ maxWidth: 760, padding: "48px 20px 80px" }}>
        {/* Hero */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start" style={{ gap: 28, marginBottom: 48 }}>
          <div style={{ flex: 1, minWidth: 0, width: "100%" }}>
            <div className="pixel-font" style={{ fontSize: 9, letterSpacing: 2, color: "#9aa39a", marginBottom: 10 }}>
              {role.toUpperCase()}
            </div>
            <div className="pixel-font" style={{ fontSize: 26, lineHeight: 1.6, color: "#39ff88", marginBottom: 18 }}>
              {profile.name}
            </div>
            <p className="mono-font" style={{ color: "#cfd6cc", fontSize: 15, lineHeight: 1.8, margin: "0 0 20px" }}>
              {summary}
            </p>
            {/* Explicit inline gap + "·" separators, not Tailwind's gap-x/gap-y
                utilities — those weren't taking effect and the items rendered
                flush against each other with no space at all. */}
            <div className="mono-font" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", fontSize: 13, color: "#9aa39a" }}>
              <span>{profile.location}</span>
              <span style={{ color: "#3a4a3a" }}>·</span>
              <a href={`mailto:${profile.email}`} style={{ color: "#39ff88" }}>
                {profile.email}
              </a>
              <span style={{ color: "#3a4a3a" }}>·</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ color: "#39ff88" }}>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Full portrait (already background-removed), no hard circle or
              box edge — a radial mask dissolves it into the page instead. */}
          <img
            src="/gian_no_bckg.png"
            alt={profile.name}
            className="w-44 sm:w-52"
            style={{
              height: "auto",
              flexShrink: 0,
              WebkitMaskImage: "radial-gradient(ellipse 72% 75% at 50% 36%, black 52%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 72% 75% at 50% 36%, black 52%, transparent 100%)",
            }}
          />
        </div>

        {/* Experience */}
        <section style={{ marginBottom: 48 }}>
          <div className="pixel-font" style={{ ...sectionLabelStyle, color: "#39ff88" }}>
            {dict.resume.sections.experience}
          </div>
          {experience.map((job, i) => {
            const { title, points } = pickLang(job, lang);
            return (
              <div
                key={job.company}
                style={{ paddingBottom: 24, marginBottom: 24, borderBottom: i < experience.length - 1 ? "2px solid #1a2033" : "none" }}
              >
                <div className="pixel-font" style={{ fontSize: 13, color: "#eef1e8", marginBottom: 6, lineHeight: 1.6 }}>
                  {title}
                </div>
                <div className="mono-font" style={{ fontSize: 12, color: "#ffb84d", marginBottom: 12 }}>
                  {job.company} · {job.date}
                </div>
                <ul className="mono-font" style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.75, color: "#cfd6cc" }}>
                  {points.map((p) => (
                    <li key={p} style={{ marginBottom: 6 }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        {/* Skills */}
        <section style={{ marginBottom: 48 }}>
          <div className="pixel-font" style={{ ...sectionLabelStyle, color: "#ffb84d" }}>
            {dict.resume.sections.skills}
          </div>
          {skillGroups.map((group) => {
            const { label } = pickLang(group, lang);
            return (
              <div key={label} style={{ marginBottom: 18 }}>
                <div className="mono-font" style={{ fontSize: 12, color: "#9aa39a", marginBottom: 8 }}>
                  {label}
                </div>
                <div className="flex flex-wrap" style={{ gap: 10 }}>
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center"
                      style={{ gap: 8, border: "2px solid #232a3d", padding: "6px 10px" }}
                    >
                      {item.icon && <img src={item.icon} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />}
                      <span className="mono-font" style={{ fontSize: 12, color: "#eef1e8" }}>
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Projects */}
        <section style={{ marginBottom: 48 }}>
          <div className="pixel-font" style={{ ...sectionLabelStyle, color: "#ff6b9d" }}>
            {dict.resume.sections.projects}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
            {projects.map((project) => {
              const localized = pickLang(project, lang);
              return (
                <div key={localized.title} style={{ border: "2px solid #232a3d", padding: "18px 20px" }}>
                  <div className="pixel-font" style={{ fontSize: 12, color: "#eef1e8", marginBottom: 10, lineHeight: 1.6 }}>
                    {localized.title}
                  </div>
                  <p className="mono-font" style={{ color: "#cfd6cc", fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>
                    {localized.desc}
                  </p>
                  <div className="flex flex-wrap" style={{ gap: 6 }}>
                    {project.tags.map((t) => (
                      <span key={t} className="pixel-font" style={{ fontSize: 8, color: "#9aa39a", border: "2px solid #3a4a3a", padding: "4px 8px" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Education & certifications */}
        <section style={{ marginBottom: 48 }}>
          <div className="pixel-font" style={{ ...sectionLabelStyle, color: "#39ff88" }}>
            {dict.about.education}
          </div>
          {education.map((e) => (
            <div key={e.degree} style={{ marginBottom: 14 }}>
              <div className="mono-font" style={{ color: "#eef1e8", fontSize: 14 }}>
                {e.link ? (
                  <a href={e.link} target="_blank" rel="noreferrer" style={{ color: "#eef1e8" }}>
                    {e.degree}
                  </a>
                ) : (
                  e.degree
                )}
              </div>
              <div className="mono-font" style={{ fontSize: 12, color: "#9aa39a" }}>
                {e.school} · {e.date}
              </div>
            </div>
          ))}

          <div className="pixel-font" style={{ fontSize: 11, letterSpacing: 2, color: "#9aa39a", margin: "24px 0 12px" }}>
            {dict.about.certifications}
          </div>
          <ul className="mono-font" style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.8, color: "#cfd6cc" }}>
            {profile.certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section>
          <div className="pixel-font" style={{ ...sectionLabelStyle, color: "#ffb84d" }}>
            {dict.resume.sections.contact}
          </div>
          <div style={{ marginBottom: 24 }}>
            <SocialLinks />
          </div>
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
            <input required name="name" value={form.name} onChange={handleChange} placeholder={dict.contact.namePlaceholder} className="mono-font" style={fieldStyle} />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={dict.contact.emailPlaceholder}
              className="mono-font"
              style={fieldStyle}
            />
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={dict.contact.messagePlaceholder}
              rows={4}
              className="mono-font"
              style={{ ...fieldStyle, resize: "vertical" }}
            />
            <button
              type="submit"
              disabled={loading}
              className="pixel-font"
              style={{ fontSize: 11, color: "#0b0e1a", background: "#39ff88", border: "none", padding: "12px 16px", cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? dict.contact.sending : dict.contact.send}
            </button>
            {status === "success" && (
              <div className="mono-font" style={{ color: "#39ff88", fontSize: 12 }}>
                {dict.contact.success}
              </div>
            )}
            {status === "error" && (
              <div className="mono-font" style={{ color: "#ff6b9d", fontSize: 12 }}>
                {dict.contact.error}
              </div>
            )}
          </form>
        </section>

        <div style={{ marginTop: 64, textAlign: "center" }}>
          <button
            onClick={onPlay}
            className="mono-font"
            style={{ fontSize: 12, color: "#5c6a5c", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
          >
            {dict.resume.backToGame}
          </button>
        </div>
      </main>
    </div>
  );
}
