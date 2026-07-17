import { describe, it, expect } from 'vitest';
import { scoreQuiz, getModuleQuiz } from '../quizzes';

describe('Quiz Scoring Logic', () => {
  describe('scoreQuiz', () => {
    it('should calculate perfect score (100%)', () => {
      const quiz = getModuleQuiz(2);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      // All correct answers for Module 2 (4 questions)
      const responses = {
        '1-1': 1, // correct
        '1-2': 1, // correct
        '1-3': 1, // correct
        '1-4': 1, // correct
      };

      const result = scoreQuiz(responses, quiz);
      expect(result.score).toBe(4);
      expect(result.percentage).toBe(100);
      expect(result.passed).toBe(true);
    });

    it('should calculate 75% (3/4 correct)', () => {
      const quiz = getModuleQuiz(2);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      // 3 out of 4 correct
      const responses = {
        '1-1': 1, // correct
        '1-2': 1, // correct
        '1-3': 1, // correct
        '1-4': 0, // wrong
      };

      const result = scoreQuiz(responses, quiz);
      expect(result.score).toBe(3);
      expect(result.percentage).toBe(75);
      expect(result.passed).toBe(false); // Below 80%
    });

    it('should pass at 80% threshold', () => {
      const quiz = getModuleQuiz(2);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      // 4/4 correct = 100%
      const responses = {
        '1-1': 1,
        '1-2': 1,
        '1-3': 1,
        '1-4': 1,
      };

      const result = scoreQuiz(responses, quiz);
      expect(result.passed).toBe(true);
    });

    it('should handle all wrong answers', () => {
      const quiz = getModuleQuiz(2);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      const responses = {
        '1-1': 0,
        '1-2': 0,
        '1-3': 0,
        '1-4': 0,
      };

      const result = scoreQuiz(responses, quiz);
      expect(result.score).toBe(0);
      expect(result.percentage).toBe(0);
      expect(result.passed).toBe(false);
    });
  });

  describe('getModuleQuiz', () => {
    it('should return null for module 1 (checklist-only)', () => {
      const quiz = getModuleQuiz(1);
      expect(quiz).toBeNull();
    });

    it('should return quiz for module 2', () => {
      const quiz = getModuleQuiz(2);
      expect(quiz).toBeDefined();
      expect(quiz?.moduleId).toBe(2);
      expect(quiz?.questions.length).toBeGreaterThan(0);
    });

    it('should return null for invalid module', () => {
      const quiz = getModuleQuiz(999);
      expect(quiz).toBeNull();
    });

    it('should have correct structure for each question', () => {
      const quiz = getModuleQuiz(2);
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
