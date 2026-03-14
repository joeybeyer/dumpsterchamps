"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface QuoteFormState {
  zipCode: string;
  city: string;
  state: string;
  selectedDate: string;
  /** City name from page context (for city landing pages) */
  pageCity: string;
  /** Current quote form step (1–3); 0 = no active form on this page */
  formStep: number;
}

interface QuoteFormContextType {
  formState: QuoteFormState;
  updateFormState: (updates: Partial<QuoteFormState>) => void;
  /** Set page-level city (for city landing pages) */
  setPageCity: (city: string) => void;
  /** Clear page-level city (called on unmount of city landing pages) */
  clearPageCity: () => void;
  /** Push the active form step so competing CTAs can conditionally hide */
  setFormStep: (step: number) => void;
}

const QuoteFormContext = createContext<QuoteFormContextType | undefined>(undefined);

export function QuoteFormProvider({ children }: { children: ReactNode }) {
  const [formState, setFormState] = useState<QuoteFormState>({
    zipCode: "",
    city: "",
    state: "",
    selectedDate: "",
    pageCity: "",
    formStep: 0,
  });

  const updateFormState = useCallback((updates: Partial<QuoteFormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  }, []);

  const setPageCity = useCallback((city: string) => {
    setFormState((prev) => ({ ...prev, pageCity: city }));
  }, []);

  const clearPageCity = useCallback(() => {
    setFormState((prev) => ({ ...prev, pageCity: "" }));
  }, []);

  const setFormStep = useCallback((step: number) => {
    setFormState((prev) => ({ ...prev, formStep: step }));
  }, []);

  return (
    <QuoteFormContext.Provider value={{ formState, updateFormState, setPageCity, clearPageCity, setFormStep }}>
      {children}
    </QuoteFormContext.Provider>
  );
}

export function useQuoteFormContext() {
  const context = useContext(QuoteFormContext);
  if (context === undefined) {
    // Return a default context for SSR or when used outside provider
    return {
      formState: { zipCode: "", city: "", state: "", selectedDate: "", pageCity: "", formStep: 0 },
      updateFormState: () => {},
      setPageCity: () => {},
      clearPageCity: () => {},
      setFormStep: () => {},
    };
  }
  return context;
}
