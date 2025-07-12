
import React, { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

const AIAdvisorSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp: Date }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    "What events match my interests?",
    "Which clubs should I join?",
    "Show me this week's events"
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
      <section className="bg-primary py-[120px]">
        <div className="max-w-4xl mx-auto px-8 text-center">
          {/* Icon */}
          <div className="mb-8">
            <Sparkles className="w-8 h-8 mx-auto text-primary-foreground" strokeWidth={1.5} />
          </div>

          {/* Headline */}
          <h2 className="text-5xl font-semibold text-primary-foreground mb-4">
            Ask AI anything about events
          </h2>

          {/* Subtext */}
          <p className="text-lg font-normal text-gray-400 mb-12">
            Powered by Gemini AI
          </p>

          {/* Suggestion Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-transparent border border-gray-600 text-primary-foreground p-5 rounded-lg hover:border-primary-foreground transition-colors duration-200 font-medium"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-foreground text-primary px-8 py-3 rounded-lg font-medium text-base hover:opacity-95 transition-opacity hover-lift"
          >
            Ask Gemini
          </button>
        </div>
      </section>

      {/* Full-screen Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-none w-full h-full p-0 bg-card border-none rounded-none">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-border">
              <div className="flex items-center gap-4">
                <Sparkles className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                <h1 className="text-xl font-semibold text-foreground">Ask anything</h1>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" strokeWidth={1.5} />
                    <p className="text-muted-foreground text-lg">How can I help you today?</p>
                  </div>
                )}
                
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground border border-border'
                      }`}
                    >
                      <p className="text-[15px] leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted border border-border px-4 py-3 rounded-2xl">
                      <p className="text-[15px] text-muted-foreground">Thinking...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-8">
              <div className="max-w-3xl mx-auto flex space-x-4">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 border-border focus:border-primary rounded-lg px-4 py-3 text-[15px] placeholder:text-muted-foreground"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
