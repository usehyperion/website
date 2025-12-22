import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
	return (
		<DocsLayout tabMode="navbar" tree={source.pageTree} {...baseOptions()}>
			{children}
		</DocsLayout>
	);
}
