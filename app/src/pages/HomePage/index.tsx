import { AppBar, IconButton, Toolbar } from '@mui/material';
import Page from '@/components/Page';
import View from '@/components/Page/View';
import { useAnalyze } from '@/api/analyze';
import ImageCapture from './ImageCapture';
import useControl from '@/hooks/useControl';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from '@/components/Localization';
import Icon from '@/components/Icon';
import imageCompression from 'browser-image-compression';
import React from 'react';

export default function HomePage() {
	const [loading, setLoading] = React.useState(false);
	const { locale } = useLocalization();
	const navigate = useNavigate();
	const { reproduce, reproducing, cancel } = useControl();
	const { error, trigger, reset, isMutating } = useAnalyze({
		onSuccess: ({ data }) => {
			reproduce(data.text, data.context);
			setLoading(false);
		},
		onError: () => {
			setLoading(false);
		},
	});

	const handleChange = async (file: File) => {
		setLoading(true);
		const compressedFile = await imageCompression(file, {
			maxSizeMB: 1,
			fileType: 'image/webp',
			useWebWorker: true,
		});

		trigger({
			locale,
			image: compressedFile,
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
				<ImageCapture
					loading={loading || isMutating}
					reproducing={reproducing}
					error={error}
					onChange={handleChange}
					onCancel={cancel}
					onClearError={reset}
				/>
			</View>
		</Page>
	);
}
