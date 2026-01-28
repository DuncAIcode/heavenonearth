# SOP: Frontend Architecture (Heaven on Earth)

## Design System
- **Theme Name**: "Heaven on Earth"
- **Core Aesthetic**: Premium, Ethereal, Polished.
- **Colors**:
    - Primary: Void Black / Deep Forest (Backgrounds)
    - Accents: Emerald Green, Starlight White, Soft Green Gradients.
- **Typography**: Inter (Body), Playfair Display or equivalent Serif (Headings) if available, otherwise Sans-Serif with wide tracking.

## Animation Rules (Framer Motion)
- **Hero Section**: Must include "Staggered Fade In" and "Floating" elements.
- **Micro-interactions**: Buttons should scale `0.95` on click and glow on hover.
- **Transitions**: Page transitions should use `AnimatePresence`.

## Component Guidelines
1.  **Functional**: Logic separation from UI.
2.  **Responsive**: Mobile-first Tailwind classes.
3.  **Glassmorphism**: Use `backdrop-blur-md` and `bg-opacity` frequently for panels.

## Golden Rule
If it looks "default", it is wrong. It must look "Designed".
