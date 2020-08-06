import React from "react";
import {
	render,
	screen,
	fireEvent,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { LinksList } from "./LinksList";

const server = setupServer(
	rest.get(`${process.env.REACT_APP_API_ROOT}/links`, (req, res, ctx) => {
		return res(
			ctx.json([
				{
					url: "https://bely.netlify.app",
					slug: "bely",
					short_url: "http://bely.me/bely",
				},
			])
		);
	}),
	rest.post(`${process.env.REACT_APP_API_ROOT}/links`, (req, res, ctx) => {
		return res(
			ctx.status(201),
			ctx.json({
				url: "http://bely.me/docs",
				slug: "docs",
				short_url: "http://bely.me/docs",
			})
		);
	}),
	rest.delete(
		`${process.env.REACT_APP_API_ROOT}/links/:slug`,
		(req, res, ctx) => {
			return res(ctx.status(204));
		}
	)
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays links", async () => {
	render(<LinksList />);
	const listItems = await screen.findAllByRole("listitem");
	expect(listItems).toHaveLength(1);
});

test("creates a new link", async () => {
	render(<LinksList />);

	let listItems = await screen.findAllByRole("listitem");
	expect(listItems).toHaveLength(1);

	// Simulate new link in response
	server.use(
		rest.get(`${process.env.REACT_APP_API_ROOT}/links`, (req, res, ctx) => {
			return res(
				ctx.json([
					{
						url: "http://bely.me/docs",
						slug: "docs",
						short_url: "http://bely.me/docs",
					},
					{
						url: "https://bely.netlify.app",
						slug: "bely",
						short_url: "http://bely.me/bely",
					},
				])
			);
		})
	);

	fireEvent.click(screen.getByText(/New Link/i));
	fireEvent.change(screen.getByLabelText(/URL/i), {
		target: { value: "https://goldbelly.com" },
	});
	fireEvent.click(screen.getByText(/Shorten URL/i));

	// Wait for modal to disappear
	await waitForElementToBeRemoved(() => screen.getByText(/Shorten URL/i));

	// Check that new link is in list
	listItems = await screen.findAllByRole("listitem");
	expect(listItems).toHaveLength(2);
});

test("handles errors", async () => {
	render(<LinksList />);

	// Simulate error response
	server.use(
		rest.post(
			`${process.env.REACT_APP_API_ROOT}/links`,
			(req, res, ctx) => {
				return res(
					ctx.json({
						errors: {
							slug: ["has already been taken"],
						},
					})
				);
			}
		)
	);

	fireEvent.click(screen.getByText(/New Link/i));
	fireEvent.change(screen.getByLabelText(/URL/i), {
		target: { value: "https://goldbelly.com" },
	});
	fireEvent.click(screen.getByText(/Shorten URL/i));

	const alert = await screen.findByRole("alert");
	expect(alert).toHaveTextContent(/Error:/i);
});

test("deletes a link", async () => {
	render(<LinksList />);

	let listItems = await screen.findAllByRole("listitem");
	fireEvent.click(screen.getByText(/Delete/i));
	await waitForElementToBeRemoved(listItems[0]);
});
