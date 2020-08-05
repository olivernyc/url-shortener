import React, { ReactNode } from "react";

interface Props {
	onCancel: () => void;
	children: ReactNode;
}

export function Modal(props: Props) {
	return (
		<div
			className="absolute absolute--fill bg-white-80 flex justify-center items-start"
			onClick={props.onCancel}
		>
			<div
				className="pa4 bg-white ba b--moon-gray mt5 measure-wide w-100"
				onClick={(event) => event.stopPropagation()}
			>
				{props.children}
			</div>
		</div>
	);
}
