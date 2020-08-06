import React from "react";
import { Link } from "../../api";

interface Props {
	link: Link;
	onDelete: (slug: string) => void;
}

export function LinkListItem(props: Props) {
	const onDelete = () => {
		props.onDelete(props.link.slug);
	};

	return (
		<li className="bb b--light-gray pv3 flex justify-between items-center">
			<div>
				<h3 className="mt0 mb1 fw6">
					<a href={props.link.url} target="_" className="link blue">
						{props.link.short_url}
					</a>
				</h3>
				<div className="silver f6">
					<span>{props.link.url}</span>
				</div>
			</div>
			<div>
				<button
					className="bn br2 bg-transparent gray pointer pa0 f6"
					onClick={onDelete}
				>
					Delete
				</button>
			</div>
		</li>
	);
}
