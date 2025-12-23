# Contributing to Forge of the Fallen

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. Run tests: `npm test`

## AI-Assisted Development

This project uses Windsurf AI with custom rules. The AI follows guidelines in:
- `.windsurf/rules/project-rules.md` - Behavior rules
- `AI_README.md` - Project context and patterns

When contributing, be aware that AI assistance will follow these established patterns.

## Code Style

- TypeScript for all source files
- Functional components for React
- Pure functions for game logic where possible
- Follow existing naming conventions (see AI_README.md)

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Update documentation if needed
6. Submit PR with clear description

## Game Content Contributions

When adding cards, enemies, or other game content:
1. Reference `game_concept.md` for specifications
2. Follow existing data patterns in `src/data/`
3. Add tests for new content
4. Update CHANGELOG.md

## Questions?

Open an issue for discussion before major changes.
