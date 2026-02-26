"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface QuoteFormState {
  zipCode: string;
  city: string;
  state: string;
  selectedDate: string;
}

interface QuoteFormContextType {
  formState: QuoteFormState;
  updateFormState: (updates: Partial<QuoteFormState>) => void;
}

const QuoteFormContext = createContext<QuoteFormContextType | undefined>(undefined);

export function QuoteFormProvider({ children }: { children: ReactNode }) {
  const [formState, setFormState] = useState<QuoteFormState>({
    zipCode: "",
    city: "",
    state: "",
    selectedDate: "",
  });

  const updateFormState = (updates: Partial<QuoteFormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <QuoteFormContext.Provider value={{ formState, updateFormState }}>
      {children}
    </QuoteFormContext.Provider>
  );
}

export function useQuoteFormContext() {
  const context = useContext(QuoteFormContext);
  if (context === undefined) {
    // Return a default context for SSR or when used outside provider
    return {
      formState: { zipCode: "", city: "", state: "", selectedDate: "" },
      updateFormState: () => {},
    };
  }
  return context;
}
