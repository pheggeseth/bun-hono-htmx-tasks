import { nullthrows } from '../utils/nullthrows';

export function getDBFileName() {
	return nullthrows(process.env.DB_FILE_NAME);
}
