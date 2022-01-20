<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	const nRow = 20;
	const nCol = 10;
	let table: typeof SvelteComponent[][] = new Array(nRow)
		.fill(null)
		.map(() => new Array(nCol).fill(null));

	import {
		gameRunning,
		x,
		y,
		rotateIdx,
		nextRotateIdx,
		tetrisIdx,
		fallingTetro,
		fallingTetroState,
		tetris,
		score,
		rowsEliminated
	} from './../stores/GameState.store';

	$: lockAction = false || !$gameRunning;
	const handleKeydown = (e: KeyboardEvent) => {
		let dY = 0;
		let dX = 0;
		if (!lockAction) {
			if (e.key === 'ArrowUp') {
				dY--;
				if (isLegalMove(dY, dX)) y.update((y) => y - 1);
			}
			if (e.key === 'ArrowDown') {
				dY++;
				if (isLegalMove(dY, dX)) y.update((y) => y + 1);
			}
			if (e.key === 'ArrowLeft') {
				dX--;
				if (isLegalMove(dY, dX)) x.update((x) => x - 1);
			}
			if (e.key === 'ArrowRight') {
				dX++;
				if (isLegalMove(dY, dX)) x.update((x) => x + 1);
			}
			if (e.key === 'r') {
				if (isLegalMove(dY, dX, $fallingTetro.state($y, $x, $nextRotateIdx))) {
					$rotateIdx = $nextRotateIdx;
				}
			}
			if (e.code === 'Space') {
				lockAction = true;
				while (true) {
					if (isLegalMove(1, 0)) {
						y.update((y) => y + 1);
					} else {
						break;
					}
				}
			}
		}
	};

	const removeCompletedRows = () => {
		let strikes = 0;
		for (let i = 0; i < nRow; i++) {
			let completed = true;
			for (let j = 0; j < nCol; j++) {
				if (table[i][j] === null) {
					completed = false;
				}
			}
			if (completed) {
				strikes++;
				$rowsEliminated++;
				for (let k = i; k > 0; k--) {
					for (let l = nCol - 1; l >= 0; l--) {
						table[k][l] = table[k - 1][l];
					}
				}
			}
		}
		$score = $score + 10 ** strikes;
	};

	let nextTetrisIdx = Math.floor(Math.random() * 7);
	$: nextTetro = tetris[nextTetrisIdx];

	gameRunning.subscribe((g) => {
		if (g) {
			table = new Array(nRow).fill(null).map(() => new Array(nCol).fill(null));
			game();
		}
	});

	const game = async () => {
		console.log('Game starts.');
		while (true) {
			await new Promise((res) => setTimeout(res, 1500));
			lockAction = false;
			if ($y === 0 && !isLegalMove(0, 0)) {
				console.log('Game ends.');
				$gameRunning = false;
				return;
			}
			if ($y < 19 && isLegalMove(1, 0)) {
				y.update((y) => y + 1);
			} else {
				// Write tetro into table
				const state = $fallingTetroState;
				for (let _ = 0; _ < state.length; _++) {
					const coord = state[_];
					const ptY = coord[0];
					const ptX = coord[1];
					table[ptY][ptX] = $fallingTetro.texture;
				}
				// Check for row elimination
				removeCompletedRows();
				// Update game state for next tetro
				$rotateIdx = 0;
				$x = 4;
				$y = 0;
				$tetrisIdx = nextTetrisIdx;
				nextTetrisIdx = Math.floor(Math.random() * 7);
			}
		}
	};

	const containCoord = (map: number[][], coord: number[]) => {
		for (let _ = 0; _ < map.length; _++) {
			const state = map[_];
			if (state[0] === coord[0] && state[1] === coord[1]) {
				return true;
			}
		}
		return false;
	};

	$: shouldDrawBlock = (row: number, col: number): boolean => {
		return containCoord($fallingTetroState, [row, col]);
	};

	$: isLegalMove = (dY: number, dX: number, state?: number[][]): boolean => {
		if (!state) {
			state = $fallingTetroState;
		}
		for (let _ = 0; _ < state.length; _++) {
			const coord = state[_];
			const ptY = coord[0] + dY;
			const ptX = coord[1] + dX;
			if (!(ptY >= 0 && ptY < nRow && ptX >= 0 && ptX < nCol) || table[ptY][ptX]) {
				return false;
			}
		}
		return true;
	};
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex h-full gap-6">
	<div class="bg-slate-700 h-full">
		<div class="flex flex-col">
			{#each table as row, i}
				<div class="flex">
					{#each row as col, j}
						{#if shouldDrawBlock(i, j)}
							<svelte:component this={$fallingTetro.texture} />
						{:else if col != null}
							<svelte:component this={col} />
						{:else}
							<div class="bg-inherit h-6 w-6" />
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>
	<div class="bg-slate-700 flex flex-col gap-2 w-38 shrink-0 p-2">
		<div class="bg-slate-200 h-36 w-36 flex flex-col justify-center">
			<div class="flex flex-col">
				{#each new Array(nextTetro.height) as row, i}
					<div class="flex justify-center">
						{#each new Array(nextTetro.width) as col, j}
							{#if containCoord(nextTetro.state(1, 1, 0), [i, j])}
								<svelte:component this={nextTetro.texture} />
							{:else}
								<div class="bg-inherit h-6 w-6" />
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		</div>
		<div class="font-mono text-white">Rows: {$rowsEliminated}</div>
		<div class="grow font-mono text-white">Score: {$score}</div>
		<div class="shrink flex">
			{#if !$gameRunning}
				<button
					class="w-full rounded-sm bg-slate-400 hover:bg-slate-300 transition-colors duration-200"
					on:click={() => {
						$gameRunning = true;
					}}>Start</button
				>
			{/if}
		</div>
	</div>
</div>
