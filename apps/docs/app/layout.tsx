import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

const inter = Inter({
	subsets: ['latin']
});

export default function Layout({ children }: LayoutProps<'/'>) {
	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<body className="flex min-h-screen flex-col">
				<RootProvider>
					<DocsLayout tabMode="navbar" tree={source.pageTree} {...baseOptions()}>
						{children}
					</DocsLayout>
				</RootProvider>
			</body>
		</html>
	);
}
