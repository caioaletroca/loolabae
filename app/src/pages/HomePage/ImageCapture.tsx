import { ResponseError } from '@/api/analyze';
import useSpeechSynthesis from '@/hooks/useSpeechSynthesis';
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

type ImageCaptureErrorProps = {
	error: ResponseError;
	onClick?: () => void;
};

export function ImageCaptureError({ error, onClick }: ImageCaptureErrorProps) {
	const intl = useIntl();
	const { speak, stop } = useSpeechSynthesis();

	React.useEffect(() => {
		if (error.error.type === 'BadResultException') {
			speak(
				intl.formatMessage({
					id: 'imageCapture.errorMessage',
					defaultMessage: "It wasn't possible to process the image.",
				})
			);
		}
	}, [error, intl, speak]);

	const handleClick = () => {
		stop();
		onClick?.();
	};

	return (
		<div
			className="flex flex-col flex-1 justify-center items-center"
			onClick={handleClick}>
			<Typography>
				{intl.formatMessage({
					id: 'imageCapture.errorMessage',
					defaultMessage: `It wasn't possible to process the image.`,
				})}
			</Typography>
			<Typography>
				{intl.formatMessage({
					id: 'imageCapture.errorLabel',
					defaultMessage: 'Tap to clear',
				})}
			</Typography>
		</div>
	);
}

type ImageCaptureProps = {
	loading?: boolean;
	reproducing?: boolean;
	error?: ResponseError;
	onChange?: (file: File) => void;
	onCancel?: () => void;
	onClearError?: () => void;
};

export default function ImageCapture({
	loading,
	reproducing,
	error,
	onChange,
	onCancel,
	onClearError,
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

	if (error) {
		return <ImageCaptureError error={error} onClick={onClearError} />;
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
