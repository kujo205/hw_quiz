# Quiz Application

A modular, type-safe quiz application built with Next.js, React, and TypeScript.

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/kujo205/hw_quiz.git
cd hw_quiz
pnpm install
```

### Development

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production

```bash
pnpm run build
pnpm run start
```

## 🏗️ Architecture

### Feature-Sliced Design (FSD)

This project follows **FSD architecture** for maximum modularity and maintainability:

```
/src
  /app                 # Next.js App Router
  /entities            # Business entities (Quiz, Question, Answer)
  /features            # User features (AnswerQuestion, ValidateEmail)
  /widgets             # Composite blocks (QuizProgress, QuestionCard)
  /shared              # Reusable code (UI, utils, config)
```

**Benefits:**
- Clear separation of concerns
- Easy to scale and maintain
- Independent feature development
- Reduced coupling between modules

### Quiz System Architecture

#### Two Quiz Types

1. **Static Quizzes**: Linear question flow (1 → 2 → 3 → 4...)
2. **Dynamic Quizzes**: Branching logic based on answers

#### Creating a Quiz with JSON

Quizzes are defined in JSON files. Example structure:

```json
{
  "version": "1.0.0",
  "type": "dynamic",
  "questions": [
    {
      "id": "1",
      "type": "single-select",
      "title": {
        "en": "What is your age?",
        "fr": "Quel est votre âge?"
      },
      "options": [...],
      "next": {
        "default": "2",
        "branches": {
          "18-25": "2a",
          "26+": "2b"
        }
      }
    }
  ]
}
```

**Quiz Creation Guide:**

1. Create a new JSON file in `/shared/config/quizzes/`
2. Define quiz metadata:
   - `version`: Semantic version (e.g., "1.0.0")
   - `type`: "static" or "dynamic"
3. Add questions array with:
   - `id`: Unique question identifier
   - `type`: Question component type (see below)
   - `title`: Localized question text (en, fr, de, es)
   - `options`: Answer choices with localized text
   - `next`: Next question ID or branching logic
4. For branching: Use `next.branches` object mapping answers to question IDs
5. See `/shared/config/quizzes/example-quiz.json` for complete reference

#### Versioning & Backward Compatibility

Each quiz has a `version` field following semantic versioning:

```json
{
  "version": "2.1.0"
}
```

**Benefits:**
- Update quiz structure without breaking existing user sessions
- Migration system handles version differences
- Users can complete old version if quiz updates mid-session
- Version validators ensure data integrity

**Version Strategy:**
- **Major**: Breaking changes (1.x.x → 2.0.0)
- **Minor**: New questions/features (1.1.x → 1.2.0)
- **Patch**: Text/translation fixes (1.1.1 → 1.1.2)

### Adding New Quiz Steps (Question Types)

**It's extremely easy to add new question types:**

1. **Create component folder** in `/entities/question/ui/`:
```
/entities/question/ui/RatingQuestion/
  ├── RatingQuestion.tsx
  └── schema.ts          # ⚠️ REQUIRED
```

2. **Define Zod schema** in `schema.ts`:
```typescript
import { z } from 'zod';

export const ratingQuestionSchema = z.object({
  type: z.literal('rating'),
  rating: z.number().min(1).max(5),
});

export type RatingQuestionAnswer = z.infer<typeof ratingQuestionSchema>;
```

3. **Register in question registry** (`/entities/question/model/registry.ts`):
```typescript
import { ratingQuestionSchema } from '../ui/RatingQuestion/schema';

export const questionSchemas = {
  'single-select': singleSelectSchema,
  'multiple-select': multipleSelectSchema,
  'rating': ratingQuestionSchema,  // ← Add your schema
};
```

**That's it!** The system automatically:
- ✅ Validates answers with Zod schema
- ✅ Type-checks throughout the app
- ✅ Handles serialization/deserialization
- ✅ Supports branching logic
- ✅ Persists to localStorage

**Why this approach?**
- **Type Safety**: Zod schema generates TypeScript types
- **Validation**: Automatic runtime validation
- **Modularity**: Each question type is self-contained
- **Scalability**: Add unlimited question types without changing core logic

### Type Safety with Zod

All quiz data is validated using Zod schemas:

```typescript
// Automatic validation on answer submission
const answerSchema = questionSchemas[question.type];
const validatedAnswer = answerSchema.parse(userInput);
```

**Benefits:**
- Runtime validation prevents invalid data
- TypeScript inference from schemas
- Consistent error handling
- No manual type guards needed

### Branching System

Dynamic quizzes support conditional routing:

```json
{
  "id": "3",
  "next": {
    "default": "5",
    "branches": {
      "18-25": "5a",  // Young users → custom topics
      "26-40": "5b",
      "41+": "5c"
    }
  }
}
```

**Features:**
- Answer-based routing
- Multiple branch conditions
- Fallback to default route
- Unlimited branching depth

## 🛠️ Tech Stack

### Core
- **Next.js 14** (App Router) - React framework with SSR
- **TypeScript** - Type safety
- **Zod** - Schema validation

### Styling
- **CSS Modules** - Component-scoped styles
- **Tailwind CSS** (optional) - Utility classes

### State Management
- **React Context** - Global quiz state
- **localStorage** - Persistence across refreshes

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

## 🔄 CI/CD

### GitHub Actions Workflows

**Continuous Integration** (`.github/workflows/ci.yml`):
```yaml
- Lint code (ESLint)
- Type check (TypeScript)
- Run tests (Jest)
- Build application
- Validate quiz JSON schemas
```

**Deployment** (`.github/workflows/deploy.yml`):
```yaml
- Automatic deployment on push to main
- Preview deployments for PRs
- Production deployment with approval
```

**Triggers:**
- Push to `main` → Deploy to production
- Pull requests → Run tests + create preview
- Manual workflow dispatch available

## 📦 Project Modularity

**Adding a new feature is isolated:**

1. ✅ New question type → Add one component + schema
2. ✅ New quiz → Add one JSON file
3. ✅ New language → Update translation files
4. ✅ New validation → Update Zod schema

**No need to touch:**
- ❌ Core routing logic
- ❌ State management
- ❌ Other question types
- ❌ Validation engine

**This means:**
- Fast feature development
- Minimal merge conflicts
- Easy to onboard new developers
- Testable in isolation

## 📝 Example Quiz Reference

See `/shared/config/quizzes/example-quiz.json` for a complete quiz with:
- Static and dynamic questions
- Branching logic
- All question types
- Multi-language support
- Proper versioning

---

**Author**: [@kujo205](https://github.com/kujo205) | **License**: MIT
