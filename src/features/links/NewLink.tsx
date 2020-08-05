import React, { useState, ChangeEvent, FormEvent } from "react";
import { Modal } from "../../components/Modal";
import { CreateLinkErrors } from "../../api";

interface Props {
	onSubmit: (url: string, slug?: string) => void;
	onCancel: () => void;
	errors: CreateLinkErrors;
}

export function NewLink(props: Props) {
	const [url, setURL] = useState("");
	const [slug, setSlug] = useState("");

	const onURLChange = (event: ChangeEvent<HTMLInputElement>) => {
		setURL(event.target.value);
	};

	const onSlugChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSlug(event.target.value);
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.onSubmit(url, slug);
	};

	return (
		<Modal onCancel={props.onCancel}>
			<form className="" onSubmit={onSubmit}>
				<fieldset id="sign_up" className="ba b--transparent pa0 ma0">
					<legend className="f4 fw7 ph0 mh0">New Link</legend>
					<div className="mt3">
						<label className="db fw6 lh-copy f6 mb1" htmlFor="url">
							URL
						</label>
						<input
							className="pa2 input-reset ba b--moon-gray br2 w-100"
							type="url"
							name="url"
							id="url"
							autoFocus
							required
							value={url}
							onChange={onURLChange}
						/>
					</div>
					<div className="mv3">
						<label className="db fw6 lh-copy f6 mb1" htmlFor="slug">
							Slug{" "}
							<span className="normal black-60">
								(optional, letters and numbers, no spaces)
							</span>
						</label>
						<input
							className="pa2 input-reset ba b--moon-gray br2 w-100"
							type="text"
							name="slug"
							id="slug"
							autoComplete="false"
							spellCheck="false"
							value={slug}
							onChange={onSlugChange}
						/>
					</div>
				</fieldset>
				{renderErrors(props.errors)}
				<div className="flex justify-end">
					<input
						className="fw6 ph3 pv2 input-reset bn br2 bg-light-gray pointer f6 gray mr3"
						type="button"
						value="Cancel"
						onClick={props.onCancel}
					/>
					<input
						className="fw6 ph3 pv2 input-reset bn br2 bg-red pointer f6 white"
						type="submit"
						value="Shorten URL"
					/>
				</div>
			</form>
		</Modal>
	);
}

function renderErrors(errors: CreateLinkErrors) {
	if (!errors.url && !errors.slug) return null;
	const urlErrors =
		errors.url &&
		errors.url.map((error) => (
			<div className="mv2 f6">
				<span role="img" aria-label="warning">
					⚠️
				</span>{" "}
				Error: URL {error}
			</div>
		));
	const slugErrors =
		errors.slug &&
		errors.slug.map((error) => (
			<div className="mv2 f6">
				<span role="img" aria-label="warning">
					⚠️
				</span>{" "}
				Error: Slug {error}
			</div>
		));
	return (
		<div className="bg-washed-yellow pa2 mb3">
			{urlErrors}
			{slugErrors}
		</div>
	);
}
