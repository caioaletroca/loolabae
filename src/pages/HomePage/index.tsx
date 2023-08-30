import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

export default function HomePage() {
	return (
		<AppBar position='static'>
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu">
					<span className='material-symbols-outlined'>menu</span>
				</IconButton>
				<Typography
					variant="h6"
					component="div">
					Test
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
