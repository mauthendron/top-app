import { useState, useEffect } from "react";
import { Button, Htag, P, Tag, Rating } from "../components";
import { withLayout } from "../layout/Layout";

function Home(): JSX.Element {
	const [counter, setCounter] = useState<number>(0);
	const [rating, setRating] = useState<number>(4);

	useEffect(() => {
		console.log("Counter" + counter);
	});

	return (
		<>
			<Htag tag="h1">{counter}</Htag>
			<Button
				appearence="primary"
				arrow="right"
				onClick={() => setCounter((x) => x + 1)}
			>
				Кнопка + 1
			</Button>
			<Button appearence="ghost" arrow="down">
				Кнопка
			</Button>
			<P size="s">Большой</P>
			<P>Средний</P>
			<P size="l">Маленький</P>
			<Tag size="s" color="ghost">
				Мал
			</Tag>
			<Tag size="m" color="red">
				Red
			</Tag>
			<Tag size="s" color="green">
				green
			</Tag>
			<Tag size="s" color="primary">
				Primary
			</Tag>
			<Rating rating={rating} isEditable setRating={setRating}></Rating>
		</>
	);
}

export default withLayout(Home);
