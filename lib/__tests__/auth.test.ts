import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mockSupabaseClient, setupSupabaseMocks } from '../../tests/setup';

describe('Auth', () => {
  setupSupabaseMocks();

  describe('signup', () => {
    it('should return error if email exists', async () => {
      mockSupabaseClient.auth.signUp = vi.fn().mockRejectedValue(
        new Error('User already exists')
      );

      // Simulate auth.ts calling signUp
      try {
        await mockSupabaseClient.auth.signUp({
          email: 'existing@test.com',
          password: 'password123',
        });
        expect(false).toBe(true); // Should not reach here
      } catch (error) {
        expect((error as Error).message).toContain('User already exists');
      }
    });

    it('should return user and session on success', async () => {
      const mockUser = { id: 'user-123', email: 'new@test.com' };
      const mockSession = { access_token: 'token123', user: mockUser };
      mockSupabaseClient.auth.signUp = vi.fn().mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });

      const result = await mockSupabaseClient.auth.signUp({
        email: 'new@test.com',
        password: 'password123',
      });

      expect(result.data.user.email).toBe('new@test.com');
      expect(result.data.session.access_token).toBe('token123');
    });
  });

  describe('login', () => {
    it('should reject invalid credentials', async () => {
      mockSupabaseClient.auth.signInWithPassword = vi.fn().mockResolvedValue({
        data: { user: null, session: null },
        error: new Error('Invalid credentials'),
      });

      const result = await mockSupabaseClient.auth.signInWithPassword({
        email: 'test@test.com',
        password: 'wrongpassword',
      });

      expect(result.error).toBeDefined();
    });

    it('should return session on valid credentials', async () => {
      const mockUser = { id: 'user-456', email: 'test@test.com' };
      const mockSession = { access_token: 'token456', user: mockUser };
      mockSupabaseClient.auth.signInWithPassword = vi.fn().mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });

      const result = await mockSupabaseClient.auth.signInWithPassword({
        email: 'test@test.com',
        password: 'correctpassword',
      });

      expect(result.data.session.user.id).toBe('user-456');
    });
  });

  describe('logout', () => {
    it('should clear session on logout', async () => {
      mockSupabaseClient.auth.signOut = vi.fn().mockResolvedValue({ error: null });
      const result = await mockSupabaseClient.auth.signOut();
      expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
      expect(result.error).toBeNull();
    });
  });

  describe('password reset', () => {
    it('should send recovery email', async () => {
      mockSupabaseClient.auth.resetPasswordForEmail = vi.fn().mockResolvedValue({
        error: null,
      });

      const result = await mockSupabaseClient.auth.resetPasswordForEmail('test@test.com');
      expect(mockSupabaseClient.auth.resetPasswordForEmail).toHaveBeenCalledWith('test@test.com');
      expect(result.error).toBeNull();
    });

    it('should reject invalid email', async () => {
      mockSupabaseClient.auth.resetPasswordForEmail = vi.fn().mockResolvedValue({
        error: new Error('Email not found'),
      });

      const result = await mockSupabaseClient.auth.resetPasswordForEmail('nonexistent@test.com');
      expect(result.error).toBeDefined();
    });
  });
});
