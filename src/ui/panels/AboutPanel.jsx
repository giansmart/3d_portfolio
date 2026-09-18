import { profile } from "../../content/profile";

export default function AboutPanel() {
  return (
    <div className="mono-font" style={{ color: "#cfd6cc", fontSize: 14, lineHeight: 1.7 }}>
      <p style={{ marginTop: 0 }}>{profile.summary}</p>

      <div style={{ marginTop: 20 }}>
        <div className="pixel-font" style={{ fontSize: 10, color: "#ffb84d", marginBottom: 10 }}>
          EDUCATION
        </div>
        {profile.education.map((e) => (
          <div key={e.degree} style={{ marginBottom: 10 }}>
            <div style={{ color: "#eef1e8" }}>{e.degree}</div>
            <div style={{ fontSize: 12, color: "#9aa39a" }}>
              {e.school} · {e.date}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="pixel-font" style={{ fontSize: 10, color: "#ffb84d", marginBottom: 10 }}>
          CERTIFICATIONS
        </div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {profile.certifications.map((c) => (
            <li key={c} style={{ marginBottom: 6 }}>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
