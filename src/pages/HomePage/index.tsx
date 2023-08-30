import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Page from "@/components/Page";

export default function HomePage() {
	return (
		<Page>
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
		</Page>
	);
}
