import React, { useState, useEffect } from 'react';

function VoiceAssistant({ user, onClose }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [language, setLanguage] = useState('en-IN');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language;

      recognitionInstance.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        processCommand(speechResult);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setResponse('Sorry, I couldn\'t understand that. Please try again.');
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [language]);

  const processCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('coverage') || lowerCommand.includes('कवरेज')) {
      setResponse(`Your current coverage is ₹2,000 for this week. You have ₹1,400 remaining.`);
    } else if (lowerCommand.includes('premium') || lowerCommand.includes('प्रीमियम')) {
      setResponse(`Your weekly premium is ₹100. This includes location risk and hours bonus.`);
    } else if (lowerCommand.includes('balance') || lowerCommand.includes('बैलेंस')) {
      setResponse(`Your wallet balance is ₹1,800. You can withdraw anytime.`);
    } else if (lowerCommand.includes('claim') || lowerCommand.includes('क्लेम')) {
      setResponse(`You have 1 approved claim of ₹600 paid on March 19th.`);
    } else if (lowerCommand.includes('renew') || lowerCommand.includes('रिन्यू')) {
      setResponse(`To renew your policy, say "confirm renewal" or click the renew button on your dashboard.`);
    } else if (lowerCommand.includes('weather') || lowerCommand.includes('मौसम')) {
      setResponse(`Current temperature is 32°C with partly cloudy skies. No disruptions expected today.`);
    } else {
      setResponse(`I heard: "${command}". Try asking about coverage, premium, balance, claims, or weather.`);
    }
  };

  const handleVoiceCommand = () => {
    if (!recognition) {
      setResponse('Voice recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    setTranscript('');
    setResponse('');
    setIsListening(true);
    
    try {
      recognition.lang = language;
      recognition.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      setIsListening(false);
    }
  };

  const languages = {
    'en-IN': { name: 'English (India)', greeting: 'How can I help you today?' },
    'hi-IN': { name: 'हिंदी', greeting: 'मैं आपकी कैसे मदद कर सकता हूं?' },
    'ta-IN': { name: 'தமிழ்', greeting: 'நான் உங்களுக்கு எப்படி உதவ முடியும்?' },
    'te-IN': { name: 'తెలుగు', greeting: 'నేను మీకు ఎలా సహాయం చేయగలను?' },
    'bn-IN': { name: 'বাংলা', greeting: 'আমি আপনাকে কিভাবে সাহায্য করতে পারি?' }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ margin: 0 }}>🎙️ Voice Assistant</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 500, fontSize: '14px' }}>
            Select Language
          </label>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ 
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '15px'
            }}
          >
            {Object.entries(languages).map(([code, lang]) => (
              <option key={code} value={code}>{lang.name}</option>
            ))}
          </select>
        </div>

        <div style={{ 
          background: '#f8fafc',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '20px',
          minHeight: '180px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #e2e8f0'
        }}>
          {!isListening && !transcript && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎤</div>
              <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
                {languages[language].greeting}
              </p>
            </div>
          )}
          
          {isListening && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '48px',
                marginBottom: '12px',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}>
                🎤
              </div>
              <p style={{ color: '#2563eb', fontWeight: 600, fontSize: '16px', margin: 0 }}>
                Listening...
              </p>
              <p style={{ color: '#64748b', fontSize: '13px', marginTop: '8px' }}>
                Speak now
              </p>
            </div>
          )}

          {transcript && (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <div style={{ 
                background: '#dbeafe',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <p style={{ fontWeight: 600, marginBottom: '4px', color: '#1e40af', fontSize: '14px' }}>
                  You said:
                </p>
                <p style={{ color: '#1e40af', fontSize: '15px', margin: 0 }}>
                  "{transcript}"
                </p>
              </div>
              {response && (
                <div style={{ 
                  background: '#dcfce7',
                  padding: '12px',
                  borderRadius: '8px'
                }}>
                  <p style={{ fontWeight: 600, marginBottom: '4px', color: '#166534', fontSize: '14px' }}>
                    Response:
                  </p>
                  <p style={{ color: '#166534', fontSize: '15px', margin: 0 }}>
                    {response}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="btn btn-primary"
          onClick={handleVoiceCommand}
          disabled={isListening}
          style={{ width: '100%', marginBottom: '16px' }}
        >
          {isListening ? '🎤 Listening...' : '🎙️ Start Voice Command'}
        </button>

        <div style={{ 
          background: '#f8fafc',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            Try saying:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#64748b', lineHeight: '1.8' }}>
            <li>"Show my coverage"</li>
            <li>"What's my premium?"</li>
            <li>"Check my balance"</li>
            <li>"Show my claims"</li>
            <li>"What's the weather?"</li>
          </ul>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default VoiceAssistant;
