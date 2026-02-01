"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Step = 1 | 2 | 3 | "success";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  hasProject: "yes" | "no" | "";
  projectDescription: string;
}

const stepTitles: Record<1 | 2 | 3, string> = {
  1: "Email et mot de passe",
  2: "Profil basique",
  3: "Mon projet",
};

function ProgressIndicator({ currentStep }: { currentStep: Step }) {
  if (currentStep === "success") return null;
  const step = currentStep as number;
  return (
    <div
      className="mb-10 flex items-center justify-center gap-2 sm:gap-4"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={3}
      aria-label={`Étape ${step} sur 3`}
    >
      {([1, 2, 3] as const).map((s) => (
        <div key={s} className="flex items-center gap-2 sm:gap-4">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold transition-colors ${
              s < step
                ? "bg-[#10B981] text-white"
                : s === step
                  ? "bg-[#FF6600] text-white"
                  : "bg-gray-200 text-gray-500"
            }`}
          >
            {s}
          </div>
          {s < 3 && (
            <div
              className={`hidden h-0.5 w-8 sm:block ${
                s < step ? "bg-[#10B981]" : "bg-gray-200"
              }`}
              aria-hidden
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function InscriptionPage() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    hasProject: "",
    projectDescription: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 caractères";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    } else if (!/^[0-9\s+.-]{8,}$/.test(formData.phone)) {
      newErrors.phone = "Numéro invalide (min. 8 chiffres)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.hasProject) {
      newErrors.hasProject = "Veuillez répondre à cette question";
    } else if (
      formData.hasProject === "yes" &&
      !formData.projectDescription.trim()
    ) {
      newErrors.projectDescription =
        "Décrivez votre idée en une phrase";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) {
      setApiError(null);
      setIsLoading(true);
      try {
        const res = await fetch("/api/inscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            hasProject: formData.hasProject,
            projectDescription:
              formData.hasProject === "yes"
                ? formData.projectDescription
                : undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setApiError(data.error || "Une erreur est survenue");
          return;
        }
        setStep("success");
      } catch {
        setApiError("Impossible de contacter le serveur. Réessayez.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  return (
    <main className="section bg-[#F5EBE0]">
        <div className="container-custom">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center font-display text-2xl font-bold text-[#704214] sm:text-3xl">
              Créer mon compte
            </h1>

            <ProgressIndicator currentStep={step} />

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="card-baobab p-6 sm:p-8"
                >
                  <h2 className="mb-6 font-display text-lg font-semibold text-[#704214]">
                    Étape 1 sur 3 : {stepTitles[1]}
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="exemple@email.com"
                        className={`input-ism ${errors.email ? "input-error" : ""}`}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-sm text-red-600" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="mb-1.5 block font-medium text-gray-700"
                      >
                        Mot de passe
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => updateField("password", e.target.value)}
                        placeholder="Minimum 6 caractères"
                        className={`input-ism ${errors.password ? "input-error" : ""}`}
                        autoComplete="new-password"
                      />
                      {errors.password && (
                        <p className="mt-1.5 text-sm text-red-600" role="alert">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="mb-1.5 block font-medium text-gray-700"
                      >
                        Confirmer le mot de passe
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          updateField("confirmPassword", e.target.value)
                        }
                        placeholder="Répétez le mot de passe"
                        className={`input-ism ${errors.confirmPassword ? "input-error" : ""}`}
                        autoComplete="new-password"
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1.5 text-sm text-red-600" role="alert">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-primary min-h-[48px] px-8"
                    >
                      Continuer
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="card-baobab p-6 sm:p-8"
                >
                  <h2 className="mb-6 font-display text-lg font-semibold text-[#704214]">
                    Étape 2 sur 3 : {stepTitles[2]}
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-1.5 block font-medium text-gray-700"
                      >
                        Prénom
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          updateField("firstName", e.target.value)
                        }
                        placeholder="Votre prénom"
                        className={`input-ism ${errors.firstName ? "input-error" : ""}`}
                        autoComplete="given-name"
                      />
                      {errors.firstName && (
                        <p className="mt-1.5 text-sm text-red-600" role="alert">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-1.5 block font-medium text-gray-700"
                      >
                        Nom
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          updateField("lastName", e.target.value)
                        }
                        placeholder="Votre nom"
                        className={`input-ism ${errors.lastName ? "input-error" : ""}`}
                        autoComplete="family-name"
                      />
                      {errors.lastName && (
                        <p className="mt-1.5 text-sm text-red-600" role="alert">
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block font-medium text-gray-700"
                      >
                        Téléphone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="Ex : +221 77 123 45 67"
                        className={`input-ism ${errors.phone ? "input-error" : ""}`}
                        autoComplete="tel"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-sm text-red-600" role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="min-h-[48px] rounded-full border-2 border-[#704214] px-6 font-semibold text-[#704214] transition-colors hover:bg-[#704214] hover:text-white"
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-primary min-h-[48px] px-8"
                    >
                      Continuer
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="card-baobab p-6 sm:p-8"
                >
                  <h2 className="mb-6 font-display text-lg font-semibold text-[#704214]">
                    Étape 3 sur 3 : {stepTitles[3]}
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <p className="mb-3 block font-medium text-gray-700">
                        Avez-vous déjà une idée de projet ?
                      </p>
                      <div className="flex gap-4">
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            type="radio"
                            name="hasProject"
                            value="yes"
                            checked={formData.hasProject === "yes"}
                            onChange={(e) =>
                              updateField("hasProject", e.target.value)
                            }
                            className="h-5 w-5 accent-[#FF6600]"
                          />
                          <span>Oui</span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            type="radio"
                            name="hasProject"
                            value="no"
                            checked={formData.hasProject === "no"}
                            onChange={(e) =>
                              updateField("hasProject", e.target.value)
                            }
                            className="h-5 w-5 accent-[#FF6600]"
                          />
                          <span>Non</span>
                        </label>
                      </div>
                      {errors.hasProject && (
                        <p className="mt-1.5 text-sm text-red-600" role="alert">
                          {errors.hasProject}
                        </p>
                      )}
                    </div>

                    {formData.hasProject === "yes" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="overflow-hidden"
                      >
                        <label
                          htmlFor="projectDescription"
                          className="mb-1.5 block font-medium text-gray-700"
                        >
                          Décrivez votre idée en une phrase
                        </label>
                        <input
                          id="projectDescription"
                          type="text"
                          value={formData.projectDescription}
                          onChange={(e) =>
                            updateField("projectDescription", e.target.value)
                          }
                          placeholder="Ex : Une app de livraison de repas locaux"
                          className={`input-ism ${errors.projectDescription ? "input-error" : ""}`}
                        />
                        {errors.projectDescription && (
                          <p
                            className="mt-1.5 text-sm text-red-600"
                            role="alert"
                          >
                            {errors.projectDescription}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {apiError && (
                    <p
                      className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600"
                      role="alert"
                    >
                      {apiError}
                    </p>
                  )}
                  <div className="mt-8 flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isLoading}
                      className="min-h-[48px] rounded-full border-2 border-[#704214] px-6 font-semibold text-[#704214] transition-colors hover:bg-[#704214] hover:text-white disabled:opacity-50"
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isLoading}
                      className="btn-primary min-h-[48px] px-8 disabled:opacity-70"
                    >
                      {isLoading ? "Création en cours…" : "Créer mon compte"}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="card-baobab p-8 text-center"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#10B981]/20 text-5xl">
                    ✓
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[#704214]">
                    Votre compte a été créé !
                  </h2>
                  <p className="mt-4 text-gray-600">
                    Consultez votre email pour confirmer votre inscription.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                      href="/login"
                      className="btn-primary inline-flex min-h-[48px] items-center justify-center"
                    >
                      Aller sur mon espace
                    </Link>
                    <Link
                      href="/"
                      className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-[#704214] px-8 font-semibold text-[#704214] transition-colors hover:bg-[#704214] hover:text-white"
                    >
                      Retour à l&apos;accueil
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
  );
}
