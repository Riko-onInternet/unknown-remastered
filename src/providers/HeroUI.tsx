"use client";

import { HeroUIProvider } from "@heroui/react";

export function HeroUI({ children }: Readonly<{ children: React.ReactNode }>) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
