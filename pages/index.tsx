import { GetStaticProps } from "next";
import { useState } from "react";
import { Button, Htag, P, Tag, Rating, Input } from "../components";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { Textarea } from "../components/Textarea/Textarea";
import { API } from "../helpers/api";

function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(4);


	return (
		<>
			<Htag tag="h1">Заголовок</Htag>
			<Button appearance="primary" arrow="right">
				Отправить
			</Button>
			<Button appearance="ghost" arrow="down">
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
			<Input placeholder="test" />
			<Textarea placeholder="text" />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(
		API.topPage.find,
		{
			firstCategory,
		}
	);
	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
