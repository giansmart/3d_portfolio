import { skillGroups } from "../../content/skills";
import { useLanguage, pickLang } from "../../i18n/LanguageContext";

export default function SkillsPanel() {
  const { lang } = useLanguage();

  return (
    <div>
      {skillGroups.map((group) => {
        const { label } = pickLang(group, lang);
        return (
          <div key={label} style={{ marginBottom: 20 }}>
            <div className="pixel-font" style={{ fontSize: 10, color: "#ffb84d", marginBottom: 10 }}>
              {label.toUpperCase()}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {group.items.map((item) => (
                <div
                  key={item.name}
                  style={{ display: "flex", alignItems: "center", gap: 8, border: "2px solid #3a4a3a", padding: "6px 10px" }}
                >
                  {item.icon && <img src={item.icon} alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />}
                  <span className="mono-font" style={{ fontSize: 12, color: "#eef1e8" }}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
