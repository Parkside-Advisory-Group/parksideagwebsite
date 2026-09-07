"use client";

import dynamic from "next/dynamic";
import type { SculptureProps } from "./Sculpture";

const Sculpture = dynamic(() => import("./Sculpture"), { ssr: false });

export default function SculptureLoader(props: SculptureProps) {
  return <Sculpture {...props} />;
}
