import { CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';

type ImageCaptureReproducingProps = {
	onCancel?: () => void;
};

export function ImageCaptureReproducing({
	onCancel,
}: ImageCaptureReproducingProps) {
	const intl = useIntl();

	return (
		<div
			className="flex flex-col flex-1 justify-center items-center"
			onClick={onCancel}>
			<Typography>
				{intl.formatMessage({
					id: 'imageCapture.cancel',
					defaultMessage: 'Tap to cancel',
				})}
			</Typography>
		</div>
	);
}

export function ImageCaptureLoading() {
	return (
		<div className="flex flex-col flex-1 justify-center items-center">
			<CircularProgress />
		</div>
	);
}

type ImageCaptureProps = {
	loading?: boolean;
	reproducing?: boolean;
	onChange?: (file: File) => void;
	onCancel?: () => void;
};

export default function ImageCapture({
	loading,
	reproducing,
	onChange,
	onCancel,
}: ImageCaptureProps) {
	const intl = useIntl();
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleOpen = () => {
		inputRef.current?.click();
	};

	const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.files?.[0] as File);
	};

	if (loading) {
		return <ImageCaptureLoading />;
	}

	if (reproducing) {
		return <ImageCaptureReproducing onCancel={onCancel} />;
	}

	return (
		<div
			className="flex flex-col flex-1 justify-center items-center"
			onClick={handleOpen}>
			<Typography>
				{intl.formatMessage({
					id: 'imageCapture.label',
					defaultMessage: 'Tap to take a photo',
				})}
			</Typography>
			<input
				ref={inputRef}
				className="hidden"
				accept="image/*"
				id="icon-button-file"
				type="file"
				capture="environment"
				onChange={handleCapture}
			/>
		</div>
	);
}
