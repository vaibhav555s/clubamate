
import React, { useState, useEffect } from 'react';
import { MessageSquare, X, ArrowRight, Sparkles } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

const AIAdvisorSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp: Date }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestionCards = [
    "What events match my interests?",
    "Which clubs should I join?",
    "Show me this week's highlights"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setIsModalOpen(true);
    setInputValue(suggestion);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        text: "I'd be happy to help you find the perfect events and clubs! Based on your interests, I can recommend several options that match your preferences. Let me analyze our current offerings...",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-32">
          {/* Minimal Icon */}
          <div className="text-center mb-8">
            <Sparkles className="w-6 h-6 mx-auto text-gray-900 mb-12" strokeWidth={1.5} />
          </div>

          {/* Ultra-clean Headline */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-4">
              Ask AI anything about events
            </h2>
            <p className="text-base text-gray-600 font-medium">
              Powered by Gemini AI
            </p>
          </div>

          {/* Minimal Suggestion Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            {suggestionCards.map((card, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(card)}
                className="group border border-gray-200 rounded-lg p-6 hover:border-gray-900 transition-colors duration-150 text-left"
              >
                <p className="text-sm font-medium text-gray-900 leading-relaxed">
                  {card}
                </p>
              </button>
            ))}
          </div>

          {/* Clean CTA Button */}
          <div className="text-center">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium text-base transition-colors duration-150"
            >
              Start conversation
            </Button>
          </div>
        </div>
      </section>

      {/* Full-screen Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-none w-full h-full p-0 bg-white border-none rounded-none">
          {/* Modal Header */}
          <div className="absolute top-0 right-0 p-6 z-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors duration-150"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex flex-col h-full">
            {/* Header Area */}
            <div className="flex-shrink-0 pt-16 pb-8 px-6 text-center">
              <Sparkles className="w-8 h-8 mx-auto text-gray-900 mb-6" strokeWidth={1.5} />
              <h1 className="text-2xl font-semibold text-gray-900 mb-8">
                Ask anything
              </h1>
            </div>

            {/* Quick Suggestions (show only if no messages) */}
            {messages.length === 0 && (
              <div className="flex-shrink-0 px-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {suggestionCards.slice(0, 4).map((card, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(card)}
                      className="text-left p-4 border border-gray-200 hover:border-gray-900 rounded-lg transition-colors duration-150"
                    >
                      <p className="text-sm font-medium text-gray-900">{card}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 pb-8">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        message.isUser
                          ? 'bg-gray-100 text-gray-900 ml-8'
                          : 'border border-gray-200 text-gray-900 mr-8'
                      } px-4 py-3 rounded-2xl`}
                    >
                      <p className="text-[15px] leading-relaxed">{message.text}</p>
                      <span className="text-xs text-gray-500 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="border border-gray-200 px-4 py-3 rounded-2xl mr-8">
                      <p className="text-[15px] text-gray-600">Thinking...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 border-t border-gray-200 p-6">
              <div className="max-w-3xl mx-auto flex space-x-4">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 border-gray-200 focus:border-gray-900 focus:ring-0 rounded-lg px-4 py-4 text-[15px] placeholder-gray-400"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIAdvisorSection;
