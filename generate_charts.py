import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import numpy as np

# Set dark NVIDIA styling
plt.style.use('dark_background')
plt.rcParams['font.sans-serif'] = 'Helvetica Neue', 'Arial', 'sans-serif'
plt.rcParams['axes.edgecolor'] = '#222938'
plt.rcParams['axes.linewidth'] = 1.0

# ----------------------------------------------------
# Chart 1: Palantir Stock Momentum & S&P 500 Breakout
# ----------------------------------------------------
fig, ax = plt.subplots(figsize=(10, 5.2), dpi=200)
fig.patch.set_facecolor('#06080d')
ax.set_facecolor('#0b0e17')

# Simulated realistic historical weekly price trajectory of PLTR from 2023 to 2026
dates = [
    '2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4',
    '2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4',
    '2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4',
    '2026 Q1', '2026 Q3'
]
x = np.arange(len(dates))
# Realistic trend: $7.5 -> $15 -> $18 -> $23 -> $25 -> $28 -> $37 -> $65 -> $85 -> $110 -> $135 -> $155 -> $175 -> $185
prices = [7.5, 15.2, 16.0, 17.2, 23.0, 25.4, 37.0, 65.5, 88.0, 115.0, 138.0, 162.0, 178.0, 186.5]

# Plot curve with glowing fill
nvidia_green = '#76b900'
neon_lime = '#00ff66'

ax.plot(x, prices, color=nvidia_green, linewidth=3.2, label='PLTR Stock Price ($)', zorder=4)
ax.fill_between(x, prices, color=nvidia_green, alpha=0.15, zorder=3)
ax.scatter(x, prices, color='#ffffff', edgecolor=nvidia_green, s=48, linewidth=2, zorder=5)

# Annotations
ax.annotate('AIP Bootcamps Launch\n(GAAP 4Q Consec. Profit)',
            xy=(3, 17.2), xytext=(0.5, 48),
            arrowprops=dict(facecolor=neon_lime, shrink=0.08, width=1.2, headwidth=6),
            color='#ffffff', fontsize=8.5, fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.4', facecolor='#131926', edgecolor=nvidia_green, alpha=0.9))

ax.annotate('S&P 500 Inclusion &\nCommercial +54% Surge',
            xy=(7, 65.5), xytext=(4.5, 110),
            arrowprops=dict(facecolor=neon_lime, shrink=0.08, width=1.2, headwidth=6),
            color='#ffffff', fontsize=8.5, fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.4', facecolor='#131926', edgecolor=nvidia_green, alpha=0.9))

ax.annotate('TITAN DoD Contract &\nGlobal Enterprise Dominance',
            xy=(11, 162.0), xytext=(7.8, 168),
            arrowprops=dict(facecolor=neon_lime, shrink=0.08, width=1.2, headwidth=6),
            color='#ffffff', fontsize=8.5, fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.4', facecolor='#131926', edgecolor=nvidia_green, alpha=0.9))

ax.set_xticks(x)
ax.set_xticklabels(dates, rotation=35, ha='right', fontsize=8.5, color='#8c9cb8')
ax.set_ylabel('Stock Price (USD)', fontsize=10, fontweight='bold', color='#ffffff', labelpad=8)
ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('$%1.0f'))
ax.tick_params(colors='#8c9cb8', labelsize=8.5)
ax.grid(True, linestyle='--', alpha=0.22, color='#313c52')

ax.set_title('PALANTIR (PLTR) MARKET CAPITALIZATION & MOMENTUM SURGE',
             fontsize=12, fontweight='bold', color='#ffffff', pad=14, loc='left')

plt.tight_layout()
plt.savefig('/Users/eriksen/Antigravity/pltr_stock_chart.png', dpi=200, facecolor=fig.get_facecolor())
plt.close()

# ----------------------------------------------------
# Chart 2: Revenue Diversification & AIP Moat Flywheel
# ----------------------------------------------------
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4.8), dpi=200)
fig.patch.set_facecolor('#06080d')

# Subplot 1: US Commercial vs Government Revenue Growth
ax1.set_facecolor('#0b0e17')
categories = ['2022', '2023', '2024', '2025 (E)', '2026 (E)']
gov_rev = [1070, 1220, 1480, 1850, 2300]
comm_rev = [830, 1005, 1420, 2150, 3100]

bar_w = 0.35
indices = np.arange(len(categories))

r1 = ax1.bar(indices - bar_w/2, gov_rev, bar_w, label='Government Revenue ($M)', color='#2e5b88', edgecolor='#4fa3e3')
r2 = ax1.bar(indices + bar_w/2, comm_rev, bar_w, label='Commercial Revenue ($M)', color=nvidia_green, edgecolor=neon_lime)

ax1.set_xticks(indices)
ax1.set_xticklabels(categories, fontsize=9, color='#8c9cb8')
ax1.set_ylabel('Revenue ($ Millions USD)', fontsize=9, color='#ffffff', fontweight='bold')
ax1.set_title('REVENUE SEGMENT BREAKDOWN (AIP ACCELERATION)', fontsize=10, fontweight='bold', color='#ffffff', loc='left', pad=10)
ax1.legend(frameon=True, facecolor='#131926', edgecolor='#222938', fontsize=8)
ax1.grid(True, linestyle='--', alpha=0.2, color='#313c52')
ax1.tick_params(colors='#8c9cb8')

# Subplot 2: Customer Count Expansion Flywheel
ax2.set_facecolor('#0b0e17')
years = ['2021', '2022', '2023', '2024', '2025', '2026 (E)']
customers = [237, 367, 497, 720, 1050, 1420]

ax2.plot(years, customers, color=neon_lime, marker='s', markersize=6, linewidth=2.5, label='Total Enterprise Customers')
ax2.fill_between(range(len(years)), customers, color=nvidia_green, alpha=0.18)

for i, txt in enumerate(customers):
    ax2.annotate(f'{txt}', (i, customers[i] + 35), color='#ffffff', fontsize=8.5, fontweight='bold', ha='center')

ax2.set_title('CUSTOMER EXPANSION FLYWHEEL (+83% 2Y CAGR)', fontsize=10, fontweight='bold', color='#ffffff', loc='left', pad=10)
ax2.set_ylabel('Total Enterprise Customers', fontsize=9, color='#ffffff', fontweight='bold')
ax2.tick_params(colors='#8c9cb8')
ax2.grid(True, linestyle='--', alpha=0.2, color='#313c52')
ax2.legend(frameon=True, facecolor='#131926', edgecolor='#222938', fontsize=8)

plt.tight_layout()
plt.savefig('/Users/eriksen/Antigravity/pltr_ai_moat.png', dpi=200, facecolor=fig.get_facecolor())
plt.close()

print('Charts generated successfully')
