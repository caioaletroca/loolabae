import { IconProps, Icon as MuiIcon } from '@mui/material';
import classNames from 'classnames';

export default function Icon({ className, ...others }: IconProps) {
	return (
		<MuiIcon
			className={classNames('material-symbols-outlined', className)}
			{...others}
		/>
	);
}
