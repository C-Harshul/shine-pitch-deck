

## Add Dartmouth Conrades Fellowship to Validation Slide

**Goal:** Add a prominent "Backed by Dartmouth's Conrades fellowship" section with the D-Pine logo to the MomentumSlide (Validation slide).

**Current State:** The slide has 3 columns (Product Ready, Strategic Validation, Market Validation) and a quote at the bottom mentioning the Conrades Fellowship.

**Proposed Approach:** Add a 4th column for "Institutional Backing" with the Dartmouth D-Pine logo prominently displayed. This gives equal visual weight to all validation pillars.

**Specific Changes:**

1. **Add new column to the grid:**
   - Change `md:grid-cols-3` to `md:grid-cols-4`
   - Add new column object with:
     - **Logo:** Display the Dartmouth D-Pine logo (white/light version since dark background)
     - **Title:** "Institutional Backing"
     - **Bullets:**
       - "Backed by Dartmouth's Conrades Distinguished Fellowship"
       - "Magnuson Center for Entrepreneurship support"
       - "Access to alumni network for mentorship"

2. **Visual styling:**
   - Logo displayed at ~80-100px height, centered in the step-number area
   - Use a subtle container/border for the logo to make it stand out
   - Invert logo colors (or use light version) for dark background visibility

3. **File to modify:** `src/components/slides/MomentumSlide.tsx`

**Alternative approaches if preferred:**
- Add as a prominent badge/banner above the 3 columns with logo + fellowship text
- Keep 3 columns but add Dartmouth info to "Strategic Validation" column with the logo

