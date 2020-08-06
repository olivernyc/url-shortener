export interface Link {
	short_url: string;
	slug: string;
	url: string;
}

export interface CreateLinkErrors {
	url?: string[];
	slug?: string[];
}

export interface CreateLinkResponse {
	link: Link;
	errors?: CreateLinkErrors;
}

export async function getLinks(): Promise<Link[]> {
	const url = `${process.env.REACT_APP_API_ROOT}/links`;
	try {
		const response = await fetch(url, {
			headers: {
				"GB-Access-Token": `${process.env.REACT_APP_API_KEY}`,
			},
		});
		if (response.status !== 200) throw new Error(response.statusText);
		const links = await response.json();
		return links; // Most recent first
	} catch (error) {
		throw error;
	}
}

export async function getLink(slug: String): Promise<Link> {
	const url = `${process.env.REACT_APP_API_ROOT}/link/${slug}`;
	try {
		const response = await fetch(url, {
			headers: {
				"GB-Access-Token": `${process.env.REACT_APP_API_KEY}`,
			},
		});
		const link = await response.json();
		return link;
	} catch (error) {
		throw error;
	}
}

export async function createLink(
	link_url: string,
	slug?: string
): Promise<CreateLinkResponse> {
	const url = `${process.env.REACT_APP_API_ROOT}/links`;

	const body = slug
		? {
				url: link_url,
				slug: slug,
		  }
		: {
				url: link_url,
		  };

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"GB-Access-Token": `${process.env.REACT_APP_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		if (response.status === 401) throw new Error(response.statusText);
		const json = await response.json();
		return {
			link: {
				url: json.url,
				short_url: json.short_url,
				slug: json.slug,
			},
			errors: json.errors,
		};
	} catch (error) {
		throw error;
	}
}

export async function deleteLink(slug: string): Promise<boolean> {
	const url = `${process.env.REACT_APP_API_ROOT}/links/${slug}`;

	try {
		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				"GB-Access-Token": `${process.env.REACT_APP_API_KEY}`,
			},
		});
		if (response.status !== 204) throw new Error(response.statusText);
		return true;
	} catch (error) {
		throw error;
	}
}
