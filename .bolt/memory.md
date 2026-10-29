# Project memory

## Product intent & audience

- Cybersecurity education/awareness site (Spanish-language UI) focused on password security
- Target users: general public learning about password best practices and common threats
- Interactive elements used as pedagogical tools to engage and educate visitors

## Brand personality & voice

- Spanish-language interface throughout
- Educational, approachable, and security-conscious tone
- Privacy-forward messaging (emphasizes local-only processing, no data sent/stored)

## Visual design & UX direction

- Angular component-based architecture (standalone or module-based TBD)
- Modal/popup pattern with backdrop click-to-close and explicit close button (X)
- Real-time visual feedback: 5-level color-coded strength bar (red → green/blue)
- Checklist with green checkmarks for completed criteria
- Show/hide toggle for password fields (eye-style pattern)
- Interactive password generator producing 16-char secure passwords

## Decisions, constraints & rationale

- Password analysis runs entirely client-side for privacy — no network calls
- Strength criteria: min 8 chars, upper+lower case, numbers, special symbols, detection of common passwords (e.g., "123456", "password")
- 5-level strength scale: "Muy débil" → "Excelente"
- Generator creates 16-character passwords mixing all character types
- Common-password detection uses a built-in blocklist

## Open questions & assumptions

- Angular version and project structure (standalone components vs NgModules) not confirmed
- Overall page sections and content beyond threats section and CTA unknown
- Styling framework (CSS, Tailwind, Angular Material, etc.) not confirmed
- Whether additional interactive features or modals are planned
- Responsive/accessibility requirements for modal (focus trap, ARIA roles) not specified