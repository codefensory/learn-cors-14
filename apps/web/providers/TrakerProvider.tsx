import { createContext, lazy, useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import dynamic from "next/dynamic";

const Tracker = dynamic(
  async () => (await import("@openreplay/tracker")).default,
  { ssr: false }
);

export const TrackerContext = createContext(null);

function defaultGetUserId() {
  return uuidV4();
}

async function newTracker(config) {
  const getUserId =
    config?.userIdEnabled && config?.getUserId
      ? config.getUserId
      : defaultGetUserId;
  let userId = null;

  const trackerConfig = {
    projectKey:
      config?.projectKey || process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY,
    debug: true,
  };

  const Tracker = (await import("@openreplay/tracker")).default;

  const tracker = new Tracker(trackerConfig);

  if (config?.userIdEnabled) {
    userId = getUserId();
    tracker.setUserID(userId);
  }
  return tracker;
}

export default function TrackerProvider({ children, config = {} }) {
  const tracker = useRef<any>(null);

  const initTracker = async () => {
    console.log("Instantiaing the tracker for the first time...");

    const track = await newTracker(config);

    tracker.current = track;
  };

  const startTracking = () => {
    console.log("Starting tracker...");
    tracker.current.start();
  };

  return (
    <TrackerContext.Provider value={{ initTracker, startTracking }}>
      {children}
    </TrackerContext.Provider>
  );
}
