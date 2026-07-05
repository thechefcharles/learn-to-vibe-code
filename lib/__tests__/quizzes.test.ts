import { describe, it, expect } from 'vitest';
import { scoreQuiz, getModuleQuiz } from '../quizzes';

describe('Quiz Scoring Logic', () => {
  describe('scoreQuiz', () => {
    it('should calculate perfect score (100%)', () => {
      const quiz = getModuleQuiz(0);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      // All correct answers
      const responses = {
        '0-1': 2,
        '0-2': 1,
        '0-3': 2,
      };

      const result = scoreQuiz(responses, quiz);
      expect(result.score).toBe(3);
      expect(result.percentage).toBe(100);
      expect(result.passed).toBe(true);
    });

    it('should calculate 66% (2/3 correct)', () => {
      const quiz = getModuleQuiz(0);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      // 2 out of 3 correct
      const responses = {
        '0-1': 2, // correct
        '0-2': 1, // correct
        '0-3': 1, // wrong (should be 2)
      };

      const result = scoreQuiz(responses, quiz);
      expect(result.score).toBe(2);
      expect(result.percentage).toBe(67); // Math.round(2/3 * 100) = 67
      expect(result.passed).toBe(false); // Below 80%
    });

    it('should pass at 80% threshold (quiz with 3 questions, all correct)', () => {
      const quiz = getModuleQuiz(0);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      // Edge case: 80% needs rounding consideration
      // With 3 questions: 3/3 = 100, 2/3 = 67
      // For passing at 80%, need at least 2.4 correct = 3 correct
      const responses = {
        '0-1': 2,
        '0-2': 1,
        '0-3': 2,
      };

      const result = scoreQuiz(responses, quiz);
      expect(result.passed).toBe(true);
    });

    it('should fail at 79% (below 80% threshold)', () => {
      const quiz = getModuleQuiz(0);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      // 2/3 = 66.67% rounds to 67%
      const responses = {
        '0-1': 2, // correct
        '0-2': 0, // wrong
        '0-3': 2, // correct
      };

      const result = scoreQuiz(responses, quiz);
      expect(result.percentage).toBeLessThan(80);
      expect(result.passed).toBe(false);
    });

    it('should handle wrong answer indices', () => {
      const quiz = getModuleQuiz(1);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      const responses = {
        '1-1': 0, // wrong
        '1-2': 0, // wrong
        '1-3': 1, // correct
      };

      const result = scoreQuiz(responses, quiz);
      expect(result.score).toBe(1);
      expect(result.percentage).toBe(33);
      expect(result.passed).toBe(false);
    });

    it('should handle all wrong answers', () => {
      const quiz = getModuleQuiz(0);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      const responses = {
        '0-1': 0,
        '0-2': 0,
        '0-3': 0,
      };

      const result = scoreQuiz(responses, quiz);
      expect(result.score).toBe(0);
      expect(result.percentage).toBe(0);
      expect(result.passed).toBe(false);
    });
  });

  describe('getModuleQuiz', () => {
    it('should return quiz for valid module', () => {
      const quiz = getModuleQuiz(0);
      expect(quiz).toBeDefined();
      expect(quiz?.moduleId).toBe(0);
      expect(quiz?.questions.length).toBe(3);
    });

    it('should return quiz for all 16 modules', () => {
      for (let i = 0; i < 16; i++) {
        const quiz = getModuleQuiz(i);
        expect(quiz).toBeDefined();
        expect(quiz?.questions.length).toBe(3);
        expect(quiz?.moduleId).toBe(i);
      }
    });

    it('should return null for invalid module', () => {
      const quiz = getModuleQuiz(999);
      expect(quiz).toBeNull();
    });

    it('should have correct structure for each question', () => {
      const quiz = getModuleQuiz(0);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      quiz.questions.forEach((q) => {
        expect(q.id).toBeDefined();
        expect(q.text).toBeDefined();
        expect(q.options).toHaveLength(4);
        expect(typeof q.correctAnswer).toBe('number');
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThan(4);
      });
    });
  });
});
