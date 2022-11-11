import { Button, Htag } from "../components";

export default function Home(): JSX.Element {
	return (
		<>
			<Htag tag="h1">Text</Htag>
			<Button appearence="primary">Кнопка</Button>
			<Button appearence="ghost">Кнопка</Button>
		</>
	);
}
