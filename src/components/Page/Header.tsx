import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export type HeaderTitleProps = {
	title?: string;
}

export function HeaderTitle({
	title
}: HeaderTitleProps) {
	return (
		<Typography
			variant="h6"
			component="div">
			{title}
		</Typography>
	)
}

export default function Header({
	children
}: React.PropsWithChildren) {
	return (
		<AppBar position='static'>
			<Toolbar>
				{children}
				{/* <IconButton
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
				</Typography> */}
			</Toolbar>
		</AppBar>
	)
}
