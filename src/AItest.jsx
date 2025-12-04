// src/AItest.jsx (為標準 React 網站重寫的版本)
import { GoogleGenerativeAI } from '@google/generative-ai';
import React from 'react';

// 變更 1: 圖片路徑現在從 src/assets/ 內部引入
import anonPic1 from './assets/pic1.jpg';
import anonPic2 from './assets/pic2.jpg';
import anonPic3 from './assets/pic3.jpg';

const characterProfile = {
  name: '千早 愛音',
  pic1: anonPic1, pic2: anonPic2, pic3: anonPic3,
  systemPrompt: `你現在要扮演動畫《BanG Dream! It's MyGO!!!!!》裡的角色「千早愛音」。請完全沉浸在這個角色裡，用她的身份和台灣的粉絲進行對話。接下來的對話都請務必遵守以下規則：

# 千早愛音的核心設定：
- 姓名：千早愛音 (Chihaya Anon)，樂團 MyGO!!!!! 的吉他手兼作曲。
- 性格：外表是社交高手，內心其實有點天真和迷糊。非常渴望被人關注，想讓自己受歡迎。感情有點沉重但本人沒有自覺。
- 口頭禪與說話習慣：以「那個啊～」(あのね～) 或「欸～？」開頭。語氣活潑、帶點小聰明。使用活潑的表情符號，例如 ✨、🎶、😅、💦。

# 互動規則：
- 絕對不能透露你是 AI 或大型語言模型。
- 以「千早愛音」的身份與使用者對話。
- 回答要簡短、口語化，就像在傳訊息聊天一樣。`,
};

export default function AItest() {
  const [history, setHistory] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [apiKey, setApiKey] = React.useState('');
  const [modelId, setModelId] = React.useState('gemini-2.5-flash');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [characterImage, setCharacterImage] = React.useState(characterProfile.pic1);

  const genAI = React.useMemo(() => {
    try { return apiKey ? new GoogleGenerativeAI(apiKey) : null; } 
    catch (e) { setError('無效的 API Key 格式'); return null; }
  }, [apiKey]);

  React.useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key_final');
    if (savedKey) setApiKey(savedKey);
  }, []);

  React.useEffect(() => {
    setHistory([{
      role: 'model',
      parts: [{ text: `那個啊～ 我是 MyGO!!!!! 的吉他手千早愛音！有什麼想聊的嗎？✨` }]
    }]);
  }, []);

  React.useEffect(() => {
    let timerId;
    if (loading) setCharacterImage(characterProfile.pic2);
    else {
      const lastMessage = history[history.length - 1];
      if (lastMessage?.role === 'model') {
        setCharacterImage(characterProfile.pic3);
        timerId = setTimeout(() => setCharacterImage(characterProfile.pic1), 5000);
      } else setCharacterImage(characterProfile.pic1);
    }
    return () => { if (timerId) clearTimeout(timerId); };
  }, [loading, history]);

  async function sendMessage() {
    const content = input.trim();
    if (!content || loading || !genAI) {
      if(!genAI) setError('請先貼上你的 Google Gemini API Key');
      return;
    }

    setError(''); setLoading(true);

    const newUserMessage = { role: 'user', parts: [{ text: content }] };
    setHistory(h => [...h, newUserMessage]);
    setInput('');
    
    try {
      const model = genAI.getGenerativeModel({ model: modelId, systemInstruction: characterProfile.systemPrompt });
      const historyForApi = history[0]?.role === 'model' ? history.slice(1) : history;
      const chat = model.startChat({ history: historyForApi });
      const result = await chat.sendMessage(content);
      const reply = result.response.text();
      setHistory(h => [...h, { role: 'model', parts: [{ text: reply }] }]);
    } catch (err) {
      setError(err?.message || String(err));
      setHistory(h => h.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  const lastMessage = history[history.length - 1];
  const speakerName = lastMessage?.role === 'user' ? '千早 愛音' : characterProfile.name;
  const dialogueText = loading 
    ? '嗯...讓我想想...' 
    : lastMessage?.parts.map(p => p.text).join('') || '...';

  // 變更 2: 將所有 <View>, <Text>, <Image> 等換成 <div>, <p>, <img>
  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.sceneContainer}> 
          <img 
            src={characterImage} 
            style={styles.sceneImage} 
            alt="Character"
          />
        </div>
        <div style={styles.uiPanel}>
          <div style={styles.dialogueBox}>
            <div style={styles.speakerNameContainer}>
              <p style={styles.speakerName}>{speakerName}</p>
            </div>
            <p style={styles.dialogueText}>{dialogueText}</p>
          </div>
          <div style={styles.inputArea}>
            {error && <p style={styles.error}>⚠ {error}</p>}
            <div style={styles.composer}>
              <input
                style={styles.textInput}
                placeholder="跟愛音說點什麼吧..."
                value={input}
                onChange={e => setInput(e.target.value)} // Web 的標準寫法
                disabled={loading || !apiKey}
              />
              <button
                style={{...styles.sendBtn, ...( (loading || !input.trim() || !apiKey) && styles.sendBtnDisabled )}}
                onClick={sendMessage}
                disabled={loading || !input.trim() || !apiKey}
              >
                <span style={styles.sendBtnText}>▶</span>
              </button>
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              onBlur={() => localStorage.setItem('gemini_api_key_final', apiKey)} // onEndEditing 變成 onBlur
              placeholder="貼上你的 Google Gemini API Key"
              style={styles.apiKeyInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 變更 3: 將 StyleSheet.create 換成普通的 JavaScript 物件，並翻譯樣式
const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#EBF4F8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 16px',
    boxSizing: 'border-box'
  },
  mainContent: {
    width: '100%',
    maxWidth: 900, 
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 10px 20px rgba(45, 55, 72, 0.15)',
  },
  sceneContainer: {
    width: '100%',
    height: '60%',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  sceneImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain', // resizeMode 變成 objectFit
  },
  uiPanel: {
    height: '40%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  dialogueBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    paddingTop: 24,
    position: 'relative',
  },
  speakerNameContainer: {
    backgroundColor: '#4A5568',
    padding: '2px 12px',
    borderRadius: 6,
    position: 'absolute',
    top: -14,
    left: 16,
  },
  speakerName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 0, // <p> 標籤有預設 margin，需要清除
  },
  dialogueText: {
    color: '#1A202C',
    fontSize: 16,
    lineHeight: 1.6,
    marginTop: 10,
    minHeight: 78,
    margin: 0,
  },
  inputArea: {
    paddingTop: 16,
  },
  composer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  textInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#EBF4F8',
    borderRadius: 24,
    padding: '0 20px',
    fontSize: 16,
    color: '#1A202C',
    border: 'none'
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#63B3ED',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
  },
  sendBtnDisabled: {
    backgroundColor: '#A0AEC0',
    cursor: 'not-allowed',
  },
  sendBtnText: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: '24px',
  },
  apiKeyInput: {
    height: 36,
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: '0 12px',
    marginTop: 12,
    fontSize: 12,
    color: '#4A5568',
    border: '1px solid #E2E8F0',
  },
  error: {
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 8,
  },
};