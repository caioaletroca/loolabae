import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../Icon";

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

export type HeaderBackProps = {
	onBack?: () => void
}

export function HeaderBack({
	onBack
}: HeaderBackProps) {
	const navigate = useNavigate();

	const handleBack = () => navigate(-1);

	return (
		<IconButton
			size="large"
			edge="start"
			color="inherit"
			aria-label="back"
			onClick={onBack ?? handleBack}>
			<Icon>chevron_left</Icon>
		</IconButton>
	);
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
