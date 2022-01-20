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
</style>

<div class="h-screen flex justify-center bg-slate-800">
	<div class="w-60 flex flex-col justify-center">
		<div class="h-120">
			<slot />
		</div>
	</div>
</div>
