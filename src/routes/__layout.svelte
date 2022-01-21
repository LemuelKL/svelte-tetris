<script>
	import '../app.css';
</script>

<style>
	.h-120{
		height: 30rem;
	}
	.w-60{
		width: 15rem;
	}
	.h-125{
		height: 31.1875rem;
	}
	.w-62{
		width: 15.5625rem;
	}
</style>

<div class="h-screen flex justify-center bg-slate-800">
	<div class="w-62 flex flex-col justify-center">
		<div class="h-125">
			<slot />
		</div>
	</div>
</div>
