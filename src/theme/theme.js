import { createTheme } from '@mui/material/styles'

export function getTheme(dark = false) {
	const palette = dark
		? {
				mode: 'dark',
				background: { default: '#0f1724', paper: '#0b1220' },
				primary: { main: '#66b3ff' }
			}
		: {
				mode: 'light',
				background: { default: '#eaf7ff', paper: '#ffffff' },
				primary: { main: '#0ea5e9' }
			}

	return createTheme({
		palette,
		shape: { borderRadius: 14 },
		typography: {
			fontFamily: "Inter, Roboto, 'Helvetica Neue', Arial",
			h4: { fontWeight: 700 },
			h6: { fontWeight: 600 }
		},
		components: {
			MuiPaper: {
				styleOverrides: {
					root: { borderRadius: 14 }
				}
			}
		}
	})
}
