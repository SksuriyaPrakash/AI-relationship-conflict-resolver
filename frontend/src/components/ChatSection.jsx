import React, { useEffect, useRef } from 'react';

function ChatSection({
  user,
  currentSession,
  messages,
  messageInput,
  setMessageInput,
  isAnalyzing,
  partnerTyping,
  socket,
  handleSendMessage,
  handleSubmitPerspective,
  handleCreateNewSession,
}) {
  const messageListRef = useRef(null);
  const hasSentMessage = currentSession?.status === 'collecting' && messages.some(msg => !msg.is_ai && !msg.isSystem);

  // Auto-scroll messages list to the bottom
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isAnalyzing, partnerTyping]);

  const handleTextareaChange = (e) => {
    setMessageInput(e.target.value);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'partner.typing', typing: e.target.value.length > 0 }));
    }
  };

  const handleTextareaBlur = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'partner.typing', typing: false }));
    }
  };

  return (
    <div className="stories_podcast__card border-color3 p-4 p-md-5 rounded-4 bg-white shadow-sm mb-4">
      {/* Chat Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary bg-opacity-10 p-2 rounded-3 text-primary" style={{ backgroundColor: 'rgba(25, 15, 71, 0.1)', color: 'var(--p1-color)' }}>
            <i className="ti ti-brand-messenger fs-three" style={{ color: 'var(--p1-color)' }}></i>
          </div>
          <div>
            <h4 className="mb-0">Chat with Lerio AI</h4>
            <span className="fs-ten text-muted">
              {currentSession ? `Session #${currentSession.id} (${currentSession.status})` : 'No active session'}
            </span>
          </div>
        </div>
        {currentSession && (currentSession.status === 'resolved' || currentSession.status === 'escalated') && (
          <button 
            onClick={handleCreateNewSession}
            className="btn btn-outline-primary btn-sm py-2 px-3 rounded-3"
            style={{ borderColor: 'var(--p1-color)', color: 'var(--p1-color)' }}
          >
            <i className="ti ti-plus"></i> New Conflict Session
          </button>
        )}
      </div>

      {/* Chat Messages Area */}
      <div 
        ref={messageListRef}
        style={{ 
          height: '380px', 
          overflowY: 'auto', 
          paddingRight: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
        className="chat-messages-container mb-4"
      >
        {messages.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center text-muted">
            <i className="ti ti-message-chatbot fs-one mb-2 opacity-50"></i>
            <h5>Start a chat with Lerio</h5>
            <p className="fs-ten mx-auto" style={{ maxWidth: '300px' }}>Explain the relationship situation or conflict you are experiencing to get counsel.</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            if (msg.isSystem) {
              return (
                <div key={msg.id || index} className="text-center my-2">
                  <span className="bg-light text-muted px-3 py-1 rounded-pill fs-nine border border-color3">
                    {msg.message}
                  </span>
                </div>
              );
            }

            // User messages are on the LEFT, AI response on the RIGHT
            const isUser = !msg.is_ai;
            
            return (
              <div 
                key={msg.id || index} 
                className={`d-flex flex-column ${isUser ? 'align-items-start' : 'align-items-end'}`}
                style={{ width: '100%' }}
              >
                {/* Bubble Container */}
                <div className="d-flex align-items-end gap-2" style={{ maxWidth: '75%', alignSelf: isUser ? 'flex-start' : 'flex-end' }}>
                  {isUser && (
                    <img 
                      src={user?.profile_pic || "src/assets/images/avatar2.png"} 
                      className="rounded-circle border border-primary" 
                      style={{ width: '28px', height: '28px', objectFit: 'cover' }} 
                      alt="U"
                    />
                  )}
                  
                  <div 
                    className="p-3"
                    style={{
                      backgroundColor: isUser ? '#f0f2f5' : 'var(--p1-color, #190F47)',
                      color: isUser ? '#190F47' : '#ffffff',
                      borderRadius: isUser ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      wordBreak: 'break-word',
                      textAlign: 'left'
                    }}
                  >
                    {msg.message}
                  </div>

                  {!isUser && (
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: '28px', height: '28px', border: '1px solid var(--p1-color)', backgroundColor: 'rgba(25, 15, 71, 0.1)' }}
                    >
                      <i className="ti ti-robot s2-color" style={{ fontSize: '14px', color: 'var(--p1-color)' }}></i>
                    </div>
                  )}
                </div>
                
                {/* Sender and Time */}
                <span 
                  className="text-muted mt-1 px-2" 
                  style={{ fontSize: '10px' }}
                >
                  {isUser ? (msg.sender_name || 'You') : 'Lerio AI'} • {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                </span>
              </div>
            );
          })
        )}

        {isAnalyzing && (
          <div className="d-flex flex-column align-items-end" style={{ width: '100%' }}>
            <div className="d-flex align-items-end gap-2" style={{ maxWidth: '75%', alignSelf: 'flex-end' }}>
              <div className="p-3 rounded-4 text-muted d-flex align-items-center gap-2" style={{ borderRadius: '16px 16px 4px 16px', backgroundColor: 'rgba(25, 15, 71, 0.05)' }}>
                <span className="spinner-border spinner-border-sm text-primary" role="status" style={{ color: 'var(--p1-color)' }}></span>
                <span className="fs-ten">Lerio is analyzing your conflict...</span>
              </div>
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '28px', height: '28px', border: '1px solid var(--p1-color)', backgroundColor: 'rgba(25, 15, 71, 0.1)' }}
              >
                <i className="ti ti-robot s2-color" style={{ fontSize: '14px', color: 'var(--p1-color)' }}></i>
              </div>
            </div>
          </div>
        )}

        {partnerTyping && (
          <div className="d-flex flex-column align-items-start" style={{ width: '100%' }}>
            <span className="text-muted fs-nine px-2 mb-1">Partner is typing...</span>
          </div>
        )}
      </div>

      {/* Chat Input Area */}
      <form onSubmit={handleSendMessage}>
        <div className="form-group mb-3">
          <textarea 
            rows="2" 
            className="form-control p-3 border rounded-3 fs-nine"
            placeholder={
              isAnalyzing 
                ? "AI is analyzing, inputs are disabled..." 
                : currentSession?.status === 'analyzing'
                ? "AI is analyzing, please wait..."
                : hasSentMessage
                ? "Waiting for partner message..."
                : "Write your message to Lerio..."
            }
            value={messageInput}
            onChange={handleTextareaChange}
            onBlur={handleTextareaBlur}
            disabled={isAnalyzing || currentSession?.status === 'analyzing' || hasSentMessage}
            style={{ resize: 'none', borderColor: '#e2e8f0' }}
          ></textarea>
        </div>

        {hasSentMessage ? (
          <div className="d-flex align-items-center gap-2 p-3 rounded-3 w-100" style={{ backgroundColor: 'rgba(25, 15, 71, 0.05)', color: 'var(--p1-color)' }}>
            <span className="spinner-border spinner-border-sm text-primary" role="status" style={{ color: 'var(--p1-color)' }}></span>
            <span className="fs-nine fw_500">Waiting for partner's message to begin AI analysis...</span>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
            {/* Submit Side Button for collecting phase */}
            {currentSession?.status === 'collecting' ? (
              <button
                type="button"
                onClick={handleSubmitPerspective}
                className="btn btn-outline-danger py-2 px-3 rounded-3 fs-nine d-flex align-items-center gap-2"
              >
                <i className="ti ti-circle-check"></i> Submit My Side to AI
              </button>
            ) : <div />}

            <button 
              type="submit" 
              className="cmn-btn px-4 py-2 rounded-3 d-flex align-items-center gap-2"
              disabled={!messageInput.trim() || isAnalyzing || currentSession?.status === 'analyzing'}
            >
              <i className="ti ti-send"></i> Send
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ChatSection;
