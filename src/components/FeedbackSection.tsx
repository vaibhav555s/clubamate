
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useToast } from './ToastContainer';

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && feedback.trim()) {
      try {
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Feedback submitted:', { rating, feedback });
        
        showToast('Thank you for your feedback! 💝', 'success');
        setSubmitted(true);
        
        setTimeout(() => {
          setSubmitted(false);
          setRating(0);
          setFeedback('');
        }, 3000);
        
      } catch (error) {
        showToast('Failed to submit feedback. Please try again.', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const StarRating = () => (
    <div className="flex justify-center gap-1 mb-6">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
          className="transition-colors duration-200"
        >
          <Star
            className={`w-8 h-8 ${
              star <= (hoveredStar || rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } hover:text-yellow-400 cursor-pointer transition-colors`}
          />
        </button>
      ))}
    </div>
  );

  if (submitted) {
    return (
      <section className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-2">Thank You!</h3>
            <p className="text-emerald-600">Your feedback helps us improve ClubMate for everyone.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How was your experience?
        </h2>
        <p className="text-gray-600 mb-8">
          Your feedback helps us make ClubMate better for everyone
        </p>

        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8">
          <StarRating />
          
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what you think about ClubMate..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            required
          />
          
          <button
            type="submit"
            disabled={rating === 0 || !feedback.trim() || isSubmitting}
            className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FeedbackSection;
