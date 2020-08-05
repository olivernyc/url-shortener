import React, { useState, useEffect } from "react";
import { LinkListItem } from "./LinkListItem";
import { NewLink } from "./NewLink";
import { getLinks, createLink, deleteLink, Link } from "../../api";

export function LinksList() {
	const [links, setLinks] = useState<Link[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [errors, setErrors] = useState({});

	const fetchLinks = async () => {
		const links = await getLinks();
		setLinks(links);
	};

	useEffect(() => {
		fetchLinks();
	}, []);

	const onNewClicked = () => {
		setShowModal(true);
	};

	const onCancelClicked = () => {
		setShowModal(false);
	};

	const onDeleteClicked = async (slug: string) => {
		await deleteLink(slug);
		setLinks(links.filter((link) => link.slug !== slug));
	};

	const onNewLink = async (url: string, slug?: string) => {
		try {
			setErrors({});
			const { link, errors } = await createLink(url, slug);
			if (errors) {
				setErrors(errors);
			} else {
				setLinks([link, ...links]);
				setShowModal(false);
			}
		} catch (error) {}
	};

	return (
		<div className="mw8 center pa3">
			<div>
				<div className="flex items-center justify-between pb3 bb b--light-gray">
					<h2 className="f2 ma0">Links</h2>
					<button
						className="fw6 ph3 pv2 bn br2 bg-red pointer f6 white"
						onClick={onNewClicked}
					>
						New Link
					</button>
				</div>
			</div>
			{links.map((link) => (
				<LinkListItem
					key={link.short_url}
					link={link}
					onDelete={onDeleteClicked}
				/>
			))}
			{showModal && (
				<NewLink
					onSubmit={onNewLink}
					onCancel={onCancelClicked}
					errors={errors}
				/>
			)}
		</div>
	);
}
