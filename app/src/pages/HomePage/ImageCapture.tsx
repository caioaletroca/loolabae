import { Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';

type ImageCaptureProps = {
	onChange?: (file: File) => void;
};

export default function ImageCapture({ onChange }: ImageCaptureProps) {
	const intl = useIntl();
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleOpen = () => {
		inputRef.current?.click();
	};

	const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.files?.[0] as File);
	};

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
