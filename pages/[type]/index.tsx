import { GetStaticPaths, GetStaticProps } from "next";
import { withLayout } from "../../layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { API } from "../../helpers/api";

function Type(): JSX.Element {
	return (
		<>
			Type
		</>
	);
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map(m => '/' + m.route),
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(
		API.topPage.find, {
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


