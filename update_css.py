css = """@import "tailwindcss";

@layer base {
  :root {
    --gold-primary: #C5A059;
    --gold-light: #EBD399;
    --gold-dark: #987838;
    --gold-glow: rgba(197, 160, 89, 0.25);
  }

  body {
    background-color: #070709;
    color: #FAF8F5;
    font-family: 'Plus Jakarta Sans', sans-serif;
    overflow-x: hidden;
  }
}

.font-serif {
  font-family: 'Cormorant Garamond', serif;
}

.font-cinzel {
  font-family: 'Cinzel', serif;
}

/* Luxury Glassmorphism */
.glass-lux {
  background: rgba(16, 16, 22, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-gold {
  background: rgba(18, 17, 22, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(197, 160, 89, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(197, 160, 89, 0.15);
}

/* Gold Gradient Text */
.text-gold-gradient {
  background: linear-gradient(135deg, #FFFFFF 15%, #EBD399 55%, #C5A059 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Ambient Radial Glow */
.bg-ambient-mesh {
  background-image: 
    radial-gradient(circle at 50% 0%, rgba(197, 160, 89, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 90% 20%, rgba(197, 160, 89, 0.06) 0%, transparent 40%),
    radial-gradient(circle at 10% 70%, rgba(197, 160, 89, 0.05) 0%, transparent 40%);
}

/* Custom Luxury Scrollbar */
::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background: #070709;
}

::-webkit-scrollbar-thumb {
  background: #232228;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #C5A059;
}
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\index.css", "w", encoding="utf-8") as f:
    f.write(css)
print("Updated src/index.css")
