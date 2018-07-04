import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.625,
  headerFontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ],
  bodyFontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ],
  scaleRatio: 2,
  bodyColor: 'hsla(0,0%,0%,0.8)',
  headerWeight: 600,
  bodyWeight: 'normal',
  boldWeight: 600,
});

// hot reload typography in development
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

const { rhythm, scale } = typography;
export { rhythm, scale, typography as default };
