import { Octokit } from 'octokit';

export interface ThemeManifest {
	version: string;
	name: string;
	description: string;
	author: string;
	repository?: string;
}

export const octokit = new Octokit();
