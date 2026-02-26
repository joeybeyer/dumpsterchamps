"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface QuoteFormState {
  zipCode: string;
  city: string;
  state: string;
  selectedDate: string;
  /** City name from page context (for city landing pages) */
  pageCity: string;
}

interface QuoteFormContextType {
  formState: QuoteFormState;
  updateFormState: (updates: Partial<QuoteFormState>) => void;
  /** Set page-level city (for city landing pages) */
  setPageCity: (city: string) => void;
}

const QuoteFormContext = createContext<QuoteFormContextType | undefined>(undefined);

export function QuoteFormProvider({ children }: { children: ReactNode }) {
  const [formState, setFormState] = useState<QuoteFormState>({
    zipCode: "",
    city: "",
    state: "",
    selectedDate: "",
    pageCity: "",
  });

  const updateFormState = useCallback((updates: Partial<QuoteFormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  }, []);

  const setPageCity = useCallback((city: string) => {
    setFormState((prev) => ({ ...prev, pageCity: city }));
  }, []);

  return (
    <QuoteFormContext.Provider value={{ formState, updateFormState, setPageCity }}>
      {children}
    </QuoteFormContext.Provider>
  );
}

export function useQuoteFormContext() {
  const context = useContext(QuoteFormContext);
  if (context === undefined) {
    // Return a default context for SSR or when used outside provider
    return {
      formState: { zipCode: "", city: "", state: "", selectedDate: "", pageCity: "" },
      updateFormState: () => {},
      setPageCity: () => {},
    };
  }
  return context;
}
