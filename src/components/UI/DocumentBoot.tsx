import { useEffect } from "react";
import { weddingConfig } from "@/config/wedding";

export function ThemeBoot() {
  useEffect(() => {
    const root = document.documentElement;
    const { colors, fonts } = weddingConfig.theme;

    root.style.setProperty("--color-background", colors.background);
    root.style.setProperty("--color-surface", colors.surface);
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty("--color-text", colors.text);
    root.style.setProperty("--color-muted", colors.muted);
    root.style.setProperty("--color-nav", colors.nav);
    root.style.setProperty("--color-cream", colors.cream);
    root.style.setProperty("--font-display", fonts.display);
    root.style.setProperty("--font-script", fonts.script);
    root.style.setProperty("--font-heading", fonts.heading);
    root.style.setProperty("--font-body", fonts.body);
  }, []);

  return null;
}

export function SeoBoot() {
  useEffect(() => {
    const { seo, couple } = weddingConfig;
    document.title = seo.title;

    const ensure = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(property ? "property" : "name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    ensure("description", seo.description);
    ensure("og:title", seo.title, true);
    ensure("og:description", seo.description, true);
    ensure("og:image", seo.ogImage, true);
    ensure("og:type", "website", true);
    ensure("twitter:card", "summary_large_image");
    ensure("twitter:title", seo.title);
    ensure("twitter:description", seo.description);

    const names = `${couple.bride.name} ${couple.ampersand} ${couple.groom.name}`;
    ensure("author", names);
  }, []);

  return null;
}
