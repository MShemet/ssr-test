import { resolve } from 'path';
import { defineConfig, type PluginOption } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper';
import postcssNested from 'postcss-nested';

export default defineConfig(({ command, mode }) => {
  const plugins: PluginOption[] = [
    ViteSvgSpriteWrapper({
      icons: 'src/svg-sprite/*.svg',
      outputDir: 'public/images/',
      sprite: {
        mode: {
          symbol: {
            sprite: '../sprite-base',
          },
        },
      },
    }),
  ];

  if (command === 'build' && mode === 'production') {
    plugins.push(
      ViteImageOptimizer({
        exclude: ['sprite.svg'],
      }),
    );
  }

  return {
    plugins,

    build: {
      emptyOutDir: true,
      rollupOptions: {
        input: {
          home: resolve(__dirname, 'src/pages/home/home.ts'),
        },
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },

    css: {
      postcss: {
        plugins: [postcssNested()],
      },
    },

    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
  };
});
