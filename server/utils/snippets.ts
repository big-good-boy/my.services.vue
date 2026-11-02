import type { Snippet } from '~/interfaces/snippet.interfaces';
import { RowDataPacket } from 'mysql2';

export const snippets: Snippet[] = [];

export type SnippetRow = RowDataPacket &
	Omit<Snippet, 'demo'> & { demo: number };
