import { describe, it, expect } from 'vitest';
import { calculateQuizScore, isQuizPassed, canRetake } from '../quizzes';

describe('Quiz Scoring', () => {
  describe('calculateQuizScore', () => {
    it('should calculate score correctly', () => {
      // 2 out of 3 correct = 67%
      const answers = [true, true, false];
      const score = calculateQuizScore(answers);
      expect(score).toBe(67);
    });

    it('should handle all correct answers', () => {
      const answers = [true, true, true];
      const score = calculateQuizScore(answers);
      expect(score).toBe(100);
    });

    it('should handle all wrong answers', () => {
      const answers = [false, false, false];
      const score = calculateQuizScore(answers);
      expect(score).toBe(0);
    });
  });

  describe('isQuizPassed', () => {
    it('should mark quiz as passed if score >=80%', () => {
      expect(isQuizPassed(100)).toBe(true);
      expect(isQuizPassed(80)).toBe(true);
    });

    it('should mark quiz as failed if score <80%', () => {
      expect(isQuizPassed(79)).toBe(false);
      expect(isQuizPassed(0)).toBe(false);
    });
  });

  describe('canRetake', () => {
    it('should allow retake after 24h', () => {
      // 25 hours ago
      const lastAttempt = new Date(Date.now() - 25 * 60 * 60 * 1000);
      expect(canRetake(lastAttempt)).toBe(true);
    });

    it('should not allow retake before 24h', () => {
      // 1 hour ago
      const lastAttempt = new Date(Date.now() - 1 * 60 * 60 * 1000);
      expect(canRetake(lastAttempt)).toBe(false);

      // 23 hours ago
      const almost24h = new Date(Date.now() - 23 * 60 * 60 * 1000);
      expect(canRetake(almost24h)).toBe(false);
    });
  });
});
