
```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// Portfolio data structure
const portfolio = {
  assets: [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      quantity: 10,
      purchasePrice: 150.0,
      currentPrice: 175.5,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      quantity: 5,
      purchasePrice: 2800.0,
      currentPrice: 3150.25,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      quantity: 8,
      purchasePrice: 300.0,
      currentPrice: 380.45,
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      quantity: 3,
      purchasePrice: 200.0,
      currentPrice: 245.75,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      quantity: 2,
      purchasePrice: 3300.0,
      currentPrice: 3650.0,
    },
  ],
  cash: 5000.0,
};

function calculatePortfolioMetrics() {
  let totalInvestment = 0;
  let totalCurrentValue = 0;
  const assetValues = [];

  portfolio.assets.forEach((asset) => {
    const investmentValue = asset.quantity * asset.purchasePrice;
    const currentValue = asset.quantity * asset.currentPrice;
    const gainLoss = currentValue - investmentValue;
    const gainLossPercent = (gainLoss / investmentValue) * 100;

    totalInvestment += investmentValue;
    totalCurrentValue += currentValue;

    assetValues.push({
      symbol: asset.symbol,
      name: asset.name,
      quantity: asset.quantity,
      investmentValue: investmentValue.toFixed(2),
      currentValue: currentValue.toFixed(2),
      gainLoss: gainLoss.toFixed(2),
      gainLossPercent: gainLossPercent.toFixed(2),
      currentPrice: asset.currentPrice.toFixed(2),
    });
  });

  const totalGainLoss = totalCurrentValue - totalInvestment;
  const totalGainLossPercent = (totalGainLoss / totalInvestment) * 100;
  const portfolioValue = totalCurrentValue + portfolio.cash;

  return {
    assetValues,
    totalInvestment: totalInvestment.toFixed(2),
    totalCurrentValue: totalCurrentValue.toFixed(2),
    totalGainLoss: totalGainLoss.toFixed(2),
    totalGainLossPercent: totalGainLossPercent.toFixed(2),
    cash: portfolio.cash.toFixed(2),
    portfolioValue: portfolioValue.toFixed(2),
  };
}

function generateSimpleChart(data) {
  const maxValue = Math.max(...data);
  const chartWidth = 40;
  const scale = chartWidth / maxValue;

  return data
    .map((value) => {
      const barLength = Math.round(value * scale);
      const bar = "█".repeat(barLength);
      return `${bar} ${value.toFixed(2)}`;
    })
    .join("\n");
}

function generatePortfolioSummaryText() {
  const metrics = calculatePortfolioMetrics();
  let summary =
    "\n╔════════════════════════════════════════════════════════════════╗\n";
  summary +=
    "║          PORTFOLIO INVESTMENT SIMULATOR - SUMMARY              ║\n";
  summary +=
    "╚════════════════════════════════════════════════════════════════╝\n\n";

  summary += "📊 ASSET BREAKDOWN:\n";
  summary += "─".repeat(70) + "\n";

  metrics.assetValues.forEach((asset) => {
    summary += `\n${asset.symbol} - ${asset.name}\n`;
    summary += `  Quantity: ${asset.quantity} shares\n`;
    summary += `  Current Price: $${asset.currentPrice}\n`;
    summary += `  Investment Value: $${asset.investmentValue}\n`;
    summary += `  Current Value: $${asset.currentValue}\n`;
    summary += `  Gain/Loss: $${asset.gainLoss} (${asset.gainLossPercent}%)\n`;
  });

  summary += "\n" + "─".repeat(70) + "\n";
  summary += "\n💰 PORTFOLIO SUMMARY:\n";
  summary += `  Total Investment: $${metrics.totalInvestment}\n`;
  summary += `  Current Value: $${metrics.totalCurrentValue}\n`;
  summary += `  Cash Available: $${metrics.cash}\n`;
  summary += `  Total Portfolio Value: $${metrics.portfolioValue}\n`;
  summary += `  Total Gain/Loss: $${metrics.totalGainLoss} (${metrics.totalGainLossPercent}%)\n`;

  // Simple ASCII chart for portfolio value by asset
  summary += "\n📈 PORTFOLIO COMPOSITION (by current value):\n";
  const values = metrics.assetValues.map((a) => parseFloat(a.currentValue));
  const symbols = metrics.assetValues.map((a) => a.symbol);

  const maxValue = Math.max(...values);
  const chartWidth = 30;
  const scale = chartWidth / maxValue;

  symbols.forEach((symbol, index) => {
    const barLength = Math.round(values[index] * scale);
    const bar = "█".repeat(barLength);
    summary += `  ${symbol.padEnd(6)} ${bar} $${values[index].toFixed(2)}\n`;
  });

  summary += "\n" + "═".repeat(70) + "\n