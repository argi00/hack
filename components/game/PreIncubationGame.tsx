"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import { GAME_PHASES, type GamePhase } from "./game-data";
import "./PreIncubationGame.css";

const EMOJIS = ["🎉", "⭐", "✨", "🚀", "💡", "🎯", "🏆", "💪"];

function createConfettiEmojis() {
  return EMOJIS.flatMap((e) => [e, e, e]);
}

export default function PreIncubationGame() {
  const [gameState, setGameState] = useState({
    currentPhase: 1,
    currentQuestion: 0,
    answers: {} as Record<string, string>,
    scores: {} as Record<number, number>,
    projectData: null as ProjectData | null,
    isComplete: false,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [userName, setUserName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [confetti, setConfetti] = useState<string[]>([]);
  const [characterExpression, setCharacterExpression] = useState<
    "neutral" | "happy" | "excited" | "thinking" | "celebrate"
  >("neutral");

  type ProjectData = {
    projectName: string;
    userName: string;
    createdAt: string;
    maturityScore: number;
    phaseScores: Record<number, number>;
    totalScore: number;
    maxScore: number;
    milestones: string[];
    recommendations: string[];
    projectContent: Record<string, string>;
    oneSentence?: string;
  };

  const FICHE_LABELS: Record<string, string> = {
    phase1_problem: "Problème résolu",
    phase1_solution: "Solution proposée",
    phase1_target_desc: "Cible / utilisateur",
    phase2_market_desc: "Marché",
    phase2_differentiation: "Différenciation",
    phase3_revenue: "Modèle de revenus",
    phase4_value: "Proposition de valeur",
    phase5_next_steps: "Prochaines étapes",
    phase6_one_sentence: "Mon projet en une phrase",
  };

  const currentPhase = GAME_PHASES[gameState.currentPhase - 1] as GamePhase;
  const currentQuestion = currentPhase?.questions[gameState.currentQuestion];
  const totalQuestions = GAME_PHASES.reduce(
    (acc, p) => acc + p.questions.length,
    0
  );
  const completedQuestions =
    (gameState.currentPhase - 1) * (currentPhase?.questions.length || 0) +
    gameState.currentQuestion;
  const phaseProgress =
    totalQuestions > 0
      ? Math.round((completedQuestions / totalQuestions) * 100)
      : 0;

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user?.firstName) {
          setUserName(data.user.firstName);
          if (data.user.projectDescription) {
            setProjectName(data.user.projectDescription);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Sauvegarder en base à la fin du jeu (utilisateur connecté)
  useEffect(() => {
    if (
      gameState.isComplete &&
      gameState.projectData &&
      gameState.projectData.projectContent
    ) {
      const d = gameState.projectData;
      fetch("/api/game/save-completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: d.projectName,
          projectContent: d.projectContent,
          oneSentence: d.oneSentence,
          phaseScores: d.phaseScores,
          totalScore: d.totalScore,
          maturityScore: d.maturityScore,
          answers: gameState.answers,
        }),
      }).catch(() => {});
    }
  }, [gameState.isComplete, gameState.projectData, gameState.answers]);

  useEffect(() => {
    if (gameStarted && currentQuestion?.type === "text") {
      const key = `${gameState.currentPhase}_${currentQuestion.id}`;
      setTextAnswer(gameState.answers[key] || "");
    }
  }, [
    gameStarted,
    gameState.currentPhase,
    gameState.currentQuestion,
    currentQuestion?.id,
    currentQuestion?.type,
    gameState.answers,
  ]);

  const getScoreColor = (score: number) => {
    if (score <= 30) return { color: "#dc3545", message: "🔴 À redémarrer" };
    if (score <= 70) return { color: "#f19120", message: "🟠 À améliorer" };
    return { color: "#28a745", message: "🟢 Excellent !" };
  };

  const triggerConfetti = () => {
    setConfetti(createConfettiEmojis());
    setTimeout(() => setConfetti([]), 2500);
  };

  const handleStartGame = () => {
    if (userName.trim() && projectName.trim()) {
      setCharacterExpression("excited");
      setGameStarted(true);
      triggerConfetti();
    }
  };

  const handleSelectAnswer = (optionId: string) => {
    setSelectedAnswer(optionId);
    setCharacterExpression("happy");
    setShowFeedback(true);
    triggerConfetti();
  };

  const generateProjectData = (
    answers: Record<string, string>,
    scores: Record<number, number>
  ): ProjectData => {
    const choiceQuestionsCount = GAME_PHASES.reduce(
      (acc, p) => acc + p.questions.filter((q) => q.type === "choice").length,
      0
    );
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const maxScore = choiceQuestionsCount * 100;
    const maturityScore = Math.round((totalScore / maxScore) * 100);
    const milestones: string[] = [];
    if (maturityScore >= 60) milestones.push("✓ Concept validé");
    if (maturityScore >= 70) milestones.push("✓ Marché identifié");
    if (maturityScore >= 80) milestones.push("✓ Prototype possible");
    if (maturityScore >= 90) milestones.push("✓ Prêt pour financement");
    if (milestones.length === 0) milestones.push("📌 À développer");

    const recommendations: string[] = [];
    if ((scores[1] || 0) < 150)
      recommendations.push("Clarifier davantage votre idée et votre cible");
    if ((scores[2] || 0) < 150)
      recommendations.push("Valider votre marché avec des utilisateurs réels");
    if ((scores[3] || 0) < 150)
      recommendations.push("Affiner votre modèle économique");
    if ((scores[4] || 0) < 150)
      recommendations.push("Développer une proposition de valeur plus forte");
    if ((scores[5] || 0) < 150)
      recommendations.push("Créer et tester un prototype rapidement");
    if ((scores[6] || 0) < 150)
      recommendations.push("Préparer un pitch plus convaincant");
    if (recommendations.length === 0)
      recommendations.push("Bravo ! Continuer sur cette lancée.");

    const projectContent: Record<string, string> = {};
    GAME_PHASES.forEach((phase) => {
      phase.questions.forEach((q) => {
        if (q.type === "text") {
          const key = `${phase.id}_${q.id}`;
          const val = answers[key]?.trim();
          if (val && FICHE_LABELS[q.id]) {
            projectContent[q.id] = val;
          }
        }
      });
    });

    return {
      projectName,
      userName,
      createdAt: new Date().toLocaleDateString("fr-FR"),
      maturityScore,
      phaseScores: scores,
      totalScore,
      maxScore,
      milestones,
      recommendations,
      projectContent,
      oneSentence: projectContent.phase6_one_sentence,
    };
  };

  const handleNextQuestion = () => {
    const answerKey = `${gameState.currentPhase}_${currentQuestion.id}`;

    if (currentQuestion.type === "text") {
      const text = textAnswer.trim();
      if (!text) return;
      const newAnswers = { ...gameState.answers, [answerKey]: text };
      setShowFeedback(true);
      setSelectedAnswer("text-done");
      setTimeout(() => {
        goToNext(newAnswers, gameState.scores);
        setTextAnswer("");
        setShowFeedback(false);
        setSelectedAnswer(null);
      }, 600);
      return;
    }

    if (!selectedAnswer) return;
    const option = currentQuestion.options?.find((o) => o.id === selectedAnswer);
    if (!option) return;

    const newAnswers = { ...gameState.answers, [answerKey]: selectedAnswer };
    const newScores = {
      ...gameState.scores,
      [gameState.currentPhase]:
        (gameState.scores[gameState.currentPhase] || 0) + option.value,
    };
    goToNext(newAnswers, newScores);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const goToNext = (
    newAnswers: Record<string, string>,
    newScores: Record<number, number>
  ) => {

    setTextAnswer("");
    if (gameState.currentQuestion < currentPhase.questions.length - 1) {
      setGameState({
        ...gameState,
        currentQuestion: gameState.currentQuestion + 1,
        answers: newAnswers,
        scores: newScores,
      });
      setCharacterExpression("thinking");
    } else if (gameState.currentPhase < GAME_PHASES.length) {
      setGameState({
        ...gameState,
        currentPhase: gameState.currentPhase + 1,
        currentQuestion: 0,
        answers: newAnswers,
        scores: newScores,
      });
      setCharacterExpression("excited");
      triggerConfetti();
    } else {
      setGameState({
        ...gameState,
        answers: newAnswers,
        scores: newScores,
        isComplete: true,
        projectData: generateProjectData(newAnswers, newScores),
      });
      setCharacterExpression("celebrate");
      triggerConfetti();
      triggerConfetti();
    }
  };

  const handleBack = () => {
    setCharacterExpression("thinking");
    const prevQ =
      gameState.currentQuestion > 0 ? gameState.currentQuestion - 1 : null;
    const prevPhase =
      prevQ === null ? GAME_PHASES[gameState.currentPhase - 2] : null;
    const prevQuestion =
      prevQ !== null
        ? currentPhase.questions[prevQ]
        : prevPhase?.questions[prevPhase.questions.length - 1];
    const answerKey =
      prevQ !== null
        ? `${gameState.currentPhase}_${prevQuestion?.id}`
        : `${gameState.currentPhase - 1}_${prevQuestion?.id}`;
    const savedText = gameState.answers[answerKey] || "";
    setTextAnswer(savedText);
    if (gameState.currentQuestion > 0) {
      setGameState({
        ...gameState,
        currentQuestion: gameState.currentQuestion - 1,
      });
    } else {
      const p = GAME_PHASES[gameState.currentPhase - 2];
      setGameState({
        ...gameState,
        currentPhase: gameState.currentPhase - 1,
        currentQuestion: p.questions.length - 1,
      });
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const downloadPDF = () => {
    if (!gameState.projectData) return;
    const data = gameState.projectData;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const margin = 20;
    let y = 25;
    const pageWidth = 210;
    const maxWidth = pageWidth - 2 * margin;

    // En-tête
    doc.setFillColor(139, 69, 19); // Marron ISM
    doc.rect(0, 0, pageWidth, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("ISM Incubateur — Résumé de projet", margin, 18);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Jeu de préincubation — Fiche projet clarifiée", margin, 25);
    doc.setTextColor(0, 0, 0);
    y = 40;

    // Informations projet
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Informations", margin, y);
    y += 8;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Projet : ${data.projectName}`, margin, y);
    y += 6;
    doc.text(`Auteur : ${data.userName}`, margin, y);
    y += 6;
    doc.text(`Date : ${data.createdAt}`, margin, y);
    y += 12;

    // Projet en une phrase
    if (data.oneSentence) {
      doc.setFillColor(255, 240, 230); // Beige clair
      doc.roundedRect(margin, y - 3, maxWidth, 28, 2, 2, "F");
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Mon projet en une phrase", margin + 3, y + 5);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      let lineY = y + 12;
      const oneLines = doc.splitTextToSize(`« ${data.oneSentence} »`, maxWidth - 6);
      oneLines.forEach((line: string) => {
        doc.text(line, margin + 3, lineY);
        lineY += 5;
      });
      y = lineY + 10;
    }

    // Fiche projet
    if (data.projectContent && Object.keys(data.projectContent).length > 0) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Fiche projet — Votre idée clarifiée", margin, y);
      y += 8;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      Object.entries(data.projectContent).forEach(([key, value]) => {
        if (!FICHE_LABELS[key]) return;
        if (y > 265) {
          doc.addPage();
          y = 20;
        }
        doc.setFont("helvetica", "bold");
        doc.text(`${FICHE_LABELS[key]} :`, margin, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        const valLines = doc.splitTextToSize(value, maxWidth - 5);
        valLines.forEach((line: string) => {
          if (y > 275) {
            doc.addPage();
            y = 20;
          }
          doc.text(line, margin + 5, y);
          y += 5;
        });
        y += 5;
      });
      y += 5;
    }

    // Score de maturité
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Score de maturité", margin, y);
    y += 8;
    doc.setFontSize(24);
    doc.setTextColor(255, 102, 0); // Orange ISM
    doc.text(`${data.maturityScore} %`, margin, y);
    doc.setTextColor(0, 0, 0);
    y += 10;

    // Scores par phase
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Scores par phase", margin, y);
    y += 7;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    GAME_PHASES.forEach((phase) => {
      const choiceCount = phase.questions.filter((q) => q.type === "choice").length;
      const maxPhase = choiceCount * 100;
      const score = data.phaseScores[phase.id] || 0;
      if (y > 275) {
        doc.addPage();
        y = 20;
      }
      doc.text(
        `${phase.emoji} ${phase.title}: ${score}/${maxPhase}`,
        margin,
        y
      );
      y += 6;
    });

    // Pied de page
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Exporté le ${new Date().toLocaleDateString("fr-FR")} — ISM Incubateur`,
      margin,
      290
    );

    doc.save(`resume-projet-${projectName.replace(/\s+/g, "-")}.pdf`);
    triggerConfetti();
  };

  const resetGame = () => {
    setGameState({
      currentPhase: 1,
      currentQuestion: 0,
      answers: {},
      scores: {},
      projectData: null,
      isComplete: false,
    });
    setGameStarted(false);
    setSelectedAnswer(null);
    setTextAnswer("");
    setShowFeedback(false);
    setCharacterExpression("neutral");
  };

  const characterEmoji = {
    neutral: "😊",
    happy: "😄",
    excited: "🤩",
    thinking: "🤔",
    celebrate: "🎉",
  }[characterExpression];

  // Écran de démarrage
  if (!gameStarted) {
    return (
      <div className="game-wrapper">
        <div className="game-container game-start">
          {confetti.map((emoji, i) => (
            <div
              key={i}
              className="confetti-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              {emoji}
            </div>
          ))}
          <div className="game-start-content">
            <motion.div
              className="character-display"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 12 }}
            >
              <span className="character-emoji">{characterEmoji}</span>
              <p className="character-message">Prêt à lancer ton projet ?</p>
            </motion.div>
            <motion.div
              className="start-form-card"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="game-main-title">🎮 Jeu de Préincubation</h1>
              <p className="game-main-subtitle">
                Validez la maturité de votre projet entrepreneurial
              </p>
              <div className="form-group">
                <label htmlFor="userName">Votre prénom</label>
                <input
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Ex : Marie"
                  className="game-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="projectName">Nom du projet</label>
                <input
                  id="projectName"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Ex : Mon app de livraison"
                  className="game-input"
                />
              </div>
              <button
                type="button"
                onClick={handleStartGame}
                disabled={!userName.trim() || !projectName.trim()}
                className="game-btn game-btn-primary"
              >
                🎮 Commencer l&apos;aventure
              </button>
              <div className="game-features">
                <h3>📋 Objectif : une idée claire de votre projet</h3>
                <ul>
                  <li>✓ Décrire votre problème, solution, cible</li>
                  <li>✓ Définir votre marché et différenciation</li>
                  <li>✓ Clarifier votre modèle de revenus</li>
                  <li>✓ Résumer votre projet en une phrase</li>
                  <li>✓ Télécharger votre fiche projet complète</li>
                </ul>
              </div>
            </motion.div>
          </div>
          <Link href="/" className="game-back-link">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  // Écran de fin
  if (gameState.isComplete && gameState.projectData) {
    const { maturityScore, phaseScores } = gameState.projectData;
    const scoreInfo = getScoreColor(maturityScore);

    return (
      <div className="game-wrapper">
        <div className="game-container game-complete">
          {confetti.length > 0 &&
            confetti.map((e, i) => (
              <div
                key={i}
                className="confetti-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                {e}
              </div>
            ))}
          <motion.div
            className="completion-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="character-display">
              <span className="character-emoji character-large">{characterEmoji}</span>
            </div>
            <h1 className="completion-title">🎉 Félicitations !</h1>
            <p className="completion-subtitle">
              Vous avez complété le jeu de préincubation
            </p>
            {gameState.projectData.oneSentence && (
              <div className="one-sentence-highlight">
                <h3>🎯 Votre projet en une phrase</h3>
                <p className="one-sentence-text">
                  &ldquo;{gameState.projectData.oneSentence}&rdquo;
                </p>
              </div>
            )}
            <div className="fiche-projet">
              <h3>📋 Fiche projet — Votre idée clarifiée</h3>
              {Object.entries(gameState.projectData.projectContent || {}).map(
                ([key, value]) =>
                  FICHE_LABELS[key] && (
                    <div key={key} className="fiche-item">
                      <strong>{FICHE_LABELS[key]}</strong>
                      <p>{value}</p>
                    </div>
                  )
              )}
            </div>
            <div className="score-display">
              <div className="score-circle">
                <span className="score-value">{maturityScore}</span>
                <span className="score-unit">%</span>
              </div>
              <p className="score-message" style={{ color: scoreInfo.color }}>
                {scoreInfo.message}
              </p>
            </div>
            <div className="phase-scores-list">
              <h3>Scores par phase :</h3>
              {GAME_PHASES.map((phase) => {
                const choiceCount = phase.questions.filter(
                  (q) => q.type === "choice"
                ).length;
                const maxPhase = choiceCount * 100;
                const score = phaseScores[phase.id] || 0;
                return (
                  <div key={phase.id} className="phase-score-row">
                    <span className="phase-emoji">{phase.emoji}</span>
                    <span className="phase-name">{phase.title}</span>
                    <div className="phase-score-bar">
                      <div
                        className="phase-score-fill"
                        style={{
                          width: `${maxPhase > 0 ? (score / maxPhase) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="phase-score-num">
                      {score}/{maxPhase}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="project-summary">
              <h3>📄 Informations</h3>
              <p>
                <strong>Nom :</strong> {gameState.projectData.projectName}
              </p>
              <p>
                <strong>Auteur :</strong> {gameState.projectData.userName}
              </p>
              <p>
                <strong>Date :</strong> {gameState.projectData.createdAt}
              </p>
            </div>
            <div className="completion-actions">
              <button
                type="button"
                onClick={downloadPDF}
                className="game-btn game-btn-primary"
              >
                📥 Télécharger le résumé (PDF)
              </button>
              <button
                type="button"
                onClick={resetGame}
                className="game-btn game-btn-secondary"
              >
                🔄 Rejouer
              </button>
              <Link href="/" className="game-btn game-btn-outline">
                ← Retour à l&apos;accueil
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Jeu en cours
  return (
    <div className="game-wrapper">
      <div className="game-container game-playing">
        {confetti.length > 0 &&
          confetti.slice(0, 15).map((e, i) => (
            <div
              key={i}
              className="confetti-particle confetti-small"
              style={{ left: `${Math.random() * 100}%` }}
            >
              {e}
            </div>
          ))}
        <header className="game-header">
          <div className="game-header-left">
            <span className="game-logo">🎮 Jeu de Préincubation</span>
            <span className="game-user">Bonjour, {userName}</span>
          </div>
          <div className="game-header-right">
            <span className="phase-badge">
              Phase {gameState.currentPhase} / 6
            </span>
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${phaseProgress}%` }}
                />
              </div>
              <span className="progress-text">{phaseProgress}%</span>
            </div>
          </div>
        </header>
        <main className="game-main">
          <motion.div
            key={`${gameState.currentPhase}-${gameState.currentQuestion}`}
            className="phase-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="phase-header">
              <span className="phase-badge-inline">
                Phase {gameState.currentPhase} / 6
              </span>
              <h2 className="phase-title">
                {currentPhase.emoji} {currentPhase.title}
              </h2>
              <p className="phase-subtitle">{currentPhase.subtitle}</p>
            </div>
            <p className="phase-description">{currentPhase.description}</p>
            <div className="question-block">
              <div className="question-label">
                Question {gameState.currentQuestion + 1}/
                {currentPhase.questions.length}
              </div>
              <h3 className="question-text">{currentQuestion.text}</h3>

              {currentQuestion.type === "text" ? (
                <>
                  {currentQuestion.hint && (
                    <p className="question-hint">💡 {currentQuestion.hint}</p>
                  )}
                  <textarea
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="game-textarea"
                    rows={4}
                    disabled={showFeedback}
                  />
                  {!showFeedback ? (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      disabled={!textAnswer.trim()}
                      className="game-btn game-btn-primary"
                    >
                      ✓ Valider et continuer
                    </button>
                  ) : (
                    <div className="feedback-box">
                      <p>✓ {currentQuestion.feedback}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="options-list">
                    {(currentQuestion.options || []).map((option, idx) => (
                      <motion.button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelectAnswer(option.id)}
                        className={`option-btn ${selectedAnswer === option.id ? "selected" : ""}`}
                        disabled={showFeedback}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <span className="option-radio">
                          {selectedAnswer === option.id && "✓"}
                        </span>
                        <span className="option-text">{option.text}</span>
                      </motion.button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {showFeedback && selectedAnswer && selectedAnswer !== "text-done" && (
                      <motion.div
                        className="feedback-box"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0 }}
                      >
                        <h4>💡 Feedback</h4>
                        <p>{currentQuestion.feedback}</p>
                        <p className="consequence">
                          <strong>Conséquence :</strong>{" "}
                          {
                            currentQuestion.options?.find(
                              (o) => o.id === selectedAnswer
                            )?.consequences
                          }
                        </p>
                        <button
                          type="button"
                          onClick={handleNextQuestion}
                          className="game-btn game-btn-primary"
                        >
                          {gameState.currentPhase === GAME_PHASES.length &&
                          gameState.currentQuestion ===
                            currentPhase.questions.length - 1
                            ? "✨ Terminer le jeu"
                            : "⏭️ Question suivante"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
            <div className="phase-nav">
              {gameState.currentPhase > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="game-btn game-btn-ghost"
                >
                  ← Précédent
                </button>
              )}
              <span className="phase-counter">
                {gameState.currentPhase} / {GAME_PHASES.length}
              </span>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
