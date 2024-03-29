import * as React from "react";
import * as Util from "./util";

// Imports
// ----------------------
// Context

const RenderQueryContext = React.createContext<RenderQueryState | undefined>(
  undefined
);

export const RenderQueryProvider: React.FC<RenderQueryProviderProps> = ({
  children,
  queries,
}) => {
  const loading = Util.computeLoading(queries);
  const error = Util.computeError(queries);
  const success = !loading.is && !error.is;

  const state = {
    loading,
    error,
    success,
  };

  return (
    <RenderQueryContext.Provider value={state}>
      {children}
    </RenderQueryContext.Provider>
  );
};

export const useRenderQuery = () => {
  const ctx = React.useContext(RenderQueryContext);

  if (ctx === undefined) {
    throw new Error("useRenderQuery must be used within a RenderQueryProvider");
  }

  return ctx;
};

// Context
// ----------------------
// Types

interface RenderQueryProviderProps {
  queries: RenderQueryQueries;
}
