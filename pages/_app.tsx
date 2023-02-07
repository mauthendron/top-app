import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import ym from 'react-yandex-metrika';
import {YMInitializer} from 'react-yandex-metrika';
import { Router } from "next/router";

Router.events.on('routeChangeComplete', (url: string) => {
	if (typeof window !== undefined) {
		ym('hit', url);
	}
});

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {

	return <>
			<Head>
				<title>My Top</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://mc.yandex.ru"/>
				<meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
				<meta property='og:locale' content='ru_Ru' />
			</Head>
			<YMInitializer
				accounts={[]}
				options={{webvisor: true, defer: true}}
				version='2'
			/>
			<Component {...pageProps} />
	</>;
}
