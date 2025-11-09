import { useState, useEffect } from "react";

const moods = [
  { emoji: "😄", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😴", label: "Tired" },
];

const quotes = [
  "You are stronger than you think.",
  "Small steps every day lead to big changes.",
  "It’s a good day to start fresh.",
  "Breathe. You’re doing great.",
  "Keep going; your future self will thank you.",
];

export default function App() {
  const [mood, setMood] = useState(() => localStorage.getItem("mood") || "");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (!quote) setQuote(randomQuote());
  }, []);

  function randomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  function handleMoodSelect(selected) {
    setMood(selected);
    localStorage.setItem("mood", selected);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">🌤️ Mood Tracker</h1>

      <div className="flex gap-3 mb-6">
        {moods.map((m) => (
          <button
            key={m.label}
            onClick={() => handleMoodSelect(m.label)}
            className={`text-4xl p-3 rounded-xl transition ${
              mood === m.label ? "bg-blue-600 text-white" : "bg-white shadow"
            }`}
          >
            {m.emoji}
          </button>
        ))}
      </div>

      {mood && (
        <p className="text-xl mb-6 text-blue-900">
          Today you're feeling <b>{mood}</b>!
        </p>
      )}

      <div className="bg-white shadow-lg rounded-xl p-5 max-w-md">
        <p className="italic mb-4 text-gray-700">"{quote}"</p>
        <button
          onClick={() => setQuote(randomQuote())}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          New Quote
        </button>
      </div>

      <footer className="mt-10 text-gray-500 text-sm">
        Works offline • Installable as PWA 💫
      </footer>
    </div>
  );
}
