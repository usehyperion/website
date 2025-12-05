<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	interface Props {
		class?: string;
		quantity?: number;
		staticity?: number;
		easing?: number;
	}

	interface Circle {
		x: number;
		y: number;
		radius: number;
		dx: number;
		dy: number;
		translateX: number;
		translateY: number;
		magnetism: number;
		alpha: [from: number, to: number];
	}

	const { class: className, quantity = 30, staticity = 50, easing = 50 }: Props = $props();

	const rand = Math.random;

	const circles: Circle[] = [];
	const mouse = { x: 0, y: 0 };
	const dpr = browser ? devicePixelRatio : 1;

	let context: CanvasRenderingContext2D | null | undefined;

	let canvas = $state<HTMLCanvasElement>();
	const size = $state({ width: 0, height: 0 });

	onMount(() => {
		updateCanvas();
		animate();
	});

	function createCircle(): Circle {
		return {
			x: Math.floor(rand() * size.width),
			y: Math.floor(rand() * size.height),
			radius: Math.floor(rand() * 2) + 1,
			dx: (rand() - 0.5) * 0.2,
			dy: (rand() - 0.5) * 0.2,
			translateX: 0,
			translateY: 0,
			magnetism: 0.1 + rand() * 4,
			alpha: [0, parseFloat((rand() * 0.6 + 0.1).toFixed(1))]
		};
	}

	function drawCircle(circle: Circle) {
		if (!context) return;

		context.translate(circle.translateX, circle.translateY);
		context.beginPath();
		context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);

		context.fillStyle = `oklch(1 0 0 / ${circle.alpha[0]})`;
		context.fill();

		context.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	function updateCanvas() {
		if (!canvas) return;

		context = canvas.getContext('2d');
		if (!context) return;

		circles.length = 0;

		canvas.width = size.width * dpr;
		canvas.height = size.height * dpr;
		canvas.style.width = `${size.width}px`;
		canvas.style.height = `${size.height}px`;

		context.scale(dpr, dpr);
		context.clearRect(0, 0, size.width, size.height);

		for (let i = 0; i < quantity; i++) {
			const circle = createCircle();
			circles.push(circle);

			drawCircle(circle);
		}
	}

	function remap(n: number, a1: number, b1: number, a2: number, b2: number) {
		return Math.max(0, ((n - a1) * (b2 - a2)) / (b1 - a1) + a2);
	}

	function animate() {
		if (!context) return;

		context.clearRect(0, 0, size.width, size.height);

		for (let i = 0; i < circles.length; i++) {
			const circle = circles[i];

			// Distances from the edges
			const edgeLeft = circle.x + circle.translateX - circle.radius;
			const edgeRight = size.width - circle.x - circle.translateX - circle.radius;
			const edgeTop = circle.y + circle.translateY - circle.radius;
			const edgeBottom = size.height - circle.y - circle.translateY - circle.radius;

			const closestEdge = Math.min(edgeLeft, edgeRight, edgeTop, edgeBottom);
			const remapped = remap(closestEdge, 0, 20, 0, 1);

			if (remapped > 1) {
				circle.alpha[0] += 0.02;

				if (circle.alpha[0] > circle.alpha[1]) {
					circle.alpha[0] = circle.alpha[1];
				}
			} else {
				circle.alpha[0] = circle.alpha[1] * remapped;
			}

			circle.x += circle.dx;
			circle.y += circle.dy;

			circle.translateX += (mouse.x / (staticity / circle.magnetism) - circle.translateX) / easing;
			circle.translateY += (mouse.y / (staticity / circle.magnetism) - circle.translateY) / easing;

			if (
				circle.x < -circle.radius ||
				circle.x > size.width + circle.radius ||
				circle.y < -circle.radius ||
				circle.y > size.height + circle.radius
			) {
				circles[i] = createCircle();
				drawCircle(circles[i]);
			} else {
				drawCircle(circle);
			}
		}

		requestAnimationFrame(animate);
	}

	function changeDirection(event: MouseEvent) {
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();

		const x = event.clientX - rect.left - size.width / 2;
		const y = event.clientY - rect.top - size.height / 2;

		const inside =
			x < size.width / 2 && x > -size.width / 2 && y < size.height / 2 && y > -size.height / 2;

		if (inside) {
			mouse.x = x;
			mouse.y = y;
		}
	}
</script>

<svelte:window onmousemove={changeDirection} onresize={updateCanvas} />

<div
	class={className}
	aria-hidden="true"
	bind:clientWidth={size.width}
	bind:clientHeight={size.height}
>
	<canvas bind:this={canvas}></canvas>
</div>
