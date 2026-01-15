"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// -----------------------------
// Dummy schema
// -----------------------------
const schema = z.object({
  firstName: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

// -----------------------------
// MinorForm Component
// -----------------------------
function MinorForm({
  form,
  isValid,
  tick,
}: {
  form: ReturnType<typeof useForm<FormValues>>;
  isValid: boolean;
  tick: number;
}) {
  console.log("MinorForm render", tick, "isValid prop:", isValid);

  return (
    <div style={{ border: "1px solid green", padding: 8 }}>
      <h4>MinorForm</h4>
      <input {...form.register("firstName")} placeholder="First Name" />
      <button disabled={!isValid}>Save</button>
    </div>
  );
}

// -----------------------------
// Step2 Parent Component
// -----------------------------
export default function Step2() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { reset } = form;
  const [showForm, setShowForm] = useState(true);
  const [tick, setTick] = useState(0);

  // -----------------------------
  // Dummy formValues
  // -----------------------------
  const [formValues, setFormValues] = useState({
    step1: {
      birthDate: "2005-01-01",
    },
  });

  const applicantBirthDate = formValues.step1?.birthDate;

  // Derived value like canAddMinors
  const canAddMinors = (() => {
    if (!applicantBirthDate) return false;
    const birth = new Date(applicantBirthDate);
    const now = new Date();
    const age = (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return age >= 18;
  })();
  if (!canAddMinors) return <div></div>;

  useEffect(() => {
    console.log("Parent useEffect: isValid changed:", form.formState.isValid);
  }, [form.formState.isValid]);

  console.log("Parent render", form.formState.isValid);

  return (
    <div style={{ padding: 16 }}>
      {showForm && <MinorForm tick={tick} isValid={form.formState.isValid} form={form} />}

      <button onClick={() => setTick((t) => t + 1)}>Force parent re-render ({tick})</button>
    </div>
  );
}
