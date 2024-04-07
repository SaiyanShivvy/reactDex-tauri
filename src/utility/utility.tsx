export function calculateStatPercentage(value: number): number {
	const percent = 100 / (255 / value);
	return Math.round(percent);
}

// Pokemon uses Deci units
export function convertUnits(value: number): number {
	return parseFloat((value / 10).toFixed(2));
}

// Function to format and return stats with EV yield if effort is equal to 1
export function getFormattedStats(stats: any[]): string {
	const formattedStats: string[] = [];
	const evYieldStats: string[] = [];

	stats.forEach((stat) => {
		if (stat.effort === 1) {
			evYieldStats.push(`EV Yield: 1 ${stat.stat.name}`);
		}
		formattedStats.push(`${stat.stat.name}: ${stat.base_stat}`);
	});

	const resultStats = [...evYieldStats, ...formattedStats].join("\n");
	return resultStats;
}

export function sanitizeInput(input: string): string {
	// Remove any non-alphanumeric characters and convert to lowercase
	const sanitizedString = input.replace(/[^a-zA-Z0-9]/g, " ").toLowerCase();

	// Split the sanitized string into words
	const words = sanitizedString.split(" ");

	// Capitalize the first letter of each word
	const capitalizedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	);

	// Join the capitalized words back into a string
	const capitalizedString = capitalizedWords.join(" ");

	return capitalizedString;
}
