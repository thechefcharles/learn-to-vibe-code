'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { MobileMenuBurger } from './MobileMenuBurger'
import { KeyboardShortcutsPanel } from './KeyboardShortcutsPanel'
import { MilestoneModal } from './MilestoneModal'
import { SpaceRocketCursor } from '@/components/SpaceRocketCursor'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'
import type { User } from '@supabase/supabase-js'

interface CoursePageContextType {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

const CoursePageContext = createContext<CoursePageContextType | undefined>(
  undefined
)

export function useCoursePageContext() {
  const context = useContext(CoursePageContext)
  if (!context) {
    throw new Error(
      'useCoursePageContext must be used within CoursePageInteractive'
    )
  }
  return context
}

interface CoursePageInteractiveProps {
  children: React.ReactNode
  moduleNumber: number
  user: User | null
}

export function CoursePageInteractive({
  children,
  moduleNumber,
  user,
}: CoursePageInteractiveProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { shortcutsOpen, setShortcutsOpen } = useKeyboardShortcuts()
  const [milestoneOpen, setMilestoneOpen] = useState(false)

  return (
    <CoursePageContext.Provider
      value={{
        mobileMenuOpen,
        setMobileMenuOpen,
      }}
    >
      <MobileMenuBurger
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
      />

      <KeyboardShortcutsPanel
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />

      <MilestoneModal
        isOpen={milestoneOpen}
        type="module_complete"
        moduleNumber={moduleNumber}
        xpEarned={250}
        onClose={() => setMilestoneOpen(false)}
      />

      <SpaceRocketCursor />

      {children}
    </CoursePageContext.Provider>
  )
}
