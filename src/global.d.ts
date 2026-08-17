/// <reference types="vinxi/types/client" />

interface NavigatorUAData {
  platform: string;
  mobile: boolean;
  getHighEntropyValues(hints: string[]): Promise<{
    architecture?: string;
    bitness?: string;
    platform?: string;
    platformVersion?: string;
  }>;
}

interface Navigator {
  userAgentData?: NavigatorUAData;
}
