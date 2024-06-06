"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { TrackType } from "../types/tracks";

type CurrentTrackContextValue = {
  currentTrack: TrackType | null;
  setCurrentTrack: Dispatch<SetStateAction<TrackType | null>>;
};

const CurrentTrackContext = createContext<CurrentTrackContextValue | undefined>(
  undefined
);

type CurrentTrackProviderProps = {
  children: ReactNode;
};

export function CurrentTrackProvider({ children }: CurrentTrackProviderProps) {
  const [currentTrack, setCurrentTrack] = useState<TrackType | null>(null);

  return (
    <CurrentTrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </CurrentTrackContext.Provider>
  );
}

export function useCurrentTrack() {
  const context = useContext(CurrentTrackContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentTrack должен использоваться внутри CurrentTrackProvider"
    );
  }
  return context;
}
