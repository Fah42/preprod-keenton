import type { ImageMetadata } from 'astro';

const localImages = import.meta.glob<{ default: ImageMetadata }>(
	'/src/assets/**/*.{avif,jpeg,jpg,png,webp}',
	{ eager: true }
);

export function resolveLocalImage(src: string | ImageMetadata): ImageMetadata {
	if (typeof src !== 'string') return src;

	const assetPath = src.startsWith('/images/')
		? `/src/assets/images/${src.slice('/images/'.length)}`
		: src;
	const imageAsset = localImages[assetPath]?.default;

	if (!imageAsset) {
		throw new Error(`Image locale introuvable dans src/assets : ${src}`);
	}

	return imageAsset;
}
