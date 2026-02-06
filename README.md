# Quiz Application

A modular, type-safe quiz building application built with Next.js, React, and TypeScript implementing extensible DSL for marketing quizzes.

### Installation

```bash
git clone https://github.com/kujo205/hw_quiz.git

cd hw_quiz

npm install -g pnpm # if you don'h have pnpm installed globally

pnpm install
```

### Development

```bash
pnpm dev
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
  /features            # User features (quiz, etc)
```

**Benefits:**
- Clear separation of concerns
- Easy to scale and maintain
- Independent feature development
- Reduced coupling between modules
- Only pages can import stuff from features folder

### Quiz System Architecture

#### Two Quiz Types

1. **Static Quizzes**: Linear question flow (1 → 2 → 3 → 4...)
2. **Dynamic Quizzes**: Branching logic based on answers

#### Quizzes with JSON

Quizzes can be defined and transmitted as JSON data, bcs they are just js objects.

```ts
export const demoQuiz = {
  schemaVersion: "1.0",
  questions: [
    {
      id: "q1",
      dataModel: {
        type: "single-select",
        title: { en: "Your favorite color?" },
        options: [
          { label: { en: "Red" }, value: "red" },
          { label: { en: "Blue" }, value: "blue" },
        ],
      },
      branches: [],
      defaultNextQuestionId: "done",
    },
  ],
  staticSteps: [
    {
      id: "done",
      dataModel: {
        type: "thank-you",
        title: { en: "Finished" },
      },
      defaultNextQuestionId: null,
    },
  ],
};
```

**Quiz Creation Guide:**

1. Quizzes consist of 3 fields:

```ts
export const tesTQuiz: TQuiz = {
  schemaVersion: "1.0", // semantic versioning for quiz data structure
  questions: testQuizDynamicQuestions, // dynamic quiz questions, which come from API or JSON file, this steps will be shows under quiz progress
  staticSteps: quizStaticSteps, // these steps are not usually changed, they come after quiz is finished (loader, email, thank-you step etc.)
};

```

2. Create a new JSON file in `/src/features/quiz/services/quiz-data-items.ts` , start with dynamic quiz items:
They have the following structure:
```ts 
const DynamicQuestionSchema = BaseStepSchema.extend({
  id: z.string(), 
  dataModel: z.discriminatedUnion("type", dynamicDataSchemas),
  branches: z.array(BranchSchema),
  defaultNextQuestionId: z.string(),
});

```
2.1 You need to specify a data model - data model, specific for each quiz step, `step` field is required in such a data model
and it is used to determine question type, depending on the data model you will add any dynamic questions you need
with localization in place.

There are 4 supported languages: English (en), French (fr), German (de) and Spanish (es).
You can add more if needed, just make sure to update the localization system accordingly.

2.2. You need to specify defaultNextQuestionId - the id of the next question
if any of the branches conditions are not met.

2.3 You can specify branching logic in `branches`.

Study the example branching logic below:
it has 2 conditions, connected by "OR" logic.

1st condition means if "favorite-topics" step contains "romance" - next step is "romance-subgenre",
2nd condition means if "favorite-topics" step contains "bad-boy" - next step is also "romance-subgenre".

if at least one of these conditions are met - romance-subgenre step will be shown,
if none of these conditions are met - next step will be determined by defaultNextQuestionId field.

```ts
    branches: [
  {
    conditions: [
      {
        questionId: "favorite-topics",
        operator: "CONTAINS",
        value: "romance",
      },
      {
        questionId: "favorite-topics",
        operator: "CONTAINS",
        value: "bad-boy",
      },
    ],
    logic: "OR",
    nextQuestionId: "romance-subgenre",
  },
]

```

#### Versioning & Backward Compatibility

Each quiz has a `version` field following semantic versioning:

```json
{
  "version": "2.1.0"
}
```

**Version Strategy:**
- **Major**: Breaking changes (1.x.x → 2.0.0)
- **Minor**: New questions/features (1.1.x → 1.2.0)

### Adding New Quiz Steps (Question Types)

**It's extremely easy to add new question types:**

1. **Create component folder** in `/features/quiz/component/quiz-steps`:
```
/features/quiz/component/quiz-steps
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

3. **Register in ** (`src/features/quiz/types-and-schemas/index.ts`):
```typescript
import { ratingQuestionSchema } from '../ui/RatingQuestion/schema';

const dynamicQuestionTypes = [
  "single-select-question",
  "multiple-select",
  "bubble-select",
  "single-select-question-emoji",
  "rating" // add this
] as const;

const dynamicDataSchemas = [
  SingleSelectDataSchema,
  MultipleSelectDataSchema,
  BubbleSelectDataSchema,
  EmojiSelectDataSchema,
  ratingQuestionSchema // add this
] as const;
```
Then go to `src/features/quiz/components/question-renderer.tsx` and add your rendering logic for this question type.
Don't forget to add `valueSelectHandler={selectAnswerHandler}` to your component

**That's it!** The system automatically:
- ✅ Pull this schema type to Quiz schema
- ✅ Type-checks throughout the app
- ✅ Handles serialization/deserialization
- ✅ Supports branching logic
- ✅ Persists to localStorage

**Why this approach?**
- **Type Safety**: Zod schema generates TypeScript types
- **Validation**: Automatic runtime validation
- **Modularity**: Each question type is self-contained
- **Scalability**: Add unlimited question types without changing core logic

## 🛠️ Tech Stack

### Core
- **Next.js 16** (App Router) - React framework with SSR
- **TypeScript** - Type safety
- **Zod** - Schema validation

### Styling
- **Tailwind CSS** (optional) - Utility classes

### State Management
- **Zustand** - Global quiz state
- **localStorage** - Persistence across refreshes

### Development
- **ESLint** - Code linting
- **Biome** - Code formatting
- **Husky** - Git hooks

## 🔄 CI/CD

### GitHub Actions Workflows

**Continuous Integration** (`.github/workflows/ci.yml`):
```yaml
- Lint code (Biome)
- Build application
- Run tests (Vitest)
```

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

---

**Author**: [@kujo205](https://github.com/kujo205) | **License**: MIT
