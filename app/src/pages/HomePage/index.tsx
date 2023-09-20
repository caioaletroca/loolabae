import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Page from '@/components/Page';
import View from '@/components/Page/View';
import { useAnalyze } from '@/api/analyze';
import ImageCapture from './ImageCapture';
import useControl from '@/hooks/useControl';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from '@/components/Localization';
import Icon from '@/components/Icon';

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
					<div className="flex flex-row flex-1">
						<img className="h-14 text-theme" src="/logo.svg" />
					</div>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={() => navigate('/configuration')}>
						<Icon>menu</Icon>
					</IconButton>
				</Toolbar>
			</AppBar>
			<View>
				<ImageCapture onChange={handleChange} />
			</View>
		</Page>
	);
}
