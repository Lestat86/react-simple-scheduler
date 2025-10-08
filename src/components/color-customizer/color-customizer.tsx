import { useState } from 'react'

type ColorVariable = {
  name: string
  variable: string
  defaultValue: string
  description: string
  usedIn: string[]
}

const colorGroups: Record<string, ColorVariable[]> = {
  'Primary Colors': [
    {
      name: 'Primary 50',
      variable: '--color-scheduler-primary-50',
      defaultValue: '#eff6ff',
      description: 'Lightest blue - Time picker backgrounds',
      usedIn: ['Time picker info background', 'Selected time display background']
    },
    {
      name: 'Primary 200',
      variable: '--color-scheduler-primary-200',
      defaultValue: '#bfdbfe',
      description: 'Light blue - Primary buttons, booked slots',
      usedIn: ['Primary buttons background', 'Button outline color', 'Booked day indicator', 'Booked slot overlay']
    },
    {
      name: 'Primary 400',
      variable: '--color-scheduler-primary-400',
      defaultValue: '#60a5fa',
      description: 'Medium blue - Appointment indicators',
      usedIn: ['Appointment day indicator border', 'Mobile day indicator']
    },
    {
      name: 'Primary 500',
      variable: '--color-scheduler-primary-500',
      defaultValue: '#3b82f6',
      description: 'Blue - Appointment blocks, focus rings',
      usedIn: ['Appointment block background', 'Input focus ring', 'Select focus ring']
    },
    {
      name: 'Primary 600',
      variable: '--color-scheduler-primary-600',
      defaultValue: '#2563eb',
      description: 'Dark blue - Appointment block hover',
      usedIn: ['Appointment block hover state']
    },
    {
      name: 'Primary 800',
      variable: '--color-scheduler-primary-800',
      defaultValue: '#1e40af',
      description: 'Darkest blue - Time display text',
      usedIn: ['Selected time text color in time picker']
    }
  ],
  'Success Colors': [
    {
      name: 'Success 100',
      variable: '--color-scheduler-success-100',
      defaultValue: '#dcfce7',
      description: 'Light green - Available slots',
      usedIn: ['Available day overlay', 'Available hour slot overlay', 'Mobile available indicator']
    },
    {
      name: 'Success 400',
      variable: '--color-scheduler-success-400',
      defaultValue: '#4ade80',
      description: 'Green - Available slot borders',
      usedIn: ['Available day indicator border in mobile view']
    }
  ],
  'Danger Colors': [
    {
      name: 'Danger 200',
      variable: '--color-scheduler-danger-200',
      defaultValue: '#fecaca',
      description: 'Light red - Excluded slots',
      usedIn: ['Excluded day overlay', 'Excluded hour slot overlay', 'Mobile excluded indicator']
    },
    {
      name: 'Danger 300',
      variable: '--color-scheduler-danger-300',
      defaultValue: '#fca5a5',
      description: 'Red - Error input borders',
      usedIn: ['Input error border', 'Select error border']
    },
    {
      name: 'Danger 400',
      variable: '--color-scheduler-danger-400',
      defaultValue: '#f87171',
      description: 'Medium red - Excluded indicators',
      usedIn: ['Excluded day indicator border in mobile view']
    },
    {
      name: 'Danger 600',
      variable: '--color-scheduler-danger-600',
      defaultValue: '#dc2626',
      description: 'Dark red - Error messages',
      usedIn: ['Error message text', 'Error focus ring']
    }
  ],
  'Warning Colors': [
    {
      name: 'Warning 200',
      variable: '--color-scheduler-warning-200',
      defaultValue: '#fef08a',
      description: 'Yellow - Partially booked slots',
      usedIn: ['Partially booked day overlay', 'Partially booked hour slot']
    }
  ],
  'Accent Colors': [
    {
      name: 'Accent 400',
      variable: '--color-scheduler-accent-400',
      defaultValue: '#fb923c',
      description: 'Orange - Danger buttons',
      usedIn: ['Danger button background']
    }
  ],
  'Neutral Colors': [
    {
      name: 'Neutral 50',
      variable: '--color-scheduler-neutral-50',
      defaultValue: '#f9fafb',
      description: 'Lightest gray - Backgrounds',
      usedIn: ['Time picker background', 'Week header background', 'Disabled input background']
    },
    {
      name: 'Neutral 100',
      variable: '--color-scheduler-neutral-100',
      defaultValue: '#f3f4f6',
      description: 'Very light gray - Hover states',
      usedIn: ['Day hover background']
    },
    {
      name: 'Neutral 200',
      variable: '--color-scheduler-neutral-200',
      defaultValue: '#e5e7eb',
      description: 'Light gray - Borders',
      usedIn: ['Day borders', 'Hour slot borders', 'Input borders', 'Week header border']
    },
    {
      name: 'Neutral 300',
      variable: '--color-scheduler-neutral-300',
      defaultValue: '#d1d5db',
      description: 'Gray - Input hover borders',
      usedIn: ['Input hover border', 'Select border', 'Duration selector border']
    },
    {
      name: 'Neutral 400',
      variable: '--color-scheduler-neutral-400',
      defaultValue: '#9ca3af',
      description: 'Medium gray - Placeholders, icons',
      usedIn: ['Input placeholder', 'Past day indicator', 'SVG icons']
    },
    {
      name: 'Neutral 500',
      variable: '--color-scheduler-neutral-500',
      defaultValue: '#6b7280',
      description: 'Dark gray - Icons',
      usedIn: ['Calendar icon', 'Time picker icon', 'Disabled text']
    },
    {
      name: 'Neutral 600',
      variable: '--color-scheduler-neutral-600',
      defaultValue: '#4b5563',
      description: 'Darker gray - Secondary text',
      usedIn: ['Day names', 'Time labels', 'Mobile day names']
    },
    {
      name: 'Neutral 700',
      variable: '--color-scheduler-neutral-700',
      defaultValue: '#374151',
      description: 'Very dark gray - Labels',
      usedIn: ['Form labels', 'Date display']
    },
    {
      name: 'Neutral 900',
      variable: '--color-scheduler-neutral-900',
      defaultValue: '#111827',
      description: 'Darkest gray - Text, modal overlay',
      usedIn: ['Input text', 'Select text', 'Modal backdrop']
    }
  ]
}

const ColorCustomizer = () => {
  const [colors, setColors] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    Object.values(colorGroups).forEach(group => {
      group.forEach(color => {
        initial[color.variable] = color.defaultValue
      })
    })
    return initial
  })

  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleColorChange = (variable: string, value: string) => {
    setColors(prev => ({ ...prev, [variable]: value }))

    // Apply color live to the document
    document.documentElement.style.setProperty(variable, value)
  }

  const resetColors = () => {
    Object.values(colorGroups).forEach(group => {
      group.forEach(color => {
        document.documentElement.style.setProperty(color.variable, color.defaultValue)
        setColors(prev => ({ ...prev, [color.variable]: color.defaultValue }))
      })
    })
  }

  const generateCSSCode = () => {
    const lines = [':root {']

    Object.entries(colorGroups).forEach(([groupName, colorList]) => {
      lines.push(`  /* ${groupName} */`)
      colorList.forEach(color => {
        lines.push(`  ${color.variable}: ${colors[color.variable]};`)
      })
      lines.push('')
    })

    lines.push('}')
    return lines.join('\n')
  }

  const copyToClipboard = async () => {
    const code = generateCSSCode()
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full h-full p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">🎨 Color Customizer</h1>
        <p className="text-sm text-gray-600">
          Modifica i colori e vedi i cambiamenti in tempo reale sul calendario!
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowCode(!showCode)}
          className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {showCode ? '🎨 Editor' : '💻 CSS Code'}
        </button>
        <button
          onClick={resetColors}
          className="px-3 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          🔄 Reset
        </button>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
        {showCode ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Codice CSS</h2>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {copied ? '✓ Copiato!' : '📋 Copia'}
              </button>
            </div>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs">
              <code>{generateCSSCode()}</code>
            </pre>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded text-xs">
              <h3 className="font-semibold text-blue-900 mb-1">Come usarlo:</h3>
              <ol className="list-decimal list-inside space-y-1 text-blue-800">
                <li>Copia il codice CSS</li>
                <li>Incollalo nel tuo CSS principale</li>
                <li>Importalo DOPO gli stili del scheduler</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(colorGroups).map(([groupName, colorList]) => (
              <div key={groupName} className="border-b pb-4">
                <h2 className="text-lg font-semibold mb-3">{groupName}</h2>
                <div className="space-y-3">
                  {colorList.map(color => (
                    <div key={color.variable} className="border rounded-lg p-3 hover:shadow transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <input
                            type="color"
                            value={colors[color.variable]}
                            onChange={(e) => handleColorChange(color.variable, e.target.value)}
                            className="w-12 h-12 rounded cursor-pointer border-2 border-gray-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm mb-1">{color.name}</div>
                          <div className="text-xs text-gray-600 mb-1">{color.description}</div>
                          <div className="text-xs font-mono bg-gray-100 px-1 py-0.5 rounded inline-block mb-1">
                            {colors[color.variable]}
                          </div>
                          <details className="mt-1">
                            <summary className="text-xs font-semibold text-gray-500 cursor-pointer">
                              Dove viene usato
                            </summary>
                            <ul className="text-xs text-gray-600 mt-1 space-y-0.5">
                              {color.usedIn.map((usage, idx) => (
                                <li key={idx}>• {usage}</li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
        <h3 className="font-semibold text-yellow-900 mb-1 text-sm">💡 Tips:</h3>
        <ul className="list-disc list-inside space-y-0.5 text-yellow-800 text-xs">
          <li>Guarda i cambiamenti in tempo reale sul calendario!</li>
          <li>Mantieni un buon contrasto per l'accessibilità</li>
        </ul>
      </div>
    </div>
  )
}

export default ColorCustomizer
