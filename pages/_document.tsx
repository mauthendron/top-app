import Document, {Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps} from "next/document";

class MyDocument extends Document {

	static async getInitialProps (ctx: DocumentContext): Promise<DocumentInitialProps> {
		const initialprops = await Document.getInitialProps(ctx);
		return {...initialprops};
	}

	render(): JSX.Element{
		return (
			<Html lang="ru">
				<Head/>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</Html>
		);
	}
}

export default MyDocument;