# Personalization audit

The reference OS identity is purged. Removed by design: booking links and pings, WhatsApp, phone, voice agents, music, games, "build your own OS", domain greeting, GitHub, client logos, testimonials, Learn library, personal Instagram, "1 yr experience" and "Available for Work" labels, Moiré "Top 6" note.

`npm run build` runs `scripts/audit.mjs`, which fails the build if any banned token (Calendly, WhatsApp, RajNet, Top 6, Founder.txt, github.com, a non-reel instagram.com link, and others) appears in the built output, or if any project cover is missing.

Last run: passed.

## Claims needing owner confirmation
- Munchables.tv ~35,000 Instagram and ~33,000 YouTube views (labelled approximate, self-reported, in Journey)
- Moiré description in Journey (zero-budget psychological thriller about digital footprints)
- Legaloid usability numbers (labelled directional in the case file)
