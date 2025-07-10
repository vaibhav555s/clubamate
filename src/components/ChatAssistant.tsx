
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your campus event assistant. I can help you find events, clubs, or answer questions about campus activities!",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(message),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setMessage('');
  };

  const getBotResponse = (userMessage: string) => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('event') || lowercaseMessage.includes('workshop')) {
      return "I found several upcoming events! The React Workshop by GDSC is happening on Dec 15th, and there's an AI/ML Hackathon on Dec 20th. Would you like more details about any of these?";
    } else if (lowercaseMessage.includes('club') || lowercaseMessage.includes('join')) {
      return "Great! We have many active clubs like Google DSC, CSI Chapter, AWS Cloud Club, and CyberSec Society. What are your interests? I can suggest clubs that match your passions!";
    } else if (lowercaseMessage.includes('register') || lowercaseMessage.includes('signup')) {
      return "To register for events, simply click the 'Register Now' button on any event card. You'll need to sign in with your student account first.";
    } else {
      return "I'm here to help with campus events and clubs! Try asking me about upcoming events, how to join clubs, or registration information.";
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with AI Assistant
          </div>
        </button>
      </div>

      {/* Chat Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Chat Panel */}
          <div className="relative w-80 bg-white shadow-2xl flex flex-col max-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">AI Assistant</h3>
                <p className="text-blue-100 text-sm">Always here to help</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Welcome Message */}
            <div className="p-4 bg-blue-50 text-blue-800 text-sm border-b">
              💡 Ask me about events, clubs, or campus activities!
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
