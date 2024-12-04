import { nullthrows } from '../utils/nullthrows';

export function dbFileName() {
	return nullthrows(process.env.DB_FILE_NAME);
}
