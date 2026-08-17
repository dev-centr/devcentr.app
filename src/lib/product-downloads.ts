import type { DistroId } from "./detect-platform";

/**
 * Product download URLs for DevCentr.
 * Latest-release aliases stay stable across tags; asset names must match `gh release`.
 */
export const DEVCENTR_DOWNLOADS: Partial<Record<DistroId, string>> = {
  "windows-x64":
    "https://github.com/dev-centr/devcentr/releases/latest/download/DevCentr-windows-x64.zip",
};
