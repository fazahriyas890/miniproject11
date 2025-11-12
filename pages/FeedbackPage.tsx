import React, { useState } from 'react';

type FeedbackType = 'Bug' | 'Feature Suggestion' | 'General';

const FeedbackPage: React.FC = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('Bug');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ feedbackType, comment }); // Mock submission
    setSubmitted(true);
    setComment('');
    setFeedbackType('Bug');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-8 bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700">
        <h1 className="text-3xl font-bold text-neutral-100 mb-2">Submit Feedback</h1>
        <p className="text-neutral-400 mb-6">We'd love to hear from you. Let us know how we can improve.</p>

        {submitted ? (
          <div className="p-4 bg-system-success/20 border border-system-success/50 text-green-300 rounded-lg text-center">
            <h3 className="font-semibold">Thank you!</h3>
            <p>Your feedback has been received.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Feedback Type</label>
              <div className="flex bg-neutral-700 p-1 rounded-lg">
                {(['Bug', 'Feature Suggestion', 'General'] as FeedbackType[]).map((type) => (
                   <button
                    key={type}
                    type="button"
                    onClick={() => setFeedbackType(type)}
                    className={`w-full px-4 py-2 text-sm font-medium rounded-md transition ${
                      feedbackType === type
                        ? 'bg-brand-primary text-white'
                        : 'text-neutral-300 hover:bg-neutral-600/50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-neutral-300 mb-2">
                Comments
              </label>
              <textarea
                id="comment"
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Please provide as much detail as possible..."
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-brand-primary hover:bg-brand-primary_hover text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-accent transition-transform transform hover:scale-105"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;