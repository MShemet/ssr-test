import browserSync from 'browser-sync';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
browserSync({
  proxy: 'http://localhost/',
  files: ['dist/**/*.*'],
});
