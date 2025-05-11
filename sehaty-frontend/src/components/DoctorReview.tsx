import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAuth } from "../lib/AuthContext";

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface DoctorReviewProps {
  doctorId: string;
  reviews: Review[];
  onReviewSubmit: (rating: number, comment: string) => Promise<void>;
}

export const DoctorReview: React.FC<DoctorReviewProps> = ({
  doctorId,
  reviews,
  onReviewSubmit,
}) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      await onReviewSubmit(rating, comment);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = reviews.length
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-[#4caf96]">{averageRating}</div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={star <= Number(averageRating) ? "#4caf96" : "none"}
                    stroke="#4caf96"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Based on {reviews.length} reviews
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      {user && (
        <Card className="bg-white dark:bg-gray-800 border-none shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1f4156] dark:text-white mb-4">
              Write a Review
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={star <= rating ? "#4caf96" : "none"}
                        stroke="#4caf96"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="hover:scale-110 transition-transform"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Comment
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this doctor..."
                  className="min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="w-full bg-[#4caf96] hover:bg-[#4caf96]/90 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-white dark:bg-gray-800 border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-[#1f4156] dark:text-white">
                    {review.userName}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={star <= review.rating ? "#4caf96" : "none"}
                        stroke="#4caf96"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}; 