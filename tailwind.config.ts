const config: unknown = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Primary colors - used for buttons, selections, appointments
        'scheduler-primary': {
          50: 'var(--scheduler-primary-50)',
          200: 'var(--scheduler-primary-200)',
          400: 'var(--scheduler-primary-400)',
          500: 'var(--scheduler-primary-500)',
          600: 'var(--scheduler-primary-600)',
          800: 'var(--scheduler-primary-800)',
        },
        // Success/Available colors - used for available slots
        'scheduler-success': {
          100: 'var(--scheduler-success-100)',
          400: 'var(--scheduler-success-400)',
        },
        // Danger/Excluded colors - used for excluded slots and errors
        'scheduler-danger': {
          200: 'var(--scheduler-danger-200)',
          300: 'var(--scheduler-danger-300)',
          400: 'var(--scheduler-danger-400)',
          600: 'var(--scheduler-danger-600)',
        },
        // Warning/Partial colors - used for partially booked slots
        'scheduler-warning': {
          200: 'var(--scheduler-warning-200)',
        },
        // Accent colors - used for specific actions
        'scheduler-accent': {
          400: 'var(--scheduler-accent-400)',
        },
        // Neutral colors - used for UI elements, borders, text
        'scheduler-neutral': {
          50: 'var(--scheduler-neutral-50)',
          100: 'var(--scheduler-neutral-100)',
          200: 'var(--scheduler-neutral-200)',
          300: 'var(--scheduler-neutral-300)',
          400: 'var(--scheduler-neutral-400)',
          500: 'var(--scheduler-neutral-500)',
          600: 'var(--scheduler-neutral-600)',
          700: 'var(--scheduler-neutral-700)',
          900: 'var(--scheduler-neutral-900)',
        },
      },
    },
  },
  plugins: [],
}
export default config
