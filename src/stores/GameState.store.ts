import CyanBlock from '$lib/components/CyanBlock.svelte';
import BlueBlock from '$lib/components/BlueBlock.svelte';
import OrangeBlock from '$lib/components/OrangeBlock.svelte';
import YellowBlock from '$lib/components/YellowBlock.svelte';
import GreenBlock from '$lib/components/GreenBlock.svelte';
import PurpleBlock from '$lib/components/PurpleBlock.svelte';
import RedBlock from '$lib/components/RedBlock.svelte';
import type { SvelteComponent } from 'svelte';

interface tetromino {
	name: string;
	texture: typeof SvelteComponent;
	state: (y: number, x: number, rotateIdx: number) => number[][];
	width: number;
	height: number;
}
export const tetris: tetromino[] = [
	{
		name: 'I',
		texture: CyanBlock,
		state: (y: number, x: number, rotateIdx: number): number[][] => {
			return [
				[
					[y, x + -1],
					[y, x],
					[y, x + 1],
					[y, x + 2]
				],
				[
					[y - 1, x + 1],
					[y, x + 1],
					[y + 1, x + 1],
					[y + 2, x + 1]
				],
				[
					[y + 1, x + -1],
					[y + 1, x],
					[y + 1, x + 1],
					[y + 1, x + 2]
				],
				[
					[y - 1, x],
					[y, x],
					[y + 1, x],
					[y + 2, x]
				]
			][rotateIdx];
		},
		width: 4,
		height: 4
	},
	{
		name: 'J',
		texture: BlueBlock,
		state: (y: number, x: number, rotateIdx: number): number[][] => {
			return [
				[
					[y - 1, x - 1],
					[y, x - 1],
					[y, x],
					[y, x + 1]
				],
				[
					[y - 1, x + 1],
					[y - 1, x],
					[y, x],
					[y + 1, x]
				],
				[
					[y, x - 1],
					[y, x],
					[y, x + 1],
					[y + 1, x + 1]
				],
				[
					[y - 1, x],
					[y, x],
					[y + 1, x],
					[y + 1, x - 1]
				]
			][rotateIdx];
		},
		width: 3,
		height: 3
	},
	{
		name: 'L',
		texture: OrangeBlock,
		state: (y: number, x: number, rotateIdx: number): number[][] => {
			return [
				[
					[y - 1, x + 1],
					[y, x - 1],
					[y, x],
					[y, x + 1]
				],
				[
					[y - 1, x],
					[y, x],
					[y + 1, x],
					[y + 1, x + 1]
				],
				[
					[y, x - 1],
					[y, x],
					[y, x + 1],
					[y + 1, x - 1]
				],
				[
					[y - 1, x - 1],
					[y - 1, x],
					[y, x],
					[y + 1, x]
				]
			][rotateIdx];
		},
		width: 3,
		height: 3
	},
	{
		name: 'O',
		texture: YellowBlock,
		state: (y: number, x: number, rotateIdx: number): number[][] => {
			return [
				[
					[y, x],
					[y, x + 1],
					[y - 1, x],
					[y - 1, x + 1]
				],
				[
					[y, x],
					[y, x + 1],
					[y - 1, x],
					[y - 1, x + 1]
				],
				[
					[y, x],
					[y, x + 1],
					[y - 1, x],
					[y - 1, x + 1]
				],
				[
					[y, x],
					[y, x + 1],
					[y - 1, x],
					[y - 1, x + 1]
				]
			][rotateIdx];
		},
		width: 4,
		height: 3
	},
	{
		name: 'S',
		texture: GreenBlock,
		state: (y: number, x: number, rotateIdx: number): number[][] => {
			return [
				[
					[y - 1, x],
					[y - 1, x + 1],
					[y, x - 1],
					[y, x]
				],
				[
					[y - 1, x],
					[y, x],
					[y, x + 1],
					[y + 1, x + 1]
				],
				[
					[y, x],
					[y, x + 1],
					[y + 1, x - 1],
					[y + 1, x]
				],
				[
					[y - 1, x - 1],
					[y, x - 1],
					[y, x],
					[y + 1, x]
				]
			][rotateIdx];
		},
		width: 3,
		height: 3
	},
	{
		name: 'T',
		texture: PurpleBlock,
		state: (y: number, x: number, rotateIdx: number): number[][] => {
			return [
				[
					[y - 1, x],
					[y, x - 1],
					[y, x],
					[y, x + 1]
				],
				[
					[y - 1, x],
					[y, x],
					[y, x + 1],
					[y + 1, x]
				],
				[
					[y, x - 1],
					[y, x],
					[y, x + 1],
					[y + 1, x]
				],
				[
					[y - 1, x],
					[y, x - 1],
					[y, x],
					[y + 1, x]
				]
			][rotateIdx];
		},
		width: 3,
		height: 3
	},
	{
		name: 'Z',
		texture: RedBlock,
		state: (y: number, x: number, rotateIdx: number): number[][] => {
			return [
				[
					[y - 1, x - 1],
					[y - 1, x],
					[y, x],
					[y, x + 1]
				],
				[
					[y - 1, x + 1],
					[y, x],
					[y, x + 1],
					[y + 1, x]
				],
				[
					[y, x - 1],
					[y, x],
					[y + 1, x],
					[y + 1, x + 1]
				],
				[
					[y - 1, x],
					[y, x - 1],
					[y, x],
					[y + 1, x - 1]
				]
			][rotateIdx];
		},
		width: 3,
		height: 3
	}
];

import { writable, derived, get } from 'svelte/store';

export const gameRunning = writable(false);
export const x = writable(4);
export const y = writable(-1);

export const rotateIdx = writable(0);
export const nextRotateIdx = derived(rotateIdx, ($rotateIdx) => {
	return ($rotateIdx + 1) % 4;
});

export const tetrisIdx = writable(0);
export const fallingTetro = derived(tetrisIdx, ($tetrisIdx) => {
	return tetris[$tetrisIdx];
});
export const fallingTetroState = derived(
	[fallingTetro, y, x, rotateIdx],
	([$fallingTetro, $y, $x, $rotateIdx]) => {
		return $fallingTetro.state($y, $x, $rotateIdx);
	}
);

export const score = writable(0);
export const rowsEliminated = writable(0);

export const resetGameState = () => {
	score.set(0); 
	x.set(4); 
	y.set(-1); 
	rotateIdx.set(0);
	tetrisIdx.set(get(nextRotateIdx))
}