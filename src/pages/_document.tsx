import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body className="bg-gradient-to-tr from-[rgb(22,22,22)] to-[rgb(40,40,40)] text-white overflow-hidden">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
