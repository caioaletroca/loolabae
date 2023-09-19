import React from 'react';
import { SettingsContext } from './Provider';

export function useSettings() {
	return React.useContext(SettingsContext);
}
