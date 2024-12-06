'use client';

import { CssVarsProvider, CssBaseline, extendTheme } from '@mui/joy';
import { Roboto, Noto_Sans_JP } from 'next/font/google';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const roboto = Roboto({ subsets: ['latin'], weight: '400' });
const notosansjp = Noto_Sans_JP({ subsets: ['latin'] });

export function JoyUIThemeProvider({ children }: Props) {
  const customTheme = extendTheme({
    fontFamily: {
      body: `${roboto.style.fontFamily}, ${notosansjp.style.fontFamily}, sans-serif`,
    },

    colorSchemes: {
      dark: {
        palette: {
          background: {
            body: '#1b1b1f',
          },
        },
      },
    },
  });

  return (
    <CssVarsProvider defaultMode='dark' theme={customTheme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
