# Caso maestro — Maderas del Litoral S.A. (hilo conductor de las 16 asignaturas)

> Fuente única de verdad numérica. Cada asignatura toma una "rebanada" de este
> caso y la profundiza; los **anclas** de abajo NO cambian entre módulos.
> Ejercicio 20X5 · cierre 31/12 · moneda homogénea de cierre · miles de $ salvo
> indicación · inflación del ejercicio π = 60 %.

## La empresa
Aserradero y fábrica de aberturas de madera en Corrientes (NEA). Sociedad
anónima familiar de **segunda generación**, capital cerrado, no cotiza.
Tres hermanos dueños (flia. Rossi): el mayor dirige la operación (planta), la
del medio el área comercial, el menor no participa de la gestión. Exporta ~15 %
a Brasil y Uruguay (leve descalce de moneda). Alta **dependencia del dueño**
(IDD elevado), planta principal totalmente amortizada y en plena producción.

## Anclas (no cambian entre asignaturas)
| Magnitud | Valor | Origen / uso |
|---|---|---|
| Ventas | 42.000 | tope del árbol DuPont, base de márgenes |
| CMV | 27.000 | margen bruto 15.000 (35,7 %) |
| EBITDA (normalizado) | 5.250 | EBIT + amortización a mercado (1.400) |
| **EBIT contable** | 4.200 | punto de partida 1.1 |
| **EBIT normalizado** | 3.850 | tras normalizar sueldo dueño, gastos personales, alquiler |
| Tasa impositiva efectiva | 35 % | escudo fiscal, NOPAT |
| **NOPAT normalizado** | 2.502,5 | EBIT norm × (1−t) |
| Intereses | 1.150 | cobertura EBIT/int = 3,35x → calif. sintética ~BB |
| RECPAM del ejercicio | +1.080 | posición monetaria neta pasiva (licuación) |
| CxC (depuradas) | 3.100 | DSO ≈ 27 d |
| Bienes de cambio (reexpresados) | 3.770 | nominal 2.600 × coef 1,45 · DIO ≈ 42 d |
| Proveedores | 1.900 | DPO ≈ 26 d |
| Bienes de uso a **mercado** | 6.800 | contable (VO−amort) = 900 |
| **Capital invertido operativo** | 11.770 | CxC + BC + BU − Proveedores |
| **ROIC normalizado** | 21,3 % | NOPAT norm ÷ capital |
| ROIC contable (distorsionado) | 58,1 % | planta amortizada infla el retorno |
| Deuda financiera | 6.500 | bancaria + cheques + descubierto · D/(D+E)=55 % |
| Patrimonio neto ajustado | 5.270 | D/E ≈ 1,23 |
| **WACC** (real/USD) | ≈ 20,0 % | se construye en 3.1 |
| **Spread ROIC − WACC** | ≈ +1,3 pp | apenas crea valor → motiva el plan |
| EVA | ≈ +150 | (ROIC−WACC) × capital |
| RONIC (capital nuevo) | ≈ 15 % | < WACC → **crecer destruye valor** (paradoja 4.2/4.3) |
| CCE | ≈ 43 días | DIO 42 + DSO 27 − DPO 26 |

## Rebanada por asignatura (qué toma cada una del caso)
- **1.1** Depuración/normalización/reexpresión → estado analítico, capital, ROIC.
- **1.2** Los datos del caso salen del ERP vía servidor MCP (ventas, CxC, stock…).
- **1.3** Funciones Python que reproducen los cálculos del caso con tests.
- **1.4** NOPAT, capital invertido, ROIC, EVA, EVA Margin/Momentum del caso.
- **2.1** DuPont 5 factores, GAO/GAF/GAT, puntos de equilibrio del caso.
- **2.2** Altman Z''/Merton/Beneish sobre Maderas del Litoral (riesgo insolvencia).
- **2.3** Modelo integral en Excel 365 con matrices dinámicas del caso.
- **2.4** CCE, matriz ABC/XYZ del stock de madera, matriz vencimiento-reclamo.
- **3.1** Ke (CAPM emergente, Beta Total, Pereiro/λ), Kd sintético, WACC del caso.
- **3.2** ML: predicción de demanda/mora sobre datos del caso.
- **3.3** Proyección por generadores + Monte Carlo (10.000 iteraciones) del caso.
- **3.4** Agente de IA para la función financiera de la empresa.
- **4.1** Valuación DCF y APV + DLOC×DLOM de Maderas del Litoral.
- **4.2** RONIC y crecimiento: ¿la ampliación de planta crea valor?
- **4.3** Estructura de financiamiento, DAF-E, DSCR, paradoja crecimiento-liquidez.
- **4.4** Política de dividendos y gobierno de la empresa familiar.

## Indicadores propios JPR (se introducen donde impactan)
IDD (dependencia del dueño) → Ke/DLOC/DLOM · CEM (concentración por margen) →
σ NOPAT · BFR (brecha de financiamiento real) → Kd · DAF-E (autonomía bajo
estrés) → default/APV · IPR (preservación del margen real) → NOPAT real.
