import { describe, it, expect } from 'vitest';
import { scoreQuiz, getModuleQuiz } from '../quizzes';

// Any index that is NOT the correct one (options always have length 4).
function wrongAnswer(correct: number): number {
  return correct === 0 ? 1 : 0;
}

describe('Quiz Scoring Logic', () => {
  describe('scoreQuiz', () => {
    it('should calculate a perfect score (100%)', () => {
      const quiz = getModuleQuiz(2);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      // Answer every question correctly (robust to question count).
      const responses: Record<string, number> = {};
      quiz.questions.forEach((q) => {
        responses[q.id] = q.correctAnswer;
      });

      const result = scoreQuiz(responses, quiz);
      expect(result.score).toBe(quiz.questions.length);
      expect(result.percentage).toBe(100);
      expect(result.passed).toBe(true);
    });

    it('should fail below the 80% threshold', () => {
      const quiz = getModuleQuiz(2);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      // Miss two answers -> below 80% for any 5-9 question quiz.
      const responses: Record<string, number> = {};
      quiz.questions.forEach((q, i) => {
        responses[q.id] = i < 2 ? wrongAnswer(q.correctAnswer) : q.correctAnswer;
      });

      const result = scoreQuiz(responses, quiz);
      expect(result.percentage).toBeLessThan(80);
      expect(result.passed).toBe(false);
    });

    it('should pass at the 80% threshold (one wrong)', () => {
      const quiz = getModuleQuiz(2);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      // Miss exactly one -> >= 80% for any 5+ question quiz.
      const responses: Record<string, number> = {};
      quiz.questions.forEach((q, i) => {
        responses[q.id] = i === 0 ? wrongAnswer(q.correctAnswer) : q.correctAnswer;
      });

      const result = scoreQuiz(responses, quiz);
      expect(result.percentage).toBeGreaterThanOrEqual(80);
      expect(result.passed).toBe(true);
    });

    it('should handle all wrong answers', () => {
      const quiz = getModuleQuiz(2);
      expect(quiz).toBeDefined();
      if (!quiz) return;

      const responses: Record<string, number> = {};
      quiz.questions.forEach((q) => {
        responses[q.id] = wrongAnswer(q.correctAnswer);
      });

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
      expect(quiz?.questions.length).toBeGreaterThanOrEqual(5);
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
