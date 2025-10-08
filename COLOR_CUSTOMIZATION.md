# Color Customization Guide

This library uses CSS variables to allow full color customization. All colors can be overridden in your application without modifying the library source code.

## How to Customize Colors

All color variables are defined with the `--color-scheduler-*` prefix. You can override any of these in your application's CSS:

```css
/* In your application's CSS file */
:root {
  /* Override primary colors (buttons, appointments, selections) */
  --color-scheduler-primary-50: #your-color;
  --color-scheduler-primary-200: #your-color;
  --color-scheduler-primary-400: #your-color;
  --color-scheduler-primary-500: #your-color;
  --color-scheduler-primary-600: #your-color;
  --color-scheduler-primary-800: #your-color;

  /* Override success colors (available slots) */
  --color-scheduler-success-100: #your-color;
  --color-scheduler-success-400: #your-color;

  /* Override danger colors (excluded slots, errors) */
  --color-scheduler-danger-200: #your-color;
  --color-scheduler-danger-300: #your-color;
  --color-scheduler-danger-400: #your-color;
  --color-scheduler-danger-600: #your-color;

  /* Override warning colors (partially booked slots) */
  --color-scheduler-warning-200: #your-color;

  /* Override accent colors (danger buttons) */
  --color-scheduler-accent-400: #your-color;

  /* Override neutral colors (borders, text, backgrounds) */
  --color-scheduler-neutral-50: #your-color;
  --color-scheduler-neutral-100: #your-color;
  --color-scheduler-neutral-200: #your-color;
  --color-scheduler-neutral-300: #your-color;
  --color-scheduler-neutral-400: #your-color;
  --color-scheduler-neutral-500: #your-color;
  --color-scheduler-neutral-600: #your-color;
  --color-scheduler-neutral-700: #your-color;
  --color-scheduler-neutral-900: #your-color;
}
```

## Default Color Palette

### Primary Colors
Used for buttons, selections, and appointments
- `--color-scheduler-primary-50`: `#eff6ff` (lightest blue)
- `--color-scheduler-primary-200`: `#bfdbfe` (light blue)
- `--color-scheduler-primary-400`: `#60a5fa` (medium blue)
- `--color-scheduler-primary-500`: `#3b82f6` (blue)
- `--color-scheduler-primary-600`: `#2563eb` (dark blue)
- `--color-scheduler-primary-800`: `#1e40af` (darkest blue)

### Success Colors
Used for available time slots
- `--color-scheduler-success-100`: `#dcfce7` (light green)
- `--color-scheduler-success-400`: `#4ade80` (green)

### Danger Colors
Used for excluded slots and error messages
- `--color-scheduler-danger-200`: `#fecaca` (light red)
- `--color-scheduler-danger-300`: `#fca5a5` (red)
- `--color-scheduler-danger-400`: `#f87171` (medium red)
- `--color-scheduler-danger-600`: `#dc2626` (dark red)

### Warning Colors
Used for partially booked slots
- `--color-scheduler-warning-200`: `#fef08a` (yellow)

### Accent Colors
Used for specific actions (e.g., danger buttons)
- `--color-scheduler-accent-400`: `#fb923c` (orange)

### Neutral Colors
Used for UI elements, borders, and text
- `--color-scheduler-neutral-50`: `#f9fafb` (lightest gray)
- `--color-scheduler-neutral-100`: `#f3f4f6` (very light gray)
- `--color-scheduler-neutral-200`: `#e5e7eb` (light gray)
- `--color-scheduler-neutral-300`: `#d1d5db` (gray)
- `--color-scheduler-neutral-400`: `#9ca3af` (medium gray)
- `--color-scheduler-neutral-500`: `#6b7280` (dark gray)
- `--color-scheduler-neutral-600`: `#4b5563` (darker gray)
- `--color-scheduler-neutral-700`: `#374151` (very dark gray)
- `--color-scheduler-neutral-900`: `#111827` (darkest gray)

## Example: Custom Brand Colors

```css
/* Example: Purple and pink brand theme */
:root {
  /* Purple primary */
  --color-scheduler-primary-50: #faf5ff;
  --color-scheduler-primary-200: #e9d5ff;
  --color-scheduler-primary-400: #c084fc;
  --color-scheduler-primary-500: #a855f7;
  --color-scheduler-primary-600: #9333ea;
  --color-scheduler-primary-800: #6b21a8;

  /* Pink accent */
  --color-scheduler-accent-400: #f472b6;
}
```

## Tips

1. **Consistency**: When overriding colors, maintain a logical progression from light to dark shades for the same color family
2. **Contrast**: Ensure sufficient contrast between text and background colors for accessibility
3. **Partial Override**: You don't need to override all variables - only override the ones you want to change
4. **CSS Priority**: Make sure your custom CSS is loaded after the library's styles to ensure proper override

## Where Colors Are Used

- **Primary**: Main buttons, appointment blocks, time selections
- **Success**: Available/bookable time slots
- **Danger**: Excluded days/times, validation errors
- **Warning**: Partially booked slots (multiple appointments in same slot)
- **Accent**: Danger/cancel buttons
- **Neutral**: Borders, backgrounds, labels, disabled states
