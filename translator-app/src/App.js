import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('hi');
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!text.trim()) {
      alert("Please enter text to translate.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: targetLang,
          format: "text"
        })
      });

      const result = await response.json();
      console.log("Translation result:", result);

      if (result && result.translatedText) {
        setTranslatedText(result.translatedText);
      } else {
        alert("Translation failed.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Translation failed. Please make sure the proxy server is running.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Text Translator</h1>

      <textarea
        className="w-full max-w-lg p-4 border border-gray-300 rounded-md focus:outline-none mb-4"
        rows="5"
        placeholder="Enter English text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <select
        className="w-full max-w-lg p-2 border border-gray-300 rounded-md mb-4"
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
      >
        <option value="hi">Hindi</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
        <option value="zh">Chinese</option>
        <option value="ar">Arabic</option>
      </select>

      <button
        onClick={translateText}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={!text || loading}
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {translatedText && (
        <div className="w-full max-w-lg mt-6 bg-white p-4 border border-gray-300 rounded shadow">
          <h2 className="font-semibold mb-2 text-gray-700">Translated Text:</h2>
          <p className="text-gray-800">{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
