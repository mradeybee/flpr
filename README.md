# Flpr - Real Estate Investment Platform

## Atomic Design Structure

This project follows the Atomic Design methodology for organizing components. The structure is as follows:

### 1. Atoms
Basic building blocks of the interface that can't be broken down any further without losing their functionality.
- Button
- Input
- Label
- Badge
- Checkbox
- etc.

### 2. Molecules
Simple groups of UI elements functioning together as a unit.
- FormField (combination of Label and Input)
- LanguageSwitcher
- PricingCard
- etc.

### 3. Organisms
Complex UI components composed of molecules and atoms that form distinct sections of an interface.
- Header
- Footer
- CookieConsent
- PropertyCard
- etc.

### 4. Templates
Page-level objects that place components into a layout and articulate the design's underlying content structure.
- MainLayout
- DashboardLayout
- etc.

### 5. Pages
Specific instances of templates that show what a UI looks like with real representative content in place.
- HomePage
- DashboardPage
- PropertyDetailsPage
- etc.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev

# flpr
