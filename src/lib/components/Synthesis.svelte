<script>
	import { Shader, FilmGrain, SineWave, SolidColor, WaveDistortion } from "shaders/svelte";
</script>

<Shader class="absolute inset-0 -z-1 border-b-0!">
	<SolidColor color="#000000" />
	<SineWave
		amplitude={0.52}
		angle={77}
		blendMode="normal-oklch"
		color="#2e231e"
		frequency={0.35}
		position={{
			x: 0.38,
			y: 0.32,
		}}
		softness={0.42}
		speed={0.3}
		thickness={0.95}
	/>
	<SineWave
		amplitude={0.28}
		angle={144}
		blendMode="normal-oklab"
		color="#e85805"
		frequency={0.45}
		position={{
			x: 0.72,
			y: 0.68,
		}}
		softness={0.62}
		speed={0.5}
		thickness={0.58}
	/>
	<WaveDistortion angle={135} edges="mirror" frequency={1.6} speed={0.2} strength={0.45} />
	<FilmGrain strength={0.1} />
</Shader>
