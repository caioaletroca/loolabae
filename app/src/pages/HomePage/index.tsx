import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Page from '@/components/Page';
import View from '@/components/Page/View';
import { useAnalyze } from '@/api/analyze';
import ImageCapture from './ImageCapture';
import useControl from '@/hooks/useControl';

export default function HomePage() {
	const { reproduce } = useControl();
	const { trigger } = useAnalyze({
		onSuccess: ({ data }) => {
			reproduce(data.text, data.context);
		},
	});

	const handleChange = async (file: File) => {
		trigger({
			language: 'eng',
			image: file,
		});
	};

	return (
		<Page>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu">
						<span className="material-symbols-outlined">menu</span>
					</IconButton>
					<Typography variant="h6" component="div">
						Test
					</Typography>
				</Toolbar>
			</AppBar>
			<View>
				<ImageCapture onChange={handleChange} />
			</View>
		</Page>
	);
}
