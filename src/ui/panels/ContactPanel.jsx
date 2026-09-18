import { profile } from "../../content/profile";
import { useContactForm } from "../../hooks/useContactForm";
import { useLanguage } from "../../i18n/LanguageContext";

const fieldStyle = {
  background: "#0b0e1a",
  border: "2px solid #3a4a3a",
  color: "#eef1e8",
  padding: "10px 12px",
  fontSize: 13,
};

export default function ContactPanel() {
  const { dict } = useLanguage();
  const { form, loading, status, handleChange, submit } = useContactForm();

  return (
    <div>
      <p className="mono-font" style={{ color: "#cfd6cc", fontSize: 14, lineHeight: 1.7, marginTop: 0 }}>
        {dict.contact.introPrefix}{" "}
        <a href={`mailto:${profile.email}`} style={{ color: "#39ff88" }}>
          {profile.email}
        </a>{" "}
        {dict.contact.introOr}{" "}
        <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ color: "#39ff88" }}>
          {dict.contact.introLinkedin}
        </a>
        {dict.contact.introSuffix(profile.location)}
      </p>

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        <input
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={dict.contact.namePlaceholder}
          className="mono-font"
          style={fieldStyle}
        />
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
          style={{
            fontSize: 11,
            color: "#0b0e1a",
            background: "#39ff88",
            border: "none",
            padding: "12px 16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
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
    </div>
  );
}
