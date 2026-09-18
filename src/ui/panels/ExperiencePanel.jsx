import { experience } from "../../content/experience";

export default function ExperiencePanel() {
  return (
    <div>
      {experience.map((job) => (
        <div key={job.title + job.company} style={{ marginBottom: 20, borderLeft: "2px solid #39ff88", paddingLeft: 14 }}>
          <div className="pixel-font" style={{ fontSize: 11, color: "#eef1e8" }}>
            {job.title}
          </div>
          <div className="mono-font" style={{ fontSize: 12, color: "#ffb84d", margin: "4px 0" }}>
            {job.company} · {job.date}
          </div>
          <ul className="mono-font" style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.6, color: "#cfd6cc" }}>
            {job.points.map((p) => (
              <li key={p} style={{ marginBottom: 4 }}>
                {p}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
