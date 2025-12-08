
export async function GET() {
	const API_KEY = process.env.FOOTBALL_API_KEY;
	const BASE_URL = 'https://v3.football.api-sports.io';

	// list of API-Football endpoints
	const endpoints = [
		'countries',
		'seasons',
		'leagues',
		'teams',
		'standings',
		'fixtures',
		'events',
		'odds',
		'players',
		'transfers',
		'venues',
	];
	let failedCount = 0;
	
	async function fetchEndpoint(path: string) {
		const url = `${BASE_URL}/${path}`;
		const resp = await fetch(url, {
			method: 'GET',
			headers: {
				'x-apisports-key': API_KEY!,
			},
			// do not cache
			cache: 'no-store',
		});


		if (!resp.ok) {
			failedCount++;
			return { endpoint: path, error: resp.status };
		}

		const data = await resp.json();
		return { endpoint: path, data };
	}

	const allResults = [];

	for (const ep of endpoints) {
		const result = await fetchEndpoint(ep);

		// wait 200ms to avoid rate limits
		await new Promise((r) => setTimeout(r, 200));

		allResults.push(result);
	}

	return Response.json({
		status: 'OK',
		message: 'All endpoints fetched successfully',
		failedCount: failedCount,
	});
}
