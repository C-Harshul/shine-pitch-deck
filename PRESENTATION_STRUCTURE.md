# Presentation Structure Documentation

## Overview

This is an investor pitch deck for **Numina**, a real-time financial intelligence platform for small businesses. The presentation is built using React, TypeScript, Framer Motion, and Tailwind CSS. It consists of 14 slides with interactive animations and a full-screen presentation mode.

## Architecture

### Main Entry Point
- **File**: `src/pages/Index.tsx`
- **Component**: `Index`
- Contains all slide components wrapped in the `Presentation` component

### Presentation Container
- **File**: `src/components/Presentation.tsx`
- **Component**: `Presentation`
- Manages slide navigation, fullscreen mode, and user interactions
- Features:
  - Slide transitions (600ms cubic-bezier animation)
  - Keyboard navigation (Arrow keys, Space, Enter, F for fullscreen)
  - Click navigation (left 20% goes back, rest goes forward)
  - Progress bar with slide indicators
  - Slide counter (current/total)
  - Fullscreen toggle button

### Base Slide Component
- **File**: `src/components/Slide.tsx`
- **Component**: `Slide`
- Provides consistent layout and styling for all slides
- Supports variants: `centered`, `left`, `right`

## Slide Structure (14 Slides)

### 1. Title Slide
- **File**: `src/components/slides/TitleSlide.tsx`
- **Content**: 
  - Main headline: "Numina" (gradient text)
  - Subtitle: "Real-Time Financial Intelligence for the Small Business"
  - Tagline: "Making every small business a firm's best client."
- **Animation**: Fade-up animations with staggered delays

### 2. Problem Slide
- **File**: `src/components/slides/ProblemSlide.tsx`
- **Content**: Introduces the core problem statement
- **Purpose**: Sets up the problem that Numina solves

### 3. Pain Points Slide
- **File**: `src/components/slides/PainPointsSlide.tsx`
- **Content**: 
  - Three pain point cards with domino-like animation (falling from left to right)
  - Cards: "Reconciliation Overload", "Exception Chaos", "Capacity Constraints"
  - Each card has an icon, title, and description
- **Animation**: 
  - Cards animate with `rotateX` and `y` transforms
  - Spring animation with staggered delays
  - Hover effect: cards scale up on hover
- **Styling**: Large text sizes matching slide 2, increased card padding and gaps

### 4. Solution Slide
- **File**: `src/components/slides/SolutionSlide.tsx`
- **Content**: Presents Numina as the solution
- **Purpose**: Transitions from problem to solution

### 5. How It Works Slide
- **File**: `src/components/slides/HowItWorksSlide.tsx`
- **Content**: 
  - Three-step process explanation
  - Steps numbered 01, 02, 03
  - Each step has an icon, title, and description
- **Styling**: Large text sizes, increased padding, visible step numbers

### 6. Features Slide
- **File**: `src/components/slides/FeaturesSlide.tsx`
- **Content**: 
  - Three main features displayed as cards:
    1. **Reconcile**: "Invoices to ledger. Automatically." (triggers Reconcile animation)
    2. **Research**: "Ask questions. Get answers." (triggers Research animation)
    3. **Flag**: "Automatic Flagging" (triggers Flagging animation)
- **Interactivity**: 
  - Clicking feature cards opens full-screen animation modals
  - Cards have hover effects
- **Styling**: Large text sizes, increased card widths, yellow subtitle text

### 7. Control Slide
- **File**: `src/components/slides/ControlSlide.tsx`
- **Content**: 
  - Three control points with icons and descriptions
  - Emphasizes control and visibility aspects
- **Styling**: Large text sizes matching other slides

### 8. Hockey Stick Slide (Capacity Equation)
- **File**: `src/components/slides/HockeyStickSlide.tsx`
- **Content**: 
  - Interactive animated graph showing capacity growth curve
  - X-axis: Variance Reduction (%)
  - Y-axis: Sustainable Clients per Accountant
  - Three zones: LINEAR ZONE, INFLECTION ZONE, EXPONENTIAL ZONE
  - Zone boundary lines at 40% and 60%
  - "Numina Target" callout at 70% variance reduction
  - "Before → After Numina" metrics panel
  - "Effective Capacity Multiplier" panel
  - Closing overlay with key metrics
- **Animation**: 
  - Play button starts animation sequence
  - Graph draws progressively
  - Zones appear sequentially
  - Zone boundary lines fade in
  - Metrics animate in
  - Client count animates from 15 to 30
- **Key Metrics Displayed**:
  - Sustainable clients: 15 → 30
  - Task variance: ±12h → ±3.6h
  - Exceptions/week: 18 → 5
  - Capacity: +100%
  - Effective Capacity Multiplier: 2.0× at 70% reduction
- **Causal Chain**: Structure data → Lower variance → Higher capacity → Higher revenue per accountant

### 9. Impact Slide
- **File**: `src/components/slides/ImpactSlide.tsx`
- **Content**: Shows the impact and benefits of Numina
- **Note**: "Capacity gains driven by variance reduction and exception elimination, not longer work weeks."

### 10. Market Expansion Slide
- **File**: `src/components/slides/MarketExpansionSlide.tsx`
- **Content**: Discusses market expansion opportunities

### 11. GTM (Go-To-Market) Slide
- **File**: `src/components/slides/GTMSlide.tsx`
- **Content**: Go-to-market strategy

### 12. Vision Slide
- **File**: `src/components/slides/VisionSlide.tsx`
- **Content**: Vision and future direction

### 13. Summary Slide
- **File**: `src/components/slides/SummarySlide.tsx`
- **Content**: Summary of key points

### 14. CTA Slide
- **File**: `src/components/slides/CTASlide.tsx`
- **Content**: Call-to-action for investors

## Interactive Animations

### 1. Reconcile Animation (Document Processing)
- **File**: `src/components/DocumentProcessingAnimation.tsx`
- **Component**: `DocumentProcessingAnimation`
- **Trigger**: Clicking "Reconcile" card on Features Slide
- **Size**: Full-screen modal (`w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]`)
- **Content**:
  - Left side: Three document sources (Email/Invoice, Slack/Receipt, Web Portal/PO)
  - Center: Numina brain icon with processing animation
  - Right side: General Ledger with three entries
- **Animation Flow**:
  1. Documents flow from sources to Numina (left arrows animate)
  2. Numina brain processes (rotating rings and connections)
  3. After processing, arrows animate from Numina to General Ledger
  4. Ledger entries update sequentially (one at a time)
  5. Pauses for 10 seconds after all entries are updated
  6. Loops back to start
- **Close Button**: X icon in top-left corner

### 2. Research Animation (RAG Pipeline)
- **File**: `src/components/ResearchAnimation.tsx`
- **Component**: `ResearchAnimation`
- **Trigger**: Clicking "Research" card on Features Slide
- **Size**: Full-screen modal
- **Content**: 
  - Two main sections:
    1. **RAG Knowledge Base** (Ingestion Pipeline):
       - Documents → Chunking → Embed → VectorDB
       - Arrows animate one at a time when clicked
       - Icons highlight when their arrows are active
    2. **Query Pipeline**:
       - Query → Web App → Retriever ↔ VectorDB → LLM → Web App
       - Complex arrow animations with traveling dots
       - "Prompt + Context" arrow from Retriever to LLM
- **Features**:
  - Continuous playback toggle (Loop) in bottom-left
  - Individual pipeline click-to-animate
  - All arrows are always visible (opaque)
  - Consistent dot animation speed across all arrows
  - "Vectorised" label appears when Embed → VectorDB arrow is active
- **Close Button**: X icon in top-left corner

### 3. Flagging Animation (Automatic Flagging)
- **File**: `src/components/FlaggingAnimation.tsx`
- **Component**: `FlaggingAnimation`
- **Trigger**: Clicking "Flag" card on Features Slide
- **Size**: Full-screen modal
- **Content**:
  - **Top**: QuickBooks icon (separate from main flow)
  - **Context Arrow**: From QuickBooks down to LLM Rule Converter
  - **Main Flow** (top to bottom):
    1. Transaction Queue
    2. Rule Enforcement
    3. Notification
    4. Auditor
  - **Bottom**: Rule Intake → Rules DB
- **Close Button**: X icon in top-left corner

## Animation Components

### Arrow Components (Research Animation)
- `AnimatedArrow`: Horizontal arrow with traveling dot
- `AnimatedVerticalArrow`: Vertical arrow (top to bottom) with traveling dot
- `AnimatedReverseArrow`: Reverse horizontal arrow with traveling dot
- `AnimatedReverseVerticalArrow`: Reverse vertical arrow (bottom to top) with traveling dot
- `AnimatedLArrow`: L-shaped arrow (used for Retriever → LLM)
- `AnimatedZArrow`: Z-shaped arrow (used for Embed → VectorDB)

### Animation Features
- All arrows are always visible (opacity: 1)
- Traveling dots animate along arrow paths
- Consistent animation speed (pixels per second)
- Icons highlight when their associated arrows are active
- Single-pass animations (repeat: 0) for ingestion pipeline
- Continuous playback option for query pipeline

## Styling and Design System

### Color Scheme
- **Primary**: Yellow/Amber (`hsl(38, 92%, 50%)`)
- **Background**: Dark theme with `bg-background`
- **Cards**: `bg-card/80` with backdrop blur
- **Borders**: `border-border` with opacity variations

### Typography
- **Headings**: Large, bold, with gradient text effects
- **Body**: `text-muted-foreground` for descriptions
- **Sizes**: Consistent large text sizes across slides (text-2xl, text-xl, etc.)

### Spacing
- Consistent padding: `p-10` for cards
- Gap spacing: `gap-8` to `gap-10` between elements
- Margins: `mb-8`, `mb-12` for sections

### Animations
- **Framer Motion**: Used for all animations
- **Transitions**: 600ms cubic-bezier for slide transitions
- **Staggered delays**: Used for sequential card animations
- **Spring animations**: Used for card entrance effects

## Navigation

### Keyboard Controls
- `ArrowRight`, `Space`, `Enter`: Next slide
- `ArrowLeft`: Previous slide
- `F`: Toggle fullscreen
- `Escape`: Exit fullscreen (browser default)

### Mouse/Touch Controls
- Click left 20% of screen: Previous slide
- Click rest of screen: Next slide
- Click progress bar dots: Jump to specific slide
- Click navigation arrows: Navigate slides
- Click fullscreen button: Toggle fullscreen

### Visual Indicators
- Progress bar at bottom center (dots for each slide)
- Slide counter at bottom right (current/total)
- Navigation hint at bottom left
- Navigation arrows on left and right sides

## File Structure

```
src/
├── pages/
│   └── Index.tsx                    # Main entry, contains all slides
├── components/
│   ├── Presentation.tsx            # Presentation container/navigator
│   ├── Slide.tsx                    # Base slide component
│   ├── ResearchAnimation.tsx        # RAG pipeline animation
│   ├── DocumentProcessingAnimation.tsx  # Reconcile animation
│   ├── FlaggingAnimation.tsx         # Flagging animation
│   └── slides/
│       ├── TitleSlide.tsx
│       ├── ProblemSlide.tsx
│       ├── PainPointsSlide.tsx
│       ├── SolutionSlide.tsx
│       ├── HowItWorksSlide.tsx
│       ├── FeaturesSlide.tsx
│       ├── ControlSlide.tsx
│       ├── HockeyStickSlide.tsx
│       ├── ImpactSlide.tsx
│       ├── MarketExpansionSlide.tsx
│       ├── GTMSlide.tsx
│       ├── VisionSlide.tsx
│       ├── SummarySlide.tsx
│       └── CTASlide.tsx
└── ...
```

## Key Technologies

- **React 18.3.1**: UI framework
- **TypeScript**: Type safety
- **Framer Motion 12.29.0**: Animation library
- **Tailwind CSS**: Styling
- **Recharts 2.15.4**: Chart library (for Hockey Stick graph)
- **Lucide React**: Icon library
- **Radix UI**: UI component primitives

## Development

### Running the Application
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Key Configuration
- **Vite**: Build tool and dev server
- **Port**: Default 8080 (configurable in `vite.config.ts`)
- **Path Aliases**: `@/` maps to `src/`

## Notes

- All animation modals are full-screen and can be closed with the X button
- The presentation supports fullscreen mode for better viewing
- Slide transitions use smooth horizontal sliding animations
- Interactive elements (feature cards, buttons) prevent slide navigation when clicked
- All text uses consistent sizing across slides for visual harmony
- Em dashes have been replaced with commas or regular hyphens throughout
