"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Version = "kids" | "adult";

interface VersionContextType {
  version: Version;
  setVersion: (version: Version) => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export function VersionProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersionState] = useState<Version>("adult");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("version") as Version | null;
    if (saved && (saved === "kids" || saved === "adult")) {
      setVersionState(saved);
    }
    setMounted(true);
  }, []);

  const setVersion = (newVersion: Version) => {
    setVersionState(newVersion);
    if (mounted) {
      localStorage.setItem("version", newVersion);
    }
  };

  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion() {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error("useVersion must be used within VersionProvider");
  }
  return context;
}
