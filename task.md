You are an expert frontend engineer, UI designer, and circuit-analysis teaching assistant.

Build a complete, production-ready Vite + React + TypeScript web app for a classroom visualization project.

Project name: PhasorTune

Topic:
Circuit analysis visualization for two related knowledge points:
1. Sinusoidal steady-state circuit phasor analysis
2. RLC series resonance and frequency response

Important:
Do NOT include transient response.
Do NOT include second-order transient analysis.
Do NOT use Chapter 7 content.
The app should focus only on phasor analysis and RLC series resonance.

Target:
This is for a university circuit analysis course presentation. The interface must look impressive, modern, interactive, dynamic, and suitable for classroom demonstration. It should feel like a futuristic circuit laboratory, not a plain textbook page.

Tech stack:
- Vite
- React
- TypeScript
- Tailwind CSS
- React Router
- Framer Motion
- Recharts
- KaTeX or react-katex for formulas
- Pure SVG / CSS animations for circuit visualization
- No backend
- No database
- No external API
- Must be deployable to Cloudflare Pages as a static site

Cloudflare Pages requirement:
- Build command: npm run build
- Output directory: dist
- Add SPA fallback support by creating public/_redirects with:
  /* /index.html 200

General UI style:
- Dark futuristic sci-fi style
- Glassmorphism panels
- Neon cyan / blue / purple glow
- Animated circuit lines
- Smooth Framer Motion transitions
- Responsive layout
- Works on desktop and projector screen
- Chinese main labels with small English subtitles
- Clean classroom-friendly interface

Color palette:
- Background: #050816
- Panel: rgba(15, 23, 42, 0.75)
- Primary cyan: #00D4FF
- Purple: #7C3AED
- Green: #22C55E
- Yellow: #FACC15
- Text: #E5E7EB

Pages:
1. Home page
2. Phasor Lab page
3. Resonance Challenge page

Routing:
- /              Home
- /phasor        Phasor Lab
- /resonance     Resonance Challenge

====================================================
PAGE 1: HOME
====================================================

Build a beautiful landing page named "PhasorTune".

Hero section:
Title:
PhasorTune
副标题:
正弦稳态与 RLC 谐振可视化实验室

Description:
通过旋转相量、动态波形和谐振小游戏，理解正弦稳态电路中的相位、阻抗、电流与频率响应。

Visual:
- Futuristic animated glowing RLC circuit in the center
- Animated current particles moving along wires
- Floating formula cards:
  Z = R + j(ωL - 1/ωC)
  f₀ = 1 / 2π√LC
  φ = arctan((XL - XC) / R)

Cards:
1. 相量实验室 Phasor Lab
   Description: 观察正弦波、相位差、阻抗三角形和旋转相量。
   Button: 进入实验

2. 谐振挑战 Resonance Challenge
   Description: 调节频率，让 RLC 电路达到谐振并点亮灯泡。
   Button: 开始挑战

Home page should be visually impressive and animated, but not too heavy.

====================================================
PAGE 2: PHASOR LAB
====================================================

Purpose:
Teach sinusoidal steady-state phasor analysis.

Main concept:
Convert sinusoidal voltage/current into rotating phasors. Show the relationship between voltage, current, impedance, and phase.

Layout:
Left panel:
- Parameter controls with sliders:
  - Voltage amplitude U: 1V to 20V, default 10V
  - Frequency f: 10Hz to 2000Hz, default 500Hz
  - Resistance R: 1Ω to 200Ω, default 50Ω
  - Inductance L: 1mH to 500mH, default 100mH
  - Capacitance C: 1μF to 1000μF, default 100μF

Middle area:
- Animated SVG RLC series circuit
- Current particles move along the circuit
- Current particle speed and brightness depend on current magnitude
- Show source, resistor, inductor, capacitor icons
- Labels should be clear:
  电源 Source
  电阻 R
  电感 L
  电容 C

Right panel:
- Live calculated values:
  - ω
  - XL
  - XC
  - |Z|
  - I
  - φ
  - Circuit type:
    感性 Inductive if XL > XC
    容性 Capacitive if XC > XL
    近似纯阻性 Resistive if abs(XL-XC) is small

Charts:
1. Sine wave chart:
   - Voltage waveform u(t) = Um sin(ωt)
   - Current waveform i(t) = Im sin(ωt - φ)
   - Use Recharts line chart
   - Make voltage and current clearly distinguishable
   - Add small note:
     电流相位由阻抗角决定，感性电路电流滞后，容性电路电流超前。

2. Phasor diagram:
   - Use SVG
   - Draw rotating or static phasor arrows
   - Voltage reference arrow
   - Current arrow with phase difference
   - Display angle φ visually as an arc
   - The phasor should update when sliders move

3. Impedance triangle:
   - Horizontal side: R
   - Vertical side: XL - XC
   - Hypotenuse: |Z|
   - Show angle φ

Educational explanation cards:
- 什么是相量？
- 为什么用复数表示正弦量？
- 阻抗角如何决定电压和电流的相位差？

Use short Chinese explanations, not long paragraphs.

Formulas:
Display formulas beautifully using KaTeX:
Z = R + j(ωL - 1/(ωC))
|Z| = √(R² + (XL - XC)²)
I = U / |Z|
φ = arctan((XL - XC) / R)

====================================================
PAGE 3: RESONANCE CHALLENGE
====================================================

Purpose:
Teach RLC series resonance and frequency response.

Core idea:
The user adjusts frequency to make the RLC series circuit resonate. At resonance:
- XL = XC
- Impedance is minimum
- Current is maximum
- Phase angle is approximately 0
- Bulb brightness reaches maximum

Make this page feel like a game.

Layout:
Top:
- Title: 谐振挑战 Resonance Challenge
- Subtitle: 调节频率，让电路进入谐振状态

Left:
- Large interactive frequency knob or slider
- Frequency range: 10Hz to 5000Hz
- Current frequency displayed in large text

Middle:
- Animated RLC series circuit
- A glowing bulb connected in the circuit
- Bulb brightness depends on current magnitude
- Current particles move faster and glow more strongly when current is high
- When close to resonance, circuit glows strongly

Right:
- Live values:
  - Current frequency f
  - Resonance frequency f₀
  - Difference |f - f₀|
  - Impedance |Z|
  - Current I
  - Phase angle φ
  - Q factor
  - Status:
    低于谐振 Below resonance
    接近谐振 Near resonance
    高于谐振 Above resonance

Game behavior:
- Define resonance achieved when abs(f - f0) / f0 < 0.03
- When achieved:
  - Show large success badge:
    Resonance Achieved!
    谐振达成！
  - Add celebration animation
  - Make bulb pulse brightly
  - Highlight f0 on the frequency response chart

Controls:
- Sliders for R, L, C
- Preset buttons:
  1. 宽峰低 Q
  2. 尖峰高 Q
  3. 随机挑战

Charts:
1. Amplitude-frequency chart:
   - x-axis: frequency
   - y-axis: current amplitude
   - Draw current curve across frequency range
   - Mark current selected frequency with a vertical line
   - Mark resonance frequency with another highlighted vertical line

2. Phase-frequency chart:
   - x-axis: frequency
   - y-axis: phase angle in degrees
   - Show phase crossing 0 near resonance

Formula cards:
f₀ = 1 / (2π√LC)
Z = √(R² + (ωL - 1/ωC)²)
I = U / Z
Q = (1/R)√(L/C)

Educational explanation:
Add a short explanation panel:
在 RLC 串联电路中，当 XL = XC 时，感抗与容抗相互抵消，电路总阻抗最小，电流达到最大，此时发生串联谐振。

====================================================
CIRCUIT MATH REQUIREMENTS
====================================================

Create a utility file:
src/utils/circuitMath.ts

It should export functions:
- calculateAngularFrequency(f)
- calculateReactance(f, L, C)
- calculateImpedance(R, f, L, C)
- calculateCurrent(U, R, f, L, C)
- calculatePhase(R, f, L, C)
- calculateResonanceFrequency(L, C)
- calculateQ(R, L, C)
- getCircuitType(XL, XC)
- generateWaveformData(U, R, L, C, f)
- generateFrequencyResponseData(U, R, L, C)

Use SI units internally:
- L in henry
- C in farad
- f in hertz
- R in ohm

UI sliders may display:
- mH for inductance
- μF for capacitance

Make sure unit conversion is correct.

Formula details:
omega = 2 * Math.PI * f
XL = omega * L
XC = 1 / (omega * C)
Z = Math.sqrt(R * R + Math.pow(XL - XC, 2))
I = U / Z
phi = Math.atan((XL - XC) / R)
f0 = 1 / (2 * Math.PI * Math.sqrt(L * C))
Q = (1 / R) * Math.sqrt(L / C)

For current waveform:
u(t) = U * sin(omega * t)
i(t) = I * sin(omega * t - phi)

====================================================
COMPONENTS
====================================================

Create reusable components:

src/components/
- Navbar.tsx
- GlassPanel.tsx
- SliderControl.tsx
- FormulaCard.tsx
- ValueCard.tsx
- AnimatedCircuit.tsx
- PhasorDiagram.tsx
- ImpedanceTriangle.tsx
- WaveformChart.tsx
- FrequencyResponseChart.tsx
- PhaseResponseChart.tsx
- ResonanceKnob.tsx
- GlowingBulb.tsx
- SuccessBadge.tsx

Component expectations:
- Clean TypeScript props
- No any unless necessary
- Good naming
- Reusable layout
- Smooth animations
- Beautiful UI

====================================================
ANIMATION REQUIREMENTS
====================================================

Use Framer Motion for:
- Page transitions
- Cards entering
- Success animation
- Button hover
- Formula card hover
- Resonance achieved pulse

Use CSS/SVG animation for:
- Current particles
- Circuit glow
- Bulb brightness
- Rotating phasor
- Background grid

Do not make the animations too laggy.
The app must run smoothly on a Mac laptop and classroom projector.

====================================================
CLASSROOM DEMO MODE
====================================================

Add a "课堂展示模式 Demo Mode" button in Navbar.

When enabled:
- Increase font sizes slightly
- Hide nonessential text
- Make charts and key values larger
- Make the screen more suitable for projector display

Implement with React state and CSS classes.

====================================================
RESPONSIVENESS
====================================================

Desktop-first, but also works on tablets.

For small screens:
- Stack panels vertically
- Keep sliders usable
- Charts should not overflow

====================================================
README
====================================================

Create a README.md with:
- Project introduction in Chinese
- Knowledge points
- How to run locally
- How to build
- How to deploy to Cloudflare Pages
- Recommended Cloudflare Pages settings:
  Build command: npm run build
  Output directory: dist

====================================================
QUALITY REQUIREMENTS
====================================================

The final app must:
- Run with npm install and npm run dev
- Build successfully with npm run build
- Have no TypeScript errors
- Have no broken routes
- Have no missing imports
- Be visually polished
- Be interactive
- Be suitable for a university classroom presentation
- Avoid overly long text
- Use Chinese labels clearly
- Avoid backend dependencies
- Avoid external API calls

Please implement the complete project now.
After implementation, provide:
1. File structure
2. How to run locally
3. How to deploy to Cloudflare Pages
4. Any assumptions made