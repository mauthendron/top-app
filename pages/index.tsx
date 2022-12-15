import { GetStaticProps } from "next";
import { useState} from "react";
import { Button, Htag, P, Tag, Rating, Input } from "../components";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { TextArea } from "../components/TextArea/TextArea";

function Home({menu}: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag="h1">Заголовок</Htag>
			<Button
				appearence="primary"
				arrow="right"
			>
				Отправить
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
			<Input placeholder='test'/>
			<TextArea placeholder='text'/>
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
			firstCategory
	});
	return {
		props: {
			menu,
			firstCategory
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
