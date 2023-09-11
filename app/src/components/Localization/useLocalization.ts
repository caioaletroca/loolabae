import React from 'react';
import { LocalizationContext } from '.';

export function useLocalization() {
	return React.useContext(LocalizationContext);
}
