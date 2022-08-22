import * as React from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import aicte from "./aicte.png";

const theme = createTheme({
	palette: {
		primary: {
			light: "#f2f2f2",
			main: "#ffffff",
			dark: "#e6e6e6",
			contrastText: "#408FF6",
		},
	},
});

export default function Header() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{ flexGrow: 1 }}
				color="primary"
				style={{ marginTop: "40px", height: "40px" }}
			>
				
			</Box>
		</ThemeProvider>
	);
}
