import { resolve } from 'path';
import { defineConfig, type PluginOption } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper';

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
        exclude: ['sprite-base.svg'],
      }),
    );
  }

  return {
    plugins,

    build: {
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/scripts/index.ts'),
          home: resolve(__dirname, 'src/pages/home/home.ts'),
        },
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },

    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/_variables.scss";`,
        },
      },
    },
  };
});
