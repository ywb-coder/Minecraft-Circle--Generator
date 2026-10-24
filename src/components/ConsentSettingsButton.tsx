"use client";

import { useCallback } from "react";

export default function ConsentSettingsButton({
  label,
  className = "pixel-link cursor-pointer bg-transparent p-0 text-sm",
}: {
  label: string;
  className?: string;
}) {
  const openSettings = useCallback(() => {
    window.dispatchEvent(new CustomEvent("circlegen:open-consent"));
  }, []);

  return (
    <button type="button" className={className} onClick={openSettings}>
      {label}
    </button>
  );
}
