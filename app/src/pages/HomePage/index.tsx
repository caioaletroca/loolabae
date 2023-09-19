import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Page from '@/components/Page';
import View from '@/components/Page/View';
import { useAnalyze } from '@/api/analyze';
import ImageCapture from './ImageCapture';
import useControl from '@/hooks/useControl';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from '@/components/Localization';

export default function HomePage() {
	const { locale } = useLocalization();
	const navigate = useNavigate();
	const { reproduce } = useControl();
	const { trigger } = useAnalyze({
		onSuccess: ({ data }) => {
			reproduce(data.text, data.context);
		},
	});

	const handleChange = async (file: File) => {
		trigger({
			language: locale === 'en-US' ? 'eng' : 'pt',
			image: file,
		});
	};

	return (
		<Page>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div">
						Test
					</Typography>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={() => navigate('/configuration')}>
						<span className="material-symbols-outlined">menu</span>
					</IconButton>
				</Toolbar>
			</AppBar>
			<View>
				<ImageCapture onChange={handleChange} />
			</View>
		</Page>
	);
}
