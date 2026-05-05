"use client";

import dynamic from "next/dynamic";

const HomeHeroVisual = dynamic(
  () => import("./HomeHeroVisual").then((module) => module.HomeHeroVisual),
  {
    loading: () => <div className="home-hero-visual home-hero-visual-fallback" aria-hidden="true" />,
    ssr: false
  }
);

export function HomeHeroVisualLoader() {
  return <HomeHeroVisual />;
}
